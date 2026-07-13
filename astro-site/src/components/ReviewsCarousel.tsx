import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// ---------------------------------------------------------------------------
// Curated Google reviews. PLACEHOLDERS: replace each entry with a real Google
// review once the client sends them, and set GOOGLE_REVIEWS_URL to the real
// Google Business profile.
// AVATAR GOES HERE: replace each `avatar` with the reviewer's real photo.
// ---------------------------------------------------------------------------
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps"; // PLACEHOLDER

type Review = { name: string; text: string; rating: number; avatar: string };

const REVIEWS: Review[] = [
  { name: "Aarav S.", text: "The Hyderabadi biryani transports you home. Easily the best in Toronto.", rating: 5, avatar: "/assets/gallery-1.jpg" },
  { name: "Maya L.", text: "Beautiful room, warm service, and the masala dosa is perfection.", rating: 5, avatar: "/assets/gallery-2.jpg" },
  { name: "Daniel K.", text: "Refined, modern, and deeply authentic. A new downtown favourite.", rating: 5, avatar: "/assets/gallery-3.jpg" },
  { name: "Priya R.", text: "The ghee roast and filter coffee are exactly like back home. Impeccable.", rating: 5, avatar: "/assets/gallery-1.jpg" },
  { name: "Marcus T.", text: "Every dish arrived beautifully plated and full of flavour. We will be back.", rating: 5, avatar: "/assets/gallery-2.jpg" },
];

export default function ReviewsCarousel() {
  const [i, setI] = useState(0);
  const total = REVIEWS.length;
  const go = (dir: 1 | -1) => setI((p) => (p + dir + total) % total);
  const r = REVIEWS[i];

  return (
    <div className="container-x">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Kind Words</span>
        <h2 className="font-serif text-4xl md:text-6xl mt-3 text-olive">Loved across Toronto.</h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-12 md:px-20">
        <ArrowButton dir={-1} onClick={() => go(-1)} label="Previous review" side="left" />
        <ArrowButton dir={1} onClick={() => go(1)} label="Next review" side="right" />

        <div className="text-center">
          {/* Reviewer identity: avatar + name above the stars */}
          <div className="flex items-center justify-center gap-3">
            {/* AVATAR GOES HERE: swap with the reviewer's real photo. */}
            <img
              src={r.avatar}
              alt=""
              className="size-11 rounded-full object-cover ring-2 ring-saffron ring-offset-2 ring-offset-transparent"
            />
            <span className="text-sm uppercase tracking-[0.2em] text-olive/80">{r.name}</span>
          </div>

          <div className="mt-5 flex justify-center gap-1.5 text-saffron" aria-label={`Rated ${r.rating} out of 5`}>
            {Array.from({ length: r.rating }).map((_, k) => (
              <Star key={k} className="size-5 fill-current" />
            ))}
          </div>

          <blockquote className="mt-7 font-serif text-2xl sm:text-3xl md:text-[2.75rem] md:leading-[1.15] leading-snug text-olive max-w-3xl mx-auto">
            "{r.text}"
          </blockquote>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {REVIEWS.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Go to review ${k + 1}`}
              aria-current={k === i}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-saffron" : "w-1.5 bg-olive/25 hover:bg-olive/50"}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer external"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-olive/70 hover:text-saffron transition-colors"
          >
            Read our Google reviews
          </a>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ dir, onClick, label, side }: { dir: 1 | -1; onClick: () => void; label: string; side: "left" | "right" }) {
  const pos = side === "left" ? "left-0" : "right-0";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute ${pos} top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full border border-saffron/50 text-saffron bg-transparent hover:bg-saffron hover:text-beige transition-colors grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron`}
    >
      {dir === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
  );
}
