// Reusable decorative rangoli accent. Renders a transparent-PNG rangoli asset as
// a faint, non-interactive background layer that fills the empty flanks of
// center-focused sections. Works in both .astro (static, no client directive)
// and .tsx files.
//
// RANGOLI PNG GOES HERE: /public/rangoli-1..4.png are placeholder mandalas; the
// user will drop the real transparent PNGs into public/ (same filenames).
//
// Positioning + size are passed via `className` using responsive Tailwind
// utilities, so each placement sets its own desktop and mobile position/size
// independently (e.g. "hidden xl:block left-0 top-1/2 -translate-y-1/2
// w-[190px] h-[190px]"). Keep opacity low so it reads as texture, not a graphic.
interface RangoliProps {
  /** Asset path, e.g. "/rangoli-1.png". */
  src: string;
  /** 0-1, keep ~0.10-0.18 so it stays a faint watermark. */
  opacity?: number;
  /** Responsive Tailwind classes for position + size (desktop + mobile). */
  className?: string;
}

export default function Rangoli({ src, opacity = 0.13, className = "" }: RangoliProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 bg-contain bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url('${src}')`, opacity }}
    />
  );
}
