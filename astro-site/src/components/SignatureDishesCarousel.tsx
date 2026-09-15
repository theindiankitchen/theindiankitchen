import { useRef } from "react";
import { ChevronLeft, ChevronRight, ChefHat, Leaf, Drumstick } from "lucide-react";
import { CATEGORIES } from "../data/menu";

// Dish photos live in /public/assets so they resolve from this React island.
const sigKeemaDosa = "/assets/sig-keema-dosa.jpg";
const sigButterChickenDosa = "/assets/sig-butter-chicken-dosa.jpg";
const imgBenneDosa = "/assets/dishes/benne-dosa.jpg";
const imgBennePodiDosa = "/assets/dishes/benne-podi-dosa.jpg";
const imgGunturKaaramDosa = "/assets/dishes/guntur-karam-dosa.jpg";
const imgPizzaDosa = "/assets/dishes/pizza-dosa.jpg";

type Dish = {
  name: string;
  /** Menu-data key for price/veg lookup when the display name differs. */
  menuName?: string;
  tagline: string;
  price: string;
  image: string;
  veg: boolean;
  chefSpecial?: boolean;
  availability?: string;
};

// Every card resolves its price and veg flag from the menu data so a signature
// card can never drift from the menu page. Biryanis carry dual For 1 / For 3
// pricing; the card has room for one figure, so we show the For 1 price (the
// card already prefixes it with "From").
const MENU_BY_NAME = new Map(CATEGORIES.flatMap((c) => c.items).map((i) => [i.name, i] as const));
function fromMenu(name: string) {
  // Fail loud at build time. A miss means a card has drifted from the menu data,
  // and a silent wrong price is worse than a broken build.
  const it = MENU_BY_NAME.get(name);
  if (!it) throw new Error(`Signature dish not found in menu data: ${name}`);
  return { price: it.priceFor1 ?? it.price ?? "", veg: it.veg ?? false };
}

// Normalise any stored figure to a dollar sign and two decimals at render time.
function formatPrice(raw: string): string {
  const n = parseFloat(raw);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : raw;
}

const SIGNATURE: Omit<Dish, "price" | "veg">[] = [
  { name: "Madurai SPL Mutton Biryani", tagline: "Madurai-style mutton, rich and deeply spiced", image: "/assets/dishes/madurai-spl-mutton-biryani.png", chefSpecial: true, availability: "Weekends Only" },
  { name: "Chicken Fry Piece Biryani", tagline: "Boneless fry pieces layered with aged basmati", image: "/assets/dishes/chicken-fry-piece-biryani.jpg", chefSpecial: true },
  { name: "Poori with Chicken (3pc)", tagline: "Puffed pooris with a spiced chicken curry.", image: "/assets/dishes/poori-with-chicken.png", chefSpecial: true },
  { name: "Benne Dosa Plain", menuName: "Benne Dosa Plain with Ghee", tagline: "Karnataka butter dosa, soft inside, crisp edges", image: imgBenneDosa, chefSpecial: true },
  { name: "Benne Ghee Podi Dosa", menuName: "Benne Ghee Podi Dosa (2pcs)", tagline: "Butter dosa dusted with spicy ghee podi", image: imgBennePodiDosa, chefSpecial: true },
  { name: "Mutton Keema Dosa", menuName: "Mutton Kheema Dosa", tagline: "Crisp dosa rolled with spiced mince", image: sigKeemaDosa, chefSpecial: true },
  { name: "Butter Chicken Dosa", tagline: "Creamy butter chicken in a golden crepe", image: sigButterChickenDosa, chefSpecial: true },
  { name: "Guntur Kaaram Dosa", tagline: "Andhra chili powder painted across a ghee-roasted dosa", image: imgGunturKaaramDosa, chefSpecial: true },
  { name: "Pizza Dosa", menuName: "Pizza Dosa - Chef Spcl", tagline: "Indo-fusion cheese, capsicum and house masala on dosa", image: imgPizzaDosa, chefSpecial: true },
  { name: "Mutton Chukka Fry", tagline: "Boneless mutton dry-roasted with black pepper and spice", image: "/assets/dishes/mutton-chukka-fry.jpg", chefSpecial: true },
  { name: "Chicken Nutty Kurma Wrap", tagline: "Country chicken kurma rolled in flaky parota.", image: "/assets/dishes/chicken-natti-kurma-wrap.png", chefSpecial: true },
  { name: "House Special Prawns", tagline: "Golden, crunchy, deeply spiced prawn bites", image: "/assets/dishes/crispy-prawn-fry.jpg", chefSpecial: true },
];

const DISHES: Dish[] = SIGNATURE.map((d) => ({ ...d, ...fromMenu(d.menuName ?? d.name) }));

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center size-6 rounded-sm border ${
        veg ? "border-emerald-500/70" : "border-red-500/70"
      }`}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      {veg ? <Leaf className="size-3.5 text-emerald-500" /> : <Drumstick className="size-3.5 text-red-500" />}
    </span>
  );
}

export default function SignatureDishesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="signature" className="relative py-24 md:py-32 bg-cream-cover text-olive overflow-hidden">
      <div className="container-x relative">
        <div className="max-w-2xl text-center md:text-left">
          <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Chef's Signatures</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 leading-[1.05] text-olive">
            Signature Dishes
          </h2>
          <p className="mt-5 text-olive/75 text-base md:text-lg leading-relaxed">
            Our most loved specialties, crafted with authentic recipes and bold, considered flavour.
          </p>
        </div>
      </div>

      <div className="mt-12 relative">
        <div
          ref={scrollerRef}
          className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {DISHES.map((dish) => (
            <article
              key={dish.name}
              data-card
              className="group relative shrink-0 snap-center sm:snap-start w-[80vw] sm:w-[52vw] md:w-[340px] lg:w-[320px] rounded-[1.4rem] overflow-hidden bg-olive ring-1 ring-saffron/15 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)] transition-all duration-500 hover:ring-saffron/40 hover:-translate-y-1"
            >
              {/* Empty src falls back to a gradient placeholder. */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {dish.image ? (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="size-full bg-linear-to-b from-olive to-matte" />
                )}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <VegMark veg={dish.veg} />
                  <div className="flex flex-col items-end gap-2">
                    {dish.chefSpecial && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-saffron bg-matte/80 backdrop-blur-sm border border-saffron/50 rounded-full px-3 py-1">
                        <ChefHat className="size-3" /> Chef Special
                      </span>
                    )}
                    {dish.availability && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-beige bg-matte/80 backdrop-blur-sm border border-beige/40 rounded-full px-3 py-1">
                        {dish.availability}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="font-serif text-2xl leading-tight text-beige">{dish.name}</h3>
                <p className="mt-2 text-sm text-beige/60 leading-relaxed line-clamp-2">{dish.tagline}</p>
                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-beige/50">From</span>
                  <span className="price text-xl leading-none">{formatPrice(dish.price)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Arrows at the horizontal edges, vertically centered. */}
        <ArrowButton dir={-1} onClick={() => nudge(-1)} label="Previous dish" />
        <ArrowButton dir={1} onClick={() => nudge(1)} label="Next dish" />
      </div>
    </section>
  );
}

function ArrowButton({ dir, onClick, label }: { dir: 1 | -1; onClick: () => void; label: string }) {
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
