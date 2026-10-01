"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ThreeDTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export function ThreeDTiltCard({
  children,
  className,
  maxTilt = 12,
  scale = 1.02,
  ...props
}: ThreeDTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
    setGlareStyle({ opacity: 0.25, x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={cn("relative overflow-hidden rounded-3xl group cursor-pointer", className)}
      {...props}
    >
      {/* Glare Lighting Reflection Overlay */}
      <div
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(242, 102, 10, 0.4) 0%, rgba(250, 204, 21, 0.15) 35%, transparent 70%)`,
          transition: "opacity 0.3s ease-out",
        }}
        className="absolute inset-0 pointer-events-none z-20 rounded-3xl"
      />

      {children}
    </div>
  );
}
