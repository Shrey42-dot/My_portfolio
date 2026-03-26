"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import TypewriterEffect from "../components/TypewriterEffect";
import ScrollReveal from "../components/ScrollReveal";

const NeuralSkillWeb = dynamic(() => import("../components/NeuralSkillWeb"), {
  ssr: false,
});

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="grid items-center gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_40px_-28px_rgba(34,211,238,0.8)] md:grid-cols-[300px_1fr] md:p-8">
        <ScrollReveal>
        <div className="mx-auto">
          <Image
            src="/assets/profile.jpeg"
            width={300}
            height={300}
            alt="Shrey Pandey"
            className="rounded-xl border border-zinc-700 object-cover"
            priority
          />
        </div>
        </ScrollReveal>

        <div className="space-y-5 text-center md:text-left">
          <ScrollReveal>
            <div>
              <p className="font-mono text-sm tracking-wider text-cyan-300">
                SYSTEM ONLINE
              </p>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold leading-tight text-zinc-100 sm:text-4xl">
                  Hi, I&apos;m Shrey Pandey.
                </h1>
                <div className="text-xl font-medium text-zinc-200 sm:text-2xl">
                  <TypewriterEffect
                    strings={[
                      "Security Researcher",
                      "AI & ML Enthusiast",
                      "Fullstack Developer",
                    ]}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-2 text-zinc-300">
            <p>
              Email:{" "}
              <a
                href="mailto:shrey42pandey@gmail.com"
                className="text-cyan-300 underline-offset-4 hover:underline"
              >
                shrey42pandey@gmail.com
              </a>
            </p>
            <p className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="https://github.com/Shrey42-dot"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-cyan-300 transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/shrey-pandey-"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-cyan-300 transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                LinkedIn
              </Link>
            </p>
          </div>
          </ScrollReveal>
          <ScrollReveal>
          <div className="pt-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              Quick Highlights
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-300">
                &gt; GATE &apos;26 Qualified (AIR 21,846)
              </span>
              <span className="rounded-full border border-green-500/35 bg-green-500/10 px-3 py-1.5 font-mono text-xs text-green-300">
                &gt; B.Tech CSE (AI &amp; ML) | SGPA: 7.1/10
              </span>
              <span className="rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-300">
                &gt; Google Cloud GenAI Exchange Alumni
              </span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
        <h2 className="mb-5 font-mono text-xl text-cyan-300">About Me</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4 shadow-[0_0_30px_-28px_rgba(34,211,238,1)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
              Core Focus
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              My passion lies at the intersection of AI and Cybersecurity. I
              specialize in building offline malware analysis tools,
              zero-knowledge architectures, and secure automation scripts.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4 shadow-[0_0_30px_-28px_rgba(34,211,238,1)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-300">
              Current Work
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              I am currently focused on DevSecOps, explainable AI for threat
              detection, and optimizing Biometric Inference Models in my
              project <span className="text-cyan-300">Bio-Sentinel-Core</span>.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4 shadow-[0_0_30px_-28px_rgba(34,211,238,1)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
              Learning &amp; Knowledge
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              I am currently deep-diving into Adversarial Machine Learning,
              Advanced Malware Analysis, and working on research papers with
              the COGITO group.
            </p>
          </article>
        </div>
      </div>
      </ScrollReveal>

      <ScrollReveal>
      <div className="mt-32 min-h-[70vh] w-full pb-20">
        <h2 className="mb-10 font-mono text-xl text-cyan-400">
          &gt; CLASSIFIED_SKILLS_GRAPH.bin
        </h2>
        <NeuralSkillWeb />
      </div>
      </ScrollReveal>
    </section>
  );
}
