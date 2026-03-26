"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const GITHUB_URL = "https://github.com/Shrey42-dot/shadow-pixel";

const techStack = ["Python", "OpenCV", "Cryptography"];

type LineTone = "default" | "success" | "info" | "warning";

type LineSpec = { text: string; tone: LineTone };

const ENCODE_SCRIPT: LineSpec[] = [
  { text: '> python shadow_pixel.py encode --image cover.png --text "Target acquired." --out secret.png', tone: "default" },
  { text: "", tone: "default" },
  { text: "[*] Initializing Shadow-Pixel engine...", tone: "info" },
  { text: "", tone: "default" },
  { text: "[*] Encrypting payload with AES-256...", tone: "info" },
  { text: "", tone: "default" },
  { text: "[*] Analyzing image capacity (cover.png)...", tone: "info" },
  { text: "", tone: "default" },
  { text: "[*] Injecting encrypted bits into LSB...", tone: "info" },
  { text: "", tone: "default" },
  { text: "[SUCCESS] Payload hidden successfully in secret.png", tone: "success" },
];

const DECODE_SCRIPT: LineSpec[] = [
  { text: '> python shadow_pixel.py decode --image secret.png', tone: "default" },
  { text: "", tone: "default" },
  { text: "[*] Extracting LSB data from secret.png...", tone: "info" },
  { text: "", tone: "default" },
  { text: "[*] Attempting AES-256 decryption...", tone: "info" },
  { text: "", tone: "default" },
  { text: '[SUCCESS] Hidden Message: "Target acquired."', tone: "success" },
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
      return "text-yellow-400";
    default:
      return "text-green-400";
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
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-xs text-zinc-400">
            dev@repo:~/shadow-pixel
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
          onClick={() => runSimulation(ENCODE_SCRIPT)}
          className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-sm text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Simulate Encode ]
        </button>
        <button
          type="button"
          disabled={isRunning}
          onClick={() => runSimulation(DECODE_SCRIPT)}
          className="rounded-md border border-emerald-500/45 bg-emerald-500/10 px-4 py-2 font-mono text-sm text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          [ Simulate Decode ]
        </button>
      </div>
    </div>
  );
}

export default function ShadowPixelPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Project Deep Dive
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Shadow-Pixel 🕵️‍♂️
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Invisible LSB Image Steganography
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
        <h2 className="font-mono text-xl text-cyan-300">About</h2>
        <p className="mt-3 leading-7 text-zinc-300">
          A secure steganography tool that hides encrypted payloads within the Least Significant Bits (LSB) of image pixels, making the altered image visually identical to the original.
        </p>
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-emerald-300">Key Features</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li><span className="font-mono text-cyan-300">AES-256 Encryption</span> — payloads are fully encrypted before being embedded into the image.</li>
            <li><span className="font-mono text-cyan-300">Password protection</span> — secure your hidden data reliably.</li>
            <li><span className="font-mono text-cyan-300">High-capacity payload handling</span> — efficient bit allocation to store larger messages without degradation.</li>
            <li><span className="font-mono text-cyan-300">Zero visual distortion</span> — changes to the LSB are entirely imperceptible to the human eye.</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">Installation &amp; Usage</h2>
          <p className="mt-3 text-zinc-400">Environment Setup</p>
          <pre className="mt-2 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-emerald-400">
            python -m venv venv{"\n"}
            source venv/bin/activate{"\n"}
            pip install -r requirements.txt
          </pre>
          <p className="mt-4 text-zinc-400">Command Pipeline</p>
          <pre className="mt-2 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-emerald-400">
            python shadow_pixel.py encode --image in.png ...{"\n"}
            python shadow_pixel.py decode --image out.png
          </pre>
        </article>
      </div>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="font-mono text-xl text-cyan-300">Live Demo Simulation</h2>
        <div className="mt-6 space-y-5">
          <div
            className="rounded-r-lg border border-zinc-800 border-l-4 border-l-cyan-500 bg-zinc-900 px-4 py-3 shadow-sm"
            role="note"
          >
            <p className="font-mono text-sm leading-relaxed text-zinc-300">
              &gt; SYSTEM NOTICE: This interface is currently a frontend simulation demonstrating the CLI pipeline of Shadow-Pixel.
            </p>
          </div>
          <TerminalSim />
        </div>
      </article>
    </section>
  );
}
