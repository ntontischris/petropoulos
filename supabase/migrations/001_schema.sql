-- ============================================
-- Group 110 - Database Schema
-- ============================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SERVICES
-- ============================================
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT NOT NULL UNIQUE,
  title_el    TEXT NOT NULL,
  title_en    TEXT NOT NULL,
  description_el TEXT NOT NULL,
  description_en TEXT NOT NULL,
  icon        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_services_slug ON services (slug);
CREATE INDEX idx_services_sort_order ON services (sort_order);
CREATE INDEX idx_services_is_active ON services (is_active) WHERE is_active = true;

CREATE TRIGGER set_updated_at_services
  BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  title_el        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  description_el  TEXT NOT NULL,
  description_en  TEXT NOT NULL,
  location_el     TEXT NOT NULL,
  location_en     TEXT NOT NULL,
  duration        TEXT NOT NULL,
  category        TEXT NOT NULL CHECK (category IN ('renovation', 'investment')),
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_slug ON projects (slug);
CREATE INDEX idx_projects_sort_order ON projects (sort_order);
CREATE INDEX idx_projects_category ON projects (category);
CREATE INDEX idx_projects_is_featured ON projects (is_featured) WHERE is_featured = true;

CREATE TRIGGER set_updated_at_projects
  BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PROJECT IMAGES
-- ============================================
CREATE TABLE project_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  is_before   BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  alt_text_el TEXT,
  alt_text_en TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_project_images_project_id ON project_images (project_id);
CREATE INDEX idx_project_images_sort ON project_images (project_id, sort_order);

-- ============================================
-- BOOKING TYPES
-- ============================================
CREATE TABLE booking_types (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name_el         TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  description_el  TEXT NOT NULL,
  description_en  TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price_cents     INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  sort_order      INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_booking_types_slug ON booking_types (slug);
CREATE INDEX idx_booking_types_sort ON booking_types (sort_order);

-- ============================================
-- BOOKINGS
-- ============================================
CREATE TABLE bookings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_type_id   UUID NOT NULL REFERENCES booking_types(id),
  customer_name     TEXT NOT NULL,
  customer_email    TEXT NOT NULL,
  customer_phone    TEXT NOT NULL,
  preferred_date    DATE NOT NULL,
  preferred_time    TIME NOT NULL,
  session_method    TEXT NOT NULL CHECK (session_method IN ('video_call', 'phone', 'in_person')),
  notes             TEXT,
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status    TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'free')),
  payment_method    TEXT CHECK (payment_method IN ('stripe', 'bank_transfer', 'free')),
  stripe_session_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_preferred_date ON bookings (preferred_date);
CREATE INDEX idx_bookings_payment_status ON bookings (payment_status);
CREATE INDEX idx_bookings_stripe_session ON bookings (stripe_session_id) WHERE stripe_session_id IS NOT NULL;

CREATE TRIGGER set_updated_at_bookings
  BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE contact_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_is_read ON contact_submissions (is_read) WHERE is_read = false;

-- ============================================
-- SITE SETTINGS
-- ============================================
CREATE TABLE site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at_site_settings
  BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
