import ScrollReveal from "../../components/ScrollReveal";

export default function LogsPage() {
  return (
    <section className="space-y-8">
      <ScrollReveal>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,0.9)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
          Experience Logs
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Research, Training & Technical Growth
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
          A chronological timeline of hands-on research participation,
          industry-aligned training, and ongoing AI/ML + cybersecurity
          development.
        </p>
      </div>
      </ScrollReveal>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
        <div className="relative space-y-10 border-l-2 border-cyan-400/50 pl-7">
          <ScrollReveal>
          <div className="relative">
            <span className="absolute -left-[2.15rem] top-1 h-4 w-4 rounded-full border-2 border-cyan-300 bg-zinc-950 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
              Internships &amp; Training
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
              Google Cloud
            </h2>
            <p className="mt-1 font-mono text-sm text-green-400">
              GenAI Exchange Program Participant
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              Completed intensive Generative AI training. Earned multiple
              Google Cloud Skill Badges and deployed ML applications using
              Vertex AI.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal>
          <div className="relative">
            <span className="absolute -left-[2.15rem] top-1 h-4 w-4 rounded-full border-2 border-cyan-300 bg-zinc-950 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
            <h2 className="text-2xl font-semibold text-zinc-100">PyNet Labs</h2>
            <p className="mt-1 font-mono text-sm text-green-400">
              Azure AI with Python Training
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              Successfully completed 40 hours of intensive training focused on
              building and deploying AI models on Microsoft Azure using Python.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal>
          <div className="relative">
            <span className="absolute -left-[2.15rem] top-1 h-4 w-4 rounded-full border-2 border-cyan-300 bg-zinc-950 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
              Research Experience
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
              COGITO Research Group
            </h2>
            <p className="mt-1 font-mono text-sm text-green-400">
              Undergraduate Researcher - R&amp;D Cell
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              Selected as a member of the departmental research cell focused on
              AI, Machine Learning, and Data Science. Participating in
              faculty-guided research seminars and collaborative technical
              discussions.
            </p>
            <div className="mt-4 inline-flex animate-pulse items-center rounded-md border border-green-400/40 bg-green-500/10 px-4 py-2 font-mono text-sm text-green-300">
              Research Papers Under Development - Coming Soon...
            </div>
          </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
        <p className="mt-10 font-mono text-sm text-zinc-500">
          &gt; Awaiting new logs... (More Experiences Coming Soon).
        </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
