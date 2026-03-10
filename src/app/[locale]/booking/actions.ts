"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { bookingSchema } from "@/validations/booking";
import type { ActionResult } from "@/types/common";

export async function createBooking(
  data: unknown,
): Promise<ActionResult<{ bookingId: string }>> {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }

  const supabase = await createSupabaseServer();

  // Check if booking type is free
  const { data: bookingType, error: typeError } = await supabase
    .from("booking_types")
    .select("price_cents")
    .eq("id", parsed.data.booking_type_id)
    .single();

  if (typeError || !bookingType) {
    return { success: false, error: "Invalid booking type" };
  }

  const isFree = bookingType.price_cents === 0;

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      booking_type_id: parsed.data.booking_type_id,
      customer_name: parsed.data.customer_name,
      customer_email: parsed.data.customer_email,
      customer_phone: parsed.data.customer_phone,
      preferred_date: parsed.data.preferred_date,
      preferred_time: parsed.data.preferred_time,
      session_method: parsed.data.session_method,
      notes: parsed.data.notes ?? null,
      status: isFree ? "confirmed" : "pending",
      payment_status: isFree ? "free" : "pending",
      payment_method: isFree ? "free" : null,
    })
    .select("id")
    .single();

  if (error || !booking) {
    console.error("Booking creation error:", error?.message);
    return { success: false, error: "Failed to create booking" };
  }

  return { success: true, data: { bookingId: booking.id } };
}
