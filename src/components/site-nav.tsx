import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function navClass(isActive: boolean) {
  return `text-sm font-medium transition hover:text-amber-400 ${
    isActive ? 'text-amber-400' : 'text-neutral-400'
  }`;
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-white">
          Drip<span className="text-amber-400"> Burgers</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-5 md:gap-8">
          <NavLink className={({ isActive }) => navClass(isActive)} end to="/">
            Home
          </NavLink>
          <a className="hidden text-sm font-medium text-neutral-400 transition hover:text-amber-400 sm:inline" href="/#menu">
            Menu
          </a>
          <NavLink className={({ isActive }) => navClass(isActive)} to="/contact">
            Contact
          </NavLink>
          <NavLink className={({ isActive }) => navClass(isActive)} to="/kitchen">
            Kitchen
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
