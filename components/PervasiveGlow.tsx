"use client";

import { useEffect, useRef } from "react";

export default function PervasiveGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${event.clientX}px ${event.clientY}px, rgba(34,211,238,0.06), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[40] hidden transition-opacity duration-300 md:block"
      style={{
        background: `radial-gradient(600px circle at -100px -100px, rgba(34,211,238,0.06), transparent 40%)`,
      }}
      aria-hidden="true"
    />
  );
}
