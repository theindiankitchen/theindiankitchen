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
  /** Overrides the dish name as the image alt text. */
  alt?: string;
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
  /** Printed add-on line for the section, shown under its items. */
  addons?: string;
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
      { name: "Kodi Chaaru", desc: "Andhra-style spiced chicken broth, rustic, aromatic, restorative.", price: "6.99", spice: 2, veg: false, image: "/assets/dishes/chicken-kodi-charu.jpg" },
      { name: "Mutton Bone Soup", desc: "Slow-simmered marrow broth with whole spices and pepper.", price: "6.99", spice: 2, veg: false, image: "/assets/menu-soup-hero.jpg", popular: true, featured: true },
      { name: "Sweet Corn Soup", desc: "Sweet corn in a light, clear broth.", price: "5.99", spice: 1, veg: true, image: "/assets/dishes/sweetcorn-soup.png" },
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
      { name: "Railway Onion Samosa (2pcs)", desc: "Hyderabad station-style, small, sharp, with green chutney.", price: "3.99", spice: 2, veg: true, image: "/assets/menu-snacks-hero.jpg", popular: true, featured: true },
      { name: "Aaloo Samosa (2pcs)", desc: "Classic potato samosa with mint-tamarind chutneys.", price: "4.99", spice: 1, veg: true, image: "/assets/dishes/aloo-samosa.jpg" },
      { name: "Chicken Samosa (2pcs)", desc: "Triangular pockets with juicy spiced chicken keema.", price: "6.99", spice: 2, veg: false, image: "/assets/dishes/chicken-samosa.jpg" },
      { name: "Cut Mirchi Crispy", desc: "Long chilies, slit, stuffed, dipped and fried.", price: "8.99", spice: 3, veg: true, image: "/assets/dishes/cut-mirchi.jpg" },
      { name: "Stuffed Bajji (4pcs)", desc: "Stuffed bajji fritters, crisp shell, soft heart.", price: "10.99", spice: 2, veg: true, image: "/assets/dishes/stuffed-bajji.jpg" },
      { name: "Osmania Biscuits (2pcs)", desc: "Hyderabad Irani cafe staple, buttery, salty-sweet.", price: "1.99", spice: 0, veg: true, image: "/assets/dishes/osmania-biscuits.jpg" },
    ],
  },
  {
    id: "veg-starters",
    label: "Veg Starters",
    kicker: "Sizzling, Small Plates",
    intro: "Crisp, deeply spiced vegetarian openers, built for sharing.",
    items: [
      { name: "Gobi 65 - Dry", desc: "Crispy spiced cauliflower, vegetarian Hyderabadi classic.", price: "15.99", spice: 2, veg: true, image: "/assets/dishes/gobi-65.jpg", featured: true },
      { name: "Crispy Baby Corn", desc: "Sweet corn tossed in chili-salt masala.", price: "16.99", spice: 2, veg: true, image: "/assets/dishes/crispy-corn.jpg" },
      { name: "Paneer Vellulli Kaaram", desc: "Paneer in spicy onion-garlic masala.", price: "17.99", spice: 2, veg: true, alt: "Paneer Vellulli Kaaram, paneer cubes in a spicy onion-garlic masala", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_PaneerVelliulliKaaram.webp" },
      { name: "Malai Soya Chaap", desc: "Creamy marinated soya chaap, grilled soft and mild.", price: "17.99", spice: 1, veg: true, image: "" },
    ],
  },
  {
    id: "non-veg-starters",
    label: "Non-Veg Starters",
    kicker: "Sizzling, Small Plates",
    intro: "Bite-sized and dialled for heat, from Hyderabadi 65 to coastal prawns.",
    items: [
      { name: "Hyderabadi Chicken 65", desc: "Hyderabadi street classic, crisp, red-spiced, curry-leaf tossed.", price: "16.99", spice: 3, veg: false, alt: "Hyderabadi Chicken 65, crisp red-spiced chicken tossed with curry leaf", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_HyderabadChicken65_2880x2304.webp", popular: true, featured: true },
      { name: "Desi Chicken 65 (Dry)", desc: "Crisp, dry-tossed in chili and curry leaf.", price: "16.99", spice: 3, veg: false, image: "/assets/dishes/desi-chicken-65.jpg" },
      { name: "Famous Cashew Chicken Pakodi", desc: "Cashew-crusted chicken bites, golden and crunchy.", price: "17.99", spice: 2, veg: false, alt: "Famous Cashew Chicken Pakodi, golden cashew-crusted chicken bites", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_FamousCashewChickenPakodi.webp" },
      { name: "Spiced Garlic Chicken", desc: "Spicy onion-garlic masala glazed over crisp chicken.", price: "17.99", spice: 3, veg: false, image: "/assets/dishes/velli-ulli-karam-chicken.jpg" },
      { name: "Mutton Chukka Fry", desc: "Boneless mutton dry-roasted with black pepper and spice.", price: "18.99", spice: 3, veg: false, image: "/assets/dishes/mutton-chukka-fry.jpg" },
      { name: "Mutton Ghee Roast", desc: "Aromatic ghee-roasted mutton with toasted whole spices.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/ghee-roast-mutton-menu.jpg" },
      { name: "Crispy Prawn Fry", desc: "Prawns fried crisp with chili and curry leaf.", price: "18.99", spice: 2, veg: false, alt: "Crispy Prawn Fry, golden fried prawns with chili and curry leaf", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_CrispyPrawnFry.webp" },
      { name: "House Special Prawns", desc: "Golden, crunchy, deeply spiced prawn bites.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/crispy-prawn-fry.jpg" },
      { name: "Chicken Lollipop Masala/Classic", desc: "Frenched chicken wings, batter-fried and tossed to order.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/chicken-lollipop.png" },
    ],
  },
  {
    id: "pulav-rice",
    label: "Pulav Rice",
    kicker: "Pulav, Ghee Roasted",
    intro: "Short-grain pulav layered with ghee-roasted meat and toasted whole spices.",
    items: [
      { name: "Paneer / Mushroom Pulav", desc: "Fragrant pulav rice with paneer or button mushroom.", price: "17.99", spice: 1, veg: true, image: "" },
      { name: "Chicken Ghee Roast Pulav", desc: "Ghee-roasted chicken folded through fragrant pulav rice.", price: "19.99", spice: 2, veg: false, image: "" },
      { name: "Mutton Ghee Roast Pulav", desc: "Ghee-roasted mutton layered into aromatic pulav rice.", price: "21.99", spice: 2, veg: false, image: "" },
      { name: "Mutton Chukka Pulav", desc: "Pepper-tossed mutton chukka over fragrant pulav rice.", price: "21.99", spice: 3, veg: false, image: "" },
      { name: "Naatu Kodi Pulav", desc: "Country chicken simmered into a rustic weekend pulav.", price: "21.99", spice: 3, veg: false, availability: "Weekends Only", image: "" },
      { name: "Prawn Ghee Roast Pulav", desc: "Ghee-roasted prawns tossed through fragrant pulav rice.", price: "20.99", spice: 2, veg: false, image: "" },
    ],
  },
  {
    id: "curries",
    label: "Curries",
    kicker: "Mains, Slow Built",
    intro: "Slow-built gravies, coconut-cashew kurmas and home-style curries.",
    items: [
      { name: "Veg Kurma", desc: "Seasonal vegetables in a mild coconut-cashew gravy.", price: "16.99", spice: 1, veg: true, image: "/assets/dishes/veg-kurma.jpg" },
      { name: "Spinach Dal", desc: "Yellow dal simmered with spinach and a garlic tempering.", price: "16.99", spice: 1, veg: true, image: "" },
      { name: "Paneer Butter Masala", desc: "Paneer in a creamy tomato-butter gravy, mildly spiced.", price: "18.99", spice: 1, veg: true, image: "" },
      { name: "Palak Paneer", desc: "Soft paneer folded into a silky spinach gravy.", price: "17.99", spice: 1, veg: true, image: "" },
      { name: "Gutti Vankay Curry (Eggplant)", desc: "Baby eggplant stuffed with peanut-sesame Andhra masala.", price: "18.99", spice: 2, veg: true, image: "" },
      { name: "Butter Chicken", desc: "Creamy, mildly spiced tomato-butter gravy with tender chicken.", price: "18.99", spice: 1, veg: false, image: "/assets/menu-curry-hero.jpg", popular: true, featured: true },
      { name: "Ulavacharu Chkn Curry", desc: "Chicken curry finished with Andhra horsegram broth.", price: "18.99", spice: 2, veg: false, image: "" },
      { name: "Chicken Curry", desc: "Coconut-cashew gravy, fragrant with whole spices.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/chicken-kurma.jpg" },
      { name: "Chicken Kurma", desc: "Boneless chicken in a mild coconut-cashew kurma.", price: "18.99", spice: 2, veg: false, image: "" },
      { name: "Mutton Kurma", desc: "Slow-cooked mutton in rich coconut-cashew masala.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/mutton-kurma.jpg" },
      { name: "Mutton Curry", desc: "Slow-cooked mutton in a home-style Andhra gravy.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/mutton-curry.png" },
    ],
  },
  {
    id: "indo-chinese",
    label: "Indo-Chinese",
    kicker: "Street Style, Wok Fired",
    intro: "High-flame wok cookery, smoky, glossy, unmistakably Indo-Chinese.",
    addons: "Add: Shrimp 2.99 / Gobi 2.99",
    items: [
      { name: "Street Style Fried Rice", desc: "Wok-tossed at high flame with scallions and soy glaze.", spice: 2, variants: [ { name: "Veg", price: "14.99" }, { name: "Egg", price: "15.99" }, { name: "Chicken", price: "16.99" } ], alt: "Street Style Fried Rice, wok-tossed rice with chicken and scallions", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_ChickenFriedRice.webp", popular: true, featured: true },
      { name: "Street Style Noodles", desc: "Hakka-style noodles tossed at high flame with chili and soy.", spice: 2, variants: [ { name: "Veg", price: "14.99" }, { name: "Egg", price: "15.99" }, { name: "Chicken", price: "16.99" } ], image: "/assets/dishes/chicken-noodles.jpg" },
    ],
  },
  {
    id: "authentic-biryanis",
    label: "Authentic Biryanis",
    subtitle: "Non-Veg, Bone In",
    kicker: "Signature, Slow Cooked",
    intro: "Aged basmati layered with bone-in meat, sealed and slow-cooked over a low flame in the dum tradition.",
    items: [
      { name: "Hyd Chicken Dum Biryani", desc: "Slow-cooked in a sealed handi with saffron, mint and whole spices.", priceFor1: "17.99", priceFor3: "34.99", spice: 2, veg: false, alt: "Hyd Chicken Dum Biryani, bone-in chicken layered through saffron basmati", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_HydChickenDumBiryani.webp", popular: true, featured: true },
      { name: "Donne Biryani (Chicken)", desc: "Bangalore military-style, short-grain seeraga samba with mint masala.", priceFor1: "17.99", priceFor3: "34.99", spice: 3, veg: false, image: "/assets/biryani-donne.jpg" },
      { name: "Hyd Mutton Dum Biryani", desc: "Bone-in mutton slow-cooked Hyderabadi dum style with saffron and mint.", priceFor1: "18.49", priceFor3: "37.99", spice: 3, veg: false, alt: "Hyd Mutton Dum Biryani, bone-in mutton in fragrant saffron rice", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_HydMuttonDumBiryani_2880x2304.webp", popular: true },
      { name: "Madurai SPL Mutton Biryani", desc: "Madurai-style mutton biryani, rich and deeply spiced.", priceFor1: "18.49", priceFor3: "37.99", spice: 3, veg: false, availability: "Weekends Only", image: "/assets/dishes/madurai-spl-mutton-biryani.png" },
    ],
  },
  {
    id: "special-biryanis",
    label: "Special Biryanis",
    subtitle: "Boneless",
    kicker: "Special, Boneless",
    intro: "Boneless biryanis, from paneer ghee roast to gongura and ulavacharu.",
    items: [
      { name: "Paneer Ghee Roast Biryani", desc: "Ghee-roasted paneer layered with fragrant aged basmati.", priceFor1: "19.99", priceFor3: "35.99", spice: 2, veg: true, image: "/assets/biryani-paneer.jpg" },
      { name: "Mixed Veg Biryani", desc: "Seasonal vegetables, fried onions and whole garam masala under dum.", priceFor1: "19.99", priceFor3: "35.99", spice: 1, veg: true, image: "/assets/biryani-veg-dum.jpg" },
      { name: "Mushroom Biryani", desc: "Button mushrooms layered through fragrant basmati.", priceFor1: "19.99", priceFor3: "35.99", spice: 1, veg: true, image: "/assets/dishes/mushroom-biryani.png" },
      { name: "Egg Fry Biryani (2 Eggs)", desc: "Two fried eggs nestled in fragrant biryani rice.", priceFor1: "19.99", priceFor3: "35.99", spice: 2, veg: false, image: "/assets/dishes/egg-fry-biryani.jpg" },
      { name: "Chicken Fry Piece Biryani", desc: "Marinated fry pieces layered with aged basmati.", priceFor1: "19.99", priceFor3: "38.99", spice: 2, veg: false, image: "/assets/dishes/chicken-fry-piece-biryani.jpg" },
      { name: "Mughalai Chicken Biryani", desc: "Boneless, perfumed with royal Mughlai whole spices and saffron.", priceFor1: "20.49", priceFor3: "39.99", spice: 2, veg: false, alt: "Mughalai Chicken Biryani, boneless chicken in saffron-perfumed basmati", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_MughalaiChickenBiryani.webp" },
      { name: "Bezawada SPL Chicken Biryani", desc: "Boneless Andhra-fire biryani with a slow, building heat.", priceFor1: "19.99", priceFor3: "38.99", spice: 3, veg: false, image: "/assets/dishes/bezawada-chicken-biryani.jpg" },
      { name: "Butter Chicken Biryani", desc: "Creamy, rich butter chicken folded through saffron basmati.", priceFor1: "19.99", priceFor3: "38.99", spice: 1, veg: false, image: "/assets/dishes/butter-chicken-biryani.jpg" },
      { name: "Gongura Chicken Biryani", desc: "Chicken biryani with the tang of Andhra gongura leaf.", priceFor1: "20.49", priceFor3: "39.99", spice: 3, veg: false, image: "/assets/dishes/gongura-chicken-biryani.png" },
      { name: "Gongura Mutton Biryani", desc: "Mutton biryani laced with tart gongura leaf.", priceFor1: "21.99", priceFor3: "40.99", spice: 3, veg: false, image: "/assets/dishes/gongura-mutton-biryani.png" },
      { name: "Ulavacharu Chicken Biryani", desc: "Chicken biryani finished with Andhra horsegram broth.", priceFor1: "21.99", priceFor3: "40.99", spice: 3, veg: false, image: "/assets/dishes/ulavacharu-chicken-biryani.png" },
      { name: "Mutton Ghee Roast Biryani", desc: "Ghee-roasted mutton layered with aged basmati under dum.", priceFor1: "21.99", priceFor3: "40.99", spice: 2, veg: false, image: "" },
      { name: "Mutton Chukka Biryani", desc: "Pepper-tossed mutton chukka layered through saffron basmati.", priceFor1: "23.99", priceFor3: "46.99", spice: 3, veg: false, image: "" },
    ],
  },
  {
    id: "idli-vada",
    label: "Idli & Vada",
    kicker: "Steamed, All Day",
    intro: "Pillow-soft idlies and crisp lentil vadas from the South Indian counter.",
    items: [
      { name: "Plain Idly (3pc)", desc: "Pillow-soft steamed rice & lentil cakes.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/plain-idly.jpg" },
      { name: "Sambar Idly (2pc)", desc: "Idlies bathed in piping hot lentil sambar.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/sambar-idly.jpg" },
      { name: "Ghee Kaaram Idly (3pc)", desc: "Steamed idlies brushed with ghee and spicy gunpowder.", price: "9.99", spice: 2, veg: true, image: "/assets/dishes/ghee-karam-idly.jpg", popular: true, featured: true },
      { name: "Plain Vada (3pc)", desc: "Crisp South Indian lentil donuts.", price: "8.99", spice: 1, veg: true, alt: "Plain Vada, three crisp lentil donuts with chutneys and sambar", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_PlainVada3pc.webp" },
      { name: "Sambar Vada (2pc)", desc: "Lentil vadas dunked in spiced sambar.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/sambar-vada.jpg" },
      { name: "Thatte Idli", desc: "Wide, soft plate idli, steamed to order.", price: "9.99", spice: 0, veg: true, alt: "Thatte Idli, a wide steamed plate idli with chutneys and sambar", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_ThatteIdli.webp" },
      { name: "Ghee Podi / Ghee Kaaram Thatte Idli", desc: "Wide plate idli brushed with ghee and spicy podi.", price: "11.99", spice: 2, veg: true, image: "" },
    ],
  },
  {
    id: "uttappam",
    label: "Uttappam",
    kicker: "Thick, Savoury Pancakes",
    intro: "Thick, savoury rice pancakes, crisp at the edges, soft at the centre.",
    items: [
      { name: "Uthappam Plain (2pcs)", desc: "Thick savoury pancake, crisp at the edges.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/uttapam-plain.jpg" },
      { name: "Uthappam Onion (2pcs)", desc: "Uttapam studded with onion and green chili.", price: "11.99", spice: 1, veg: true, image: "/assets/dishes/uttapam-onion.jpg" },
      { name: "Special Uthappam (2pcs)", desc: "Uttapam topped with potato masala and onion.", price: "12.99", spice: 1, veg: true, image: "/assets/dishes/uttapam-masala.jpg" },
    ],
  },
  {
    id: "poori",
    label: "Poori",
    kicker: "Puffed, Golden",
    intro: "Hot puffed pooris with chana, mango pulp or a spiced meat curry.",
    items: [
      { name: "Chole Bhature (2pc)", desc: "Puffed bhature with a slow-cooked Punjabi chana masala.", price: "14.99", spice: 2, veg: true, image: "" },
      { name: "Poori with Potato Masala (3pc)", desc: "Hot puffed puris with chana or aloo masala.", price: "13.99", spice: 1, veg: true, alt: "Poori with Potato Masala, puffed golden pooris with potato curry", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_Poori3pc.webp" },
      { name: "Aamras Poori (3pc)", desc: "Crisp puris with sweet alphonso mango pulp.", price: "11.99", spice: 0, veg: true, image: "/assets/dishes/aamras-puri.jpg" },
      { name: "Kheema Poori (3pc)", desc: "Puris served with spiced mutton keema.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/keema-puri.jpg" },
      { name: "Poori with Chicken (3pc)", desc: "Puffed pooris with a spiced chicken curry.", price: "18.99", spice: 2, veg: false, image: "/assets/dishes/poori-with-chicken.png" },
    ],
  },
  {
    id: "dosa",
    label: "Dosa & More",
    kicker: "Madras Mornings",
    intro: "Fermented rice-and-lentil crepes, ghee-roasted to a deep gold.",
    addons: "Addon: Onions .99 / Masala 1.99 / Ghee .99",
    items: [
      { name: "Plain Dosa", desc: "Classic fermented rice-and-lentil crepe, crisp and lacy.", price: "8.99", spice: 0, veg: true, image: "/assets/dishes/plain-dosa.jpg" },
      { name: "Onion Dosa", desc: "Crisp dosa scattered with sharp pink onion.", price: "9.99", spice: 1, veg: true, image: "/assets/dishes/onion-dosa.jpg" },
      { name: "Masala Dosa", desc: "Ghee-roasted gold crepe folded over a soft potato masala.", price: "11.99", spice: 1, veg: true, alt: "Masala Dosa, a folded golden crepe on a tray of chutneys and sambar", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_MasalaDosa.webp", popular: true, featured: true },
      { name: "Ghee Roast Podi Dosa", desc: "Ghee dosa dusted with house-roasted lentil podi.", price: "11.99", spice: 2, veg: true, image: "/assets/dishes/ghee-podi-dosa.jpg" },
      { name: "Ghee Roast Dosa", desc: "Crisped to a deep gold with ghee.", price: "10.99", spice: 0, veg: true, image: "/assets/dishes/ghee-roast-dosa.jpg" },
      { name: "Mysore Plain Dosa", desc: "Dosa painted with fiery red Mysore chutney.", price: "10.99", spice: 2, veg: true, image: "/assets/dishes/mysore-plain-dosa.png" },
      { name: "Mysore Masala Dosa", desc: "Mysore chutney layered under soft potato masala.", price: "12.99", spice: 2, veg: true, image: "/assets/dishes/mysore-masala-dosa.jpg" },
      { name: "Mutton Kheema Dosa", desc: "Dosa rolled around spiced mutton keema.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/mutton-keema-dosa-menu.jpg" },
      { name: "Dosa with Chicken Curry", desc: "Crisp dosa with spicy boneless chicken curry.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/dosa-chicken-curry.jpg" },
      { name: "Dosa with Mutton Curry", desc: "Dosa with slow-cooked Andhra mutton curry.", price: "18.99", spice: 3, veg: false, image: "/assets/dishes/dosa-mutton-curry.jpg" },
      { name: "Butter Chicken Dosa", desc: "Mild, creamy butter chicken folded into a golden dosa.", price: "16.99", spice: 1, veg: false, image: "/assets/dishes/butter-chicken-dosa-menu.jpg", popular: true },
      { name: "Kids / Cone Dosa", desc: "Dosa rolled into a playful cone, kid-approved.", price: "10.99", spice: 0, veg: true, image: "/assets/dishes/cone-dosa.jpg" },
      { name: "Pizza Dosa - Chef Spcl", desc: "Indo-fusion, cheese, capsicum and house masala on dosa.", price: "15.99", spice: 1, veg: true, image: "/assets/dishes/pizza-dosa.jpg", chefsPick: true },
      { name: "Double Egg Kaaram Dosa", desc: "Twin eggs spread over a spicy karam-coated dosa.", price: "14.99", spice: 2, veg: false, image: "/assets/dishes/double-egg-karam-dosa.jpg" },
      { name: "Cheese Dosa", desc: "Molten cheese folded inside a golden crepe.", price: "14.99", spice: 0, veg: true, image: "/assets/dishes/cheese-dosa.jpg" },
      { name: "Guntur Kaaram Dosa", desc: "Andhra chili powder painted across a ghee-roasted dosa.", price: "14.99", spice: 3, veg: true, image: "/assets/dishes/guntur-karam-dosa.jpg" },
      { name: "Paneer Dosa", desc: "Spiced paneer bhurji rolled into a crisp dosa.", price: "16.99", spice: 1, veg: true, image: "/assets/dishes/paneer-dosa.jpg" },
    ],
  },
  {
    id: "benne-dosa",
    label: "Benne Dosa",
    kicker: "Karnataka Butter Dosa",
    intro: "Karnataka-style butter dosa, soft inside with crisp golden edges.",
    items: [
      { name: "Benne Dosa Plain with Ghee", desc: "Karnataka-style butter dosa, soft inside, crisp edges.", price: "13.99", spice: 1, veg: true, alt: "Benne Dosa Plain with Ghee, Karnataka butter dosa with chutneys", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_BenneDosaPlainWithGhee.webp" },
      { name: "Benne Masala Dosa (2pcs)", desc: "Karnataka butter dosa folded over potato masala.", price: "14.99", spice: 1, veg: true, image: "/assets/dishes/benne-masala-dosa.png" },
      { name: "Benne Ghee Podi Dosa (2pcs)", desc: "Butter dosa dusted with spicy ghee podi.", price: "14.99", spice: 2, veg: true, image: "/assets/dishes/benne-podi-dosa.jpg" },
      { name: "Benne Ghee Podi Masala Dosa", desc: "Butter dosa with spicy ghee podi and potato masala.", price: "15.99", spice: 2, veg: true, image: "" },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    kicker: "Rolled in Parota",
    intro: "Flaky parota rolled around butter chicken, keema or paneer.",
    items: [
      { name: "Desi Butter Chicken Wrap", desc: "Parota rolled with butter chicken and onions.", price: "16.99", spice: 1, veg: false, alt: "Desi Butter Chicken Wrap, parota rolled around butter chicken", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_DesiButterChickenWrap.webp" },
      { name: "Desi Mutton Kheema Wrap", desc: "Spiced minced mutton wrapped in parota.", price: "17.99", spice: 2, veg: false, image: "/assets/dishes/mutton-keema-wrap.jpg" },
      { name: "Veggie Loaded Wrap", desc: "Spiced vegetables and onions rolled in flaky parota.", price: "16.99", spice: 1, veg: true, image: "" },
      { name: "Chicken Nutty Kurma Wrap", desc: "Country chicken kurma rolled in flaky parota.", price: "16.99", spice: 2, veg: false, image: "/assets/dishes/chicken-natti-kurma-wrap.png" },
      { name: "Butter Paneer Wrap", desc: "Spiced paneer bhurji rolled in flaky parota.", price: "16.99", spice: 1, veg: true, image: "/assets/dishes/paneer-wrap.jpg" },
    ],
  },
  {
    id: "breads",
    label: "Breads",
    kicker: "Handmade, Layered",
    intro: "Layered parota, on its own or paired with a slow-cooked kurma.",
    items: [
      { name: "Malabar Parota (2pcs)", desc: "Layered, flaky South Indian flatbread.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/parota.jpg" },
      { name: "Classic Roti XL", desc: "Oversized soft roti, griddled to order.", price: "4.99", spice: 0, veg: true, image: "" },
      { name: "Wheat Roti (2pcs)", desc: "Soft whole wheat rotis, hot off the griddle.", price: "5.99", spice: 0, veg: true, image: "" },
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
      { name: "Jeera Rice & Dal Thadka", desc: "Cumin basmati with tempered yellow dal, served with papad & pickle.", price: "14.99", spice: 1, veg: true, image: "/assets/dishes/jeera-rice-dal-tadka.jpg" },
      { name: "Sambar Rice with Papad & Pickle", desc: "Rice tossed in tempered lentil sambar, papad & pickle on the side.", price: "12.99", spice: 1, veg: true, image: "/assets/dishes/sambar-rice.jpg" },
      { name: "Curd Rice with Chicken 65", desc: "Cooling tempered yogurt rice served with crisp chicken 65.", price: "15.99", spice: 0, veg: false, image: "/assets/dishes/curd-rice.jpg" },
      { name: "Sambar Rice & Chicken 65", desc: "Sambar rice served with crisp chicken 65.", price: "21.99", spice: 3, veg: false, image: "/assets/dishes/sambar-rice-chicken-65.png" },
      { name: "Jeera Rice with Butter Chicken", desc: "Cumin rice paired with creamy butter chicken.", price: "23.99", spice: 1, veg: false, image: "/assets/dishes/jeera-rice-butter-chicken.png" },
      { name: "Plain Biryani Rice", desc: "Fragrant biryani rice, served on its own.", price: "7.99", spice: 0, veg: true, image: "" },
      { name: "Plain Pulav Rice", desc: "Lightly spiced pulav rice, served on its own.", price: "7.99", spice: 0, veg: true, image: "" },
    ],
  },
  {
    id: "desi-chat",
    label: "Desi Chat",
    kicker: "Street Chat Counter",
    intro: "The chat cart brought indoors, crisp, tangy, yogurt-cooled.",
    items: [
      { name: "Samosa Chat", desc: "Crushed samosa, chickpeas, yogurt and chutneys.", price: "10.99", spice: 1, veg: true, image: "/assets/dishes/samosa-chat.png" },
      { name: "Pani Puri (6pcs)", desc: "Crisp shells with spiced mint water.", price: "7.99", spice: 1, veg: true, image: "/assets/dishes/pani-puri.png" },
      { name: "Dahi Puri (6pcs)", desc: "Filled puris topped with sweet yogurt and chutney.", price: "9.99", spice: 1, veg: true, alt: "Dahi Puri, crisp filled puris topped with yogurt and chutneys", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_DahiPuri_2880x2304.webp" },
      { name: "Aloo Tikki Chat", desc: "Crisp potato patties over warm white pea curry.", price: "10.99", spice: 1, veg: true, image: "/assets/dishes/ragada-patty.png" },
      { name: "Raj Kachori", desc: "A large crisp shell loaded with yogurt and chutneys.", price: "10.99", spice: 1, veg: true, image: "/assets/dishes/raj-kachori.png" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    kicker: "Sweet, Festive Finish",
    intro: "Warm, syrup-soaked and milk-rich, the right ending to every meal.",
    items: [
      { name: "Qubani Ka Meetha", desc: "Hyderabadi stewed apricot with cream.", price: "7.99", spice: 0, veg: true, alt: "Qubani Ka Meetha, stewed apricot dessert served with cream", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_QurbaniKaMeetha.webp" },
      { name: "Gulab Jamun with Ice Cream", desc: "Warm gulab jamun with vanilla ice cream.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/gulab-jamun-with-icecream.png" },
      { name: "Rasmalai (2pcs)", desc: "Cottage cheese discs in chilled saffron-pistachio milk.", price: "6.99", spice: 0, veg: true, alt: "Rasmalai, cottage cheese discs in chilled saffron-pistachio milk", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_Rasmalai.webp" },
      { name: "Payasam", desc: "South Indian milk and vermicelli pudding.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/payasam.png" },
      { name: "Double Ka Meetha", desc: "Hyderabadi bread pudding in saffron milk syrup.", price: "7.99", spice: 0, veg: true, alt: "Double Ka Meetha, Hyderabadi bread pudding in saffron milk syrup", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_DoubleKaMeetha.webp", popular: true, featured: true },
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
      { name: "Special Chikoo Shake (Real Fruit)", desc: "Sapodilla shake, creamy, malty, naturally sweet.", price: "6.99", spice: 0, veg: true, alt: "Special Chikoo Shake, a creamy sapodilla shake in a tall glass", image: "/assets/new-images/TheIndianKitchenBiryaniAndDosa_SpecialChikooShake.webp", popular: true, featured: true },
      { name: "Custard Apple Shake (Real Fruit)", desc: "Sitaphal blended into a silky, fragrant shake.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/custard-apple-shake.jpg" },
      { name: "SPL Badam Milk", desc: "Saffron-almond milk, lightly cardamom-spiced.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/badam-milk.jpg" },
      { name: "Rose Milk (Original Taste)", desc: "Chilled milk with house rose syrup.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/rose-milk.jpg" },
      { name: "Mohabbath Ka Sharbath", desc: "Old Delhi summer cooler, watermelon, rose, chilled milk.", price: "7.99", spice: 0, veg: true, image: "/assets/dishes/mohabbat-ka-sharbat.jpg" },
      { name: "Butter Milk", desc: "Spiced South Indian chaas, cooling and light.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/butter-milk.png" },
      { name: "Mango Lassi", desc: "Alphonso mango blended with sweet yogurt.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/mango-lassi.png" },
      { name: "Sweet Lassi / Salt Lassi", desc: "Chilled sweet or salted yogurt drink.", price: "6.99", spice: 0, veg: true, image: "/assets/dishes/lassi.png" },
    ],
  },
  {
    id: "fizzy-drinks",
    label: "Fizzy Drinks",
    kicker: "Fizz, On Ice",
    intro: "Fresh lime sodas and chilled bottled classics.",
    items: [
      { name: "Lime Soda", desc: "Fresh lime soda, your way.", price: "6.99", spice: 0, veg: true, options: ["Sweet", "Salt", "Masala"], image: "/assets/dishes/lime-soda.png" },
      { name: "Pops", desc: "Chilled soft drinks.", price: "2.99", spice: 0, veg: true, options: ["Coke", "Pepsi", "Diet Coke", "Ginger Ale"], image: "/assets/dishes/soft-drinks.png" },
      { name: "Thumbs Up / Limca", desc: "Classic Indian soft drinks.", price: "3.99", spice: 0, veg: true, image: "/assets/dishes/thumbs-up-limca.png" },
    ],
  },
  {
    id: "side-orders",
    label: "Side Orders",
    kicker: "On the Side",
    intro: "The extras, raita, salan, chutney, papad and steamed rice.",
    items: [
      { name: "Boiled Egg", desc: "A single boiled egg.", price: "1.99", spice: 0, veg: false, image: "/assets/dishes/boiled-egg.png" },
      { name: "Raita / Salan", desc: "Cooling spiced yogurt, or spiced South Indian gravy.", spice: 1, variants: [ { name: "3.25 oz", price: "1.49" }, { name: "8 oz", price: "3.99" } ], image: "/assets/dishes/raita-8-oz.png" },
      { name: "Chutney 8 oz", desc: "House chutney.", price: "4.99", spice: 1, veg: true, image: "/assets/dishes/chutney.png" },
      { name: "Onion Salad", desc: "Sliced onion with lemon.", price: "2.99", spice: 0, veg: true, image: "/assets/dishes/onion-salad.png" },
      { name: "Plain Yogurt", desc: "Plain set yogurt.", price: "1.99", spice: 0, veg: true, image: "/assets/dishes/yogurt.png" },
      { name: "Papad", desc: "Crisp roasted papad.", price: "1.99", spice: 0, veg: true, image: "/assets/dishes/papad.png" },
      { name: "Water Bottle", desc: "Bottled water.", price: "2.49", image: "/assets/dishes/bottled-water.png" },
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
