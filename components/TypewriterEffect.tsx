"use client";

import Typewriter from "typewriter-effect";

type TypewriterEffectProps = {
  strings: string[];
};

export default function TypewriterEffect({ strings }: TypewriterEffectProps) {
  return (
    <span className="font-mono">
      <Typewriter
        component="span"
        options={{
          strings,
          autoStart: true,
          loop: true,
          delay: 40,
          deleteSpeed: 24,
          cursor: '<span class="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">|</span>',
          wrapperClassName: "text-cyan-300",
        }}
      />
    </span>
  );
}
