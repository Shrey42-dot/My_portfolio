"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      targetX.current = event.clientX;
      targetY.current = event.clientY;
    };

    const tick = () => {
      const ease = 0.16;
      currentX.current += (targetX.current - currentX.current) * ease;
      currentY.current += (targetY.current - currentY.current) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/70 bg-cyan-300/20 shadow-[0_0_15px_rgba(34,211,238,0.9)] md:block"
      aria-hidden="true"
    />
  );
}
