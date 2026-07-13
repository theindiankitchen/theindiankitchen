import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, ChevronDown } from "lucide-react";

type Row = [name: string, desc: string, price: string];

const MENU: Record<string, Row[]> = {
  "Biryani & Rice": [
    ["Chicken Dum Biryani", "Bone-in, slow-cooked Hyderabadi dum", "16.99"],
    ["Chicken Fry Piece Biryani", "Bone-in, marinated fry pieces", "17.99"],
    ["Mughlai Chicken Biryani", "Boneless, royal Mughlai spices", "17.99"],
    ["Chicken Donne Biryani", "Bangalore military-style, bone-in (weekends)", "16.99"],
    ["Thalapakattu Mutton Biryani", "Chef's special, Dindigul-style", "17.99"],
    ["Bezawada Chicken Biryani", "Boneless, Andhra fire", "17.99"],
    ["Butter Chicken Biryani", "Boneless, creamy & rich", "17.99"],
    ["Paneer Ghee Roast Biryani", "Ghee-roasted cottage cheese", "16.49"],
    ["Mixed Vegetable Biryani", "Seasonal vegetables, basmati", "15.99"],
    ["Egg Fry Biryani", "Two eggs, fragrant rice", "15.99"],
    ["Nattu Kodi Fry Biryani", "Country chicken, chef's special", "17.99"],
    ["Prawns Fry Biryani", "Chef's special, coastal spices", "17.99"],
    ["Jeera Rice / Dal Tadka", "Served with papad & pickle", "16.99"],
    ["Sambar Rice", "Served with papad & pickle", "11.99"],
    ["Curd Rice", "Tempered, cooling", "9.99"],
    ["Chepala Pulusu with White Rice", "Andhra fish tamarind curry", "18.99"],
    ["Bendi Royala Pulusu with White Rice", "Okra & prawn tangy curry", "18.99"],
  ],
  Appetizers: [
    ["Hyd Chicken 65 (Wet)", "Hyderabadi street classic", "15.99"],
    ["Desi Chicken 65 (Dry)", "Crisp, spicy, curry-leaf tossed", "15.99"],
    ["Kaju Chicken Pakodi", "Cashew-crusted chicken bites", "16.99"],
    ["Velli Ulli Karam Chicken", "Spicy onion-garlic masala", "16.99"],
    ["Indian Kitchen Spcl Chicken", "House special preparation", "17.99"],
    ["Mutton Chukka Fry", "Boneless, dry-roasted", "17.99"],
    ["Ghee Roast Mutton", "Aromatic ghee & spices", "17.99"],
    ["Paneer Velli Ulli Karam", "Onion-garlic paneer", "15.99"],
    ["Crispy Prawn Fry", "Golden, crunchy, spiced", "17.99"],
    ["Kerala Pepper Prawn", "Black pepper, curry leaves", "17.99"],
    ["Butter Garlic Prawn", "Buttery, garlicky finish", "17.99"],
    ["Gobi 65", "Crispy spiced cauliflower", "14.99"],
    ["Crispy Corn", "Sweet corn, masala-tossed", "14.99"],
  ],
  Tiffins: [
    ["Plain Idly (3 pc)", "Steamed rice cakes", "7.99"],
    ["Sambar Idly (2 pc)", "Soaked in lentil sambar", "8.99"],
    ["Ghee Karam Idly (3 pc)", "Ghee & spice powder", "8.99"],
    ["Plain Vada (3 pc)", "Crisp lentil donuts", "7.99"],
    ["Sambar Vada (2 pc)", "Vada in sambar", "8.99"],
    ["Dahi Vada (2 pc)", "Yogurt, tamarind, chutneys", "9.99"],
    ["Plain Dosa", "Classic crisp crepe", "7.99"],
    ["Ghee Roast Dosa", "Golden, ghee-laced", "8.99"],
    ["Paper / 70mm Dosa", "Extra long, paper-thin", "12.99"],
    ["Ghee Podi Dosa", "Spiced lentil podi", "10.99"],
    ["Onion Dosa", "Caramelised onion", "9.99"],
    ["Masala Dosa", "Potato masala filling", "10.99"],
    ["Mysore Dosa Plain", "Red chutney lined", "9.99"],
    ["Mysore Masala Dosa", "Red chutney & potato", "11.99"],
    ["Benne Dosa Plain", "Chef's special, butter-roast", "9.99"],
    ["Benne Ghee Podi Dosa", "Chef's special, ghee & podi", "13.99"],
    ["Mutton Keema Dosa", "Chef's special, spiced mince", "12.99"],
    ["Butter Chicken Dosa", "Chef's special, creamy filling", "13.99"],
    ["Chicken Vindola Dosa", "Chef's special, Goan heat", "12.99"],
    ["Dosa with Chicken Curry", "Served with curry on side", "13.99"],
    ["Dosa with Mutton Curry", "Served with curry on side", "15.99"],
    ["Pizza Dosa", "Chef's special, cheese-loaded", "13.99"],
    ["Kids / Cone Dosa", "Fun cone-shaped dosa", "9.99"],
    ["Double Egg Karam Dosa", "Two eggs, spice rub", "12.99"],
    ["Cheese Dosa", "Melted cheese centre", "12.99"],
    ["Guntur Karam Dosa", "Andhra chilli heat", "12.99"],
    ["Paneer Dosa", "Spiced paneer filling", "12.99"],
    ["Rava Dosa Plain", "Crisp semolina crepe", "7.99"],
    ["Rava Onion Dosa", "Onion & semolina", "9.99"],
    ["Rava Masala Dosa", "Semolina with masala", "10.99"],
    ["Uttapam Plain", "Thick savoury pancake", "7.99"],
    ["Uttapam Onion", "Onion-topped", "9.99"],
    ["Uttapam Masala", "Masala-topped", "10.99"],
    ["Pesarattu (2 pc)", "Andhra green-gram crepe", "11.99"],
    ["Puri (3 pc)", "Fluffy fried bread", "10.99"],
    ["Aamras Puri (3 pc)", "Served with mango pulp", "12.99"],
    ["Keema Puri (3 pc)", "Served with mutton mince", "12.99"],
    ["Puri with Mutton (3 pc)", "Puri & mutton curry", "15.99"],
  ],
  "Street Style": [
    ["Chicken Fried Rice", "Indo-Chinese classic", "15.99"],
    ["Egg Fried Rice", "Wok-tossed eggs & rice", "14.99"],
    ["Veg Fried Rice", "Garden vegetables", "13.99"],
    ["Mixed Meat Fried Rice", "Chicken, mutton & egg", "17.99"],
    ["Devil Chicken Fried Rice", "Chef's special, fiery", "18.99"],
    ["Chicken Noodles", "Hakka-style", "15.99"],
    ["Egg Noodles", "Tossed with eggs", "14.99"],
    ["Veg Noodles", "Crisp vegetables", "13.99"],
    ["Mixed Meat Fried Noodles", "Chicken, mutton & egg", "17.99"],
    ["Devil Chicken Fried Noodles", "Chef's special, fiery", "18.99"],
    ["Desi Butter Chicken", "Rich tomato & cream", "16.99"],
    ["Butter Chicken", "Classic creamy curry", "15.99"],
    ["Desi Mutton Keema", "Spiced minced mutton", "17.99"],
    ["Mutton Kurma", "Slow-simmered gravy", "17.99"],
    ["Chicken Kurma", "Coconut & spice gravy", "16.99"],
    ["Veg Kurma", "Mixed vegetable kurma", "14.99"],
    ["Hyd Chicken 65 + 2 Rumali Roti", "Combo plate", "20.99"],
    ["Chicken Kurma + 2 Parota", "Combo plate", "21.99"],
    ["Mutton Kurma + 2 Parota", "Combo plate", "23.99"],
  ],
  "Bread & Wraps": [
    ["Rumali Roti", "Thin, handkerchief-soft", "3.49"],
    ["Parota", "Flaky layered bread", "3.99"],
    ["Desi Paneer Wrap", "Spiced paneer roll", "15.99"],
  ],
  Snacks: [
    ["Railway Onion Samosa (2 pc)", "Tea-stall classic", "3.00"],
    ["Aloo Samosa (2 pc)", "Spiced potato filling", "3.00"],
    ["Chicken Samosa (2 pc)", "Minced chicken filling", "3.00"],
    ["Chicken Puffs", "Flaky pastry", "1.99"],
    ["Egg Puffs", "Boiled egg, masala", "1.49"],
    ["Paneer Puffs", "Spiced paneer", "1.49"],
    ["Cut Mirchi (3 pc)", "Stuffed green chillies", "9.99"],
    ["Stuffed Bajji (4 pc)", "Fritter favourite", "11.99"],
  ],
  Soups: [
    ["Chicken Kodi Charu", "Andhra chicken broth", "7.99"],
    ["Mutton Bone Soup", "A must-try", "8.99"],
    ["Macho Veg", "Indo-Chinese clear soup", "5.99"],
    ["Macho Chicken", "Indo-Chinese clear soup", "6.99"],
    ["Macho Egg", "Indo-Chinese clear soup", "6.49"],
  ],
  Drinks: [
    ["Chicko Shake (Special)", "House signature shake", "6.99"],
    ["Custard Apple Shake", "Seasonal sitaphal", "6.99"],
    ["Strawberry Milk", "Fresh & creamy", "8.99"],
    ["Special Badam Milk", "Almond, saffron, cardamom", "6.99"],
    ["Rose Milk", "Chilled rose syrup", "6.99"],
    ["Exotic Milk Shake", "Premium fruit blend", "10.99"],
    ["Irani / Kadak Tea", "Strong & aromatic", "3.49"],
    ["Madras Filter Coffee", "South Indian decoction", "3.49"],
    ["Mohabbat Ka Sharbat", "Watermelon & rose", "5.99"],
  ],
  Desserts: [
    ["Special Double Ka Meetha", "Hyderabadi bread pudding", "6.99"],
    ["Rasmalai", "Saffron milk, pistachio", "6.99"],
    ["Gulab Jamun", "Warm cardamom syrup", "6.99"],
    ["Gajar Halwa", "Slow-cooked carrot & ghee", "6.99"],
    ["Watermelon Halwa", "House specialty", "7.99"],
  ],
};

// GOES HERE: these are placeholder dish photos assigned per category so the
// hover image swap is visible. Replace each with the real photo for that exact
// dish after the shoot (one image per dish).
const POOLS: Record<string, string[]> = {
  // One image per dish, aligned 1:1 with the dish order above.
  "Biryani & Rice": ["/assets/biryani-hyderabadi.jpg", "/assets/dishes/chicken-fry-piece-biryani.jpg", "/assets/dishes/mughlai-chicken-biryani.jpg", "/assets/biryani-donne.jpg", "/assets/biryani-mutton.jpg", "/assets/dishes/bezawada-chicken-biryani.jpg", "/assets/dishes/butter-chicken-biryani.jpg", "/assets/biryani-paneer.jpg", "/assets/biryani-veg-dum.jpg", "/assets/dishes/egg-fry-biryani.jpg", "/assets/dishes/nattu-kodi-fry-biryani.jpg", "/assets/dishes/prawns-fry-biryani-menu.jpg", "/assets/dishes/jeera-rice-dal-tadka.jpg", "/assets/dishes/sambar-rice.jpg", "/assets/dishes/curd-rice.jpg", "/assets/dishes/chepala-pulusu.jpg", "/assets/dishes/bendi-royala-pulusu.jpg"],
  Appetizers: ["/assets/menu-appetizer-hero.jpg", "/assets/dishes/desi-chicken-65.jpg", "/assets/dishes/kaju-chicken-pakodi.jpg", "/assets/dishes/velli-ulli-karam-chicken.jpg", "/assets/dishes/indian-kitchen-special-chicken.jpg", "/assets/dishes/mutton-chukka-fry.jpg", "/assets/dishes/ghee-roast-mutton-menu.jpg", "/assets/dishes/paneer-velli-ulli-karam.jpg", "/assets/dishes/crispy-prawn-fry.jpg", "/assets/dishes/kerala-pepper-prawn.jpg", "/assets/dishes/butter-garlic-prawn.jpg", "/assets/dishes/gobi-65.jpg", "/assets/dishes/crispy-corn.jpg"],
  Tiffins: ["/assets/dishes/plain-idly.jpg", "/assets/dishes/sambar-idly.jpg", "/assets/dishes/ghee-karam-idly.jpg", "/assets/dishes/plain-vada.jpg", "/assets/dishes/sambar-vada.jpg", "/assets/dishes/dahi-vada.jpg", "/assets/dishes/plain-dosa.jpg", "/assets/dishes/ghee-roast-dosa.jpg", "/assets/dishes/paper-dosa.jpg", "/assets/dishes/ghee-podi-dosa.jpg", "/assets/dishes/onion-dosa.jpg", "/assets/menu-dosa-hero.jpg", "/assets/dishes/mysore-dosa.jpg", "/assets/dishes/mysore-masala-dosa.jpg", "/assets/dishes/benne-dosa.jpg", "/assets/dishes/benne-podi-dosa.jpg", "/assets/dishes/mutton-keema-dosa-menu.jpg", "/assets/dishes/butter-chicken-dosa-menu.jpg", "/assets/dishes/chicken-vindola-dosa.jpg", "/assets/dishes/dosa-chicken-curry.jpg", "/assets/dishes/dosa-mutton-curry.jpg", "/assets/dishes/pizza-dosa.jpg", "/assets/dishes/cone-dosa.jpg", "/assets/dishes/double-egg-karam-dosa.jpg", "/assets/dishes/cheese-dosa.jpg", "/assets/dishes/guntur-karam-dosa.jpg", "/assets/dishes/paneer-dosa.jpg", "/assets/dishes/rava-dosa.jpg", "/assets/dishes/rava-onion-dosa.jpg", "/assets/dishes/rava-masala-dosa.jpg", "/assets/dishes/uttapam-plain.jpg", "/assets/dishes/uttapam-onion.jpg", "/assets/dishes/uttapam-masala.jpg", "/assets/dishes/pesarattu.jpg", "/assets/dishes/puri.jpg", "/assets/dishes/aamras-puri.jpg", "/assets/dishes/keema-puri.jpg", "/assets/dishes/puri-mutton.jpg"],
  "Street Style": ["/assets/rice-fried.jpg", "/assets/dishes/egg-fried-rice.jpg", "/assets/dishes/veg-fried-rice.jpg", "/assets/dishes/mixed-meat-fried-rice.jpg", "/assets/rice-schezwan.jpg", "/assets/dishes/chicken-noodles.jpg", "/assets/dishes/egg-noodles.jpg", "/assets/dishes/veg-noodles.jpg", "/assets/dishes/mixed-meat-noodles.jpg", "/assets/dishes/devil-chicken-noodles.jpg", "/assets/dishes/butter-chicken-wrap.jpg", "/assets/dishes/butter-chicken-biryani.jpg", "/assets/dishes/mutton-keema-wrap.jpg", "/assets/dishes/mutton-kurma.jpg", "/assets/dishes/chicken-kurma.jpg", "/assets/dishes/veg-kurma.jpg", "/assets/dishes/hyd65-rumali.jpg", "/assets/dishes/chicken-kurma-parota.jpg", "/assets/dishes/mutton-kurma-parota.jpg"],
  "Bread & Wraps": ["/assets/dishes/rumali-roti.jpg", "/assets/dishes/parota.jpg", "/assets/dishes/paneer-wrap.jpg"],
  Snacks: ["/assets/dishes/aloo-samosa.jpg", "/assets/dishes/aloo-samosa.jpg", "/assets/dishes/chicken-samosa.jpg", "/assets/dishes/chicken-puffs.jpg", "/assets/dishes/egg-puffs.jpg", "/assets/dishes/paneer-puffs.jpg", "/assets/dishes/cut-mirchi.jpg", "/assets/dishes/stuffed-bajji.jpg"],
  Soups: ["/assets/dishes/chicken-kodi-charu.jpg", "/assets/menu-soup-hero.jpg", "/assets/dishes/macho-veg-soup.jpg", "/assets/dishes/macho-chicken-soup.jpg", "/assets/dishes/macho-egg-soup.jpg"],
  Drinks: ["/assets/dishes/chickoo-shake.jpg", "/assets/dishes/custard-apple-shake.jpg", "/assets/dishes/strawberry-milk.jpg", "/assets/dishes/badam-milk.jpg", "/assets/dishes/rose-milk.jpg", "/assets/menu-drinks-hero.jpg", "/assets/dishes/irani-tea.jpg", "/assets/dishes/filter-coffee.jpg", "/assets/dishes/mohabbat-ka-sharbat.jpg"],
  Desserts: ["/assets/menu-desserts-hero.jpg", "/assets/dishes/rasmalai.jpg", "/assets/dishes/gulab-jamun.jpg", "/assets/dishes/gajar-halwa.jpg", "/assets/dishes/watermelon-halwa.jpg"],
};

type Dish = { name: string; desc: string; price: string; image: string };

function dishesFor(cat: string): Dish[] {
  const pool = POOLS[cat] ?? [];
  // No modulo wrap: each dish takes its own aligned image, or a neutral
  // fallback. This makes "dish N shows dish N+1 (or the first) image" impossible.
  return MENU[cat].map(([name, desc, price], i) => ({
    name,
    desc,
    price,
    image: pool[i] ?? "/assets/hero-spread.jpg",
  }));
}

const isChef = (desc: string) => /Chef|Special|Spcl|signature|must try/i.test(desc);

export default function MenuPreview() {
  const cats = Object.keys(MENU);
  const [cat, setCat] = useState(cats[0]);
  const dishes = useMemo(() => dishesFor(cat), [cat]);
  const [active, setActive] = useState<Dish>(dishes[0]);
  // Mobile accordion: index of the currently open row (one at a time).
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    setActive(dishes[0]);
    setOpenIdx(null);
  }, [cat]);

  return (
    <section id="menu" className="py-24 md:py-32 bg-olive text-beige relative">
      <div className="container-x">
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Our Menu</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">A taste of every region.</h2>
        </div>

        {/* Chamfered category chips: one scrollable row on mobile, wrapped on desktop */}
        <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-2.5 md:gap-3 mb-10 md:mb-14 overflow-x-auto md:overflow-visible snap-x snap-proximity -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={(e) => {
                setCat(c);
                e.currentTarget.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
              }}
              aria-pressed={c === cat}
              className={`chip-arch shrink-0 snap-center ${c === cat ? "chip-arch--active" : "chip-arch--idle"}`}
            >
              <span className="chip-arch__label">{c}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Giant image: desktop only. Hidden on mobile, and the lazy image in
              a display:none column never enters the viewport so it is not
              downloaded on mobile. */}
          <div className="hidden lg:block order-1 lg:order-2 lg:sticky lg:top-28 self-start">
            <div className="relative aspect-[4/5] rounded-[1.6rem] overflow-hidden ring-1 ring-saffron/20 bg-matte">
              {/* IMAGE GOES HERE: giant dish image, crossfades on hover, swap per dish. */}
              <AnimatePresence initial={false}>
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt={active.name}
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-matte/85 via-matte/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-beige leading-tight">{active.name}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="price text-xl">${active.price}</span>
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
                      {isChef(d.desc) && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-saffron border border-saffron/40 rounded-full px-2 py-0.5">
                          <ChefHat className="size-3" /> Chef's
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-beige/55 mt-1">{d.desc}</p>
                  </div>
                  <span className="price text-lg shrink-0">${d.price}</span>
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
                        {isChef(d.desc) && (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-saffron border border-saffron/40 rounded-full px-2 py-0.5">
                            <ChefHat className="size-3" /> Chef's
                          </span>
                        )}
                      </h3>
                      <span className="flex items-center gap-3 shrink-0">
                        <span className="price text-lg">${d.price}</span>
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
                            {/* IMAGE GOES HERE: dish image, loads only when the row is expanded. */}
                            <img
                              src={d.image}
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
