"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { contactSchema } from "@/validations/contact";
import type { ActionResult } from "@/types/common";

export async function submitContact(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Contact submission error:", error.message);
    return { success: false, error: "Failed to submit" };
  }

  return { success: true, data: null };
}
