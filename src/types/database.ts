export interface Service {
  id: string;
  slug: string;
  title_el: string;
  title_en: string;
  description_el: string;
  description_en: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title_el: string;
  title_en: string;
  description_el: string;
  description_en: string;
  location_el: string;
  location_en: string;
  duration: string;
  category: "renovation" | "investment";
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  is_before: boolean;
  sort_order: number;
  alt_text_el: string | null;
  alt_text_en: string | null;
  created_at: string;
}

export interface BookingType {
  id: string;
  slug: string;
  name_el: string;
  name_en: string;
  description_el: string;
  description_en: string;
  duration_minutes: number;
  price_cents: number;
  is_active: boolean;
  sort_order: number;
}

export interface Booking {
  id: string;
  booking_type_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  preferred_date: string;
  preferred_time: string;
  session_method: "video_call" | "phone" | "in_person";
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "pending" | "paid" | "free";
  payment_method: "stripe" | "bank_transfer" | "free" | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

// Project with images joined
export interface ProjectWithImages extends Project {
  project_images: ProjectImage[];
}
