import { useEffect, useRef, useState } from "react";

const GREETINGS: { text: string; lang: string }[] = [
  { text: "नमस्ते", lang: "Hindi" },
  { text: "నమస్కారం", lang: "Telugu" },
  { text: "வணக்கம்", lang: "Tamil" },
  { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
  { text: "নমস্কার", lang: "Bengali" },
  { text: "કેમ છો", lang: "Gujarati" },
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
  { text: "آداب", lang: "Urdu" },
  { text: "സ്വാഗതം", lang: "Malayalam" },
  { text: "नमस्कार", lang: "Marathi" },
];

// Grapheme-aware split so complex scripts type by visible cluster, not code point.
function graphemes(input: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
  if (Seg) {
    const seg = new Seg(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(input), (s) => s.segment);
  }
  return Array.from(input);
}

export default function WelcomeGreetings() {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Static fallback: show the first greeting, no motion.
      setDisplay(GREETINGS[0].text);
      setIndex(0);
      return;
    }

    let i = 0; // greeting index
    let alive = true;

    const run = () => {
      const chars = graphemes(GREETINGS[i].text);
      setIndex(i);

      const typeStep = (n: number) => {
        if (!alive) return;
        setDisplay(chars.slice(0, n).join(""));
        if (n < chars.length) {
          // Calm, slightly varied typing speed for a natural feel.
          timer.current = window.setTimeout(() => typeStep(n + 1), 100 + Math.random() * 20);
        } else {
          // Hold the finished word, then erase.
          timer.current = window.setTimeout(() => eraseStep(chars.length), 2000);
        }
      };

      const eraseStep = (n: number) => {
        if (!alive) return;
        setDisplay(chars.slice(0, n).join(""));
        if (n > 0) {
          timer.current = window.setTimeout(() => eraseStep(n - 1), 55);
        } else {
          i = (i + 1) % GREETINGS.length;
          // Brief pause before the next language.
          timer.current = window.setTimeout(run, 450);
        }
      };

      typeStep(0);
    };

    run();

    return () => {
      alive = false;
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-4 md:mt-6 flex flex-col items-center justify-center select-none text-center">
      <div
        className="flex items-center justify-center min-h-[4.5rem] sm:min-h-[5.5rem] md:min-h-[6.5rem]"
        aria-live="polite"
      >
        <span className="welcome-text font-serif">{display}</span>
        <span className="welcome-caret" aria-hidden="true" />
      </div>
      <span className="welcome-lang">{GREETINGS[index].lang}</span>
      <p className="mt-5 text-olive/75 italic font-sans text-base md:text-lg tracking-wide">
        A taste of India, served with warmth.
      </p>
    </div>
  );
}
