"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Project, projects } from "../projects";

const TYPING_DELAY_MS = 20;

function TerminalSimulator({ project }: { project: Project }) {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setOutput("");
    setIsRunning(false);
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [project.slug]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const runSimulation = () => {
    if (isRunning) return;

    const fullOutput = `${project.demoScript.join("\n")}\n`;
    let cursor = 0;

    setOutput("");
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      cursor += 1;
      setOutput(fullOutput.slice(0, cursor));

      if (cursor >= fullOutput.length && intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
      }
    }, TYPING_DELAY_MS);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-zinc-700 shadow-[0_0_45px_-32px_rgba(34,211,238,1)]">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-xs text-zinc-400">
            shrey@vault:~/{project.slug}
          </span>
          <span className="w-16" />
        </div>

        <div className="min-h-[320px] bg-black p-4 font-mono text-sm leading-7 text-green-400 md:p-6">
          <pre className="whitespace-pre-wrap">
            {output || "# Ready. Click 'Simulate Execution' to start.\n"}
            {isRunning && <span className="animate-pulse">_</span>}
          </pre>
        </div>
      </div>

      <button
        type="button"
        onClick={runSimulation}
        disabled={isRunning}
        className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 font-mono text-sm text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Simulate Execution
      </button>
    </div>
  );
}

export default function ProjectDemoPage() {
  const params = useParams<{ project: string }>();
  const projectSlug = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  const project = useMemo(
    () => projects.find((item) => item.slug === projectSlug),
    [projectSlug],
  );

  if (!project) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h1 className="font-mono text-2xl text-cyan-300">Project Not Found</h1>
        <p className="mt-3 text-zinc-300">
          The requested demo does not exist in the vault.
        </p>
        <Link
          href="/vault"
          className="mt-5 inline-block rounded-md border border-cyan-400/50 px-3 py-2 text-cyan-300 transition hover:bg-cyan-500/10"
        >
          Return to Vault
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Project Deep Dive
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          {project.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={`${project.slug}-tag-${tag}`}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            View GitHub Repository
          </Link>
          <Link
            href="/vault"
            className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Back to Vault
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-mono text-xl text-cyan-300">About the Project</h2>
            <div className="mt-3 space-y-3 text-zinc-300">
              {project.about.map((paragraph) => (
                <p key={`${project.slug}-about-${paragraph}`} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-mono text-xl text-cyan-300">Project Structure</h2>
            {project.projectStructure ? (
              <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-zinc-200">
                {project.projectStructure.join("\n")}
              </pre>
            ) : (
              <p className="mt-3 text-zinc-300">
                Structure details are currently not available.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-mono text-xl text-cyan-300">
              Installation &amp; Usage
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-mono text-sm text-zinc-300">Installation</p>
                <pre className="mt-2 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-green-400">
                  {project.installation.join("\n")}
                </pre>
              </div>
              <div>
                <p className="font-mono text-sm text-zinc-300">Usage</p>
                <pre className="mt-2 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-green-400">
                  {project.usage.join("\n")}
                </pre>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">
            {project.slug === "secure-secrets"
              ? "Working Website"
              : "Live Demo / Interactive Component"}
          </h2>
          <p className="mt-3 text-zinc-300">
            {project.slug === "secure-secrets"
              ? "Experience the zero-knowledge architecture in action. The live application demonstrates client-side AES-GCM encryption and Burn-on-Read functionality."
              : "Interactive terminal simulation mirroring tool behavior."}
          </p>
          <div className="mt-5">
            {project.slug === "secure-secrets" ? (
              <Link
                href="https://secure-secrets.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-cyan-400/50 bg-cyan-500/10 px-5 py-3 font-mono text-sm text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Go to Live Website
              </Link>
            ) : (
              <TerminalSimulator project={project} />
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
