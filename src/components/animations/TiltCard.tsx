"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getDuration } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

function useTilt<T extends HTMLElement>(maxTilt = 15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const rotateY = (deltaX / 100) * maxTilt;
      const rotateX = -(deltaY / 100) * maxTilt;
      gsap.to(element, {
        rotateX,
        rotateY,
        duration: getDuration(0.3),
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: getDuration(0.5),
        ease: "elastic.out(1, 0.5)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt]);

  return ref;
}

export function TiltCard({ children, className, maxTilt = 15 }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(maxTilt);

  return (
    <div
      ref={ref}
      className={cn("tilt-card", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
