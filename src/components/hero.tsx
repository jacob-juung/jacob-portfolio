"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { HeroContent } from "@/lib/content";

interface HeroProps {
  data: HeroContent;
}

export function Hero({ data }: HeroProps) {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -80]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, y, scale }}
      className="relative min-h-[90vh] flex flex-col justify-center -mx-6 md:-mx-8 px-6 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 via-transparent to-transparent dark:from-bg-secondary/30 pointer-events-none" />
      
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/[0.03] dark:bg-accent/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-accent/[0.02] dark:bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl mx-auto w-full"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-medium tracking-widest uppercase text-text-tertiary mb-6"
        >
          {data.eyebrow}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary mb-4"
        >
          {data.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-medium text-text-secondary mb-6"
        >
          {data.title}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-text-secondary leading-relaxed max-w-xl mb-10"
        >
          {data.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-bg-primary bg-text-primary rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{data.ctaContactLabel}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-text-primary border-2 border-border-secondary rounded-full transition-all duration-300 hover:border-text-primary hover:bg-bg-secondary hover:-translate-y-0.5"
          >
            {data.ctaResumeLabel}
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-tertiary tracking-wider uppercase">
            {t("scroll")}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-border-secondary flex justify-center pt-2"
          >
            <motion.div className="w-1 h-1 bg-text-tertiary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
