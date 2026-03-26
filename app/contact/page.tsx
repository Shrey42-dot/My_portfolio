import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  return (
    <section className="space-y-8">
      <ScrollReveal>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,0.9)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          &gt; SYSTEM.CONTACT_PROTOCOL_INITIATED
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Contact Me
        </h1>
        <a
          href="mailto:contact@shreypandey.com"
          className="mt-4 inline-block text-lg text-cyan-300 underline-offset-4 transition hover:text-cyan-200 hover:underline md:text-xl"
        >
          contact@shreypandey.com
        </a>
      </div>
      </ScrollReveal>

      <ScrollReveal>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-5"
        >
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          <input
            type="hidden"
            name="access_key"
            value="e0302e2d-e290-47cc-b99a-4d0e81167661"
          />

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="font-mono text-sm tracking-wide text-zinc-300"
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 font-mono text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="you@domain.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="font-mono text-sm tracking-wide text-zinc-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 font-mono text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="rounded-md border border-green-400/50 bg-green-500/10 px-5 py-2.5 font-mono text-sm tracking-wide text-green-300 transition hover:bg-green-500/20"
          >
            [ EXECUTE SEND ]
          </button>
        </form>
      </div>
      </ScrollReveal>
    </section>
  );
}
