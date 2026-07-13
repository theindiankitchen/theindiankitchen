import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

// Public-safe Web3Forms access key. GOES HERE: replace with the real key from
// https://web3forms.com. The inbox is whatever address the key is registered to.
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";

const BRAND = "The Indian Kitchen, Biryani and Dosa";

export default function ReservationForm() {
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
      date: String(fd.get("date") || ""),
      time: String(fd.get("time") || ""),
      party: Number(fd.get("party") || 0),
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      notes: String(fd.get("notes") || ""),
    };

    if (!payload.date || !payload.time || !payload.party || !payload.name || !payload.phone || !payload.email) {
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
          subject: `Reservation Request, ${payload.name}`,
          from_name: BRAND,
          replyto: payload.email,
          Date: payload.date,
          Time: payload.time,
          "Party Size": payload.party,
          Name: payload.name,
          Phone: payload.phone,
          Email: payload.email,
          "Special Requests": payload.notes || "-",
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

      {/* Framed off-white panel with a copper double border, matching the demo. */}
      <div className="relative rounded-[1.5rem] border border-saffron/50 p-2.5 bg-[#f4ece0] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
        <div className="rounded-[1.15rem] border border-saffron/30 p-6 md:p-8">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field type="date" label="Date" name="date" required />
              <Field type="time" label="Time" name="time" required />
              <Field type="number" label="Party Size" name="party" placeholder="e.g. 4" min={1} required />
              <Field label="Full Name" name="name" placeholder="Your full name" required />
              <Field type="tel" label="Phone Number" name="phone" placeholder="(416) 555-0199" required />
              <Field type="email" label="Email Address" name="email" placeholder="you@example.com" required />
            </div>

            <div className="mt-5">
              <label htmlFor="notes" className="block text-[11px] uppercase tracking-[0.12em] mb-2 font-medium text-[#0b1f0c]">
                Special Requests
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="High chair, celebration, seating preference, dietary notes."
                className="w-full rounded-2xl bg-[#e1c7ae] px-4 py-3.5 text-[#0b1f0c] placeholder:text-[#0b1f0c]/55 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#b36512]/40 focus:border-[#b36512] transition-all"
              />
            </div>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-[#0b1f0c]/60 max-w-xs">
                We hold reservations for 15 minutes. For parties over 8, please call us directly.
              </p>
              <button type="submit" disabled={submitting} className="btn-arch btn-arch--solid disabled:opacity-60 disabled:cursor-not-allowed">
                <span className="btn-arch__label">
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Request Table <ArrowUpRight className="size-4" />
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

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-matte/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-matte ring-1 ring-white/5 p-10 text-center shadow-[0_30px_120px_-20px_rgba(0,0,0,0.5)]">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-saffron">
          <Check className="size-9 animate-scale-in" strokeWidth={2.5} />
        </div>
        <span className="text-[11px] uppercase tracking-[0.45em] text-saffron">Reservation Requested</span>
        <h3 className="font-serif text-3xl text-beige mt-4 leading-snug">Thank you, we will confirm shortly.</h3>
        <p className="mt-5 text-beige/75 leading-relaxed">
          We have received your reservation request and will be in touch to confirm.
        </p>
        <button onClick={onClose} className="btn-arch btn-arch--solid mt-8">
          <span className="btn-arch__label">Close</span>
        </button>
      </div>
    </div>
  );
}
