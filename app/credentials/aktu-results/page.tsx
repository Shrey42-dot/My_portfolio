"use client";

export default function AktuResultsPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h1 className="font-mono text-2xl text-cyan-300">AKTU Results</h1>
        <p className="mt-3 text-zinc-300">
          Protected in-browser academic results viewer.
        </p>
      </div>
      <iframe
        src="https://docs.google.com/gview?url=https://shreypandey.tech/aktu-results.pdf&embedded=true"
        className="w-full h-[800px] md:h-screen rounded-lg border border-zinc-700 overflow-hidden"
      />
    </section>
  );
}
