import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GOES HERE: swap each panel image after the photoshoot.
const PANELS: { img: string; title: string; desc: string }[] = [
  { img: "/assets/hero-spread.jpg", title: "Freshly prepared", desc: "Cooked on the day of your event with overnight marinations, never held or reheated." },
  { img: "/assets/biryani-hyderabadi.jpg", title: "Authentic recipes", desc: "Heritage Hyderabadi and South Indian preparations, exactly as they are meant to taste." },
  { img: "/assets/south-indian.jpg", title: "Vegetarian and Halal", desc: "Generous plant-based menus and certified halal options for every guest at your table." },
  { img: "/assets/hero-interior.jpg", title: "Corporate and family", desc: "From intimate dinners to 500-guest receptions, scaled with the same care." },
  { img: "/assets/menu-appetizer-hero.jpg", title: "Custom spice levels", desc: "Tuned to your guests, mild, medium, or genuinely fiery, your call." },
  { img: "/assets/gallery-2.jpg", title: "Professional service", desc: "Setup, serving and cleanup handled with quiet, attentive hospitality." },
];

type Mode = "pin" | "swipe" | "stack";

function Panel({ p, index }: { p: (typeof PANELS)[number]; index: number }) {
  return (
    <div className="why-panel-inner grid gap-10 md:gap-16 md:grid-cols-[1.1fr_0.9fr] items-center w-full">
      <div className="relative aspect-[4/3] md:aspect-[4/5] max-h-[50vh] md:max-h-[60vh] w-full overflow-hidden rounded-[2rem] ring-1 ring-saffron/15 shadow-2xl">
        {/* IMAGE GOES HERE: swap this panel photo after the shoot. */}
        <img src={p.img} alt={p.title} loading="lazy" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-matte/40 to-transparent" />
      </div>
      <div className="md:pr-4">
        <span className="text-xs uppercase tracking-[0.4em] text-saffron">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.05] text-beige">{p.title}</h3>
        <p className="mt-4 md:mt-6 text-beige/75 text-lg md:text-xl leading-relaxed max-w-md">{p.desc}</p>
      </div>
    </div>
  );
}

export default function WhyJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("stack");

  // Decide layout mode on the client.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const decide = () => {
      if (reduced.matches) setMode("stack");
      else if (desktop.matches) setMode("pin");
      else setMode("swipe");
    };
    const initMode = () => {
      setTimeout(decide, 20);
    };
    initMode();
    reduced.addEventListener("change", decide);
    desktop.addEventListener("change", decide);
    return () => {
      reduced.removeEventListener("change", decide);
      desktop.removeEventListener("change", decide);
    };
  }, []);

  // GSAP pinned horizontal scroll, only in pin mode.
  useLayoutEffect(() => {
    if (mode !== "pin") return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top", 
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [mode]);

  return (
    <section
      ref={sectionRef}
      className={`relative text-beige overflow-hidden ${
        mode === "pin" ? "h-screen py-0" : "py-24 md:py-32"
      }`}
      style={{ backgroundColor: "var(--olive)" }}
    >
      {/* Replaced absolute vertical layout centering with top padding to push down content cleanly */}
      <div className={`relative z-10 w-full h-full flex flex-col ${mode === "pin" ? "pt-14 md:pt-20" : ""}`}>
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <span className="text-[11px] uppercase tracking-[0.35em] text-saffron">Why Cater With Us</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-2">A hospitality experience, not just a meal.</h2>
          </div>
        </div>

        {mode === "stack" ? (
          <div className="container-x flex flex-col gap-16">
            {PANELS.map((p, i) => (
              <Panel key={p.title} p={p} index={i} />
            ))}
          </div>
        ) : mode === "swipe" ? (
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {PANELS.map((p, i) => (
              <div key={p.title} className="shrink-0 snap-center w-[88vw]">
                <Panel p={p} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative flex-1 flex items-center">
            <div ref={trackRef} className="flex flex-nowrap items-center gap-24 will-change-transform pl-[max(2.5rem,calc((100vw-1340px)/2+2.5rem))] pr-[15vw]">
              {PANELS.map((p, i) => (
                <div key={p.title} className="shrink-0 w-[85vw] lg:w-[1240px]">
                  <Panel p={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}