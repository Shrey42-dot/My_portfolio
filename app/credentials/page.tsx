"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedAssetViewer from "../components/ProtectedAssetViewer";
import ScrollReveal from "../../components/ScrollReveal";

const credentials = [
  {
    category: "Google Cloud",
    items: [
      { title: "GenAI Academy", src: "/assets/gen-ai-academy.png" },
      {
        title: "Build Real World AI Apps",
        src: "/assets/gcp-build-ai-apps.png",
      },
      {
        title: "Develop GenAI Apps",
        src: "/assets/gcp-streamlit-apps.png",
      },
      {
        title: "Inspect Rich Documents",
        src: "/assets/gcp-inspect-docs.png",
      },
      { title: "Explore GenAI", src: "/assets/gcp-explore-genai.png" },
      { title: "Prompt Design", src: "/assets/gcp-prompt-design.png" },
    ],
  },
  {
    category: "NPTEL",
    items: [
      { title: "Joy of Computing using Python", src: "/assets/nptel-python.jpg" },
      { title: "Data Analytics", src: "/assets/nptel-data-analytics.jpg" },
      { title: "Intro to IoT", src: "/assets/nptel-iot.jpg" },
    ],
  },
  {
    category: "Infosys",
    items: [
      { title: "Cyber Security", src: "/assets/infosys-cyber-sec.jpg" },
      { title: "Fundamentals of ML", src: "/assets/infosys-ml_page.jpg" },
    ],
  },
  {
    category: "Other Achievements",
    items: [
      { title: "ISRO Hackathon", src: "/assets/isro-hackathon.png" },
      { title: "PyNetLabs Azure AI", src: "/assets/pynet-azure.jpg" },
      { title: "GeeksforGeeks MongoDB", src: "/assets/gfg-mongodb.jpg" },
    ],
  },
];

export default function CredentialsPage() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section className="space-y-8">
      <ScrollReveal>
      <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-zinc-900/70 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
          Academic Records
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-100">
          Credentials Vault
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Verified certifications, coursework, and achievements across cloud,
          AI/ML, and cybersecurity learning tracks.
        </p>
        <Link
          href="/credentials/aktu-results"
          className="mt-5 inline-block rounded-md border border-cyan-400/60 bg-cyan-500/10 px-5 py-2.5 font-mono text-sm text-cyan-300 transition hover:bg-cyan-500/20"
        >
          View AKTU Academic Results
        </Link>
      </div>
      </ScrollReveal>

      {credentials.map((group) => (
        <section
          key={group.category}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
        >
          <ScrollReveal>
            <h2 className="font-mono text-xl text-cyan-300">{group.category}</h2>
          </ScrollReveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <ScrollReveal key={`${group.category}-${item.title}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedCert(item.src)}
                  className="cursor-pointer"
                >
                  <ProtectedAssetViewer
                    title={item.title}
                    src={item.src}
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      ))}

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 md:backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[85vw] overflow-hidden rounded-xl border border-cyan-500/30 bg-zinc-950 shadow-2xl shadow-cyan-900/50"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
                className="absolute right-4 top-4 z-[250] pointer-events-auto cursor-pointer flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-2 text-cyan-300 transition hover:bg-black/80 hover:text-cyan-100"
              >
                ✕
              </button>
              <div className="relative h-[80vh] w-[80vw] max-w-5xl">
                <Image
                  src={selectedCert}
                  alt="Certificate Enlarge"
                  fill
                  className="pointer-events-none select-none object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
