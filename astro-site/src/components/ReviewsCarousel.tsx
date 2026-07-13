import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// ---------------------------------------------------------------------------
// Curated Google reviews. PLACEHOLDERS: replace each entry with a real Google
// review once the client sends them.
// ---------------------------------------------------------------------------
type Review = { name: string; text: string; rating: number };

const REVIEWS: Review[] = [
  { name: "Aarav S.", text: "The Hyderabadi biryani transports you home. Easily the best in Toronto.", rating: 5 },
  { name: "Maya L.", text: "Beautiful room, warm service, and the masala dosa is perfection.", rating: 5 },
  { name: "Daniel K.", text: "Refined, modern, and deeply authentic. A new downtown favourite.", rating: 5 },
  { name: "Priya R.", text: "The ghee roast and filter coffee are exactly like back home. Impeccable.", rating: 5 },
  { name: "Marcus T.", text: "Every dish arrived beautifully plated and full of flavour. We will be back.", rating: 5 },
];

// Original Lovable design: one cream review card per slide, centered on the
// solid green section, with copper prev/next arrows flanking slide dots.
export default function ReviewsCarousel() {
  const [i, setI] = useState(0);
  const total = REVIEWS.length;
  const go = (dir: 1 | -1) => setI((p) => (p + dir + total) % total);
  const r = REVIEWS[i];

  return (
    <div className="container-x">
      <div className="text-center mb-12 md:mb-14">
        <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Kind Words</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-3 text-beige">Loved across Toronto.</h2>
      </div>

      <div className="max-w-[860px] mx-auto">
        <div className="relative bg-[#e1c7ae] text-olive rounded-[1.6rem] px-8 py-12 md:px-16 md:py-16 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
          <Quote className="mx-auto size-9 text-saffron" aria-hidden="true" />
          <div className="mt-6 flex justify-center gap-1.5 text-saffron" aria-label={`Rated ${r.rating} out of 5`}>
            {Array.from({ length: r.rating }).map((_, k) => (
              <Star key={k} className="size-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-6 font-serif text-2xl md:text-3xl leading-snug text-olive">
            "{r.text}"
          </blockquote>
          <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-olive/70">
            {r.name}, via Google
          </figcaption>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <ArrowButton dir={-1} onClick={() => go(-1)} label="Previous review" />

          <div className="flex items-center gap-2">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Go to review ${k + 1}`}
                aria-current={k === i}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-saffron" : "w-1.5 bg-beige/30 hover:bg-beige/50"}`}
              />
            ))}
          </div>

          <ArrowButton dir={1} onClick={() => go(1)} label="Next review" />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ dir, onClick, label }: { dir: 1 | -1; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="size-12 rounded-full border border-saffron/50 text-saffron hover:bg-saffron hover:text-beige transition-colors grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
    >
      {dir === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
  );
}
