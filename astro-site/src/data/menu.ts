// Full menu data, rebuilt from the client's new official printed menu.
// This file is the single source of truth for every dish, price and section on
// the site. Both the menu page (menu.astro via CinematicMenuSection) and the
// homepage preview (MenuPreview) derive from the CATEGORIES manifest below.

export type MenuVariant = { name: string; price: string };

export type MenuItem = {
  name: string;
  desc: string;
  /** Single price, already dollar-formatted without the sign, e.g. "16.99". */
  price?: string;
  /** Dual portion pricing (biryanis). Both are shown, clearly labelled. */
  priceFor1?: string;
  priceFor3?: string;
  /** Variant pricing, each choice at its own price. */
  variants?: MenuVariant[];
  /** Same-price choices noted on one dish, not split into many. */
  options?: string[];
  /** Printed availability note, e.g. "Weekends Only". */
  availability?: string;
  spice?: 0 | 1 | 2 | 3;
  veg?: boolean;
  image?: string;
  popular?: boolean;
  /** Layout flag only: renders a larger hero card in its section. */
  featured?: boolean;
  /** Explicit Chef's Pick badge. Set only where the print says Chef SPL. */
  chefsPick?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  /** Printed section subtitle, e.g. "Non-Veg, Bone In". */
  subtitle?: string;
  kicker: string;
  intro?: string;
  items: MenuItem[];
};

// Compact price label for the homepage preview spans. The menu-page card
// renders the full breakdown itself (see CinematicMenuSection).
export function priceLabel(item: MenuItem): string {
  if (item.priceFor1 && item.priceFor3) return `$${item.priceFor1} / $${item.priceFor3}`;
  if (item.variants && item.variants.length) {
    const nums = item.variants.map((v) => parseFloat(v.price)).filter((n) => !Number.isNaN(n));
    if (nums.length) return `From $${Math.min(...nums).toFixed(2)}`;
  }
  return item.price ? `$${item.price}` : "";
}

export const CATEGORIES: MenuCategory[] = [
  {
    id: "soups",
    label: "Soups",
    kicker: "Comfort, Slow Simmered",
    intro: "Restorative, aromatic broths served piping hot in rustic bowls.",
    items: [
      { name: "Kodi Chaaru", desc: "Andhra-style spiced chicken broth, rustic, aromatic, restorative.", price: "5.99", spice: 2, veg: false, image: "/assets/dishes/chicken-kodi-charu.jpg" },
      { name: "Mutton Bone Soup", desc: "Slow-simmered marrow broth with whole spices and pepper.", price: "5.99", spice: 2, veg: false, image: "/assets/menu-soup-hero.jpg", popular: true, featured: true },
      { name: "Sweetcorn Soup", desc: "Sweet corn in a light, clear broth.", price: "5.99", spice: 1, veg: true, image: "/assets/dishes/sweetcorn-soup.png"},
      { name: "Hot & Sour", desc: "Peppery, tangy Indo-Chinese soup.", price: "5.99", spice: 2, image: "/assets/dishes/hot-and-sour-soup.png" },
      { name: "Manchow Soup", desc: "Indo-Chinese veg soup with garlic and pepper kick.", price: "5.99", spice: 1, veg: true, image: "/assets/dishes/manchow-soup.png" },
    ],
  },
  {
    id: "quick-snacks",
    label: "Quick Snacks",
    kicker: "Tea Time, Irani Cafe",
    intro: "Station-style bites, sharp samosas, stuffed chilies and salty-sweet biscuits.",
    items: [
      { name: "Railway Onion Samosa (2pcs)", desc: "Hyderabad station-style, small, sharp, with green chutney.", price: "3.00", spice: 2, veg: true, image: "/assets/menu-snacks-hero.jpg", popular: true, featured: true },
      { name: "Aaloo Samosa (2pcs)", desc: "Classic potato samosa with mint-tamarind chutneys.", price: "3.00", spice: 1, veg: true, image: "/assets/dishes/aloo-samosa.jpg" },
      { name: "Chicken Samosa (2pcs)", desc: "Triangular pockets with juicy spiced chicken keema.", price: "5.00", spice: 2, veg: false, image: "/assets/dishes/chicken-samosa.jpg" },
      { name: "Cut Mirchi Crisp", desc: "Long chilies, slit, stuffed, dipped and fried.", price: "8.99", spice: 3, veg: true, image: "/assets/dishes/cut-mirchi.jpg" },
      { name: "Stuffed Bajji (4pcs)", desc: "Stuffed bajji fritters, crisp shell, soft heart.", price: "10.99", spice: 2, veg: true, image: "/assets/dishes/stuffed-bajji.jpg" },
      { name: "Osmania Biscuits (2pcs)", desc: "Hyderabad Irani cafe staple, buttery, salty-sweet.", price: "1.00", spice: 0, veg: true, image: "/assets/dishes/osmania-biscuits.jpg" },
    ],
  },
  {
    id: "veg-starters",
    label: "Veg Starters",
    kicker: "Sizzling, Small Plates",
    intro: "Crisp, deeply spiced vegetarian openers, built for sharing.",
    items: [
      { name: "Gobi 65, Dry", desc: "Crispy spiced cauliflower, vegetarian Hyderabadi classic.", price: "14.99", spice: 2, veg: true, image: "/assets/dishes/gobi-65.jpg", featured: true },
      { name: "Crispy Baby Corn", desc: "Sweet corn tossed in chili-salt masala.", price: "16.99", spice: 2, veg: true, image: "/assets/dishes/crispy-corn.jpg" },
      { name: "Paneer Velli Ulli Karam", desc: "Paneer in spicy onion-garlic masala.", price: "16.49", spice: 2, veg: true, image: "/assets/dishes/paneer-velli-ulli-karam.jpg" },
    ],
  },
  {
    id: "non-veg-starters",
    label: "Non-Veg Starters",
    kicker: "Sizzling, Small Plates",
    intro: "Bite-sized and dialled for heat, from Hyderabadi 65 to coastal prawns.",
    items: [
      { name: "Hyderabadi Chicken 65", desc: "Hyderabadi street classic, crisp, red-spiced, curry-leaf tossed.", price: "16.49", spice: 3, veg: false, image: "/assets/menu-appetizer-hero.jpg", popular: true, featured: true },
      { name: "Desi Chicken 65 (Dry)", desc: "Crisp, dry-tossed in chili and curry leaf.", price: "16.49", spice: 3, veg: false, image: "/assets/dishes/desi-chicken-65.jpg" },
      { name: "Famous Cashew Chicken Pakodi", desc: "Cashew-crusted chicken bites, golden and crunchy.", price: "16.99", spice: 2, veg: false, image: "/assets/dishes/kaju-chicken-pakodi.jpg" },
      { name: "Spiced Garlic Chicken", desc: "Spicy onion-garlic masala glazed over crisp chicken.", price: "16.99", spice: 3, veg: false, image: "/assets/dishes/velli-ulli-karam-chicken.jpg" },
      { name: "Mutton Chukka Fry", desc: "Boneless mutton dry-roasted with black pepper and spice.", price: "18.99", spice: 3, veg: false, image: "/assets/dishes/mutton-chukka-fry.jpg" },
      { name: "Mutton Ghee Roast", desc: "Aromatic ghee-roasted mutton with toasted whole spices.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/ghee-roast-mutton-menu.jpg" },
      { name: "Fried Chicken Wings", desc: "Oversized wings, crisp-fried and tossed in house masala.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/jumbo-wings.jpg" },
      { name: "Garlic Prawn Fry", desc: "Buttery, garlicky finish on tender prawns.", price: "18.99", spice: 1, veg: false, image: "/assets/dishes/butter-garlic-prawn.jpg" },
      { name: "House Special Prawns", desc: "Golden, crunchy, deeply spiced prawn bites.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/crispy-prawn-fry.jpg" },
      { name: "Chicken Lollipop", desc: "Frenched chicken wings, batter-fried and tossed to order.", price: "16.99", spice: 2, veg: false, options: ["Masala", "Classic"], image: "/assets/dishes/chicken-lollipop.png" },
    ],
  },
  {
    id: "curries",
    label: "Curries",
    kicker: "Mains, Slow Built",
    intro: "Slow-built gravies, coconut-cashew kurmas and home-style curries.",
    items: [
      { name: "Veg Kurma", desc: "Seasonal vegetables in a mild coconut-cashew gravy.", price: "14.99", spice: 1, veg: true, image: "/assets/dishes/veg-kurma.jpg" },
      { name: "Butter Chicken", desc: "Creamy, mildly spiced tomato-butter gravy with tender chicken.", price: "15.99", spice: 1, veg: false, image: "/assets/menu-curry-hero.jpg", popular: true, featured: true },
      { name: "Mutton Kurma", desc: "Slow-cooked mutton in rich coconut-cashew masala.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/mutton-kurma.jpg" },
      { name: "Chicken Curry", desc: "Coconut-cashew gravy, fragrant with whole spices.", price: "15.99", spice: 2, veg: false, image: "/assets/dishes/chicken-kurma.jpg" },
      { name: "Mutton Curry", desc: "Slow-cooked mutton in a home-style Andhra gravy.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/mutton-curry.png" },
    ],
  },
  {
    id: "indo-chinese",
    label: "Indo-Chinese",
    kicker: "Street Style, Wok Fired",
    intro: "High-flame wok cookery, smoky, glossy, unmistakably Indo-Chinese.",
    items: [
      { name: "Street Style Fried Rice", desc: "Wok-tossed at high flame with scallions and soy glaze.", spice: 2, variants: [ { name: "Veg", price: "13.99" }, { name: "Egg", price: "14.99" }, { name: "Chicken", price: "15.99" } ], image: "/assets/rice-fried.jpg", popular: true, featured: true },
      { name: "Street Style Noodles", desc: "Hakka-style noodles tossed at high flame with chili and soy.", spice: 2, variants: [ { name: "Veg", price: "13.99" }, { name: "Egg", price: "14.99" }, { name: "Chicken", price: "15.99" } ], image: "/assets/dishes/chicken-noodles.jpg" },
      { name: "Mixed Meat Fried", desc: "Chicken, egg and prawn wok-tossed with smoky garlic.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/mixed-meat-fried-rice.jpg" },
      { name: "Devil Chicken Fried", desc: "Fiery chili-oil glaze, slow-building Indo-Chinese heat.", price: "21.99", spice: 3, veg: false, image: "/assets/rice-schezwan.jpg", popular: true },
    ],
  },
  {
    id: "authentic-biryanis",
    label: "Authentic Biryanis",
    subtitle: "Non-Veg, Bone In",
    kicker: "Signature, Slow Cooked",
    intro: "Aged basmati layered with bone-in meat, sealed and slow-cooked over a low flame in the dum tradition.",
    items: [
      { name: "Hyd Chicken Dum Biryani", desc: "Slow-cooked in a sealed handi with saffron, mint and whole spices.", priceFor1: "17.99", priceFor3: "34.99", spice: 2, veg: false, image: "/assets/biryani-hyderabadi.jpg", popular: true, featured: true },
      { name: "Donne Biryani (Chicken)", desc: "Bangalore military-style, short-grain seeraga samba with mint masala.", priceFor1: "17.99", priceFor3: "34.99", spice: 3, veg: false, image: "/assets/biryani-donne.jpg" },
      { name: "Hyd Mutton Dum Biryani", desc: "Bone-in mutton slow-cooked Hyderabadi dum style with saffron and mint.", priceFor1: "18.49", priceFor3: "37.99", spice: 3, veg: false, image: "/assets/biryani-mutton.jpg", popular: true },
      { name: "Madurai SPL Mutton Biryani", desc: "Madurai-style mutton biryani, rich and deeply spiced.", priceFor1: "18.49", priceFor3: "37.99", spice: 3, veg: false, availability: "Weekends Only", image: "/assets/dishes/madurai-spl-mutton-biryani.png" },
    ],
  },
  {
    id: "special-biryanis",
    label: "Special Biryanis",
    subtitle: "Non-Veg, Boneless",
    kicker: "Special, Boneless",
    intro: "Boneless biryanis, from paneer ghee roast to gongura and ulavacharu.",
    items: [
      { name: "Paneer Ghee Roast Biryani", desc: "Ghee-roasted paneer layered with fragrant aged basmati.", priceFor1: "19.99", priceFor3: "32.99", spice: 2, veg: true, image: "/assets/biryani-paneer.jpg" },
      { name: "Mixed Veg Biryani", desc: "Seasonal vegetables, fried onions and whole garam masala under dum.", priceFor1: "18.99", priceFor3: "32.99", spice: 1, veg: true, image: "/assets/biryani-veg-dum.jpg" },
      { name: "Mushroom Biryani", desc: "Button mushrooms layered through fragrant basmati.", priceFor1: "18.99", priceFor3: "32.99", spice: 1, veg: true, image: "/assets/dishes/mushroom-biryani.png" },
      { name: "Egg Fry Biryani (2 Eggs)", desc: "Two fried eggs nestled in fragrant biryani rice.", priceFor1: "18.99", priceFor3: "32.99", spice: 2, veg: false, image: "/assets/dishes/egg-fry-biryani.jpg" },
      { name: "Chicken Fry Piece Biryani", desc: "Marinated fry pieces layered with aged basmati.", priceFor1: "19.99", priceFor3: "34.99", spice: 2, veg: false, image: "/assets/dishes/chicken-fry-piece-biryani.jpg" },
      { name: "Mughalai Chicken Biryani", desc: "Boneless, perfumed with royal Mughlai whole spices and saffron.", priceFor1: "20.49", priceFor3: "37.99", spice: 2, veg: false, image: "/assets/dishes/mughlai-chicken-biryani.jpg" },
      { name: "Bezawada SPL Chicken Biryani", desc: "Boneless Andhra-fire biryani with a slow, building heat.", priceFor1: "18.99", priceFor3: "37.99", spice: 3, veg: false, image: "/assets/dishes/bezawada-chicken-biryani.jpg" },
      { name: "Butter Chicken Biryani", desc: "Creamy, rich butter chicken folded through saffron basmati.", priceFor1: "19.99", priceFor3: "34.99", spice: 1, veg: false, image: "/assets/dishes/butter-chicken-biryani.jpg" },
      { name: "Gongura Chicken Biryani", desc: "Chicken biryani with the tang of Andhra gongura leaf.", priceFor1: "20.49", priceFor3: "39.99", spice: 3, veg: false, image: "/assets/dishes/gongura-chicken-biryani.png" },
      { name: "Gongura Mutton Biryani", desc: "Mutton biryani laced with tart gongura leaf.", priceFor1: "19.99", priceFor3: "39.99", spice: 3, veg: false, image: "/assets/dishes/gongura-mutton-biryani.png" },
      { name: "Ulavacharu Chicken Biryani", desc: "Chicken biryani finished with Andhra horsegram broth.", priceFor1: "20.49", priceFor3: "39.99", spice: 3, veg: false, image: "/assets/dishes/ulavacharu-chicken-biryani.png" },
    ],
  },
  {
    id: "idli-vada",
    label: "Idli & Vada",
    kicker: "Steamed, All Day",
    intro: "Pillow-soft idlies and crisp lentil vadas from the South Indian counter.",
    items: [
      { name: "Plain Idly (3pc)", desc: "Pillow-soft steamed rice & lentil cakes.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/plain-idly.jpg" },
      { name: "Sambar Idly (2pc)", desc: "Idlies bathed in piping hot lentil sambar.", price: "8.99", spice: 1, veg: true, image: "/assets/dishes/sambar-idly.jpg" },
      { name: "Ghee Karam Idly (3pc)", desc: "Steamed idlies brushed with ghee and spicy gunpowder.", price: "8.99", spice: 2, veg: true, image: "/assets/dishes/ghee-karam-idly.jpg", popular: true, featured: true },
      { name: "Plain Vada (3pc)", desc: "Crisp South Indian lentil donuts.", price: "8.99", spice: 1, veg: true, image: "/assets/dishes/plain-vada.jpg" },
      { name: "Sambar Vada (2pc)", desc: "Lentil vadas dunked in spiced sambar.", price: "7.99", spice: 1, veg: true, image: "/assets/dishes/sambar-vada.jpg" },
      { name: "Dahi Vada (2pc)", desc: "Soft vadas in chilled tempered yogurt.", price: "8.99", spice: 0, veg: true, image: "/assets/dishes/dahi-vada.jpg" },
      { name: "Thatte Idli", desc: "Wide, soft plate idli, steamed to order.", price: "9.99", spice: 0, veg: true, image: "/assets/dishes/thatte-idli.png" },
    ],
  },
  {
    id: "uttappam",
    label: "Uttappam",
    kicker: "Thick, Savoury Pancakes",
    intro: "Thick, savoury rice pancakes, crisp at the edges, soft at the centre.",
    items: [
      { name: "Uthappam Plain (2pcs)", desc: "Thick savoury pancake, crisp at the edges.", price: "7.99", spice: 1, veg: true, image: "/assets/dishes/uttapam-plain.jpg" },
      { name: "Uthappam Onion (2pcs)", desc: "Uttapam studded with onion and green chili.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/uttapam-onion.jpg" },
      { name: "Special Uthappam (2pcs)", desc: "Uttapam topped with potato masala and onion.", price: "10.99", spice: 1, veg: true, image: "/assets/dishes/uttapam-masala.jpg" },
    ],
  },
  {
    id: "poori",
    label: "Poori",
    kicker: "Puffed, Golden",
    intro: "Hot puffed pooris with chana, mango pulp or a spiced meat curry.",
    items: [
      { name: "Poori (3pc)", desc: "Hot puffed puris with chana or aloo masala.", price: "10.99", spice: 1, veg: true, image: "/assets/dishes/puri.jpg" },
      { name: "Aamras Poori (3pc)", desc: "Crisp puris with sweet alphonso mango pulp.", price: "10.99", spice: 0, veg: true, image: "/assets/dishes/aamras-puri.jpg" },
      { name: "Kheema Poori (3pc)", desc: "Puris served with spiced mutton keema.", price: "16.99", spice: 2, veg: false, image: "/assets/dishes/keema-puri.jpg" },
      { name: "Poori with Chicken (3pc)", desc: "Puffed pooris with a spiced chicken curry.", price: "16.99", spice: 2, veg: false, image: "/assets/dishes/poori-with-chicken.png" },
    ],
  },
  {
    id: "dosa",
    label: "Dosa & More",
    kicker: "Madras Mornings",
    intro: "Fermented rice-and-lentil crepes, ghee-roasted to a deep gold.",
    items: [
      { name: "Plain Dosa", desc: "Classic fermented rice-and-lentil crepe, crisp and lacy.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/plain-dosa.jpg" },
      { name: "Onion Dosa", desc: "Crisp dosa scattered with sharp pink onion.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/onion-dosa.jpg" },
      { name: "Masala Dosa", desc: "Ghee-roasted gold crepe folded over a soft potato masala.", price: "10.99", spice: 1, veg: true, image: "/assets/menu-dosa-hero.jpg", popular: true, featured: true },
      { name: "Ghee Roast Podi Dosa", desc: "Ghee dosa dusted with house-roasted lentil podi.", price: "10.99", spice: 2, veg: true, image: "/assets/dishes/ghee-podi-dosa.jpg" },
      { name: "Ghee Roast Dosa", desc: "Crisped to a deep gold with ghee.", price: "8.99", spice: 0, veg: true, image: "/assets/dishes/ghee-roast-dosa.jpg" },
      { name: "Mysore Plain Dosa", desc: "Dosa painted with fiery red Mysore chutney.", price: "9.99", spice: 2, veg: true, image: "/assets/dishes/mysore-plain-dosa.png" },
      { name: "Mysore Masala Dosa", desc: "Mysore chutney layered under soft potato masala.", price: "11.99", spice: 2, veg: true, image: "/assets/dishes/mysore-masala-dosa.jpg" },
      { name: "Mutton Kheema Dosa", desc: "Dosa rolled around spiced mutton keema.", price: "12.99", spice: 2, veg: false, image: "/assets/dishes/mutton-keema-dosa-menu.jpg" },
      { name: "Dosa with Chicken Curry", desc: "Crisp dosa with spicy boneless chicken curry.", price: "13.99", spice: 2, veg: false, image: "/assets/dishes/dosa-chicken-curry.jpg" },
      { name: "Dosa with Mutton Curry", desc: "Dosa with slow-cooked Andhra mutton curry.", price: "15.99", spice: 3, veg: false, image: "/assets/dishes/dosa-mutton-curry.jpg" },
      { name: "Butter Chicken Dosa", desc: "Mild, creamy butter chicken folded into a golden dosa.", price: "13.99", spice: 1, veg: false, image: "/assets/dishes/butter-chicken-dosa-menu.jpg", popular: true },
      { name: "Chicken Vindaloo Dosa", desc: "Tangy Goan-style vindaloo chicken in a crisp dosa.", price: "12.99", spice: 3, veg: false, image: "/assets/dishes/chicken-vindola-dosa.jpg" },
      { name: "Kids / Cone Dosa", desc: "Dosa rolled into a playful cone, kid-approved.", price: "9.99", spice: 0, veg: true, image: "/assets/dishes/cone-dosa.jpg" },
      { name: "Pizza Dosa", desc: "Indo-fusion, cheese, capsicum and house masala on dosa.", price: "13.99", spice: 1, veg: true, image: "/assets/dishes/pizza-dosa.jpg", chefsPick: true },
      { name: "Double Egg Kaaram Dosa", desc: "Twin eggs spread over a spicy karam-coated dosa.", price: "12.99", spice: 2, veg: false, image: "/assets/dishes/double-egg-karam-dosa.jpg" },
      { name: "Cheese Dosa", desc: "Molten cheese folded inside a golden crepe.", price: "12.99", spice: 0, veg: true, image: "/assets/dishes/cheese-dosa.jpg" },
      { name: "Guntur Karam Dosa", desc: "Andhra chili powder painted across a ghee-roasted dosa.", price: "12.99", spice: 3, veg: true, image: "/assets/dishes/guntur-karam-dosa.jpg" },
      { name: "Paneer Dosa", desc: "Spiced paneer bhurji rolled into a crisp dosa.", price: "12.99", spice: 1, veg: true, image: "/assets/dishes/paneer-dosa.jpg" },
    ],
  },
  {
    id: "benne-dosa",
    label: "Benne Dosa",
    kicker: "Karnataka Butter Dosa",
    intro: "Karnataka-style butter dosa, soft inside with crisp golden edges.",
    items: [
      { name: "Benne Dosa Plain with Ghee", desc: "Karnataka-style butter dosa, soft inside, crisp edges.", price: "10.99", spice: 1, veg: true, image: "/assets/dishes/benne-dosa.jpg" },
      { name: "Benne Masala Dosa (2pcs)", desc: "Karnataka butter dosa folded over potato masala.", price: "13.99", spice: 1, veg: true, image: "/assets/dishes/benne-masala-dosa.png" },
      { name: "Benne Ghee Podi Dosa (2pcs)", desc: "Butter dosa dusted with spicy ghee podi.", price: "13.99", spice: 2, veg: true, image: "/assets/dishes/benne-podi-dosa.jpg" },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    kicker: "Rolled in Parota",
    intro: "Flaky parota rolled around butter chicken, keema or paneer.",
    items: [
      { name: "Desi Butter Chicken Wrap", desc: "Parota rolled with butter chicken and onions.", price: "16.99", spice: 1, veg: false, image: "/assets/dishes/butter-chicken-wrap.jpg" },
      { name: "Desi Mutton Keema Wrap", desc: "Spiced minced mutton wrapped in parota.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/mutton-keema-wrap.jpg" },
      { name: "Desi Paneer Wrap", desc: "Spiced paneer bhurji rolled in flaky parota.", price: "16.99", spice: 1, veg: true, image: "/assets/dishes/paneer-wrap.jpg" },
      { name: "Chicken Natti Kurma Wrap", desc: "Country chicken kurma rolled in flaky parota.", price: "16.99", spice: 2, veg: false, image: "/assets/dishes/chicken-natti-kurma-wrap.png" },
    ],
  },
  {
    id: "breads",
    label: "Breads",
    kicker: "Handmade, Layered",
    intro: "Layered parota, on its own or paired with a slow-cooked kurma.",
    items: [
      { name: "Layer Parota", desc: "Layered, flaky South Indian flatbread.", price: "3.99", spice: 0, veg: true, image: "/assets/dishes/parota.jpg" },
      { name: "Chicken Kurma with Parota", desc: "Rich chicken kurma served with flaky parota.", price: "21.99", spice: 2, veg: false, image: "/assets/dishes/chicken-kurma-parota.jpg" },
      { name: "Mutton Kurma with Parota", desc: "Slow-cooked mutton kurma with layered parota.", price: "23.99", spice: 2, veg: false, image: "/assets/dishes/mutton-kurma-parota.jpg" },
    ],
  },
  {
    id: "rice-bowls",
    label: "Rice Bowls",
    kicker: "Comfort, In a Bowl",
    intro: "Tempered rice bowls with dal, sambar, curd or a curry alongside.",
    items: [
      { name: "Jeera Rice with Dal Thadka", desc: "Cumin basmati with tempered yellow dal, served with papad & pickle.", price: "14.99", spice: 1, veg: true, image: "/assets/dishes/jeera-rice-dal-tadka.jpg" },
      { name: "Sambar Rice with Papad & Pickle", desc: "Rice tossed in tempered lentil sambar, papad & pickle on the side.", price: "12.99", spice: 1, veg: true, image: "/assets/dishes/sambar-rice.jpg" },
      { name: "Curd Rice with Papad & Pickle", desc: "Cooling tempered yogurt rice with curry leaves and mustard.", price: "20.99", spice: 0, veg: true, image: "/assets/dishes/curd-rice.jpg" },
      { name: "Sambhar Rice & Chicken 65", desc: "Sambar rice served with crisp chicken 65.", price: "21.99", spice: 3, veg: false, image: "/assets/dishes/sambar-rice-chicken-65.png" },
      { name: "Jeera Rice with Butter Chicken", desc: "Cumin rice paired with creamy butter chicken.", price: "23.99", spice: 1, veg: false, image: "/assets/dishes/jeera-rice-butter-chicken.png" },
    ],
  },
  {
    id: "desi-chat",
    label: "Desi Chat",
    kicker: "Street Chat Counter",
    intro: "The chat cart brought indoors, crisp, tangy, yogurt-cooled.",
    items: [
      { name: "Samosa Chat", desc: "Crushed samosa, chickpeas, yogurt and chutneys.", price: "8.99", spice: 1, veg: true, image: "/assets/dishes/samosa-chat.png" },
      { name: "Pani Puri (6pcs)", desc: "Crisp shells with spiced mint water.", price: "7.99", spice: 1, veg: true, image: "/assets/dishes/pani-puri.png" },
      { name: "Dahi Puri (6pcs)", desc: "Filled puris topped with sweet yogurt and chutney.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/dahi-puri.png" },
      { name: "Ragada Patty", desc: "Potato patties over warm white pea curry.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/ragada-patty.png" },
      { name: "Raj Kachori", desc: "A large crisp shell loaded with yogurt and chutneys.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/raj-kachori.png" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    kicker: "Sweet, Festive Finish",
    intro: "Warm, syrup-soaked and milk-rich, the right ending to every meal.",
    items: [
      { name: "Qurbani Ka Meetha", desc: "Hyderabadi stewed apricot with cream.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/qurbani-ka-meetha.png" },
      { name: "Gulab Jamun with Ice Cream", desc: "Warm gulab jamun with vanilla ice cream.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/gulab-jamun-with-icecream.png" },
      { name: "Rasmalai (2pcs)", desc: "Cottage cheese discs in chilled saffron-pistachio milk.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/rasmalai.jpg" },
      { name: "Payasam", desc: "South Indian milk and vermicelli pudding.", price: "5.99", spice: 0, veg: true, image: "/assets/dishes/payasam.png" },
      { name: "Double Ka Meetha", desc: "Hyderabadi bread pudding in saffron milk syrup.", price: "7.99", spice: 0, veg: true, image: "/assets/menu-desserts-hero.jpg", popular: true, featured: true },
      { name: "Gulab Jamun", desc: "Warm milk dumplings soaked in rose-cardamom syrup.", price: "5.99", spice: 0, veg: true, image: "/assets/dishes/gulab-jamun.jpg" },
    ],
  },
  {
    id: "fresh-juice",
    label: "Fresh Juice",
    kicker: "Pressed to Order",
    intro: "Freshly pressed fruit and vegetable juices, nothing added.",
    items: [
      { name: "Orange", desc: "Freshly pressed orange juice.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/orange-juice.png" },
      { name: "Watermelon", desc: "Freshly pressed watermelon juice.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/watermelon-juice.png" },
      { name: "Pineapple", desc: "Freshly pressed pineapple juice.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/pineapple-juice.png" },
      { name: "Carrot", desc: "Freshly pressed carrot juice.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/carrot-juice.png" },
      { name: "Apple", desc: "Freshly pressed apple juice.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/apple-juice.png" },
    ],
  },
  {
    id: "cold-beverages",
    label: "Cold Beverages",
    kicker: "Chilled, Cafe Style",
    intro: "Real-fruit shakes, saffron milks and old-city coolers, all chilled.",
    items: [
      { name: "Special Chikoo Shake (Real Fruit)", desc: "Sapodilla shake, creamy, malty, naturally sweet.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/chickoo-shake.jpg" },
      { name: "Custard Apple Shake (Real Fruit)", desc: "Sitaphal blended into a silky, fragrant shake.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/custard-apple-shake.jpg" },
      { name: "Strawberry Milk (Real Fruit)", desc: "Fresh strawberry blended into chilled milk.", price: "8.99", spice: 0, veg: true, image: "/assets/dishes/strawberry-milk.jpg" },
      { name: "SPL Badam Milk", desc: "Saffron-almond milk, lightly cardamom-spiced.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/badam-milk.jpg" },
      { name: "Rose Milk (Original Taste)", desc: "Chilled milk with house rose syrup.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/rose-milk.jpg" },
      { name: "Exotic Fruit Juice", desc: "Seasonal premium fruit, blended to order. Ask for options.", price: "10.99", spice: 0, veg: true, image: "/assets/dishes/exotic-fruit-juice.png", popular: true, featured: true },
      { name: "Mohabbath Ka Sharbath", desc: "Old Delhi summer cooler, watermelon, rose, chilled milk.", price: "5.99", spice: 0, veg: true, image: "/assets/dishes/mohabbat-ka-sharbat.jpg" },
      { name: "Butter Milk", desc: "Spiced South Indian chaas, cooling and light.", price: "5.99", spice: 0, veg: true, image: "/assets/dishes/butter-milk.png" },
      { name: "Mango Lassi", desc: "Alphonso mango blended with sweet yogurt.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/mango-lassi.png" },
      { name: "Lassi", desc: "Chilled sweet or salted yogurt drink.", price: "6.99", spice: 0, veg: true, options: ["Sweet", "Salt"], image: "/assets/dishes/lassi.png" },
    ],
  },
  {
    id: "fizzy-drinks",
    label: "Fizzy Drinks",
    kicker: "Fizz, On Ice",
    intro: "Fresh lime sodas and chilled bottled classics.",
    items: [
      { name: "Lime Soda", desc: "Fresh lime soda, your way.", price: "5.99", spice: 0, veg: true, options: ["Sweet", "Salt", "Masala"], image: "/assets/dishes/lime-soda.png" },
      { name: "Pops", desc: "Chilled soft drinks.", price: "1.99", spice: 0, veg: true, options: ["Coke", "Pepsi", "Diet Coke", "Ginger Ale"], image: "/assets/dishes/soft-drinks.png" },
      { name: "Thumbs Up / Limca", desc: "Classic Indian soft drinks.", price: "2.99", spice: 0, veg: true, image: "/assets/dishes/thumbs-up-limca.png" },
    ],
  },
  {
    id: "side-orders",
    label: "Side Orders",
    kicker: "On the Side",
    intro: "The extras, raitas, salna, chutney, papad and steamed rice.",
    items: [
      { name: "Boiled Egg", desc: "A single boiled egg.", price: "1.99", spice: 0, veg: false, image: "/assets/dishes/boiled-egg.png" },
      { name: "Raita 8 oz", desc: "Cooling spiced yogurt.", price: "3.99", spice: 0, veg: true, image: "/assets/dishes/raita-8-oz.png" },
      { name: "Raita 3.25 oz", desc: "Cooling spiced yogurt.", price: "1.49", spice: 0, veg: true, image: "/assets/dishes/raita-3.25-oz.png" },
      { name: "Salna 3.25 oz", desc: "Spiced South Indian gravy.", price: "1.49", spice: 1, image: "/assets/dishes/salna.png" },
      { name: "Salna 8 oz", desc: "Spiced South Indian gravy.", price: "3.99", spice: 1, image: "/assets/dishes/salna-8-oz.png" },
      { name: "Chutney 8 oz", desc: "House chutney.", price: "4.99", spice: 1, veg: true, image: "/assets/dishes/chutney.png" },
      { name: "Onion Salad", desc: "Sliced onion with lemon.", price: "2.99", spice: 0, veg: true, image: "/assets/dishes/onion-salad.png" },
      { name: "Plain Yogurt", desc: "Plain set yogurt.", price: "1.99", spice: 0, veg: true, image: "/assets/dishes/yogurt.png" },
      { name: "Papad", desc: "Crisp roasted papad.", price: "0.99", spice: 0, veg: true, image: "/assets/dishes/papad.png" },
      { name: "Water Bottle", desc: "Bottled water.", price: "1.99", image: "/assets/dishes/bottled-water.png" },
      { name: "White Rice", desc: "Steamed basmati rice.", price: "5.99", spice: 0, veg: true, image: "/assets/dishes/white-rice.png" },
    ],
  },
  {
    id: "hot-beverages",
    label: "Hot Beverages",
    kicker: "Steel Tumbler, Steam",
    intro: "Masala chai and Madras filter coffee, poured hot.",
    items: [
      { name: "Masala Chai", desc: "Hyderabadi cafe-style sweet, spiced milk tea.", price: "3.49", spice: 0, veg: true, image: "/assets/dishes/irani-tea.jpg" },
      { name: "Madras Filter Coffee", desc: "Strong decoction whipped with hot milk, served in a steel tumbler.", price: "3.49", spice: 0, veg: true, image: "/assets/dishes/filter-coffee.jpg" },
    ],
  },
];
