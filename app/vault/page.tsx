"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { projects } from "./projects";
import ScrollReveal from "../../components/ScrollReveal";

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const divRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <article
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/55 p-6 shadow-[0_0_40px_-34px_rgba(34,211,238,1)] md:p-7"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-2xl font-semibold text-zinc-100">
            {project.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.slug}-${tag}`}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3 text-zinc-300">
          {project.description.map((paragraph) => (
            <p key={`${project.slug}-${paragraph}`} className="leading-7">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-mono text-sm text-cyan-300">Key Features</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            {project.features.map((feature) => (
              <li key={`${project.slug}-${feature}`}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            View GitHub
          </Link>
          <Link
            href={`/vault/${project.slug}`}
            className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            {project.slug === "flood-prediction"
              ? "Details"
              : "Deep Dive & Demo"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function VaultPage() {
  return (
    <section className="space-y-8">
      <ScrollReveal>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-30px_rgba(34,211,238,0.9)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
          Project Intelligence Vault
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Applied AI/ML + Cybersecurity Systems
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
          A curated archive of production-oriented projects spanning malware
          analysis, secure communication, DevSecOps automation, steganography,
          process anomaly detection, and environmental ML forecasting.
        </p>
      </div>
      </ScrollReveal>

      <div className="space-y-6">
        {projects.map((project) => (
          <ScrollReveal key={project.slug}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
