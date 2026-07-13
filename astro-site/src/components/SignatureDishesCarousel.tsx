import { useRef } from "react";
import { ChevronLeft, ChevronRight, ChefHat, Leaf, Drumstick } from "lucide-react";

// Images live in /public/assets so they resolve from this React island.
// GOES HERE: these dish photos are placeholders to swap after the shoot.
const biryaniMutton = "/assets/biryani-mutton.jpg";
const riceSchezwan = "/assets/rice-schezwan.jpg";
const sigPrawns = "/assets/sig-prawns-biryani.jpg";
const sigKeemaDosa = "/assets/sig-keema-dosa.jpg";
const sigButterChickenDosa = "/assets/sig-butter-chicken-dosa.jpg";
const imgNattuKodiFryBiryani = "/assets/dishes/nattu-kodi-fry-biryani.jpg";
const imgBenneDosa = "/assets/dishes/benne-dosa.jpg";
const imgBennePodiDosa = "/assets/dishes/benne-podi-dosa.jpg";
const imgChickenVindolaDosa = "/assets/dishes/chicken-vindola-dosa.jpg";
const imgPizzaDosa = "/assets/dishes/pizza-dosa.jpg";
const imgDevilChickenNoodles = "/assets/dishes/devil-chicken-noodles.jpg";
const imgJumboWings = "/assets/dishes/jumbo-wings.jpg";

type Dish = {
  name: string;
  tagline: string;
  price: string;
  image: string;
  veg: boolean;
  chefSpecial?: boolean;
};

const DISHES: Dish[] = [
  { name: "Thalapakattu Mutton Biryani", tagline: "Dark Dindigul masala, slow-cooked mutton", price: "17.99", image: biryaniMutton, veg: false, chefSpecial: true },
  { name: "Nattu Kodi Fry Biryani", tagline: "Country chicken slow-fried with aromatic basmati", price: "17.99", image: imgNattuKodiFryBiryani, veg: false, chefSpecial: true },
  { name: "Prawns Fry Biryani", tagline: "Coastal-spiced prawns, aged basmati", price: "17.99", image: sigPrawns, veg: false, chefSpecial: true },
  { name: "Benne Dosa Plain", tagline: "Karnataka butter dosa, soft inside, crisp edges", price: "9.99", image: imgBenneDosa, veg: true, chefSpecial: true },
  { name: "Benne Ghee Podi Dosa", tagline: "Butter dosa dusted with spicy ghee podi", price: "13.99", image: imgBennePodiDosa, veg: true, chefSpecial: true },
  { name: "Mutton Keema Dosa", tagline: "Crisp dosa rolled with spiced mince", price: "12.99", image: sigKeemaDosa, veg: false, chefSpecial: true },
  { name: "Butter Chicken Dosa", tagline: "Creamy butter chicken in a golden crepe", price: "13.99", image: sigButterChickenDosa, veg: false, chefSpecial: true },
  { name: "Chicken Vindola Dosa", tagline: "Tangy Goan-style vindaloo chicken in a crisp dosa", price: "12.99", image: imgChickenVindolaDosa, veg: false, chefSpecial: true },
  { name: "Pizza Dosa", tagline: "Indo-fusion cheese, capsicum and house masala on dosa", price: "13.99", image: imgPizzaDosa, veg: true, chefSpecial: true },
  { name: "Devil Chicken Fried Rice", tagline: "Fiery chili-oil glazed basmati, slow-building heat", price: "18.99", image: riceSchezwan, veg: false, chefSpecial: true },
  { name: "Devil Chicken Noodles", tagline: "Chili-lacquered Hakka noodles with devil chicken", price: "18.99", image: imgDevilChickenNoodles, veg: false, chefSpecial: true },
  { name: "Indian Crispy Fry (Jumbo Wings)", tagline: "Oversized wings, crisp-fried, tossed in house masala", price: "16.99", image: imgJumboWings, veg: false, chefSpecial: true },
];

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
              className="group relative shrink-0 snap-center sm:snap-start w-[80vw] sm:w-[52vw] md:w-[340px] lg:w-[320px] rounded-[1.4rem] overflow-hidden bg-matte ring-1 ring-saffron/15 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)] transition-all duration-500 hover:ring-saffron/40 hover:-translate-y-1"
            >
              {/* IMAGE GOES HERE: swap this dish photo after the shoot. */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <VegMark veg={dish.veg} />
                  {dish.chefSpecial && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-saffron bg-matte/80 backdrop-blur-sm border border-saffron/50 rounded-full px-3 py-1">
                      <ChefHat className="size-3" /> Chef Special
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="font-serif text-2xl leading-tight text-beige">{dish.name}</h3>
                <p className="mt-2 text-sm text-beige/60 leading-relaxed line-clamp-2">{dish.tagline}</p>
                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-beige/50">From</span>
                  <span className="price text-xl leading-none">${dish.price}</span>
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
