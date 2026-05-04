import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerScroll } from './ui/container-scroll-animation';
import heroImage from '../images/hero.jpg';

const demoTables = ['1', '2', '3', 'VIP-A'];

export function HeroSection() {
  return (
    <section className="flex flex-col overflow-hidden bg-neutral-950 pt-24 pb-20 text-white md:pt-32 dark">
      <ContainerScroll
        titleComponent={
          <>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-amber-400/90">
              Drip Burgers
            </p>
            <h1 className="text-4xl font-semibold text-white">
              Smash burgers, serious flavor <br />
              <span className="mt-1 text-4xl leading-none font-bold md:text-[5.5rem]">
                Sauce that drips.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
              House-ground beef, hot griddled buns, and sauces made in-house. Sit down, scan your table QR,
              and your ticket hits the kitchen in real time.
            </p>
            <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2">
              <span className="w-full text-center text-xs font-medium uppercase tracking-widest text-amber-500/90">
                Demo table links
              </span>
              {demoTables.map((id) => (
                <Link
                  key={id}
                  to={`/table/${encodeURIComponent(id)}`}
                  className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition hover:bg-amber-500/20"
                >
                  Table {id}
                </Link>
              ))}
            </div>
            <p className="mx-auto mt-4 text-center text-sm text-neutral-500">
              <a className="text-amber-400/90 underline underline-offset-2 hover:text-amber-300" href="#menu">
                Browse the menu
              </a>{' '}
              ·{' '}
              <Link className="text-amber-400/90 underline underline-offset-2 hover:text-amber-300" to="/contact">
                Contact us
              </Link>
            </p>
          </>
        }
      >
        <img
          src={heroImage}
          alt="Juicy smashed burger stacked with melted cheese and signature sauce"
          width={1400}
          height={720}
          className="mx-auto h-full w-full rounded-2xl object-cover object-center"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
