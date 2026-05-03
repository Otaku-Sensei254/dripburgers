import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { menuByCategory, MenuItem, menuItemById } from '../data/menu';
import { CartLine } from '../types/order';
import { getSocket } from '../lib/socket';

function lineKey(menuItemId: string) {
  return menuItemId;
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function TableOrderPage() {
  const { tableId } = useParams<{ tableId: string }>();
  const decodedTable = decodeURIComponent(tableId || '').trim();

  const [cartById, setCartById] = useState<Record<string, CartLine>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [lastError, setLastError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const lines = useMemo(() => Object.values(cartById), [cartById]);
  const linesLength = lines.length;
  const itemCount = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const groupedMenu = menuByCategory();

  useEffect(() => {
    if (linesLength > 0) {
      setStatus((prev) => (prev === 'sent' ? 'idle' : prev));
      setLastError(null);
      setSuccessBanner(false);
    }
  }, [linesLength]);

  useEffect(() => {
    if (!cartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setCartOpen(false);
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  const addItem = useCallback((item: MenuItem) => {
    setCartById((prev) => {
      const key = lineKey(item.id);
      const cur = prev[key];
      const nextQty = (cur?.qty ?? 0) + 1;
      return {
        ...prev,
        [key]: { menuItemId: item.id, name: item.name, price: item.price, qty: nextQty },
      };
    });
  }, []);

  const decItem = useCallback((menuItemId: string) => {
    setCartById((prev) => {
      const key = lineKey(menuItemId);
      const cur = prev[key];
      if (!cur) return prev;
      if (cur.qty <= 1) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { ...cur, qty: cur.qty - 1 } };
    });
  }, []);

  const removeLine = useCallback((menuItemId: string) => {
    setCartById((prev) => {
      const next = { ...prev };
      delete next[lineKey(menuItemId)];
      return next;
    });
  }, []);

  const submit = useCallback(() => {
    if (!decodedTable || lines.length === 0) return;
    setLastError(null);
    setStatus('sending');

    const s = getSocket();
    let finished = false;

    const t = window.setTimeout(() => {
      finishError(
        'No response from orders server — run `npm run server` or `npm run dev` (port 4000).',
      );
    }, 8000);

    function cleanup() {
      clearTimeout(t);
      s.off('order:submitted', onSubmitted);
      s.off('order:error', onErr);
    }

    function finishError(message: string) {
      if (finished) return;
      finished = true;
      cleanup();
      setStatus('error');
      setLastError(message);
    }

    function finishOk() {
      if (finished) return;
      finished = true;
      cleanup();
      setStatus('sent');
      setCartById({});
      setNote('');
      setCartOpen(false);
      setSuccessBanner(true);
    }

    function onSubmitted() {
      finishOk();
    }

    function onErr(payload?: unknown) {
      finishError(typeof payload === 'string' ? payload : 'Could not submit order.');
    }

    s.on('order:submitted', onSubmitted);
    s.on('order:error', onErr);

    s.emit('order:submit', {
      tableId: decodedTable,
      items: lines.map((l) => ({
        menuItemId: l.menuItemId,
        name: l.name,
        price: l.price,
        qty: l.qty,
      })),
      note,
    });
  }, [decodedTable, lines, note]);

  if (!decodedTable) {
    return (
      <div className="min-h-screen bg-neutral-950 px-4 py-20 text-white">
        <p>Invalid table link.</p>
        <Link className="mt-4 inline-block text-amber-400" to="/">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/95 px-4 py-4 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-500/90">Live order · guest</p>
            <h1 className="text-xl font-bold md:text-2xl">
              Table <span className="text-amber-400">{decodedTable}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ''}`}
              onClick={() => setCartOpen(true)}
              className="relative rounded-full border border-white/15 p-3 text-neutral-200 transition hover:border-amber-500/40 hover:text-amber-400"
            >
              <CartIcon />
              {itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold leading-none text-neutral-950">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              ) : null}
            </button>
            <Link
              to="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-neutral-300 hover:border-white/30"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {successBanner ? (
        <div className="border-b border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-200 md:px-6">
          <span>Order confirmed — heading to the kitchen.</span>{' '}
          <button
            type="button"
            className="ml-2 font-semibold underline underline-offset-2 hover:text-white"
            onClick={() => setSuccessBanner(false)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <p className="mb-6 text-sm text-neutral-400">
          Tap <span className="font-medium text-amber-400/90">Add to cart</span>, then open the cart to review and
          send your order.
        </p>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {['All', ...Object.keys(groupedMenu)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? 'border-amber-500 bg-amber-500 text-neutral-950'
                  : 'border-white/15 text-neutral-300 hover:border-amber-500/40 hover:text-amber-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {Object.entries(groupedMenu)
            .filter(([category]) => activeCategory === 'All' || category === activeCategory)
            .map(([category, items]) => (
            <section key={category}>
              <h2 className="border-b border-white/10 pb-2 text-lg font-semibold">{category}</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const line = cartById[lineKey(item.id)];
                  return (
                    <li
                      key={item.id}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 transition hover:border-amber-500/30 hover:bg-neutral-900"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt=""
                          loading="lazy"
                          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-amber-400 backdrop-blur">
                          KES {item.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{item.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          {line ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                aria-label="Decrease quantity in cart"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-lg transition hover:bg-white/10"
                                onClick={() => decItem(item.id)}
                              >
                                −
                              </button>
                              <span className="w-6 text-center font-semibold">{line.qty}</span>
                              <button
                                type="button"
                                aria-label="Increase quantity in cart"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-lg transition hover:bg-white/10"
                                onClick={() => addItem(item)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addItem(item)}
                              className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
                            >
                              Add to cart
                            </button>
                          )}
                          {line && (
                            <span className="text-sm text-amber-400">{line.qty} in cart</span>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* Cart modal */}
      {cartOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCartOpen(false);
          }}
        >
          <div
            className="flex max-h-[min(92vh,640px)] w-full max-w-md flex-col rounded-3xl border border-white/15 bg-neutral-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 id="cart-modal-title" className="text-lg font-bold text-white">
                  Your cart
                </h2>
                <p className="mt-1 text-xs text-neutral-500">Table {decodedTable}</p>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {linesLength === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-neutral-500">
                Your cart is empty. Add dishes from the menu, then confirm here.
              </div>
            ) : (
              <>
                <ul className="min-h-0 flex-1 space-y-3 overflow-auto px-5 py-4">
                  {lines.map((l) => {
                    const thumb = menuItemById(l.menuItemId)?.thumbnail;
                    return (
                      <li
                        key={l.menuItemId}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-3"
                      >
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-14 w-14 shrink-0 rounded-lg bg-white/10" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{l.name}</p>
                          <p className="text-sm text-neutral-500">
                            KES {l.price} each ·{' '}
                            <span className="text-neutral-300">Line KES {l.price * l.qty}</span>
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              aria-label={`Decrease ${l.name}`}
                              className="h-9 w-9 rounded-lg border border-white/15 text-lg leading-none hover:bg-white/10"
                              onClick={() => decItem(l.menuItemId)}
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{l.qty}</span>
                            <button
                              type="button"
                              aria-label={`Increase ${l.name}`}
                              className="h-9 w-9 rounded-lg border border-white/15 text-lg leading-none hover:bg-white/10"
                              onClick={() => {
                                const m = menuItemById(l.menuItemId);
                                if (m) addItem(m);
                              }}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className="ml-auto text-xs font-semibold uppercase tracking-wide text-red-400/90 hover:text-red-300"
                              onClick={() => removeLine(l.menuItemId)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-white/10 px-5 py-4">
                  <label className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Note to kitchen
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-amber-500/40"
                    placeholder="Allergies, spice level…"
                  />
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                    <span className="text-neutral-400">Total</span>
                    <span className="text-xl font-bold text-amber-400">KES {total}</span>
                  </div>
                  {lastError ? <p className="mt-3 text-sm text-red-400">{lastError}</p> : null}
                  <button
                    type="button"
                    disabled={status === 'sending'}
                    onClick={() => submit()}
                    className="mt-4 w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Sending…' : 'Confirm & send to kitchen'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
