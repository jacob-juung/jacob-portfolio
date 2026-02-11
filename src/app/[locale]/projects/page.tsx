"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { projects, projectCategories, type Project, type ProjectCategory } from "@/data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    active: "bg-green-500/10 text-green-600 dark:text-green-400",
    exited: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    completed: "bg-text-tertiary/10 text-text-tertiary",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full p-6 rounded-2xl bg-bg-secondary border border-border-primary transition-all duration-300 hover:border-border-secondary hover:shadow-lg hover:shadow-accent/5"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-tertiary hover:text-text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-sm text-text-tertiary">{project.year}</p>
          </div>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
            {t(`status.${project.status}`)}
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, isExpanded ? undefined : 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-bg-tertiary text-text-tertiary rounded-full"
            >
              {tag}
            </span>
          ))}
          {!isExpanded && project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-medium text-text-tertiary">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && project.highlights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border-primary">
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
                  {t("highlights")}
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-text-tertiary flex-shrink-0" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {project.highlights && project.highlights.length > 0 && (
          <div className="flex items-center gap-1 mt-3 text-xs text-text-tertiary">
            <span>{isExpanded ? t("collapse") : t("expand")}</span>
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: ProjectCategory | "all";
  onSelect: (category: ProjectCategory | "all") => void;
}) {
  const t = useTranslations("projects");

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
          selected === "all"
            ? "bg-text-primary text-bg-primary"
            : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
        }`}
      >
        {t("filter.all")}
      </button>
      {projectCategories.map(({ key }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            selected === key
              ? "bg-text-primary text-bg-primary"
              : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
          }`}
        >
          {t(`categories.${key}`)}
        </button>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-8">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary leading-relaxed max-w-2xl mb-6">
          {t("description")}
        </p>

        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-text-tertiary py-12"
        >
          {t("empty")}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t border-border-primary"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: projects.length, label: t("stats.totalProjects") },
            { value: projects.filter(p => p.status === "active").length, label: t("stats.activeProjects") },
            { value: projects.filter(p => p.status === "exited").length, label: t("stats.exits") },
            { value: projects.filter(p => p.category === "investment").length, label: t("stats.investments") },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-tertiary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
