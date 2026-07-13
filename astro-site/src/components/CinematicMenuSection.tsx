import { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame, Leaf, Drumstick, Star } from "lucide-react";

export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  spice?: 0 | 1 | 2 | 3;
  veg?: boolean;
  image?: string;
  popular?: boolean;
  featured?: boolean;
};

export type MenuSectionProps = {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  items: MenuItem[];
  /** Alternating section background down the menu page. */
  variant?: "green" | "cream";
};

function SpiceMeter({ level }: { level: number }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Spice level ${level} of 3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame
          key={i}
          className={`size-3.5 ${i < level ? "text-saffron fill-saffron/40" : "text-white/15"}`}
        />
      ))}
    </span>
  );
}

function VegBadge({ veg }: { veg?: boolean }) {
  if (veg === undefined) return null;
  return (
    <span
      className={`inline-flex items-center justify-center size-5 rounded-sm border ${
        veg ? "border-emerald-500/70 bg-matte/70" : "border-red-500/70 bg-matte/70"
      } backdrop-blur-sm`}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      {veg ? <Leaf className="size-3 text-emerald-400" /> : <Drumstick className="size-3 text-red-400" />}
    </span>
  );
}

// Circular edge arrow with its own dark pill so it reads on any background.
function EdgeArrow({ dir, onClick, label }: { dir: 1 | -1; onClick: () => void; label: string }) {
  const side = dir === -1 ? "left-2 md:left-4" : "right-2 md:right-4";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 z-20 ${side} size-10 md:size-12 rounded-full bg-matte/90 backdrop-blur border border-saffron/50 text-beige hover:bg-saffron hover:text-matte transition-colors grid place-items-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron`}
    >
      {dir === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
  );
}

export default function CinematicMenuSection({ id, kicker, title, intro, items, variant = "green" }: MenuSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cream = variant === "cream";

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : Math.min(el.clientWidth * 0.8, 560);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 overflow-hidden scroll-mt-24 md:scroll-mt-28 ${cream ? "bg-cream-cover text-olive" : "bg-olive text-beige"}`}
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-saffron">{kicker}</span>
          <h2 className={`font-serif text-4xl md:text-6xl mt-3 leading-[1.05] ${cream ? "text-olive" : "text-beige"}`}>
            {title}
          </h2>
          {intro && (
            <p className={`mt-5 text-base md:text-lg leading-relaxed ${cream ? "text-olive/70" : "text-beige/65"}`}>
              {intro}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-10 md:mt-12">
        <div
          ref={scrollerRef}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.name}
              data-card
              className={`group relative shrink-0 snap-center sm:snap-start rounded-[1.3rem] overflow-hidden bg-matte ring-1 ring-white/5 transition-shadow duration-300 hover:ring-saffron/40 ${
                item.featured ? "w-[78vw] sm:w-[46vw] md:w-[360px]" : "w-[70vw] sm:w-[42vw] md:w-[300px]"
              }`}
            >
              {/* Image only, no text overlaid. Zoom is a GPU-composited CSS transform. */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-full object-cover will-change-transform [transform:translateZ(0)] transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="size-full bg-gradient-to-b from-olive to-matte" />
                )}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <VegBadge veg={item.veg} />
                  <div className="flex items-center gap-2">
                    {item.featured && (
                      <span className="text-[10px] uppercase tracking-[0.22em] text-saffron bg-matte/80 backdrop-blur-sm border border-saffron/50 rounded-full px-2.5 py-1">
                        Chef's Pick
                      </span>
                    )}
                    {item.popular && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-saffron bg-matte/80 backdrop-blur-sm border border-saffron/50 rounded-full px-2.5 py-1">
                        <Star className="size-3 fill-saffron" /> Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Text below the image. */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <SpiceMeter level={item.spice ?? 0} />
                  <span className="price text-lg leading-none">${item.price}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl mt-3 text-beige leading-tight">{item.name}</h3>
                <p className="mt-2 text-sm text-beige/60 leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Arrows at the horizontal edges, vertically centered. */}
        <EdgeArrow dir={-1} onClick={() => scrollBy(-1)} label={`Scroll ${title} left`} />
        <EdgeArrow dir={1} onClick={() => scrollBy(1)} label={`Scroll ${title} right`} />
      </div>
    </section>
  );
}
