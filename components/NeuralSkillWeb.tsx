"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ForceGraph2D from "react-force-graph-2d";

const data = {
  nodes: [
    { id: "Python" },
    { id: "Scikit-learn", link: "/vault/byte-brain" },
    { id: "PEfile", link: "/vault/byte-brain" },
    { id: "Cryptography", link: "/vault/shadow-pixel" },
    { id: "AES-256", link: "/vault/shadow-pixel" },
    { id: "DevSecOps", link: "/vault/git-sentinel" },
    { id: "Regex", link: "/vault/git-sentinel" },
    { id: "psutil", link: "/vault/aura-process-guardian" },
    { id: "Z-Score Stats", link: "/vault/aura-process-guardian" },
    { id: "Kali Linux" },
  ].map(node => ({
    ...node,
    x: (Math.random() - 0.5) * 1000,
    y: (Math.random() - 0.5) * 1000,
  })),
  links: [
    { source: "Python", target: "Scikit-learn" },
    { source: "Python", target: "PEfile" },
    { source: "Python", target: "psutil" },
    { source: "DevSecOps", target: "Regex" },
    { source: "DevSecOps", target: "psutil" },
    { source: "Cryptography", target: "AES-256" },
    { source: "Kali Linux", target: "DevSecOps" },
    { source: "Kali Linux", target: "PEfile" },
    { source: "Z-Score Stats", target: "psutil" },
    { source: "Python", target: "Cryptography" },
  ],
};

export default function NeuralSkillWeb() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [pulseNodeId, setPulseNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setDimensions({
        width: entries[0].contentRect.width,
        height: 600, // increased to 600px
      });
    });
    observer.observe(containerRef.current);
    
    // Physics engine adjustments
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-500);
      fgRef.current.d3Force("link").distance(120);
    }
    
    // Zoom to fit after settling
    const timeoutMsg = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 50);
      }
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutMsg);
    };
  }, []);

  const handleNodeClick = useCallback(
    (node: any) => {
      if (node.id === "Python") {
        router.push("/vault/flood-prediction");
      } else if (node.id === "Kali Linux") {
        router.push("/vault/byte-brain");
      } else if (node.link) {
        router.push(node.link);
      } else {
        setPulseNodeId(node.id);
        setTimeout(() => setPulseNodeId(null), 400);
      }
    },
    [router]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-1 shadow-[0_0_30px_-30px_rgba(34,211,238,0.8)] overflow-hidden h-[600px]"
    >
      <div className="absolute top-5 left-6 right-6 z-10 pointer-events-none">
        <h2 className="font-mono text-xl text-cyan-300">Neural Skill Web</h2>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Interactive Node Web — Scroll to Zoom — Drag to Pan/Move
        </p>
      </div>
      {/* We add a div to fix an issue where react-force-graph doesn't play perfectly with ResizeObserver immediately */}
      <div style={{ width: dimensions.width - 2, height: dimensions.height }}>
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width - 2}
          height={dimensions.height}
          graphData={data}
          nodeLabel=""
          nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
            const isHovered = node === hoveredNode;
            const isPulsing = node.id === pulseNodeId;

            // Draw node glow/dots
            ctx.beginPath();
            const radius = isPulsing ? 18 : isHovered ? 12 : 8;
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = isHovered || isPulsing ? "#4ade80" : "#22d3ee";
            ctx.shadowColor = isHovered || isPulsing ? "#4ade80" : "#22d3ee";
            ctx.shadowBlur = isPulsing ? 30 : 15;
            ctx.fill();

            // Draw Text
            ctx.shadowBlur = 0; // reset
            const fontSize = 18 / Math.max(1, globalScale * 0.8);
            ctx.font = `${fontSize}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            
            // Render text positioned slightly below the node for absolute readability
            // We increase the offset below the node so the larger text doesn't overlap the glow
            const textY = node.y + radius + 12;
            const width = ctx.measureText(node.id).width;
            ctx.fillStyle = "rgba(24, 24, 27, 0.8)";
            ctx.fillRect(node.x - width / 2 - 4, textY - 2, width + 8, fontSize + 4);
            
            ctx.fillStyle = isHovered ? "#f4f4f5" : "#a1a1aa";
            ctx.fillText(node.id, node.x, textY);
          }}
          linkColor={() => "#3f3f46"}
          linkWidth={1.5}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          onNodeHover={(node) => setHoveredNode(node)}
          onNodeClick={handleNodeClick}
          backgroundColor="transparent"
          warmupTicks={100} // Pre-calculate layout so it's stable visually
          cooldownTicks={0} // Stop simulation early for stability if desired, but default is fine
        />
      </div>
      {/* Interactive indicator for nodes with links */}
      <style dangerouslySetInnerHTML={{__html: `
        .force-graph-container canvas {
          cursor: ${(hoveredNode?.link || hoveredNode?.id === 'Python' || hoveredNode?.id === 'Kali Linux') ? 'pointer' : hoveredNode ? 'grab' : 'default'} !important;
        }
      `}} />
    </div>
  );
}
