import { ArrowUpRight } from "lucide-react";
import Rangoli from "./Rangoli";

type Props = {
  uberUrl: string;
  doordashUrl: string;
  pickupUrl: string;
};

// Exact port of the original Lovable "Order and Delivery" section
// (src/routes/index.tsx). Copy, not reinterpretation.
export default function OrderDelivery({ uberUrl, doordashUrl, pickupUrl }: Props) {
  const ORDER = [
    { name: "Uber Eats", desc: "20–30 min delivery", cta: "Order on Uber", href: uberUrl },
    { name: "DoorDash", desc: "Late-night until 1AM", cta: "Order on DoorDash", href: doordashUrl },
    { name: "Pickup", desc: "Ready in 15 min", cta: "Order Pickup", href: pickupUrl },
  ];

  return (
    <section id="order" className="py-24 md:py-32 bg-olive text-beige relative overflow-hidden">
      <div className="absolute inset-0 pattern-tile opacity-[0.06] pointer-events-none" />

      {/* Rangoli accents in the empty flanks (desktop) and a corner (mobile). */}
      <Rangoli src="/rangoli-1.png" opacity={0.14} className="hidden xl:block top-1/2 -translate-y-1/2 left-0 2xl:left-8 w-[190px] h-[190px] 2xl:w-[230px] 2xl:h-[230px]" />
      <Rangoli src="/rangoli-2.png" opacity={0.14} className="hidden xl:block top-1/2 -translate-y-1/2 right-0 2xl:right-8 w-[190px] h-[190px] 2xl:w-[230px] 2xl:h-[230px]" />
      <Rangoli src="/rangoli-3.png" opacity={0.13} className="xl:hidden bottom-4 right-2 w-[104px] h-[104px]" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Bring The Kitchen home.</h2>
          <p className="mt-5 text-beige/70">Delivery and pickup available across downtown Toronto.</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {ORDER.map((o) => (
            <a key={o.name} href={o.href} className="exotic-border corner-ornaments group p-8 bg-beige border-saffron text-olive shadow-[inset_0_0_0_1px_rgba(179,101,18,0.2),0_0_25px_-8px_rgba(179,101,18,0.22)] hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_rgba(179,101,18,0.2),0_10px_40px_-10px_rgba(179,101,18,0.25)] transition-all duration-300">
              <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-2xl">{o.name}</h3>
                <ArrowUpRight className="size-5 text-saffron group-hover:rotate-45 transition-transform" />
              </div>
              <p className="text-sm text-olive/70 mt-2">{o.desc}</p>
              <span className="mt-10 block text-xs uppercase tracking-widest text-olive/80">{o.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
