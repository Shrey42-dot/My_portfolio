"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const GITHUB_URL = "https://github.com/Shrey42-dot/aura-process-guardian";

const techStack = ["Python", "psutil", "matplotlib", "Statistics (Z-Score)"];

type LineTone = "default" | "success" | "info" | "warning" | "danger" | "alert";

type LineSpec = { text: string; tone: LineTone };

const LEARN_SCRIPT: LineSpec[] = [
  { text: '> python run_guardian.py --mode learn --target node', tone: "default" },
  { text: "", tone: "default" },
  { text: "[INIT] Aura Process Guardian started. Target: 'node'", tone: "info" },
  { text: "[LEARN] Gathering baseline telemetry (60 seconds)...", tone: "info" },
  { text: "[DATA] PID 4092: CPU 1.2% | MEM 45MB", tone: "info" },
  { text: "[DATA] PID 4092: CPU 1.5% | MEM 45MB", tone: "info" },
  { text: "[DATA] PID 4092: CPU 1.1% | MEM 46MB", tone: "info" },
  { text: "[SUCCESS] Baseline established. Mean CPU: 1.26%, StdDev: 0.15", tone: "success" },
];

const GUARD_SCRIPT: LineSpec[] = [
  { text: '> python run_guardian.py --mode guard --target node', tone: "default" },
  { text: "", tone: "default" },
  { text: "[GUARD] Monitoring 'node' against established baseline...", tone: "info" },
  { text: "[OK] PID 4092: CPU 1.3% (Z-Score: 0.26)", tone: "success" },
  { text: "[OK] PID 4092: CPU 1.4% (Z-Score: 0.93)", tone: "success" },
  { text: "[WARN] PID 4092: CPU 8.5% (Z-Score: 48.2) - Spike detected!", tone: "warning" },
  { text: "[WARN] PID 4092: CPU 85.0% (Z-Score: 558.2) - Sustained spike!", tone: "warning" },
  { text: "[ALERT] 🚨 CRITICAL ANOMALY DETECTED. Process 'node' is exhibiting runaway thread behavior.", tone: "danger" },
  { text: "[ACTION] Logging forensic data to CSV and triggering Guardian countermeasures...", tone: "alert" },
];

const CHAR_DELAY_MS = 10;
const LINE_PAUSE_MS = 160;

function lineToneClass(tone: LineTone) {
  switch (tone) {
    case "success":
      return "text-emerald-400";
    case "info":
      return "text-cyan-400";
    case "warning":
      return "text-amber-400";
    case "danger":
      return "text-red-500 font-bold";
    case "alert":
      return "text-amber-500 font-bold";
    default:
      return "text-zinc-300";
  }
}

function TerminalSim() {
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
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <span className="font-mono text-xs text-zinc-400">
            dev@repo:~/aura-process-guardian
          </span>
          <span className="w-12" />
        </div>
        <div className="min-h-[300px] bg-black p-4 font-mono text-sm leading-relaxed md:min-h-[340px] md:p-5 overflow-x-auto">
          <div className="space-y-0.5 whitespace-pre">
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
              <span className="inline-block h-4 w-2 animate-pulse bg-cyan-400 align-middle" />
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
          onClick={() => runSimulation(LEARN_SCRIPT)}
          className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-sm text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Simulate Baseline Learning ]
        </button>
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation(GUARD_SCRIPT)}
          className="rounded-md border border-amber-500/45 bg-amber-500/10 px-4 py-2 font-mono text-sm text-amber-300 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Simulate Anomaly Detection ]
        </button>
      </div>
    </div>
  );
}

export default function AuraProcessGuardianPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Project Deep Dive
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Aura Process Guardian 🛡️
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Unsupervised OS-Level Anomaly Detector
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

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-cyan-500/30 transition-colors">
          <h2 className="font-mono text-xl text-cyan-300">The Problem</h2>
          <p className="mt-3 leading-7 text-zinc-300">
            Standard monitors show what is happening, but not if a spike is normal or a sign of a leak/runaway thread. A process jumping from 1% to 90% CPU isn&apos;t flagged by standard tools if the system isn&apos;t crashing.
          </p>
        </article>
        
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-cyan-500/30 transition-colors">
          <h2 className="font-mono text-xl text-emerald-300">The Core Idea</h2>
          <p className="mt-3 leading-7 text-zinc-300">
            Performs unsupervised anomaly detection locally by:
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-zinc-300">
            <li>Learning a baseline of &apos;normal&apos; behavior</li>
            <li>Comparing live usage</li>
            <li>Flagging sustained statistical deviations using Z-scores.</li>
          </ol>
          <p className="mt-3 leading-7 text-zinc-300 italic">No ML frameworks, fully explainable.</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">Key Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li><span className="font-mono text-emerald-400">Real-time Monitoring</span></li>
            <li><span className="font-mono text-emerald-400">Process Protection</span> (&apos;Guardian Mode&apos;)</li>
            <li><span className="font-mono text-emerald-400">Auto-Healing</span></li>
            <li><span className="font-mono text-emerald-400">Visual Dashboard</span></li>
            <li><span className="font-mono text-emerald-400">Logging &amp; Alerts</span></li>
          </ul>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">Future Improvements</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Command-line flags</li>
            <li>Adaptive/rolling baselines</li>
            <li>System tray integration</li>
            <li>Container-aware monitoring</li>
            <li>Prometheus/Grafana exporter</li>
          </ul>
        </article>
      </div>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">How to Run</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-emerald-400">
          pip install psutil matplotlib{"\n"}
          python run_guardian.py
        </pre>
      </article>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">Live Demo Simulation</h2>
        <div className="mt-6 space-y-5">
          <div
            className="rounded-r-lg border border-zinc-800 border-l-4 border-l-cyan-500 bg-zinc-900 px-4 py-3 shadow-sm"
            role="note"
          >
            <p className="font-mono text-sm leading-relaxed text-zinc-300">
              &gt; SYSTEM NOTICE: This interface is currently a frontend simulation of the local OS monitoring tool. It demonstrates the expected behavior during baseline learning and anomaly detection.
            </p>
          </div>
          <TerminalSim />
        </div>
      </article>
    </section>
  );
}
