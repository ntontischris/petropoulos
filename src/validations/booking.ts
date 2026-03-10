import { z } from "zod/v4";

export const bookingSchema = z.object({
  booking_type_id: z.string().uuid(),
  customer_name: z.string().min(2, "Name is required").max(100),
  customer_email: z.email("Invalid email address"),
  customer_phone: z.string().min(5, "Phone is required").max(20),
  preferred_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  session_method: z.enum(["video_call", "phone", "in_person"]),
  notes: z.string().max(2000).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
