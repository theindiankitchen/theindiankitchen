import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Logo lives in /public/assets so it resolves from React islands.
const officialLogo = "/assets/official-logo.png";

const NAV = [
  { label: "Menu", href: "/#menu" },
  { label: "Catering", href: "/catering" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock background scroll when the mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      {/* Masking band, hides content scrolling beneath the header */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-20 md:h-32 z-40 bg-olive pointer-events-none"
      />

      {/* Logo, upper-left, primary brand anchor */}
      <a
        href="/"
        aria-label="The Indian Kitchen, home"
        className="fixed top-2 md:top-4 left-4 md:left-10 lg:left-14 z-50 flex items-center h-14 md:h-24"
      >
        <img
          src={officialLogo}
          alt="The Indian Kitchen, Biryani and Dosa"
          className="w-[52vw] sm:w-[42vw] md:w-[22vw] lg:w-[26vw] xl:w-[24vw] max-w-[220px] md:max-w-[460px] h-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
        />
      </a>

      {/* Floating navigation island, right side (desktop) or hamburger (mobile) */}
      <header className="fixed top-3 md:top-9 right-4 md:right-10 lg:right-14 z-50 w-auto rounded-full bg-olive text-[#e1c7ae]">
        <div className="relative flex items-center justify-center h-12 md:h-16 px-3 md:px-5">
          <nav className="hidden md:flex items-center gap-6 md:gap-7 text-sm">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-serif text-[#e1c7ae] hover:text-saffron transition-colors uppercase tracking-[0.12em] text-[18px] md:text-[20px] font-medium"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#e1c7ae] hover:text-saffron transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-olive transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="relative flex items-center justify-between px-4 h-20">
          <img
            src={officialLogo}
            alt=""
            aria-hidden="true"
            className="w-[52vw] max-w-[220px] h-auto object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full text-[#e1c7ae] hover:text-saffron transition-colors"
          >
            <X className="size-7" />
          </button>
        </div>
        <nav
          className={`relative flex flex-col items-center justify-center gap-8 px-6 pt-10 pb-20 transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-serif text-[#e1c7ae] hover:text-saffron transition-colors uppercase tracking-[0.18em] text-3xl font-medium"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
