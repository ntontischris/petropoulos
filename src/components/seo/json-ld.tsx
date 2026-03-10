interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Group 110 Real Estate & Consulting",
        url: "https://group110.gr",
        description:
          "Ολοκληρωμένες λύσεις ακινήτων — συμβουλευτική επενδύσεων, ανακαινίσεις, διαχείριση και μεσιτικές υπηρεσίες.",
        areaServed: {
          "@type": "Country",
          name: "Greece",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Athens",
          addressCountry: "GR",
        },
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Group 110 Real Estate & Consulting",
        url: "https://group110.gr",
        telephone: "+30 210 000 0000",
        email: "info@group110.gr",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Athens",
          addressRegion: "Attica",
          addressCountry: "GR",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:00",
        },
        priceRange: "€€",
      }}
    />
  );
}
