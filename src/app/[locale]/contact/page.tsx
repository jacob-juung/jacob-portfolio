"use client";

import { useState, useEffect, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";

type FormType = "contact" | "proposal";

const FORMSPREE_CONTACT_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID;
const FORMSPREE_PROPOSAL_ID = process.env.NEXT_PUBLIC_FORMSPREE_PROPOSAL_ID;

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const PROJECT_TYPES = ["web", "consulting", "collaboration", "other"] as const;
const BUDGET_RANGES = ["under50k", "50to100k", "100to200k", "over200k"] as const;

function ContactForm() {
  const t = useTranslations("contact");
  const formId = FORMSPREE_CONTACT_ID || "placeholder";
  const [state, handleSubmit] = useForm(formId);
  const [formKey, setFormKey] = useState(0);
  const isConfigured = !!FORMSPREE_CONTACT_ID;

  useEffect(() => {
    if (state.succeeded) {
      toast.success(t("form.success"));
      setFormKey((prev) => prev + 1);
    }
    if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error(t("form.error"));
    }
  }, [state.succeeded, state.errors, t]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isConfigured) {
      e.preventDefault();
      toast.error("Form not configured. Please set NEXT_PUBLIC_FORMSPREE_CONTACT_ID");
      return;
    }
    handleSubmit(e);
  };

  return (
    <form key={formKey} onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text-primary mb-2">
          {t("form.name")} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors"
          placeholder={t("form.namePlaceholder")}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary mb-2">
          {t("form.email")} <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors"
          placeholder={t("form.emailPlaceholder")}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-primary mb-2">
          {t("form.message")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors resize-none"
          placeholder={t("form.messagePlaceholder")}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-6 py-3 rounded-xl bg-text-primary text-bg-primary font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? t("form.sending") : t("form.send")}
      </button>
    </form>
  );
}

function ProposalForm() {
  const t = useTranslations("contact");
  const formId = FORMSPREE_PROPOSAL_ID || "placeholder";
  const [state, handleSubmit] = useForm(formId);
  const [formKey, setFormKey] = useState(0);
  const isConfigured = !!FORMSPREE_PROPOSAL_ID;

  useEffect(() => {
    if (state.succeeded) {
      toast.success(t("proposal.success"));
      setFormKey((prev) => prev + 1);
    }
    if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error(t("proposal.error"));
    }
  }, [state.succeeded, state.errors, t]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isConfigured) {
      e.preventDefault();
      toast.error("Form not configured. Please set NEXT_PUBLIC_FORMSPREE_PROPOSAL_ID");
      return;
    }
    handleSubmit(e);
  };

  return (
    <form key={formKey} onSubmit={onSubmit} encType="multipart/form-data" className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="proposal-name" className="block text-sm font-medium text-text-primary mb-2">
            {t("proposal.name")} <span className="text-red-500">*</span>
          </label>
          <input
            id="proposal-name"
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors"
            placeholder={t("proposal.namePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="proposal-company" className="block text-sm font-medium text-text-primary mb-2">
            {t("proposal.company")}
          </label>
          <input
            id="proposal-company"
            type="text"
            name="company"
            className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors"
            placeholder={t("proposal.companyPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="proposal-email" className="block text-sm font-medium text-text-primary mb-2">
          {t("proposal.email")} <span className="text-red-500">*</span>
        </label>
        <input
          id="proposal-email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors"
          placeholder={t("proposal.emailPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="proposal-type" className="block text-sm font-medium text-text-primary mb-2">
          {t("proposal.projectType")} <span className="text-red-500">*</span>
        </label>
        <select
          id="proposal-type"
          name="projectType"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors appearance-none"
          defaultValue=""
        >
          <option value="" disabled>{t("proposal.selectType")}</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>{t(`proposal.types.${type}`)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          {t("proposal.budget")} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {BUDGET_RANGES.map((range) => (
            <label
              key={range}
              className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary border border-border-primary cursor-pointer hover:border-border-secondary transition-colors has-[:checked]:border-text-primary has-[:checked]:bg-bg-tertiary"
            >
              <input
                type="radio"
                name="budget"
                value={range}
                required
                className="w-4 h-4 accent-text-primary"
              />
              <span className="text-sm text-text-secondary">{t(`proposal.budgets.${range}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="proposal-timeline" className="block text-sm font-medium text-text-primary mb-2">
          {t("proposal.timeline")}
        </label>
        <input
          id="proposal-timeline"
          type="text"
          name="timeline"
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors"
          placeholder={t("proposal.timelinePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="proposal-description" className="block text-sm font-medium text-text-primary mb-2">
          {t("proposal.description")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="proposal-description"
          name="description"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary focus:ring-1 focus:ring-border-secondary transition-colors resize-none"
          placeholder={t("proposal.descriptionPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="proposal-file" className="block text-sm font-medium text-text-primary mb-2">
          {t("proposal.attachment")}
        </label>
        <input
          id="proposal-file"
          type="file"
          name="attachment"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bg-tertiary file:text-text-primary hover:file:bg-border-primary transition-colors"
        />
        <p className="text-xs text-text-tertiary mt-2">{t("proposal.attachmentNote")}</p>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-6 py-3 rounded-xl bg-text-primary text-bg-primary font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? t("proposal.sending") : t("proposal.send")}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const [activeTab, setActiveTab] = useState<FormType>("contact");

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
       className="space-y-12 py-8"
     >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-text-secondary leading-relaxed max-w-lg">
          {t("description")}
        </p>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">{t("info.title")}</h2>
        
        <div className="space-y-4">
          <a
            href="mailto:hello@jacob.com"
            className="flex items-center gap-3 p-4 rounded-xl bg-bg-secondary border border-border-primary hover:border-border-secondary transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center group-hover:bg-border-primary transition-colors">
              <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-text-tertiary">{t("info.email")}</p>
              <p className="text-text-primary font-medium">hello@jacob.com</p>
            </div>
          </a>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-bg-secondary border border-border-primary hover:border-border-secondary hover:bg-bg-tertiary transition-colors"
              >
                <span className="text-text-primary">{link.icon}</span>
                <span className="text-sm font-medium text-text-secondary">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-6">
        <div role="tablist" className="flex gap-2 p-1 bg-bg-secondary rounded-xl border border-border-primary">
          <button
            role="tab"
            aria-selected={activeTab === "contact"}
            aria-controls="contact-panel"
            onClick={() => setActiveTab("contact")}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "contact"
                ? "bg-text-primary text-bg-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
          >
            {t("tabs.contact")}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "proposal"}
            aria-controls="proposal-panel"
            onClick={() => setActiveTab("proposal")}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "proposal"
                ? "bg-text-primary text-bg-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
          >
            {t("tabs.proposal")}
          </button>
        </div>

        <div 
          id={activeTab === "contact" ? "contact-panel" : "proposal-panel"}
          role="tabpanel"
          aria-labelledby={activeTab === "contact" ? "contact-tab" : "proposal-tab"}
          className="p-6 rounded-2xl bg-bg-secondary border border-border-primary"
        >
          {activeTab === "contact" ? <ContactForm /> : <ProposalForm />}
        </div>
      </motion.section>
    </motion.div>
  );
}
