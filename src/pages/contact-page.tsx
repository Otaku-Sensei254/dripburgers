import React, { useState } from 'react';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-xl px-4 md:px-6">
        <h1 className="text-3xl font-bold text-white">Contact us</h1>
        <p className="mt-4 text-neutral-400">
          Catering, feedback, or franchise questions — leave a note and we will route it to the right branch
          (demo form only; nothing is stored).
        </p>

        {sent ? (
          <p className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-200">
            Thanks — your message would be sent in a production build. For now, call any Nairobi or Mombasa line
            in the footer.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-amber-500/40 focus:ring-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-amber-500/40 focus:ring-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-neutral-300">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-amber-500/40 focus:ring-2"
                defaultValue="general"
              >
                <option value="general">General</option>
                <option value="catering">Catering / events</option>
                <option value="order">Issue with an order</option>
              </select>
            </div>
            <div>
              <label htmlFor="msg" className="block text-sm font-medium text-neutral-300">
                Message
              </label>
              <textarea
                id="msg"
                name="msg"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-amber-500/40 focus:ring-2"
                placeholder="Tell us more…"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
