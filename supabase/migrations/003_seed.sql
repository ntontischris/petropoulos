-- ============================================
-- Group 110 - Seed Data
-- ============================================

-- Booking Types
INSERT INTO booking_types (slug, name_el, name_en, description_el, description_en, duration_minutes, price_cents, sort_order) VALUES
  ('free-consultation', 'Δωρεάν Γνωριμία', 'Free Consultation',
   'Πρώτη γνωριμία 10 λεπτών χωρίς χρέωση', 'Free 10-minute introductory session',
   10, 0, 1),
  ('consultation-60', 'Συνεδρία 60 λεπτών', '60-Minute Consultation',
   'Ολοκληρωμένη συμβουλευτική συνεδρία 60 λεπτών', 'Full 60-minute consultation session',
   60, 10000, 2),
  ('package-3', 'Πακέτο 3 Συνεδριών', '3-Session Package',
   'Πακέτο 3 συνεδριών των 60 λεπτών με έκπτωση', 'Package of 3 x 60-minute sessions at a discount',
   180, 25000, 3);

-- Services
INSERT INTO services (slug, title_el, title_en, description_el, description_en, icon, sort_order) VALUES
  ('investment-consulting', 'Συμβουλευτική Επενδύσεων', 'Investment Consulting',
   'Ανάλυση αγοράς, επιλογή κατάλληλου ακινήτου και στρατηγική επένδυσης. Απευθύνεται σε επενδυτές, επιχειρηματίες και ιδιώτες.',
   'Market analysis, property selection and investment strategy. For investors, entrepreneurs and individuals.',
   'trending-up', 1),
  ('renovations', 'Ανακαινίσεις Ακινήτων', 'Property Renovations',
   'Ολοκληρωμένες ανακαινίσεις κατοικιών και επαγγελματικών χώρων. Απευθύνεται σε ιδιώτες και επενδυτές.',
   'Complete renovations of residential and commercial properties. For homeowners and investors.',
   'hammer', 2),
  ('property-management', 'Διαχείριση Ακινήτων', 'Property Management',
   'Ολοκληρωμένη διαχείριση και αξιοποίηση ακινήτων για μέγιστη απόδοση.',
   'Complete property management and utilization services for maximum returns.',
   'building-2', 3),
  ('property-valuation', 'Εκτίμηση Αξίας Ακινήτων', 'Property Valuation',
   'Ανάλυση και εκτίμηση της πραγματικής αξίας ενός ακινήτου βάσει αγοράς.',
   'Analysis and estimation of the real market value of a property.',
   'calculator', 4),
  ('brokerage', 'Μεσιτικές Υπηρεσίες', 'Brokerage Services',
   'Αγοραπωλησίες και ενοικιάσεις ακινήτων με πλήρη υποστήριξη.',
   'Property sales, purchases and rentals with full support.',
   'handshake', 5);
