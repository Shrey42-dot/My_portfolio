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
      <div
        className="w-full h-[80vh] border border-gray-800 rounded-lg overflow-hidden bg-white"
        onContextMenu={(e) => e.preventDefault()}
      >
        <object
          data="/assets/aktu-results.pdf#toolbar=0&navpanes=0"
          type="application/pdf"
          className="w-full h-full"
        >
          <p>
            Your browser does not support PDFs.{" "}
            <a href="/assets/aktu-results.pdf">Download the PDF</a>.
          </p>
        </object>
      </div>
    </section>
  );
}
