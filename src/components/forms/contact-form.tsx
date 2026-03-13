"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { submitContact } from "@/app/[locale]/contact/actions";
import type { ActionResult } from "@/types/common";

const initialState: ActionResult | null = null;

const inputClass =
  "w-full rounded-xl border border-secondary-200 bg-secondary-50 px-4 py-3 text-primary-800 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, isPending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => {
      return submitContact(formData);
    },
    initialState,
  );

  if (state?.success) {
    return (
      <div className="rounded-xl border border-green-100 bg-green-50 p-10 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <Check className="h-7 w-7 text-green-600" />
        </div>
        <p className="text-lg font-medium text-green-800">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state && !state.success && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          {t("errorMessage")}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {t("nameLabel")} <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={t("namePlaceholder")}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {t("emailLabel")} <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {t("phoneLabel")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={t("phonePlaceholder")}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {t("subjectLabel")} <span className="text-accent">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            {t("subjectPlaceholder")}
          </option>
          <option value="general">{t("subjectGeneral")}</option>
          <option value="consulting">{t("subjectConsulting")}</option>
          <option value="renovation">{t("subjectRenovation")}</option>
          <option value="valuation">{t("subjectValuation")}</option>
          <option value="brokerage">{t("subjectBrokerage")}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {t("messageLabel")} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button
        type="submit"
        isLoading={isPending}
        variant="secondary"
        className="w-full"
      >
        {t("submitButton")}
      </Button>
    </form>
  );
}
