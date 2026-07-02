import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { getSocket, disconnectSocket } from '../lib/socket';
import { KitchenOrder } from '../types/order';
import { DEMO_KITCHEN_PASSWORD, KITCHEN_PASS_STORAGE_KEY } from '../constants/kitchen-auth';
import { menuItemById } from '../data/menu';

type UiState = 'login' | 'loading' | 'dash';

const TABLE_SLUGS = [...Array.from({ length: 12 }, (_, i) => String(i + 1)), 'VIP-A'];

function orderTotal(o: KitchenOrder) {
  return o.items.reduce((s, i) => s + i.price * i.qty, 0);
}

export function KitchenPage() {
  const hasStoredPwOnFirstRender =
    typeof window !== 'undefined' && !!sessionStorage.getItem(KITCHEN_PASS_STORAGE_KEY);

  const [ui, setUi] = useState<UiState>(() => (hasStoredPwOnFirstRender ? 'loading' : 'login'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [tab, setTab] = useState<'orders' | 'qr'>('orders');

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const qrTargets = useMemo(
    () => TABLE_SLUGS.map((slug) => ({ slug, url: `${origin}/table/${encodeURIComponent(slug)}` })),
    [origin],
  );

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

    const authIfStored = () => {
      const pw = sessionStorage.getItem(KITCHEN_PASS_STORAGE_KEY);
      if (pw) s.emit('kitchen:auth', { password: pw });
    };

    s.on('orders:sync', onOrders);
    s.on('kitchen:authenticated', onAuthed);
    s.on('kitchen:auth:error', onAuthErr);
    s.on('connect', authIfStored);

    authIfStored();

    return () => {
      s.off('orders:sync', onOrders);
      s.off('kitchen:authenticated', onAuthed);
      s.off('kitchen:auth:error', onAuthErr);
      s.off('connect', authIfStored);
    };
  }, []);

  const login = useCallback(() => {
    const pw = passwordInput.trim();
    setLoginError(null);
    if (!pw) {
      setLoginError('Enter the kitchen password.');
      return;
    }
    sessionStorage.setItem(KITCHEN_PASS_STORAGE_KEY, pw);
    setUi('loading');
    getSocket().emit('kitchen:auth', { password: pw });
  }, [passwordInput]);

  const completeOrder = useCallback((orderId: string) => {
    getSocket().emit('order:complete', { orderId });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(KITCHEN_PASS_STORAGE_KEY);
    disconnectSocket();
    setOrders([]);
    setUi('login');
    setPasswordInput('');
    setTab('orders');
    setLoginError(null);
  }, []);

  if (ui === 'login') {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500/90">Staff only</p>
          <h1 className="mt-3 text-2xl font-bold">Kitchen dashboard</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Signed-in devices see live table tickets. Guests never need this URL.
          </p>

          <div className="mt-10 space-y-4">
            <input
              type="password"
              autoComplete="off"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              placeholder="Kitchen password"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            {loginError && <p className="text-sm text-red-400">{loginError}</p>}
            <button
              type="button"
              onClick={login}
              className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-neutral-950 hover:bg-amber-400"
            >
              Unlock kitchen
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

  if (ui === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <p>Connecting to kitchen hub…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/95 px-4 py-4 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Kitchen pass</h1>
            <p className="text-sm text-neutral-400">{orders.length} active ticket(s)</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('orders')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === 'orders' ? 'bg-amber-500 text-neutral-950' : 'bg-white/10 text-neutral-300'
              }`}
            >
              Orders
            </button>
            <button
              type="button"
              onClick={() => setTab('qr')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === 'qr' ? 'bg-amber-500 text-neutral-950' : 'bg-white/10 text-neutral-300'
              }`}
            >
              Table QR stickers
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-white/5"
            >
              Log out
            </button>
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
        {tab === 'qr' ? (
          <div>
            <p className="max-w-xl text-neutral-400">
              Print or screenshot each sticker; guests scan to open ordering for that table. URLs use your
              current origin (<span className="font-mono text-neutral-300">{origin}</span>).
            </p>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {qrTargets.map(({ slug, url }) => (
                <li
                  key={slug}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-neutral-900/60 p-5"
                >
                  <p className="mb-3 text-sm font-semibold text-amber-400">Table {slug}</p>
                  <QRCodeSVG value={url} size={160} level="M" bgColor="#0a0a0a" fgColor="#fbbf24" />
                  <p className="mt-3 break-all text-center text-[11px] text-neutral-500">{url}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-neutral-900/50 py-24 text-center text-neutral-500">
            No active orders — waiting for QR guests.
          </div>
        ) : (
          <ul className="grid gap-5 lg:grid-cols-2">
            {[...orders].sort((a, b) => (a.status === 'ready' ? 1 : 0) - (b.status === 'ready' ? 1 : 0)).map((o) => (
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
                    <p className="text-xs text-neutral-500">Received</p>
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
                  <div className="mt-6 w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-3.5 text-center text-sm font-semibold text-emerald-400">
                    Ready for counter pickup
                  </div>
                ) : (
                  <button
                    type="button"
                    className="mt-6 w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-500"
                    onClick={() => completeOrder(o.id)}
                  >
                    Mark done
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
