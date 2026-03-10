-- ============================================
-- Group 110 - Row Level Security Policies
-- ============================================

-- Enable RLS on ALL tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ (anonymous visitors can view)
-- ============================================
CREATE POLICY "Public read services"
  ON services FOR SELECT USING (true);

CREATE POLICY "Public read projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Public read project_images"
  ON project_images FOR SELECT USING (true);

CREATE POLICY "Public read booking_types"
  ON booking_types FOR SELECT USING (true);

CREATE POLICY "Public read site_settings"
  ON site_settings FOR SELECT USING (true);

-- ============================================
-- PUBLIC INSERT (visitors can submit bookings & contact forms)
-- ============================================
CREATE POLICY "Public insert bookings"
  ON bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert contact"
  ON contact_submissions FOR INSERT WITH CHECK (true);

-- ============================================
-- NOTE: All other operations (UPDATE, DELETE) require service_role
-- which bypasses RLS automatically. No additional policies needed.
-- ============================================
