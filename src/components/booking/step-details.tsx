interface StepDetailsProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  onChange: (field: string, value: string) => void;
  labels: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
  };
}

export function StepDetails({
  customerName,
  customerEmail,
  customerPhone,
  notes,
  onChange,
  labels,
}: StepDetailsProps) {
  const inputClass =
    "w-full rounded-xl border border-secondary-200 bg-secondary-50 px-4 py-3 text-primary-800 transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20";

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="bk-name"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {labels.nameLabel} <span className="text-accent">*</span>
        </label>
        <input
          id="bk-name"
          type="text"
          required
          value={customerName}
          onChange={(e) => onChange("customerName", e.target.value)}
          placeholder={labels.namePlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="bk-email"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {labels.emailLabel} <span className="text-accent">*</span>
        </label>
        <input
          id="bk-email"
          type="email"
          required
          value={customerEmail}
          onChange={(e) => onChange("customerEmail", e.target.value)}
          placeholder={labels.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="bk-phone"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {labels.phoneLabel} <span className="text-accent">*</span>
        </label>
        <input
          id="bk-phone"
          type="tel"
          required
          value={customerPhone}
          onChange={(e) => onChange("customerPhone", e.target.value)}
          placeholder={labels.phonePlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="bk-notes"
          className="mb-1.5 block text-sm font-medium text-primary-800"
        >
          {labels.notesLabel}
        </label>
        <textarea
          id="bk-notes"
          rows={4}
          value={notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder={labels.notesPlaceholder}
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}
