"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const GITHUB_URL = "https://github.com/Shrey42-dot/Byte-Brain";

const techStack = [
  "Python",
  "Scikit-learn",
  "PEfile",
  "Kali Linux",
  "VirtualBox",
];

const PROJECT_TREE = `byte-brain/
├── byte_brain/
│   └── __main__.py        # CLI Entry Point
├── extractor/
│   └── feature_extractor.py # Custom PE feature extraction
├── model/
│   ├── byte_brain_rf.joblib    # Serialized Random Forest model
│   └── infer.py                # Inference engine
└── samples/                    # Safe PE samples`;

const DEMO_LINES = [
  "> ./byte-brain samples/benign/strings64.exe",
  "",
  "Scanning: samples/benign/strings64.exe",
  "",
  "[*] Loading model artifacts...",
  "",
  "[*] Extracting features...",
  "",
  "[*] Applying feature selector...",
  "",
  "[*] Running inference...",
  "",
  "=== RESULT ===",
  "",
  "Prediction   : BENIGN",
  "",
  "Malware Prob.: 0.3567",
  "",
  "Threat Level : MEDIUM",
  "",
  "=== CONFIDENCE EXPLANATION ===",
  "",
  "Mixed characteristics: some suspicious indicators but insufficient for malware classification",
  "",
  "- Suspicious imports detected (1)",
];

const UPLOAD_PREFIX = [
  "> System prompt: File upload disabled in web demo mode. Running safe demo file instead...",
  "",
];

const CHAR_DELAY_MS = 12;
const LINE_PAUSE_MS = 180;

function ByteBrainTerminal() {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const runIdRef = useRef(0);

  const runSimulation = useCallback((mode: "demo" | "upload") => {
    const id = Date.now();
    runIdRef.current = id;
    setOutput("");
    setIsRunning(true);

    const lines =
      mode === "upload" ? [...UPLOAD_PREFIX, ...DEMO_LINES] : DEMO_LINES;

    let li = 0;
    let ci = 0;

    const step = () => {
      if (runIdRef.current !== id) return;
      if (li >= lines.length) {
        setIsRunning(false);
        return;
      }
      const ln = lines[li];
      if (ci < ln.length) {
        ci += 1;
        const acc =
          lines
            .slice(0, li)
            .map((l) => l + "\n")
            .join("") + ln.slice(0, ci);
        setOutput(acc);
        setTimeout(step, CHAR_DELAY_MS);
      } else {
        const acc = lines
          .slice(0, li + 1)
          .map((l) => l + "\n")
          .join("");
        setOutput(acc);
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
            kali@byte-brain:~/byte-brain
          </span>
          <span className="w-12" />
        </div>
        <div className="min-h-[320px] bg-black p-4 font-mono text-sm leading-relaxed text-green-400 md:min-h-[380px] md:p-5">
          <pre className="whitespace-pre-wrap break-words">
            {output || "$ "}
            {isRunning && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-green-400/80 align-middle" />
            )}
          </pre>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation("demo")}
          className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 font-mono text-sm text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Run Demo (strings64.exe) ]
        </button>
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation("upload")}
          className="rounded-md border border-green-400/40 bg-green-500/10 px-4 py-2 font-mono text-sm text-green-300 transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Upload Custom .exe ]
        </button>
      </div>
    </div>
  );
}

export default function ByteBrainPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Project Deep Dive
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Byte-Brain 🧠
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Offline Static PE Malware Scanner with Explainable ML
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
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">About</h2>
          <p className="mt-3 leading-7 text-zinc-300">
            A local, privacy-first malware analysis tool for Windows PE files.
            Uses a Random Forest classifier (EMBER-2018) for probability-based
            risk assessments.
          </p>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-green-300">Key Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Zero-Cloud Dependency</li>
            <li>Static PE Analysis</li>
            <li>Explainable Predictions (LOW / MEDIUM / HIGH)</li>
            <li>Batch Intelligence</li>
            <li>Operational Security</li>
          </ul>
        </article>
      </div>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">How It Works</h2>
        <div className="mt-4 space-y-4 text-zinc-300">
          <div>
            <p className="font-mono text-sm text-green-400">&gt; Feature Engineering</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Structural (machine type, sections)
              </li>
              <li>Entropy (detecting packing)</li>
              <li>
                Import signals (suspicious DLLs like{" "}
                <span className="font-mono text-cyan-300">ws2_32.dll</span>)
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-sm text-green-400">
              &gt; Machine Learning Pipeline
            </p>
            <p className="mt-2 leading-7">
              Balanced corpus of 10k EMBER-2018 samples. Random Forest classifier
              achieving ~97% accuracy.
            </p>
          </div>
          <div>
            <p className="font-mono text-sm text-green-400">
              &gt; Future Improvements
            </p>
            <p className="mt-2 leading-7">
              Feature importance visualization, JSON/CSV export, YARA hints,
              ensemble models.
            </p>
          </div>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">Installation</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-green-400">
            {`git clone ${GITHUB_URL}.git
cd Byte-Brain
python3 -m venv bb-env
source bb-env/bin/activate   # Windows: bb-env\\Scripts\\activate
pip install -r requirements.txt`}
          </pre>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">Project Structure</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-6 text-zinc-200">
            {PROJECT_TREE}
          </pre>
        </article>
      </div>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">Example Output</h2>
        <p className="mt-2 text-zinc-400">
          Representative terminal output from a benign sample scan.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-700">
          <Image
            src="/assets/byte-brain-output.png"
            width={800}
            height={600}
            alt="Terminal Output"
            className="h-auto w-full object-cover"
          />
        </div>
      </article>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">Live Demo Simulation</h2>
        <p className="mt-2 text-zinc-400">
          Interactive terminal — run the bundled benign demo or simulate an
          upload (web-safe fallback).
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
          <ByteBrainTerminal />
        </div>
      </article>
    </section>
  );
}
