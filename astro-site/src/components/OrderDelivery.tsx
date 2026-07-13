import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  uberUrl: string;
  doordashUrl: string;
  pickupUrl: string;
};

type Bg = { desktop: string; mobile: string };

// Each background has a landscape (desktop) and a portrait-friendly (mobile)
// variant. GOES HERE: the -mobile files are placeholders, swap with real
// portrait crops. Only one variant is downloaded per device (see <picture>).
const DEFAULT_BG: Bg = { desktop: "/delivery.png", mobile: "/delivery-mobile.png" };

export default function OrderDelivery({ uberUrl, doordashUrl, pickupUrl }: Props) {
  // GOES HERE: replace each bg pair with provider-themed photos after the shoot.
  const ORDER: {
    name: string;
    sub: string;
    cta: string;
    href: string;
    external: boolean;
    bg: Bg;
  }[] = [
    { name: "Uber Eats", sub: "20 to 30 min delivery", cta: "Order on Uber", href: uberUrl, external: true, bg: { desktop: "/uber.png", mobile: "/uber-mobile.png" } },
    { name: "DoorDash", sub: "Late night until 1 AM", cta: "Order on DoorDash", href: doordashUrl, external: true, bg: { desktop: "/doordash.png", mobile: "/doordash-mobile.png" } },
    { name: "Pickup", sub: "Ready in 15 min", cta: "Order Pickup", href: pickupUrl, external: false, bg: { desktop: "/delivery.png", mobile: "/delivery-mobile.png" } },
  ];

  const [hover, setHover] = useState<number | null>(null);  
  const activeBg = hover === null ? DEFAULT_BG : ORDER[hover].bg;

  return (
    <section id="order" className="relative py-28 md:py-40 overflow-hidden text-beige">
      {/* Full-bleed background photo, crossfades per provider. Light black overlay
          only, so the photo stays clearly visible. */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeBg.desktop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* IMAGE GOES HERE: order background, per-device variant, swaps per option. */}
            <picture>
              <source media="(max-width: 768px)" srcSet={activeBg.mobile} />
              <img src={activeBg.desktop} alt="" className="absolute inset-0 size-full object-cover object-center" />
            </picture>
          </motion.div>
        </AnimatePresence>
        <div className="img-overlay" />
      </div>

      {/* Local legibility scrim on the text side only, not a heavier global overlay. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full md:w-[68%] pointer-events-none bg-gradient-to-r from-[#061508]/90 via-[#061508]/55 to-transparent"
      />

      <div className="relative px-[5vw] md:px-[6vw]">
        <div className="max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Order and Delivery</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Bring The Kitchen home.</h2>
          <p className="mt-5 text-beige/80">Delivery and pickup available across Toronto.</p>
        </div>

        <div className="mt-12 md:mt-16 border-t border-beige/25">
          {ORDER.map((o, i) => (
            <a
              key={o.name}
              href={o.href}
              target={o.external ? "_blank" : undefined}
              rel={o.external ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={`group flex items-center justify-between gap-5 py-7 md:py-9 border-b border-beige/25 transition-opacity duration-500 ${
                hover !== null && hover !== i ? "opacity-45" : "opacity-100"
              }`}
            >
              <div className="min-w-0 origin-left transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                <h3 className="font-serif leading-[1.02] text-beige text-[2rem] md:text-[clamp(2.5rem,5vw,4rem)] [text-shadow:0_2px_18px_rgba(6,21,8,0.55)]">
                  {o.name}
                </h3>
                <p className="mt-2 text-sm md:text-base text-beige/80">{o.sub}</p>
              </div>

              <span className="shrink-0 flex items-center gap-3 md:gap-4">
                <span className="hidden md:inline text-xs uppercase tracking-[0.25em] text-beige/85">{o.cta}</span>
                <span className="grid place-items-center size-11 md:size-12 rounded-full bg-saffron text-beige transition-all duration-300 group-hover:brightness-110 group-hover:scale-105 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)]">
                  <ArrowUpRight className="size-5" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
