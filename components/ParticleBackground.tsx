"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

export default function ParticleBackground() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      particles: {
        color: { value: ["#22d3ee", "#22c55e"] },
        links: {
          color: "#334155",
          distance: 130,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: false,
          speed: 0.45,
          straight: false,
        },
        number: {
          density: { enable: true, area: 900 },
          value: 55,
        },
        opacity: {
          value: 0.45,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2.8 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["grab", "repulse"],
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 165,
            links: { opacity: 0.45 },
          },
          repulse: {
            distance: 90,
            duration: 0.25,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!isReady) return null;

  return (
    <Particles
      id="particle-background"
      options={options}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
