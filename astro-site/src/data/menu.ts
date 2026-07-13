// Full menu data, ported exactly from the client's TanStack build.
// Images live in /public/assets (top-level renders) and /public/assets/dishes
// (per-dish photography). Every image is a placeholder to swap after the shoot.

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

// Reused cinematic renders
const biryaniHyderabadi = "/assets/biryani-hyderabadi.jpg";
const biryaniDonne = "/assets/biryani-donne.jpg";
const biryaniMutton = "/assets/biryani-mutton.jpg";
const biryaniPaneer = "/assets/biryani-paneer.jpg";
const biryaniVegDum = "/assets/biryani-veg-dum.jpg";
const riceFried = "/assets/rice-fried.jpg";
const riceSchezwan = "/assets/rice-schezwan.jpg";

// Cinematic hero render per section
const dosaHero = "/assets/menu-dosa-hero.jpg";
const streetHero = "/assets/menu-street-hero.jpg";
const appetizerHero = "/assets/menu-appetizer-hero.jpg";
const soupHero = "/assets/menu-soup-hero.jpg";
const snacksHero = "/assets/menu-snacks-hero.jpg";
const curryHero = "/assets/menu-curry-hero.jpg";
const drinksHero = "/assets/menu-drinks-hero.jpg";
const dessertsHero = "/assets/menu-desserts-hero.jpg";

// Per-dish photography
const imgChickenFryPieceBiryani = "/assets/dishes/chicken-fry-piece-biryani.jpg";
const imgMughlaiChickenBiryani = "/assets/dishes/mughlai-chicken-biryani.jpg";
const imgBezawadaChickenBiryani = "/assets/dishes/bezawada-chicken-biryani.jpg";
const imgButterChickenBiryani = "/assets/dishes/butter-chicken-biryani.jpg";
const imgEggFryBiryani = "/assets/dishes/egg-fry-biryani.jpg";
const imgNattuKodiFryBiryani = "/assets/dishes/nattu-kodi-fry-biryani.jpg";
const imgPrawnsFryBiryaniMenu = "/assets/dishes/prawns-fry-biryani-menu.jpg";
const imgChepalaPulusu = "/assets/dishes/chepala-pulusu.jpg";
const imgBendiRoyalaPulusu = "/assets/dishes/bendi-royala-pulusu.jpg";
const imgJeeraRiceDalTadka = "/assets/dishes/jeera-rice-dal-tadka.jpg";
const imgSambarRice = "/assets/dishes/sambar-rice.jpg";
const imgCurdRice = "/assets/dishes/curd-rice.jpg";
const imgGheeKaramIdly = "/assets/dishes/ghee-karam-idly.jpg";
const imgPlainIdly = "/assets/dishes/plain-idly.jpg";
const imgSambarIdly = "/assets/dishes/sambar-idly.jpg";
const imgPlainVada = "/assets/dishes/plain-vada.jpg";
const imgSambarVada = "/assets/dishes/sambar-vada.jpg";
const imgDahiVada = "/assets/dishes/dahi-vada.jpg";
const imgPuri = "/assets/dishes/puri.jpg";
const imgAamrasPuri = "/assets/dishes/aamras-puri.jpg";
const imgKeemaPuri = "/assets/dishes/keema-puri.jpg";
const imgPuriMutton = "/assets/dishes/puri-mutton.jpg";
const imgPlainDosa = "/assets/dishes/plain-dosa.jpg";
const imgGheeRoastDosa = "/assets/dishes/ghee-roast-dosa.jpg";
const imgPaperDosa = "/assets/dishes/paper-dosa.jpg";
const imgGheePodiDosa = "/assets/dishes/ghee-podi-dosa.jpg";
const imgOnionDosa = "/assets/dishes/onion-dosa.jpg";
const imgMysoreDosa = "/assets/dishes/mysore-dosa.jpg";
const imgMysoreMasalaDosa = "/assets/dishes/mysore-masala-dosa.jpg";
const imgBenneDosa = "/assets/dishes/benne-dosa.jpg";
const imgBennePodiDosa = "/assets/dishes/benne-podi-dosa.jpg";
const imgMuttonKeemaDosa = "/assets/dishes/mutton-keema-dosa-menu.jpg";
const imgDosaChickenCurry = "/assets/dishes/dosa-chicken-curry.jpg";
const imgDosaMuttonCurry = "/assets/dishes/dosa-mutton-curry.jpg";
const imgButterChickenDosa = "/assets/dishes/butter-chicken-dosa-menu.jpg";
const imgChickenVindolaDosa = "/assets/dishes/chicken-vindola-dosa.jpg";
const imgPizzaDosa = "/assets/dishes/pizza-dosa.jpg";
const imgConeDosa = "/assets/dishes/cone-dosa.jpg";
const imgDoubleEggKaramDosa = "/assets/dishes/double-egg-karam-dosa.jpg";
const imgCheeseDosa = "/assets/dishes/cheese-dosa.jpg";
const imgGunturKaramDosa = "/assets/dishes/guntur-karam-dosa.jpg";
const imgPaneerDosa = "/assets/dishes/paneer-dosa.jpg";
const imgRavaDosa = "/assets/dishes/rava-dosa.jpg";
const imgRavaOnionDosa = "/assets/dishes/rava-onion-dosa.jpg";
const imgRavaMasalaDosa = "/assets/dishes/rava-masala-dosa.jpg";
const imgUttapamPlain = "/assets/dishes/uttapam-plain.jpg";
const imgUttapamOnion = "/assets/dishes/uttapam-onion.jpg";
const imgUttapamMasala = "/assets/dishes/uttapam-masala.jpg";
const imgPesarattu = "/assets/dishes/pesarattu.jpg";
const imgEggFriedRice = "/assets/dishes/egg-fried-rice.jpg";
const imgVegFriedRice = "/assets/dishes/veg-fried-rice.jpg";
const imgChickenNoodles = "/assets/dishes/chicken-noodles.jpg";
const imgEggNoodles = "/assets/dishes/egg-noodles.jpg";
const imgVegNoodles = "/assets/dishes/veg-noodles.jpg";
const imgMixedMeatFriedRice = "/assets/dishes/mixed-meat-fried-rice.jpg";
const imgMixedMeatNoodles = "/assets/dishes/mixed-meat-noodles.jpg";
const imgDevilChickenNoodles = "/assets/dishes/devil-chicken-noodles.jpg";
const imgDesiChicken65 = "/assets/dishes/desi-chicken-65.jpg";
const imgKajuChickenPakodi = "/assets/dishes/kaju-chicken-pakodi.jpg";
const imgVelliUlliKaramChicken = "/assets/dishes/velli-ulli-karam-chicken.jpg";
const imgMuttonChukkaFry = "/assets/dishes/mutton-chukka-fry.jpg";
const imgGheeRoastMutton = "/assets/dishes/ghee-roast-mutton-menu.jpg";
const imgPatherKaGosht = "/assets/dishes/pather-ka-gosht.jpg";
const imgIndianKitchenSpecialChicken = "/assets/dishes/indian-kitchen-special-chicken.jpg";
const imgJumboWings = "/assets/dishes/jumbo-wings.jpg";
const imgGobi65 = "/assets/dishes/gobi-65.jpg";
const imgGobiFry = "/assets/dishes/gobi-fry.jpg";
const imgCrispyCorn = "/assets/dishes/crispy-corn.jpg";
const imgPaneerVelliUlliKaram = "/assets/dishes/paneer-velli-ulli-karam.jpg";
const imgGarlicPaneer = "/assets/dishes/garlic-paneer.jpg";
const imgCrispyPrawnFry = "/assets/dishes/crispy-prawn-fry.jpg";
const imgKeralaPepperPrawn = "/assets/dishes/kerala-pepper-prawn.jpg";
const imgButterGarlicPrawn = "/assets/dishes/butter-garlic-prawn.jpg";
const imgChickenKodiCharu = "/assets/dishes/chicken-kodi-charu.jpg";
const imgMachoVegSoup = "/assets/dishes/macho-veg-soup.jpg";
const imgMachoChickenSoup = "/assets/dishes/macho-chicken-soup.jpg";
const imgMachoEggSoup = "/assets/dishes/macho-egg-soup.jpg";
const imgAlooSamosa = "/assets/dishes/aloo-samosa.jpg";
const imgChickenSamosa = "/assets/dishes/chicken-samosa.jpg";
const imgChickenPuffs = "/assets/dishes/chicken-puffs.jpg";
const imgEggPuffs = "/assets/dishes/egg-puffs.jpg";
const imgPaneerPuffs = "/assets/dishes/paneer-puffs.jpg";
const imgCutMirchi = "/assets/dishes/cut-mirchi.jpg";
const imgStuffedBajji = "/assets/dishes/stuffed-bajji.jpg";
const imgOsmaniaBiscuits = "/assets/dishes/osmania-biscuits.jpg";
const imgChickenKurma = "/assets/dishes/chicken-kurma.jpg";
const imgMuttonKurma = "/assets/dishes/mutton-kurma.jpg";
const imgVegKurma = "/assets/dishes/veg-kurma.jpg";
const imgRumaliRoti = "/assets/dishes/rumali-roti.jpg";
const imgParota = "/assets/dishes/parota.jpg";
const imgHyd65Rumali = "/assets/dishes/hyd65-rumali.jpg";
const imgChickenKurmaParota = "/assets/dishes/chicken-kurma-parota.jpg";
const imgMuttonKurmaParota = "/assets/dishes/mutton-kurma-parota.jpg";
const imgButterChickenWrap = "/assets/dishes/butter-chicken-wrap.jpg";
const imgMuttonKeemaWrap = "/assets/dishes/mutton-keema-wrap.jpg";
const imgPaneerWrap = "/assets/dishes/paneer-wrap.jpg";
const imgBadamMilk = "/assets/dishes/badam-milk.jpg";
const imgRoseMilk = "/assets/dishes/rose-milk.jpg";
const imgStrawberryMilk = "/assets/dishes/strawberry-milk.jpg";
const imgChickooShake = "/assets/dishes/chickoo-shake.jpg";
const imgCustardAppleShake = "/assets/dishes/custard-apple-shake.jpg";
const imgMohabbatKaSharbat = "/assets/dishes/mohabbat-ka-sharbat.jpg";
const imgIraniTea = "/assets/dishes/irani-tea.jpg";
const imgFilterCoffee = "/assets/dishes/filter-coffee.jpg";
const imgGulabJamun = "/assets/dishes/gulab-jamun.jpg";
const imgRasmalai = "/assets/dishes/rasmalai.jpg";
const imgGajarHalwa = "/assets/dishes/gajar-halwa.jpg";
const imgWatermelonHalwa = "/assets/dishes/watermelon-halwa.jpg";

export const BIRYANI: MenuItem[] = [
  { name: "Chicken Dum Biryani (Bone-in)", desc: "Slow-cooked in a sealed handi with saffron, mint and whole spices.", price: "16.99", spice: 2, veg: false, image: biryaniHyderabadi, popular: true, featured: true },
  { name: "Chicken Fry Piece Biryani (Bone-in)", desc: "Bone-in marinated fry pieces layered with aged basmati.", price: "17.99", spice: 2, veg: false, image: imgChickenFryPieceBiryani },
  { name: "Mughlai Chicken Biryani (Boneless)", desc: "Boneless, perfumed with royal Mughlai whole spices and saffron.", price: "17.99", spice: 2, veg: false, image: imgMughlaiChickenBiryani },
  { name: "Chicken Donne Biryani (Weekend)", desc: "Bangalore military-style, short-grain seeraga samba with mint masala.", price: "16.99", spice: 3, veg: false, image: biryaniDonne },
  { name: "Thalapakattu Mutton Biryani, Chef Special", desc: "Tender slow-cooked mutton in a dark, deep Dindigul-style masala.", price: "17.99", spice: 3, veg: false, image: biryaniMutton, popular: true },
  { name: "Bezawada Chicken Biryani (Boneless)", desc: "Boneless Andhra-fire biryani with a slow, building heat.", price: "17.99", spice: 3, veg: false, image: imgBezawadaChickenBiryani },
  { name: "Butter Chicken Biryani (Boneless)", desc: "Creamy, rich butter chicken folded through saffron basmati.", price: "17.99", spice: 1, veg: false, image: imgButterChickenBiryani },
  { name: "Paneer Ghee Roast Biryani", desc: "Ghee-roasted paneer layered with fragrant aged basmati.", price: "16.49", spice: 2, veg: true, image: biryaniPaneer },
  { name: "Mixed Vegetable Biryani", desc: "Seasonal vegetables, fried onions and whole garam masala under dum.", price: "15.99", spice: 1, veg: true, image: biryaniVegDum },
  { name: "Egg Fry Biryani (2 eggs)", desc: "Two fried eggs nestled in fragrant biryani rice.", price: "15.99", spice: 2, veg: false, image: imgEggFryBiryani },
  { name: "Nattu Kodi Fry Biryani, Chef Special", desc: "Country chicken slow-fried and layered with aromatic basmati.", price: "17.99", spice: 3, veg: false, image: imgNattuKodiFryBiryani, popular: true },
  { name: "Prawns Fry Biryani, Chef Special", desc: "Coastal-spiced prawns folded into fragrant basmati.", price: "17.99", spice: 3, veg: false, image: imgPrawnsFryBiryaniMenu },
  { name: "Chepala Pulusu with White Rice", desc: "Andhra tamarind fish curry served with steamed rice.", price: "18.99", spice: 3, veg: false, image: imgChepalaPulusu },
  { name: "Bendi Royala Pulusu with White Rice", desc: "Okra & prawn tamarind curry served with steamed rice.", price: "18.99", spice: 3, veg: false, image: imgBendiRoyalaPulusu },
  { name: "Jeera Rice with Dal Tadka", desc: "Cumin basmati with tempered yellow dal, served with papad & pickle.", price: "16.99", spice: 1, veg: true, image: imgJeeraRiceDalTadka },
  { name: "Sambar Rice", desc: "Rice tossed in tempered lentil sambar, papad & pickle on the side.", price: "11.99", spice: 1, veg: true, image: imgSambarRice },
  { name: "Curd Rice", desc: "Cooling tempered yogurt rice with curry leaves and mustard.", price: "9.99", spice: 0, veg: true, image: imgCurdRice },
];

export const TIFFINS: MenuItem[] = [
  { name: "Ghee Karam Idly (3 pc)", desc: "Steamed idlies brushed with ghee and spicy gunpowder.", price: "8.99", spice: 2, veg: true, image: imgGheeKaramIdly, popular: true, featured: true },
  { name: "Plain Idly (3 pc)", desc: "Pillow-soft steamed rice & lentil cakes.", price: "7.99", spice: 0, veg: true, image: imgPlainIdly },
  { name: "Sambar Idly (2 pc)", desc: "Idlies bathed in piping hot lentil sambar.", price: "8.99", spice: 1, veg: true, image: imgSambarIdly },
  { name: "Plain Vada (3 pc)", desc: "Crisp South Indian lentil donuts.", price: "7.99", spice: 1, veg: true, image: imgPlainVada },
  { name: "Sambar Vada (2 pc)", desc: "Lentil vadas dunked in spiced sambar.", price: "8.99", spice: 1, veg: true, image: imgSambarVada },
  { name: "Dahi Vada (2 pc)", desc: "Soft vadas in chilled tempered yogurt.", price: "9.99", spice: 0, veg: true, image: imgDahiVada },
  { name: "Puri (3 pc)", desc: "Hot puffed puris with chana or aloo masala.", price: "10.99", spice: 1, veg: true, image: imgPuri },
  { name: "Aamras Puri (3 pc)", desc: "Crisp puris with sweet alphonso mango pulp.", price: "12.99", spice: 0, veg: true, image: imgAamrasPuri },
  { name: "Keema Puri (3 pc)", desc: "Puris served with spiced mutton keema.", price: "12.99", spice: 2, veg: false, image: imgKeemaPuri },
  { name: "Puri with Mutton (3 pc)", desc: "Puris with slow-cooked mutton curry.", price: "15.99", spice: 2, veg: false, image: imgPuriMutton },
];

export const DOSA: MenuItem[] = [
  { name: "Masala Dosa", desc: "Ghee-roasted gold crepe folded over a soft potato masala.", price: "10.99", spice: 1, veg: true, image: dosaHero, popular: true, featured: true },
  { name: "Plain Dosa", desc: "Classic fermented rice-and-lentil crepe, crisp and lacy.", price: "7.99", spice: 0, veg: true, image: imgPlainDosa },
  { name: "Ghee Roast Dosa", desc: "Crisped to a deep gold with ghee.", price: "8.99", spice: 0, veg: true, image: imgGheeRoastDosa },
  { name: "Paper / 70mm Dosa", desc: "Extra long, paper-thin, dramatic table-side reveal.", price: "12.99", spice: 0, veg: true, image: imgPaperDosa },
  { name: "Ghee Podi Dosa", desc: "Ghee dosa dusted with house-roasted lentil podi.", price: "10.99", spice: 2, veg: true, image: imgGheePodiDosa },
  { name: "Onion Dosa", desc: "Crisp dosa scattered with sharp pink onion.", price: "9.99", spice: 1, veg: true, image: imgOnionDosa },
  { name: "Mysore Dosa Plain", desc: "Dosa painted with fiery red Mysore chutney.", price: "9.99", spice: 2, veg: true, image: imgMysoreDosa },
  { name: "Mysore Masala Dosa", desc: "Mysore chutney layered under soft potato masala.", price: "11.99", spice: 2, veg: true, image: imgMysoreMasalaDosa },
  { name: "Benne Dosa Plain, Chef Special", desc: "Karnataka-style butter dosa, soft inside, crisp edges.", price: "9.99", spice: 1, veg: true, image: imgBenneDosa },
  { name: "Benne Ghee Podi Dosa, Chef Special", desc: "Butter dosa dusted with spicy ghee podi.", price: "13.99", spice: 2, veg: true, image: imgBennePodiDosa },
  { name: "Mutton Keema Dosa, Chef Special", desc: "Dosa rolled around spiced mutton keema.", price: "12.99", spice: 2, veg: false, image: imgMuttonKeemaDosa },
  { name: "Dosa with Chicken Curry", desc: "Crisp dosa with spicy boneless chicken curry.", price: "13.99", spice: 2, veg: false, image: imgDosaChickenCurry },
  { name: "Dosa with Mutton Curry", desc: "Dosa with slow-cooked Andhra mutton curry.", price: "15.99", spice: 3, veg: false, image: imgDosaMuttonCurry },
  { name: "Butter Chicken Dosa, Chef Special", desc: "Mild, creamy butter chicken folded into a golden dosa.", price: "13.99", spice: 1, veg: false, image: imgButterChickenDosa, popular: true },
  { name: "Chicken Vindola Dosa, Chef Special", desc: "Tangy Goan-style vindaloo chicken in a crisp dosa.", price: "12.99", spice: 3, veg: false, image: imgChickenVindolaDosa },
  { name: "Pizza Dosa, Chef Special", desc: "Indo-fusion, cheese, capsicum and house masala on dosa.", price: "13.99", spice: 1, veg: true, image: imgPizzaDosa },
  { name: "Kids / Cone Dosa", desc: "Dosa rolled into a playful cone, kid-approved.", price: "9.99", spice: 0, veg: true, image: imgConeDosa },
  { name: "Double Egg Karam Dosa", desc: "Twin eggs spread over a spicy karam-coated dosa.", price: "12.99", spice: 2, veg: false, image: imgDoubleEggKaramDosa },
  { name: "Cheese Dosa", desc: "Molten cheese folded inside a golden crepe.", price: "12.99", spice: 0, veg: true, image: imgCheeseDosa },
  { name: "Guntur Karam Dosa", desc: "Andhra chili powder painted across a ghee-roasted dosa.", price: "12.99", spice: 3, veg: true, image: imgGunturKaramDosa },
  { name: "Paneer Dosa", desc: "Spiced paneer bhurji rolled into a crisp dosa.", price: "12.99", spice: 1, veg: true, image: imgPaneerDosa },
  { name: "Rava Dosa Plain", desc: "Semolina lace dosa, crisp, golden and aromatic.", price: "7.99", spice: 1, veg: true, image: imgRavaDosa },
  { name: "Rava Onion Dosa", desc: "Lace rava dosa scattered with onion and chili.", price: "9.99", spice: 1, veg: true, image: imgRavaOnionDosa },
  { name: "Rava Masala Dosa", desc: "Rava dosa folded over potato masala.", price: "10.99", spice: 1, veg: true, image: imgRavaMasalaDosa },
  { name: "Uttapam Plain", desc: "Thick savoury pancake, crisp at the edges.", price: "7.99", spice: 1, veg: true, image: imgUttapamPlain },
  { name: "Uttapam Onion", desc: "Uttapam studded with onion and green chili.", price: "9.99", spice: 1, veg: true, image: imgUttapamOnion },
  { name: "Uttapam Masala", desc: "Uttapam topped with potato masala and onion.", price: "10.99", spice: 1, veg: true, image: imgUttapamMasala },
  { name: "Pesarattu (2 pc)", desc: "Andhra green moong dosa with ginger-chili tang.", price: "11.99", spice: 1, veg: true, image: imgPesarattu },
];

export const STREET: MenuItem[] = [
  { name: "Chicken Fried Rice", desc: "Wok-tossed at high flame with scallions and soy glaze.", price: "15.99", spice: 2, veg: false, image: riceFried, popular: true, featured: true },
  { name: "Egg Fried Rice", desc: "Smoky street-style basmati with scrambled egg and scallion.", price: "14.99", spice: 1, veg: false, image: imgEggFriedRice },
  { name: "Veg Fried Rice", desc: "Wok-tossed basmati with crunchy garden vegetables.", price: "13.99", spice: 1, veg: true, image: imgVegFriedRice },
  { name: "Chicken Noodles", desc: "Hakka-style noodles tossed with chicken and chili soy.", price: "15.99", spice: 2, veg: false, image: imgChickenNoodles },
  { name: "Egg Noodles", desc: "Smoky street-style noodles with scrambled egg.", price: "14.99", spice: 1, veg: false, image: imgEggNoodles },
  { name: "Veg Noodles", desc: "Hakka noodles tossed with crisp vegetables.", price: "13.99", spice: 1, veg: true, image: imgVegNoodles },
  { name: "Mixed Meat Fried Rice", desc: "Chicken, egg and prawn wok-tossed with smoky garlic.", price: "17.99", spice: 2, veg: false, image: imgMixedMeatFriedRice },
  { name: "Mixed Meat Noodles", desc: "All-meat noodles in a glossy chili-soy lacquer.", price: "17.99", spice: 2, veg: false, image: imgMixedMeatNoodles },
  { name: "Devil Chicken Fried Rice, Chef Special", desc: "Fiery chili-oil glazed basmati, slow-building Indo-Chinese heat.", price: "18.99", spice: 3, veg: false, image: riceSchezwan, popular: true },
  { name: "Devil Chicken Noodles, Chef Special", desc: "Chili-lacquered Hakka noodles with devil chicken.", price: "18.99", spice: 3, veg: false, image: imgDevilChickenNoodles },
];

export const APPETIZERS: MenuItem[] = [
  { name: "Hyd Chicken 65", desc: "Hyderabadi street classic, crisp, red-spiced, curry-leaf tossed.", price: "15.99", spice: 3, veg: false, image: appetizerHero, popular: true, featured: true },
  { name: "Desi Chicken 65 (Dry)", desc: "Crisp, dry-tossed in chili and curry leaf.", price: "15.99", spice: 3, veg: false, image: imgDesiChicken65 },
  { name: "Kaju Chicken Pakodi", desc: "Cashew-crusted chicken bites, golden and crunchy.", price: "16.99", spice: 2, veg: false, image: imgKajuChickenPakodi },
  { name: "Velli Ulli Karam Chicken", desc: "Spicy onion-garlic masala glazed over crisp chicken.", price: "16.99", spice: 3, veg: false, image: imgVelliUlliKaramChicken },
  { name: "Mutton Chukka Fry (Boneless)", desc: "Boneless mutton dry-roasted with black pepper and spice.", price: "17.99", spice: 3, veg: false, image: imgMuttonChukkaFry },
  { name: "Ghee Roast Mutton", desc: "Aromatic ghee-roasted mutton with toasted whole spices.", price: "17.99", spice: 2, veg: false, image: imgGheeRoastMutton },
  { name: "Pather Ka Gosht / Devil Fry Mutton", desc: "Stone-grilled spiced mutton, smoky and intense.", price: "17.99", spice: 3, veg: false, image: imgPatherKaGosht },
  { name: "Indian Kitchen Special Chicken", desc: "House signature, secret-blend masala glazed chicken.", price: "17.99", spice: 2, veg: false, image: imgIndianKitchenSpecialChicken, popular: true },
  { name: "Chef Special Indian Crispy Fry (Jumbo Wings)", desc: "Oversized wings, crisp-fried and tossed in house masala.", price: "16.99", spice: 2, veg: false, image: imgJumboWings },
  { name: "Gobi 65", desc: "Crispy spiced cauliflower, vegetarian Hyderabadi classic.", price: "14.99", spice: 2, veg: true, image: imgGobi65 },
  { name: "Gobi Fry (Dry)", desc: "Dry-tossed cauliflower with chili and curry leaf.", price: "14.99", spice: 2, veg: true, image: imgGobiFry },
  { name: "Crispy Corn", desc: "Sweet corn tossed in chili-salt masala.", price: "14.99", spice: 2, veg: true, image: imgCrispyCorn },
  { name: "Paneer Velli Ulli Karam", desc: "Paneer in spicy onion-garlic masala.", price: "15.99", spice: 2, veg: true, image: imgPaneerVelliUlliKaram },
  { name: "Garlic Paneer", desc: "Paneer glazed in roasted garlic butter.", price: "15.99", spice: 1, veg: true, image: imgGarlicPaneer },
  { name: "Crispy Prawn Fry", desc: "Golden, crunchy, deeply spiced prawn bites.", price: "17.99", spice: 2, veg: false, image: imgCrispyPrawnFry },
  { name: "Kerala Style Pepper Prawn", desc: "Black pepper and curry leaf-laced prawns.", price: "17.99", spice: 2, veg: false, image: imgKeralaPepperPrawn },
  { name: "Butter Garlic Prawn", desc: "Buttery, garlicky finish on tender prawns.", price: "17.99", spice: 1, veg: false, image: imgButterGarlicPrawn },
];

export const SOUPS: MenuItem[] = [
  { name: "Mutton Bone Soup, Must Try", desc: "Slow-simmered marrow broth with whole spices and pepper.", price: "8.99", spice: 2, veg: false, image: soupHero, popular: true, featured: true },
  { name: "Chicken Kodi Charu", desc: "Andhra-style spiced chicken broth, rustic, aromatic, restorative.", price: "7.99", spice: 2, veg: false, image: imgChickenKodiCharu },
  { name: "Macho Veg Soup", desc: "Indo-Chinese veg soup with garlic and pepper kick.", price: "5.99", spice: 1, veg: true, image: imgMachoVegSoup },
  { name: "Macho Chicken Soup", desc: "Pepper-forward chicken broth with scallions.", price: "6.99", spice: 1, veg: false, image: imgMachoChickenSoup },
  { name: "Macho Egg Soup", desc: "Silky egg-drop soup, peppery and warming.", price: "6.49", spice: 1, veg: false, image: imgMachoEggSoup },
];

export const SNACKS: MenuItem[] = [
  { name: "Railway Onion Samosa (2 pc)", desc: "Hyderabad station-style, small, sharp, with green chutney.", price: "3.00", spice: 2, veg: true, image: snacksHero, popular: true, featured: true },
  { name: "Aloo Samosa (2 pc)", desc: "Classic potato samosa with mint-tamarind chutneys.", price: "3.00", spice: 1, veg: true, image: imgAlooSamosa },
  { name: "Chicken Samosa (2 pc)", desc: "Triangular pockets with juicy spiced chicken keema.", price: "3.00", spice: 2, veg: false, image: imgChickenSamosa },
  { name: "Chicken Puffs", desc: "Flaky golden pastry with spiced chicken keema.", price: "1.99", spice: 1, veg: false, image: imgChickenPuffs },
  { name: "Egg Puffs", desc: "Boiled egg wrapped in buttery puff pastry.", price: "1.49", spice: 1, veg: false, image: imgEggPuffs },
  { name: "Paneer Puffs", desc: "Spiced paneer in golden, flaky pastry.", price: "1.49", spice: 1, veg: true, image: imgPaneerPuffs },
  { name: "Cut Mirchi (3 pc)", desc: "Long chilies, slit, stuffed, dipped and fried.", price: "9.99", spice: 3, veg: true, image: imgCutMirchi },
  { name: "Stuffed Bajji (4 pc)", desc: "Stuffed bajji fritters, crisp shell, soft heart.", price: "11.99", spice: 2, veg: true, image: imgStuffedBajji },
  { name: "Osmania Biscuits", desc: "Hyderabad Irani cafe staple, buttery, salty-sweet.", price: "3.99", spice: 0, veg: true, image: imgOsmaniaBiscuits },
];

export const CURRY: MenuItem[] = [
  { name: "Butter Chicken", desc: "Creamy, mildly spiced tomato-butter gravy with tender chicken.", price: "15.99", spice: 1, veg: false, image: curryHero, popular: true, featured: true },
  { name: "Chicken Kurma", desc: "Coconut-cashew gravy, fragrant whole spices.", price: "16.99", spice: 2, veg: false, image: imgChickenKurma },
  { name: "Mutton Kurma", desc: "Slow-cooked mutton in rich coconut-cashew masala.", price: "17.99", spice: 2, veg: false, image: imgMuttonKurma },
  { name: "Veg Kurma", desc: "Seasonal vegetables in a mild coconut-cashew gravy.", price: "14.99", spice: 1, veg: true, image: imgVegKurma },
  { name: "Rumali Roti", desc: "Handkerchief-thin handmade bread.", price: "3.49", spice: 0, veg: true, image: imgRumaliRoti },
  { name: "Parota", desc: "Layered, flaky South Indian flatbread.", price: "3.99", spice: 0, veg: true, image: imgParota },
  { name: "Hyd Chicken 65 with 2 Rumali Roti", desc: "Spicy Hyderabadi 65 chicken paired with rumali roti.", price: "20.99", spice: 3, veg: false, image: imgHyd65Rumali, popular: true },
  { name: "Chicken Kurma with 2 Parota", desc: "Rich chicken kurma served with flaky parota.", price: "21.99", spice: 2, veg: false, image: imgChickenKurmaParota },
  { name: "Mutton Kurma with 2 Parota", desc: "Slow-cooked mutton kurma with layered parota.", price: "23.99", spice: 2, veg: false, image: imgMuttonKurmaParota },
  { name: "Desi Butter Chicken Wrap", desc: "Parota rolled with butter chicken and onions.", price: "16.99", spice: 1, veg: false, image: imgButterChickenWrap },
  { name: "Desi Mutton Keema Wrap", desc: "Spiced minced mutton wrapped in parota.", price: "17.99", spice: 2, veg: false, image: imgMuttonKeemaWrap },
  { name: "Desi Paneer Wrap", desc: "Spiced paneer bhurji rolled in flaky parota.", price: "15.99", spice: 1, veg: true, image: imgPaneerWrap },
];

export const DRINKS: MenuItem[] = [
  { name: "Exotic Milkshake", desc: "Seasonal premium fruit blended with milk.", price: "10.99", spice: 0, veg: true, image: drinksHero, popular: true, featured: true },
  { name: "Special Badam Milk", desc: "Saffron-almond milk, lightly cardamom-spiced.", price: "6.99", spice: 0, veg: true, image: imgBadamMilk },
  { name: "Rose Milk", desc: "Chilled milk with house rose syrup.", price: "6.99", spice: 0, veg: true, image: imgRoseMilk },
  { name: "Strawberry Milk", desc: "Fresh strawberry blended into chilled milk.", price: "8.99", spice: 0, veg: true, image: imgStrawberryMilk },
  { name: "Chickoo Shake, Special", desc: "Sapodilla shake, creamy, malty, naturally sweet.", price: "6.99", spice: 0, veg: true, image: imgChickooShake },
  { name: "Custard Apple Shake", desc: "Sitaphal blended into a silky, fragrant shake.", price: "6.99", spice: 0, veg: true, image: imgCustardAppleShake },
  { name: "Mohabbat Ka Sharbat", desc: "Old Delhi summer cooler, watermelon, rose, chilled milk.", price: "5.99", spice: 0, veg: true, image: imgMohabbatKaSharbat },
  { name: "Irani / Kadak Tea", desc: "Hyderabadi cafe-style sweet milk tea.", price: "3.49", spice: 0, veg: true, image: imgIraniTea },
  { name: "Madras Filter Coffee", desc: "Strong decoction whipped with hot milk, served in a steel tumbler.", price: "3.49", spice: 0, veg: true, image: imgFilterCoffee },
];

export const DESSERTS: MenuItem[] = [
  { name: "Special Double Ka Meetha", desc: "Hyderabadi bread pudding in saffron milk syrup.", price: "6.99", spice: 0, veg: true, image: dessertsHero, popular: true, featured: true },
  { name: "Gulab Jamun", desc: "Warm milk dumplings soaked in rose-cardamom syrup.", price: "6.99", spice: 0, veg: true, image: imgGulabJamun },
  { name: "Rasmalai", desc: "Cottage cheese discs in chilled saffron-pistachio milk.", price: "6.99", spice: 0, veg: true, image: imgRasmalai },
  { name: "Gajar Halwa", desc: "Slow-cooked carrot halwa with ghee, milk and cardamom.", price: "6.99", spice: 0, veg: true, image: imgGajarHalwa },
  { name: "Watermelon Halwa", desc: "Chef's seasonal special, fragrant, jewel-toned.", price: "7.99", spice: 0, veg: true, image: imgWatermelonHalwa },
];
