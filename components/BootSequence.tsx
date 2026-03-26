"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "[OK] Recommencing Secure Session (tty1)...",
  "[OK] Decrypting User Profile: Shrey Pandey",
  "[OK] Initializing Bio-Sentinel Core (AI Inference Engine)...",
  "[OK] Mounting Cryptographic Volumes...",
  "[OK] Checking Zero-Knowledge Architecture integrity...",
  "[OK] Finalizing UI Layer (Hacker/Terminal Theme)...",
  "[COMPLETED] Session Established. Awaiting User Input.",
];

export default function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Check if already booted in this session to prevent re-running on refresh
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsBooting(false);
      setIsRendered(false);
      return;
    }

    sessionStorage.setItem("hasBooted", "true");

    let currentLine = 0;
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    const interval = setInterval(() => {
      if (currentLine < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[currentLine]]);
      }
      currentLine++;

      if (currentLine >= BOOT_LINES.length) {
        clearInterval(interval);
        timeout1 = setTimeout(() => {
          setIsBooting(false);
          timeout2 = setTimeout(() => setIsRendered(false), 500); // 500ms animation exit duration
        }, 400);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  if (!isRendered) return null;

  const shatterVariants = {
    top: {
      initial: { y: 0, rotateZ: 0, scale: 1, opacity: 1 },
      exit: { y: "-60vh", rotateZ: -10, scale: 0.8, opacity: 0, transition: { duration: 0.5, ease: "easeIn" as const } }
    },
    right: {
      initial: { x: 0, rotateZ: 0, scale: 1, opacity: 1 },
      exit: { x: "60vw", rotateZ: 10, scale: 0.8, opacity: 0, transition: { duration: 0.5, ease: "easeIn" as const } }
    },
    bottom: {
      initial: { y: 0, rotateZ: 0, scale: 1, opacity: 1 },
      exit: { y: "60vh", rotateZ: 10, scale: 0.8, opacity: 0, transition: { duration: 0.5, ease: "easeIn" as const } }
    },
    left: {
      initial: { x: 0, rotateZ: 0, scale: 1, opacity: 1 },
      exit: { x: "-60vw", rotateZ: -10, scale: 0.8, opacity: 0, transition: { duration: 0.5, ease: "easeIn" as const } }
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {isBooting && (
          <>
            {/* The shatter glass black background panel fragments */}
            <motion.div
              key="bg-top"
              variants={shatterVariants.top}
              initial="initial"
              exit="exit"
              className="absolute inset-0 z-0 bg-black origin-bottom"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)", borderBottom: "1px solid rgba(0,0,0,0)" }}
            />
            <motion.div
              key="bg-right"
              variants={shatterVariants.right}
              initial="initial"
              exit="exit"
              className="absolute inset-0 z-0 bg-black origin-left"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
            />
            <motion.div
              key="bg-bottom"
              variants={shatterVariants.bottom}
              initial="initial"
              exit="exit"
              className="absolute inset-0 z-0 bg-black origin-top"
              style={{ clipPath: "polygon(100% 100%, 0 100%, 50% 50%)" }}
            />
            <motion.div
              key="bg-left"
              variants={shatterVariants.left}
              initial="initial"
              exit="exit"
              className="absolute inset-0 z-0 bg-black origin-right"
              style={{ clipPath: "polygon(0 100%, 0 0, 50% 50%)" }}
            />

            {/* The Stationary Boot Text Layer */}
            <motion.div
              key="text-layer"
              exit={{ opacity: 0, scale: 1.05, filter: "blur(2px)", transition: { duration: 0.5, ease: "easeOut" } }}
              className="absolute inset-0 z-10 flex flex-col p-4 font-mono text-xs text-green-500 sm:p-8 sm:text-sm"
            >
              <div className="flex-1 space-y-2">
                {lines.map((line, i) => {
                  if (!line) return null;
                  return (
                    <div key={i}>
                      {line?.startsWith?.("[COMPLETED]") ? (
                        <span className="text-cyan-400">{line}</span>
                      ) : (
                        line
                      )}
                    </div>
                  );
                })}
                {isBooting && (
                  <div className="mt-2 inline-block h-4 w-2 animate-pulse bg-green-500 align-middle" />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
