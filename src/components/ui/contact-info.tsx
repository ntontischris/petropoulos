import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ContactInfoItem({ icon, label, value }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-secondary-100 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-card-hover">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 text-accent-dark">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-secondary-400">{label}</p>
        <p className="mt-0.5 font-medium text-primary-800">{value}</p>
      </div>
    </div>
  );
}

interface ContactInfoProps {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  labels: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
}

export function ContactInfo({
  phone,
  email,
  address,
  hours,
  labels,
}: ContactInfoProps) {
  return (
    <div className="space-y-4">
      {phone && (
        <ContactInfoItem
          icon={<Phone className="h-5 w-5" />}
          label={labels.phone}
          value={phone}
        />
      )}
      {email && (
        <ContactInfoItem
          icon={<Mail className="h-5 w-5" />}
          label={labels.email}
          value={email}
        />
      )}
      {address && (
        <ContactInfoItem
          icon={<MapPin className="h-5 w-5" />}
          label={labels.address}
          value={address}
        />
      )}
      {hours && (
        <ContactInfoItem
          icon={<Clock className="h-5 w-5" />}
          label={labels.hours}
          value={hours}
        />
      )}
    </div>
  );
}
