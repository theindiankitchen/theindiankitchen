import { useState, type FormEvent } from "react";
import { ArrowUpRight, ChevronDown, Check, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Web3Forms access key. This is a public-safe key (no secret). Replace the
// placeholder below with the real key from https://web3forms.com. The inbox
// that receives submissions is whatever address that key is registered to.
// ---------------------------------------------------------------------------
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";

const BRAND = "The Indian Kitchen, Biryani and Dosa";

export default function CateringForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      venue: String(fd.get("venue") || ""),
      people: Number(fd.get("people") || 0),
      date: String(fd.get("date") || ""),
      time: String(fd.get("time") || ""),
      eventType: String(fd.get("eventType") || ""),
      preference: String(fd.get("preference") || ""),
      allergies: String(fd.get("allergies") || ""),
      notes: String(fd.get("notes") || ""),
    };

    if (
      !payload.name || !payload.email || !payload.phone || !payload.venue ||
      !payload.people || !payload.date || !payload.time || !payload.eventType || !payload.preference
    ) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Catering Inquiry, ${payload.name}`,
          from_name: BRAND,
          replyto: payload.email,
          Name: payload.name,
          Email: payload.email,
          Phone: payload.phone,
          "Event Address / Venue": payload.venue,
          "Number of People": payload.people,
          "Event Date": payload.date,
          "Event Time": payload.time,
          "Type of Event": payload.eventType,
          "Food Preference": payload.preference,
          "Allergy Information": payload.allergies || "-",
          "Additional Instructions": payload.notes || "-",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error((data && data.message) || "Something went wrong. Please try again.");
      }
      form.reset();
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {success && <SuccessModal onClose={() => setSuccess(false)} />}

      {/* Framed off-white panel with a copper double border, matching reservation. */}
      <div className="relative rounded-[1.5rem] border border-saffron/50 p-2.5 bg-[#f4ece0] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
        <div className="rounded-[1.15rem] border border-saffron/30 p-6 md:p-8">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" name="name" placeholder="Your full name" required />
              <Field type="email" label="Email Address" name="email" placeholder="you@example.com" required />
              <Field type="tel" label="Phone Number" name="phone" placeholder="(416) 555-0199" required />
              <Field label="Event Address / Venue" name="venue" placeholder="Venue or address" required />
              <Field type="number" label="Number of People" name="people" placeholder="e.g. 80" min={1} required />
              <Field type="date" label="Event Date" name="date" required />
              <Field type="time" label="Event Time" name="time" required />
              <SelectField label="Type of Event" name="eventType" options={["Birthday", "Corporate", "Wedding", "Private Party", "Religious Event", "Other"]} required />
              <SelectField label="Food Preference" name="preference" options={["Vegetarian", "Non-Vegetarian", "Mixed"]} required />
              <Field label="Allergy Information" name="allergies" placeholder="Nuts, dairy, gluten" />
            </div>

            <div className="mt-5">
              <label htmlFor="notes" className="block text-[11px] uppercase tracking-[0.12em] mb-2 font-medium text-[#0b1f0c]">
                Additional Instructions / Special Requests
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Preferred dishes, spice levels, serving style, or any special requests."
                className="w-full rounded-2xl bg-[#e1c7ae] px-4 py-3.5 text-[#0b1f0c] placeholder:text-[#0b1f0c]/55 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#b36512]/40 focus:border-[#b36512] transition-all"
              />
            </div>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-[#0b1f0c]/60 max-w-xs">
                By submitting, you agree to be contacted regarding your catering request.
              </p>
              <button type="submit" disabled={submitting} className="btn-arch btn-arch--solid disabled:opacity-60 disabled:cursor-not-allowed">
                <span className="btn-arch__label">
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Submit Catering Request <ArrowUpRight className="size-4" />
                    </>
                  )}
                </span>
              </button>
            </div>
            {errorMsg && (
              <div className="mt-5 rounded-2xl border border-red-600/40 bg-red-600/10 px-5 py-3 text-sm text-red-800">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };

function Field({ label, name, className, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-[11px] uppercase tracking-[0.12em] mb-2 font-medium text-[#0b1f0c]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className={
          "w-full rounded-2xl bg-[#e1c7ae] px-5 py-3.5 text-[#0b1f0c] placeholder:text-[#0b1f0c]/55 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#b36512]/40 focus:border-[#b36512] transition-all " +
          (className ?? "")
        }
      />
    </div>
  );
}

function SelectField({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[11px] uppercase tracking-[0.12em] mb-2 font-medium text-[#0b1f0c]">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          className="w-full appearance-none rounded-2xl bg-[#e1c7ae] border border-transparent px-5 py-3.5 pr-12 text-[#0b1f0c] focus:outline-none focus:ring-2 focus:ring-[#b36512]/40 focus:border-[#b36512] transition-all"
        >
          <option value="" disabled>Select</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#0b1f0c]" />
      </div>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-matte/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-matte ring-1 ring-white/5 p-10 text-center shadow-[0_30px_120px_-20px_rgba(0,0,0,0.5)]">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-saffron">
          <Check className="size-9 animate-scale-in" strokeWidth={2.5} />
        </div>
        <span className="text-[11px] uppercase tracking-[0.45em] text-saffron">Request Received</span>
        <h3 className="font-serif text-3xl text-beige mt-4 leading-snug">Thank you for contacting our catering team.</h3>
        <p className="mt-5 text-beige/75 leading-relaxed">We have received your request and will reach out shortly.</p>
        <button onClick={onClose} className="btn-arch btn-arch--solid mt-8">
          <span className="btn-arch__label">Close</span>
        </button>
      </div>
    </div>
  );
}
