"use client";

import Image from "next/image";

type ProtectedAssetViewerProps = {
  title: string;
  src: string;
  className?: string;
  heightClassName?: string;
};

export default function ProtectedAssetViewer({
  title,
  src,
  className,
  heightClassName = "h-64",
}: ProtectedAssetViewerProps) {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`rounded-xl border border-zinc-700 bg-zinc-950/70 p-3 ${className ?? ""}`}
    >
      <p className="mb-3 font-mono text-xs tracking-wide text-cyan-300">{title}</p>
      <div
        className={`relative overflow-y-scroll rounded-lg border border-zinc-800 bg-black/40 ${heightClassName}`}
      >
        <Image
          src={src}
          alt={title}
          width={1200}
          height={800}
          className="h-full w-full object-contain"
          draggable={false}
        />
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    </div>
  );
}
