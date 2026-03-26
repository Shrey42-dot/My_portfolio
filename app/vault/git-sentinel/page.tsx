"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const GITHUB_URL = "https://github.com/Shrey42-dot/git_sentinel";

const techStack = ["Python", "Regex", "DevSecOps"];

type LineTone = "default" | "danger" | "success";

type LineSpec = { text: string; tone: LineTone };

const CLEAN_SCRIPT: LineSpec[] = [
  { text: '> git commit -m "fix: correct typo in readme"', tone: "default" },
  { text: "", tone: "default" },
  { text: "[Git-Sentinel] Intercepting commit...", tone: "default" },
  { text: "", tone: "default" },
  { text: "[Git-Sentinel] Scanning staged files...", tone: "default" },
  { text: "", tone: "default" },
  {
    text: "[Git-Sentinel] ✅ Clean. Proceeding with commit...",
    tone: "success",
  },
  { text: "", tone: "default" },
  {
    text: "[main a1b2c3d] fix: correct typo in readme",
    tone: "default",
  },
];

const SECRET_SCRIPT: LineSpec[] = [
  {
    text: '> git commit -m "feat: add stripe payment integration"',
    tone: "default",
  },
  { text: "", tone: "default" },
  { text: "[Git-Sentinel] Intercepting commit...", tone: "default" },
  { text: "", tone: "default" },
  { text: "[Git-Sentinel] Scanning staged files...", tone: "default" },
  { text: "", tone: "default" },
  {
    text: "[Git-Sentinel] ❌ ALERT: Potential secret detected in src/payment.js!",
    tone: "danger",
  },
  { text: "", tone: "default" },
  {
    text: "[Git-Sentinel] Secret Type: Stripe Live Key (sk_live_...)",
    tone: "danger",
  },
  { text: "", tone: "default" },
  {
    text: "[Git-Sentinel] COMMIT BLOCKED. Please remove the secret and try again. Exit Code 1.",
    tone: "danger",
  },
];

const CHAR_DELAY_MS = 10;
const LINE_PAUSE_MS = 160;

function lineToneClass(tone: LineTone) {
  switch (tone) {
    case "danger":
      return "text-red-400";
    case "success":
      return "text-emerald-400";
    default:
      return "text-green-400";
  }
}

function GitSentinelTerminal() {
  const [linesDone, setLinesDone] = useState<LineSpec[]>([]);
  const [partial, setPartial] = useState<{ text: string; tone: LineTone }>({
    text: "",
    tone: "default",
  });
  const [isRunning, setIsRunning] = useState(false);
  const runIdRef = useRef(0);

  const runSimulation = useCallback((script: LineSpec[]) => {
    const id = Date.now();
    runIdRef.current = id;
    setLinesDone([]);
    setPartial({ text: "", tone: "default" });
    setIsRunning(true);

    let li = 0;
    let ci = 0;

    const step = () => {
      if (runIdRef.current !== id) return;
      if (li >= script.length) {
        setPartial({ text: "", tone: "default" });
        setIsRunning(false);
        return;
      }
      const spec = script[li];
      if (ci < spec.text.length) {
        ci += 1;
        setLinesDone(script.slice(0, li).map((s) => ({ ...s })));
        setPartial({
          text: spec.text.slice(0, ci),
          tone: spec.tone,
        });
        setTimeout(step, CHAR_DELAY_MS);
      } else {
        setLinesDone(script.slice(0, li + 1).map((s) => ({ ...s })));
        setPartial({ text: "", tone: "default" });
        li += 1;
        ci = 0;
        setTimeout(step, LINE_PAUSE_MS);
      }
    };

    step();
  }, []);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-zinc-700 shadow-[0_0_40px_-28px_rgba(34,211,238,0.9)]">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-3 py-2">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-xs text-zinc-400">
            dev@repo:~/git-sentinel
          </span>
          <span className="w-12" />
        </div>
        <div className="min-h-[300px] bg-black p-4 font-mono text-sm leading-relaxed md:min-h-[340px] md:p-5">
          <div className="space-y-0.5">
            {linesDone.map((line, i) => (
              <div key={`line-${i}`} className={lineToneClass(line.tone)}>
                {line.text || "\u00a0"}
              </div>
            ))}
            {partial.text ? (
              <div className={lineToneClass(partial.tone)}>
                {partial.text}
                {isRunning && (
                  <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-current align-middle opacity-80" />
                )}
              </div>
            ) : isRunning ? (
              <span className="inline-block h-4 w-2 animate-pulse bg-green-400 align-middle" />
            ) : (
              <span className="text-zinc-600">$ </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation(CLEAN_SCRIPT)}
          className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-mono text-sm text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Simulate Clean Commit ]
        </button>
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation(SECRET_SCRIPT)}
          className="rounded-md border border-red-500/45 bg-red-500/10 px-4 py-2 font-mono text-sm text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Simulate Secret Leak ]
        </button>
      </div>
    </div>
  );
}

export default function GitSentinelPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Project Deep Dive
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Git-Sentinel 🔐
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Lightweight Pre-Commit Security Scanner
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            View GitHub
          </Link>
          <Link
            href="/vault"
            className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Back to Vault
          </Link>
        </div>
      </div>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">Why Git-Sentinel?</h2>
        <p className="mt-3 leading-7 text-zinc-300">
          Accidentally committing secrets is a costly mistake—exposure in git
          history is hard to undo. Git-Sentinel solves this for teams and solo
          developers where heavy enterprise secret-scanning suites are overkill
          or too noisy for day-to-day workflows.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
          <li>
            <span className="font-mono text-green-400">Zero Noise</span> —
            scans only{" "}
            <span className="font-mono text-cyan-300">git diff --cached</span>{" "}
            (staged changes), not your entire tree every time.
          </li>
          <li>
            <span className="font-mono text-green-400">Dev-Friendly</span> —
            fast feedback at commit time, right where mistakes happen.
          </li>
          <li>
            <span className="font-mono text-green-400">Built for Reality</span>{" "}
            — works in Windows / Git Bash / VS Code workflows and fits CI/CD
            pipelines.
          </li>
        </ul>
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-green-300">Key Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Smart Scanning</li>
            <li>
              Regex Detection (AWS, Stripe, Generic Auth patterns, and more)
            </li>
            <li>Hard Block — unsafe commits don&apos;t land in history</li>
            <li>Explicit Bypass — controlled escape hatch when truly needed</li>
            <li>One-Step Setup — minimal ceremony to adopt</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">How It Works</h2>
          <ol className="mt-3 list-decimal space-y-3 pl-5 text-zinc-300">
            <li>
              <span className="font-semibold text-zinc-200">The Trigger:</span>{" "}
              You run{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-cyan-300">
                git commit -m &quot;...&quot;
              </code>
              .
            </li>
            <li>
              <span className="font-semibold text-zinc-200">The Scan:</span>{" "}
              Git-Sentinel intercepts the hook and runs a regex scan on staged
              changes.
            </li>
            <li>
              <span className="font-semibold text-zinc-200">The Verdict:</span>{" "}
              <span className="text-emerald-400">✅ Clean</span> (commit
              proceeds) or{" "}
              <span className="text-red-400">❌ Secret Found</span> (commit
              blocked, report displayed).
            </li>
          </ol>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">Installation</h2>
          <p className="mt-3 text-zinc-400">Prerequisites</p>
          <ul className="mt-2 list-disc pl-5 text-zinc-300">
            <li>Python 3.6+</li>
            <li>Git</li>
          </ul>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-green-400">
            python install.py
          </pre>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-amber-300/90">
            Intentional Bypass
          </h2>
          <p className="mt-3 leading-7 text-zinc-300">
            Rare operational scenarios may require a deliberate bypass. Use
            only when you understand the risk.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-xs leading-6 text-zinc-200 sm:text-sm">
            {`GIT_SENTINEL_BYPASS=I_UNDERSTAND_THE_RISK git commit -m "your message"`}
          </pre>
          <div className="mt-4 rounded-lg border border-amber-500/35 bg-amber-500/5 px-3 py-2.5">
            <p className="font-mono text-xs leading-relaxed text-amber-200/95">
              [NOTE] This flow is designed to be non-interactive and CI-safe—no
              prompts that hang automation.
            </p>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6">
        <h2 className="font-mono text-xl text-red-400">Security Disclaimer</h2>
        <p className="mt-3 leading-7 text-zinc-300">
          Git-Sentinel is a <strong className="text-zinc-200">preventive</strong>{" "}
          tool at commit time. It is{" "}
          <strong className="text-zinc-200">not</strong> a replacement for
          secret rotation, enterprise secret managers, or comprehensive
          server-side / repository scanning.
        </p>
      </article>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">Live Demo Simulation</h2>
        <p className="mt-2 text-zinc-400">
          See how commits are intercepted—clean paths vs. blocked secret
          detections.
        </p>
        <div className="mt-6 space-y-5">
          <div
            className="rounded-r-lg border border-zinc-800 border-l-4 border-l-cyan-500 bg-zinc-900 px-4 py-3 shadow-sm"
            role="note"
          >
            <p className="font-mono text-sm leading-relaxed text-zinc-300">
              &gt; SYSTEM NOTICE: This interface is currently a simulation
              demonstrating the expected output of the analysis pipeline. To
              execute the live machine learning model, please download the
              working tool from GitHub. Full browser-based execution is coming
              soon.
            </p>
          </div>
          <GitSentinelTerminal />
        </div>
      </article>
    </section>
  );
}
