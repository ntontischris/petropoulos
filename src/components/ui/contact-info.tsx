import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ContactInfoItem({ icon, label, value }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-secondary-500">{label}</p>
        <p className="text-base text-primary-800">{value}</p>
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
    <div className="space-y-6">
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
