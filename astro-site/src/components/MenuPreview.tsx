import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, ChevronDown } from "lucide-react";
import { CATEGORIES, priceLabel, type MenuItem } from "../data/menu";

// Neutral fallback for dishes whose photo has not been shot yet (empty src).
const FALLBACK_IMAGE = "/assets/hero-spread.jpg";

export default function MenuPreview() {
  const [catId, setCatId] = useState(CATEGORIES[0].id);
  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === catId) ?? CATEGORIES[0],
    [catId]
  );
  const dishes = category.items;
  const [active, setActive] = useState<MenuItem>(dishes[0]);
  // Mobile accordion: index of the currently open row (one at a time).
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    setActive(dishes[0]);
    setOpenIdx(null);
  }, [catId]);

  return (
    <section id="menu" className="py-24 md:py-32 bg-olive text-beige relative">
      <div className="container-x">
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Our Menu</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">A taste of every region.</h2>
        </div>

        {/* Chamfered category chips: one scrollable row on mobile, wrapped on desktop */}
        <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-2.5 md:gap-3 mb-10 md:mb-14 overflow-x-auto md:overflow-visible snap-x snap-proximity -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={(e) => {
                setCatId(c.id);
                e.currentTarget.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
              }}
              aria-pressed={c.id === catId}
              className={`chip-arch shrink-0 snap-center ${c.id === catId ? "chip-arch--active" : "chip-arch--idle"}`}
            >
              <span className="chip-arch__label">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Giant image: desktop only. Hidden on mobile, and the lazy image in
              a display:none column never enters the viewport so it is not
              downloaded on mobile. */}
          <div className="hidden lg:block order-1 lg:order-2 lg:sticky lg:top-28 self-start">
            <div className="relative aspect-[4/5] rounded-[1.6rem] overflow-hidden ring-1 ring-saffron/20 bg-matte">
              <AnimatePresence initial={false}>
                <motion.img
                  key={active.name}
                  src={active.image || FALLBACK_IMAGE}
                  alt={active.name}
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-matte/85 via-matte/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-beige leading-tight">{active.name}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="price text-xl">{priceLabel(active)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dish list */}
          <div className="order-2 lg:order-1">
            {/* Desktop: hover-swap list (drives the sticky image). */}
            <div className="hidden lg:block divide-y divide-beige/10">
              {dishes.map((d) => (
                <button
                  key={d.name}
                  type="button"
                  onMouseEnter={() => setActive(d)}
                  onFocus={() => setActive(d)}
                  onClick={() => setActive(d)}
                  className="w-full text-left py-5 flex items-baseline gap-4 transition-colors"
                >
                  <div className="flex-1">
                    <h3
                      className={`font-serif text-2xl flex items-center gap-2 flex-wrap transition-colors ${
                        active.name === d.name ? "text-saffron" : "text-beige"
                      }`}
                    >
                      {d.name}
                      {d.chefsPick && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-saffron border border-saffron/40 rounded-full px-2 py-0.5">
                          <ChefHat className="size-3" /> Chef's
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-beige/55 mt-1">{d.desc}</p>
                  </div>
                  <span className="price text-lg shrink-0">{priceLabel(d)}</span>
                </button>
              ))}
            </div>

            {/* Mobile: accordion dropdowns. Image loads only when a row expands. */}
            <div className="lg:hidden divide-y divide-beige/10">
              {dishes.map((d, idx) => {
                const open = openIdx === idx;
                return (
                  <div key={d.name}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(open ? null : idx)}
                      aria-expanded={open}
                      className="w-full text-left py-4 flex items-center justify-between gap-3"
                    >
                      <h3 className={`font-serif text-xl flex items-center gap-2 flex-wrap transition-colors ${open ? "text-saffron" : "text-beige"}`}>
                        {d.name}
                        {d.chefsPick && (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-saffron border border-saffron/40 rounded-full px-2 py-0.5">
                            <ChefHat className="size-3" /> Chef's
                          </span>
                        )}
                      </h3>
                      <span className="flex items-center gap-3 shrink-0">
                        <span className="price text-lg">{priceLabel(d)}</span>
                        <ChevronDown className={`size-4 text-saffron transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5">
                            <p className="text-sm text-beige/60">{d.desc}</p>
                            <img
                              src={d.image || FALLBACK_IMAGE}
                              alt={d.name}
                              loading="lazy"
                              className="mt-3 w-full aspect-[4/3] object-cover rounded-2xl ring-1 ring-saffron/15"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
