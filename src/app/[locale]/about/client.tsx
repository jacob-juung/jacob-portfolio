"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import type { AboutContent } from "@/lib/content";

interface Props {
  data: AboutContent;
}

export function AboutClient({ data }: Props) {
  const t = useTranslations("about");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

   return (
     <motion.div
       variants={containerVariants}
       initial={false}
       animate="visible"
       className="space-y-16 py-8"
     >
      <section className="grid md:grid-cols-[200px_1fr] gap-10 items-start">
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="w-40 h-40 md:w-full md:h-auto md:aspect-square rounded-2xl bg-gradient-to-br from-bg-tertiary to-bg-secondary border border-border-primary overflow-hidden">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-2">
              {data.name}
            </h1>
            <p className="text-lg text-text-secondary font-medium">
              {data.role}
            </p>
          </div>
          
          <p className="text-text-secondary leading-relaxed max-w-lg">
            {data.bio}
          </p>
        </motion.div>
      </section>

      {data.stats.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary tracking-tight">
            {t("stats.title")}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {data.stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                className="group relative p-6 rounded-2xl bg-bg-secondary border border-border-primary transition-colors hover:border-border-secondary"
              >
                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-tertiary">
                  {stat.label}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {data.skills.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary tracking-tight">
            {t("skills.title")}
          </h2>
          <div className="space-y-6">
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-bg-tertiary text-text-secondary border border-transparent hover:border-border-secondary hover:bg-bg-secondary transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {data.journeyParagraphs.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary tracking-tight">
            {data.journeyTitle}
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            {data.journeyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section variants={itemVariants} id="contact" className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary tracking-tight">
          {t("contact.title")}
        </h2>
        <div className="flex flex-wrap gap-4">
          {data.contactEmail && (
            <a
              href={`mailto:${data.contactEmail}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary text-bg-primary text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {t("contact.email")}
            </a>
          )}
          {data.socialLinks.map((link) => (
            link.url && (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border-secondary text-text-primary text-sm font-semibold transition-all hover:border-text-primary hover:bg-bg-secondary hover:-translate-y-0.5"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
