import { ArrowUpRight } from "lucide-react";

type Props = {
  uberUrl: string;
  doordashUrl: string;
  pickupUrl: string;
};

// Original Lovable design: solid dark green section, centered heading block,
// three bracket-cornered cards. No background image, no hover swap.
export default function OrderDelivery({ uberUrl, doordashUrl, pickupUrl }: Props) {
  const ORDER = [
    { name: "Uber Eats", label: "Delivery", sub: "20 to 30 min delivery", cta: "Order on Uber", href: uberUrl, external: true },
    { name: "DoorDash", label: "Delivery", sub: "Late night until 1 AM", cta: "Order on DoorDash", href: doordashUrl, external: true },
    { name: "Pickup", label: "In store", sub: "Ready in 15 min", cta: "Order Pickup", href: pickupUrl, external: false },
  ];

  return (
    <section id="order" className="py-24 md:py-32 bg-olive text-beige relative overflow-hidden">
      <div className="container-x relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Order and Delivery</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Bring The Kitchen home.</h2>
          <p className="mt-5 text-beige/75">Delivery and pickup available across Toronto.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-[1120px] mx-auto">
          {ORDER.map((o) => (
            <div
              key={o.name}
              className="corner-ornaments relative rounded-2xl bg-card ring-1 ring-saffron/10 p-8 md:p-9 text-center flex flex-col items-center"
            >
              <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-saffron">{o.label}</span>
              <h3 className="font-serif text-2xl md:text-3xl mt-3 text-beige">{o.name}</h3>
              <p className="text-sm text-beige/70 mt-2">{o.sub}</p>
              <a
                href={o.href}
                target={o.external ? "_blank" : undefined}
                rel={o.external ? "noopener noreferrer" : undefined}
                className="btn-arch btn-arch--solid mt-7"
              >
                <span className="btn-arch__label">{o.cta} <ArrowUpRight className="size-4" /></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
