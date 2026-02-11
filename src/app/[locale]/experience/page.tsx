"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { experiences, type Experience } from "@/data/experience";

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const t = useTranslations("experience");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const isCurrentRole = experience.period.end === null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border-primary" />
      
      <div
        className={`absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 transition-colors duration-300 ${
          isCurrentRole
            ? "bg-text-primary border-text-primary"
            : "bg-bg-primary border-border-secondary group-hover:border-text-primary"
        }`}
      />
      
      {isCurrentRole && (
        <motion.div
          className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-text-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ y: -2 }}
        className="group cursor-pointer p-6 rounded-2xl bg-bg-secondary border border-border-primary transition-all duration-300 hover:border-border-secondary hover:shadow-lg hover:shadow-accent/5"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
              {experience.role}
            </h3>
            <p className="text-text-secondary font-medium">
              {experience.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-tertiary whitespace-nowrap">
              {experience.period.start} — {experience.period.end || t("present")}
            </span>
            {isCurrentRole && (
              <span className="px-2 py-0.5 text-xs font-medium bg-text-primary text-bg-primary rounded-full">
                {t("current")}
              </span>
            )}
          </div>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4">
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium bg-bg-tertiary text-text-secondary rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border-primary">
                <h4 className="text-sm font-semibold text-text-primary mb-3">
                  {t("highlights")}
                </h4>
                <ul className="space-y-2">
                  {experience.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-text-tertiary flex-shrink-0" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 mt-4 text-xs text-text-tertiary">
          <span>{isExpanded ? t("collapse") : t("expand")}</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperiencePage() {
  const t = useTranslations("experience");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <div className="py-8">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          {t("description")}
        </p>
      </motion.div>

      <div className="relative">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.id} experience={experience} index={index} />
        ))}
      </div>
    </div>
  );
}
