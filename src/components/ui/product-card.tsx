"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps {
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export const ProductHighlightCard = React.forwardRef<
  HTMLDivElement,
  ProductHighlightCardProps
>(
  (
    { className, categoryIcon, category, title, description, imageSrc, imageAlt },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 350], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 350], [-10, 10]);

    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 350], [0, 100]);
    const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-[350px] w-[350px] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(20px)", background: "rgba(17,17,17,0.85)", backdropFilter: "blur(16px)" }}
          className="absolute inset-4 rounded-xl shadow-inner border border-[rgba(255,255,255,0.06)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] rounded-xl" />

          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(80px at ${glowX}% ${glowY}%, #C8102E, transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <div className="flex items-center space-x-2">
              {categoryIcon}
              <span className="text-sm font-medium" style={{ color: "#C8102E", fontFamily: "var(--font-dm-sans)" }}>{category}</span>
            </div>

            <div>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-barlow-condensed)", color: "#F5F0E8" }}>{title}</h2>
              <p className="mt-2 text-xs max-w-[70%]" style={{ color: "#4A4A4A", fontFamily: "var(--font-dm-sans)" }}>
                {description}
              </p>
            </div>
          </div>

          <motion.img
            src={imageSrc}
            alt={imageAlt}
            style={{ transform: "translateZ(50px)" }}
            whileHover={{ scale: 1.1, y: -20 }}
            className="absolute -right-12 -bottom-12 h-56 w-56 object-contain"
          />
        </div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
