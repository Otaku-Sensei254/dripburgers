import React from 'react';
import { SiteNav } from './site-nav';
import { SiteFooter } from './site-footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
