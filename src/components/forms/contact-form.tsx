"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/[locale]/contact/actions";
import type { ActionResult } from "@/types/common";

const initialState: ActionResult | null = null;

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
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <p className="text-lg font-medium text-green-800">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state && !state.success && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {t("errorMessage")}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-primary-800"
        >
          {t("nameLabel")} *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={t("namePlaceholder")}
          className="w-full rounded-lg border border-secondary-200 px-4 py-3 text-primary-800 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-primary-800"
        >
          {t("emailLabel")} *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-lg border border-secondary-200 px-4 py-3 text-primary-800 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-primary-800"
        >
          {t("phoneLabel")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={t("phonePlaceholder")}
          className="w-full rounded-lg border border-secondary-200 px-4 py-3 text-primary-800 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1 block text-sm font-medium text-primary-800"
        >
          {t("subjectLabel")} *
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="w-full rounded-lg border border-secondary-200 px-4 py-3 text-primary-800 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
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
          className="mb-1 block text-sm font-medium text-primary-800"
        >
          {t("messageLabel")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-none rounded-lg border border-secondary-200 px-4 py-3 text-primary-800 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <Button type="submit" isLoading={isPending} className="w-full">
        {t("submitButton")}
      </Button>
    </form>
  );
}
