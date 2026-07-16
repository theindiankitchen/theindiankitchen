import { Star } from "lucide-react";

// Exact port of the original Lovable "Loved across Toronto" reviews section
// (src/routes/index.tsx). Three static cream cards, no carousel. Copy verbatim,
// including the attribution dash and "via Google".
const REVIEWS = [
  { name: "Aarav S.", text: "The Hyderabadi biryani transports you home. Easily the best in Toronto.", rating: 5 },
  { name: "Maya L.", text: "Beautiful room, warm service, and the masala dosa is perfection.", rating: 5 },
  { name: "Daniel K.", text: "Refined, modern, and deeply authentic. A new downtown favourite.", rating: 5 },
];

export default function ReviewsCarousel() {
  return (
    <section id="reviews" className="py-24 md:py-32 relative bg-olive overflow-hidden">
      <div className="absolute inset-0 pattern-tile opacity-[0.06] pointer-events-none" />

      <div className="container-x relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Loved across Toronto.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="exotic-border corner-ornaments p-8 bg-beige border-saffron text-olive shadow-[inset_0_0_0_1px_rgba(179,101,18,0.2),0_0_25px_-8px_rgba(179,101,18,0.22)] hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_rgba(179,101,18,0.2),0_10px_40px_-10px_rgba(179,101,18,0.25)] transition-all duration-300">
              <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
              <div className="flex gap-1 text-saffron">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <blockquote className="mt-5 font-serif text-xl leading-snug">"{r.text}"</blockquote>
              <figcaption className="mt-6 text-sm text-olive/80">— {r.name}, via Google</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
