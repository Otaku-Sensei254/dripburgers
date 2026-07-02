import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSocket, disconnectSocket } from '../lib/socket';
import { KitchenOrder } from '../types/order';
import { DEMO_KITCHEN_PASSWORD, KITCHEN_PASS_STORAGE_KEY } from '../constants/kitchen-auth';
import { menuItemById } from '../data/menu';

type UiState = 'login' | 'loading' | 'dash';
type PayState = 'idle' | 'sending' | 'sent' | 'error';

interface Receipt {
  receiptId: string;
  orderId: string;
  tableId: string;
  items: { menuItemId: string; name: string; price: number; qty: number }[];
  note: string;
  phone: string;
  total: number;
  stkId: string;
  paidAt: number;
}

function orderTotal(o: KitchenOrder) {
  return o.items.reduce((s, i) => s + i.price * i.qty, 0);
}

export function CounterPage() {
  const hasStoredPwOnFirstRender =
    typeof window !== 'undefined' && !!sessionStorage.getItem(KITCHEN_PASS_STORAGE_KEY);

  const [ui, setUi] = useState<UiState>(() => (hasStoredPwOnFirstRender ? 'loading' : 'login'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [orders, setOrders] = useState<KitchenOrder[]>([]);

  // Payment modal state
  const [payModalOrder, setPayModalOrder] = useState<KitchenOrder | null>(null);
  const [phone, setPhone] = useState('');
  const [payStatus, setPayStatus] = useState<PayState>('idle');
  const [payError, setPayError] = useState<string | null>(null);

  // Receipt modal state
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    const s = getSocket();

    const onOrders = (list: KitchenOrder[]) => setOrders(Array.isArray(list) ? list : []);
    const onAuthed = () => {
      setLoginError(null);
      setUi('dash');
    };
    const onAuthErr = () => {
      sessionStorage.removeItem(KITCHEN_PASS_STORAGE_KEY);
      setUi('login');
      setOrders([]);
      setLoginError('Wrong password or session expired.');
    };
    const onPaid = (r: Receipt) => {
      setPayStatus('sent');
      setTimeout(() => {
        setPayModalOrder(null);
        setPhone('');
        setPayStatus('idle');
        setReceipt(r);
      }, 1200);
    };
    const onOrderErr = (msg?: unknown) => {
      setPayStatus((prev) => {
        if (prev === 'sending') {
          setPayError(typeof msg === 'string' ? msg : 'Payment failed.');
          return 'error';
        }
        return prev;
      });
    };

    const authIfStored = () => {
      const pw = sessionStorage.getItem(KITCHEN_PASS_STORAGE_KEY);
      if (pw) s.emit('counter:auth', { password: pw });
    };

    s.on('counter:sync', onOrders);
    s.on('counter:authenticated', onAuthed);
    s.on('counter:auth:error', onAuthErr);
    s.on('order:paid', onPaid);
    s.on('order:error', onOrderErr);
    s.on('connect', authIfStored);

    authIfStored();

    return () => {
      s.off('counter:sync', onOrders);
      s.off('counter:authenticated', onAuthed);
      s.off('counter:auth:error', onAuthErr);
      s.off('order:paid', onPaid);
      s.off('order:error', onOrderErr);
      s.off('connect', authIfStored);
    };
  }, []);

  const login = useCallback(() => {
    const pw = passwordInput.trim();
    setLoginError(null);
    if (!pw) {
      setLoginError('Enter the counter password.');
      return;
    }
    sessionStorage.setItem(KITCHEN_PASS_STORAGE_KEY, pw);
    setUi('loading');
    getSocket().emit('counter:auth', { password: pw });
  }, [passwordInput]);

  const openPayModal = useCallback((order: KitchenOrder) => {
    setPayModalOrder(order);
    setPhone('');
    setPayStatus('idle');
    setPayError(null);
  }, []);

  const submitPayment = useCallback(() => {
    if (!payModalOrder || phone.trim().length < 10) return;
    setPayStatus('sending');
    setPayError(null);
    getSocket().emit('order:pay', { orderId: payModalOrder.id, phone: phone.trim() });
  }, [payModalOrder, phone]);

  const closePayModal = useCallback(() => {
    if (payStatus === 'sending') return;
    setPayModalOrder(null);
    setPhone('');
    setPayStatus('idle');
    setPayError(null);
  }, [payStatus]);

  const closeReceipt = useCallback(() => setReceipt(null), []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(KITCHEN_PASS_STORAGE_KEY);
    disconnectSocket();
    setOrders([]);
    setUi('login');
    setPasswordInput('');
    setLoginError(null);
    setPayModalOrder(null);
    setReceipt(null);
  }, []);

  // ─── Login screen ───
  if (ui === 'login') {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500/90">Staff only</p>
          <h1 className="mt-3 text-2xl font-bold">Counter dashboard</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Process payments, send STK pushes, and clear tables.
          </p>
          <div className="mt-10 space-y-4">
            <input
              type="password"
              autoComplete="off"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              placeholder="Counter password"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            {loginError && <p className="text-sm text-red-400">{loginError}</p>}
            <button
              type="button"
              onClick={login}
              className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-neutral-950 hover:bg-amber-400"
            >
              Unlock counter
            </button>
            <p className="text-center text-xs text-neutral-500">
              Demo password:{' '}
              <span className="font-mono text-neutral-300">{DEMO_KITCHEN_PASSWORD}</span>
            </p>
          </div>
          <Link className="mt-10 text-center text-sm text-amber-400 hover:text-amber-300" to="/">
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  // ─── Loading screen ───
  if (ui === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <p>Connecting to counter hub…</p>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/95 px-4 py-4 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Counter</h1>
            <p className="text-sm text-neutral-400">
              {orders.filter((o) => o.status === 'ready').length} ready ·{' '}
              {orders.filter((o) => o.status === 'pending').length} in kitchen ·{' '}
              {orders.length} total
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-white/5"
            >
              Log out
            </button>
            <Link
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-white/5"
              to="/kitchen"
            >
              Kitchen
            </Link>
            <Link
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-white/5"
              to="/"
            >
              Site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-neutral-900/50 py-24 text-center text-neutral-500">
            No pending orders — waiting for kitchen tickets.
          </div>
        ) : (
          <ul className="grid gap-5 lg:grid-cols-2">
            {[...orders].sort((a, b) => (a.status === 'ready' ? 0 : 1) - (b.status === 'ready' ? 0 : 1)).map((o) => (
              <li
                key={o.id}
                className={`rounded-3xl border bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 shadow-xl ${
                  o.status === 'ready'
                    ? 'border-emerald-500/30'
                    : 'border-amber-500/20'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-500/90">Table</p>
                    <p className="text-3xl font-bold text-white">{o.tableId}</p>
                  </div>
                  <div className="text-right">
                    {o.status === 'ready' ? (
                      <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                        Ready
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
                        In kitchen
                      </span>
                    )}
                    <p className="mt-2 text-xs text-neutral-500">Received</p>
                    <p className="font-mono text-sm text-neutral-300">
                      {new Date(o.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-amber-400">KES {orderTotal(o)}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-3">
                  {o.items.map((i) => {
                    const menuItem = menuItemById(i.menuItemId);
                    return (
                      <li key={`${o.id}-${i.menuItemId}-${i.name}`} className="flex items-center gap-3">
                        {menuItem?.thumbnail ? (
                          <img
                            src={menuItem.thumbnail}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 shrink-0 rounded-lg bg-neutral-800" />
                        )}
                        <div className="flex-1 text-sm">
                          <p className="font-medium text-white">
                            {i.qty}× {i.name}
                          </p>
                          <p className="text-neutral-400">KES {i.price * i.qty}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {o.note ? (
                  <p className="mt-4 rounded-xl bg-black/35 px-3 py-2 text-sm text-neutral-300">
                    <span className="font-medium text-neutral-400">Note: </span>
                    {o.note}
                  </p>
                ) : null}
                {o.status === 'ready' ? (
                  <button
                    type="button"
                    className="mt-6 w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-neutral-950 transition hover:bg-amber-400"
                    onClick={() => openPayModal(o)}
                  >
                    Send STK push & pay
                  </button>
                ) : (
                  <div className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-center text-sm font-medium text-neutral-400">
                    Waiting for kitchen…
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ─── Payment modal ─── */}
      {payModalOrder ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePayModal();
          }}
        >
          <div
            className="flex max-h-[min(92vh,640px)] w-full max-w-md flex-col rounded-3xl border border-white/15 bg-neutral-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pay-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 id="pay-modal-title" className="text-lg font-bold text-white">
                  Process payment
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Table {payModalOrder.tableId} · KES{' '}
                  {payModalOrder.items.reduce((s, i) => s + i.price * i.qty, 0)}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={closePayModal}
                className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
                disabled={payStatus === 'sending'}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {payStatus === 'sent' ? (
              <div className="px-5 py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-emerald-400">STK Push sent!</p>
                <p className="mt-2 text-sm text-neutral-400">
                  Customer will receive an M-Pesa prompt on {phone}.
                </p>
              </div>
            ) : (
              <div className="px-5 py-5">
                <label className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Customer phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500/40"
                  disabled={payStatus === 'sending'}
                />
                {payError && <p className="mt-3 text-sm text-red-400">{payError}</p>}
                <button
                  type="button"
                  disabled={phone.trim().length < 10 || payStatus === 'sending'}
                  onClick={submitPayment}
                  className="mt-5 w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {payStatus === 'sending' ? 'Sending STK push…' : 'Send STK push & pay'}
                </button>
                <p className="mt-3 text-center text-xs text-neutral-500">
                  Customer confirms on their phone, then service is cleared.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* ─── Receipt modal ─── */}
      {receipt ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeReceipt();
          }}
        >
          <div
            className="flex max-h-[min(92vh,700px)] w-full max-w-md flex-col rounded-3xl border border-white/15 bg-neutral-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 id="receipt-title" className="text-lg font-bold text-white">Receipt</h2>
              <button
                type="button"
                aria-label="Close receipt"
                onClick={closeReceipt}
                className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto px-5 py-5">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-center">
                  <p className="text-xl font-bold text-amber-400">DRIP BURGERS</p>
                  <p className="mt-1 text-xs text-neutral-500">Payment Receipt</p>
                </div>

                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Receipt ID</span>
                    <span className="font-mono text-xs text-neutral-300">{receipt.receiptId.slice(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Table</span>
                    <span className="font-semibold text-white">{receipt.tableId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Phone</span>
                    <span className="text-neutral-300">{receipt.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">STK Ref</span>
                    <span className="font-mono text-xs text-neutral-300">{receipt.stkId.slice(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Paid at</span>
                    <span className="text-neutral-300">
                      {new Date(receipt.paidAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Items</p>
                  <ul className="mt-2 space-y-2">
                    {receipt.items.map((i) => (
                      <li key={`${receipt.receiptId}-${i.menuItemId}`} className="flex items-center justify-between text-sm">
                        <span className="text-neutral-300">
                          {i.qty}× {i.name}
                        </span>
                        <span className="text-neutral-400">KES {i.price * i.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {receipt.note ? (
                  <p className="mt-3 rounded-xl bg-black/25 px-3 py-2 text-xs text-neutral-400">
                    Note: {receipt.note}
                  </p>
                ) : null}

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-semibold text-white">Total paid</span>
                  <span className="text-xl font-bold text-amber-400">KES {receipt.total}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={closeReceipt}
                className="w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-neutral-950 transition hover:bg-amber-400"
              >
                Done — clear table
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
