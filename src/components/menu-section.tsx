import React from 'react';
import { menuByCategory, CATEGORY_NOTES } from '../data/menu';

type MenuSectionProps = {
  showOrderHint?: boolean;
};

export function MenuSection({ showOrderHint = true }: MenuSectionProps) {
  const grouped = menuByCategory();

  return (
    <section id="menu" className="scroll-mt-20 border-t border-white/5 bg-neutral-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-amber-400/90">The menu</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Burgers, pizza, choma, chips & drinks
          </h2>
          <p className="mt-4 text-neutral-400">
             When you are seated, scan your table QR to send an order straight to the kitchen.
          </p>
          {showOrderHint && (
            <p className="mt-2 text-sm text-amber-400/80">
              Tip: open any demo table link from the home hero to build a live cart.
            </p>
          )}
        </div>

        <div className="mt-14 space-y-16">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">{category}</h3>
              {CATEGORY_NOTES[category] && (
                <p className="mt-2 text-sm text-amber-400/80">{CATEGORY_NOTES[category]}</p>
              )}
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-amber-500/30"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      loading="lazy"
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-medium text-white">{item.name}</p>
                        <span className="shrink-0 text-sm font-semibold text-amber-400">
                          KES {item.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
