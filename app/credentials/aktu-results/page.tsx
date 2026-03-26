"use client";

import Image from "next/image";

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
        className="relative w-full h-[80vh] border border-gray-800 rounded-lg overflow-hidden bg-zinc-950"
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image
          src="/assets/aktu-results.jpg"
          alt="AKTU Results"
          fill
          className="object-contain"
          draggable={false}
        />
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    </section>
  );
}
