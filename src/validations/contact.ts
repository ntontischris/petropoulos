import { z } from "zod/v4";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.email("Invalid email address"),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message too short").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
