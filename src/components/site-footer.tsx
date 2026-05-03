import React from 'react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-14 text-neutral-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-lg font-semibold text-white">Drip Burgers</p>
          <p className="mt-2 text-sm leading-relaxed">
            Table ordering powered by QR — chefs see every ticket live. Ask staff for wifi if you scan in-house.
          </p>
          <Link
            to="/kitchen"
            className="mt-4 inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
          >
            Kitchen dashboard (staff) →
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/90">Locations</p>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed">
            <p className="text-white/90">
              📍 Nairobi: Parklands 0751000100 | Karen 0750000200 | Lavington 0752000100 | Msa Rd 0750000100 |
              Kilimani 0751000020
            </p>
            <p className="text-white/90">📍 Mombasa: Nyali Ratna Sq 0796001001</p>
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/90">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="/#menu" className="hover:text-white">
                Full menu
              </a>
            </li>
            <li>
              <Link className="hover:text-white" to="/contact">
                Contact & feedback
              </Link>
            </li>
            <li>
              <span className="text-neutral-600">© {new Date().getFullYear()} Drip Burgers</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
