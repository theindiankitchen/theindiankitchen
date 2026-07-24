# theindiankitchen-claude.md

Project guide for **The Indian Kitchen** (client build). Read this fully before writing code. The general agency CLAUDE.md is read first, this file second. This file wins for this project. Save this in the project root as `theindiankitchen-claude.md`.

## Context
This is a real client project. The client built the site on Lovable using TanStack Start (React, Supabase). We are converting it to Astro for SEO and maintainability. This is a faithful port, not a redesign. The client asked for minor changes only and wants it to feel like the site he built. Do not restyle or reinvent. Keep his layout, palette, fonts, and content.

- Restaurant: The Indian Kitchen, Biryani & Dosa.
- Location: Yonge Street, North York, Toronto, Ontario, Canada.
- Status: open, present tense, never "coming soon".
- Positioning: classic, premium, minimalist luxury. Not flashy. Strict palette only. No em dashes anywhere.

## Target stack
- Astro, static output, for SEO.
- Tailwind v4, CSS-first `@theme` (the source already uses this).
- `@astrojs/react` so the client's existing React components can be reused as islands. This is the fast, faithful conversion path. Framer Motion and Embla run inside those islands.
- Web3Forms for the catering form. No Supabase, no database, no server secrets. The only key is a public-safe Web3Forms access key.
- `@astrojs/sitemap`, `robots.txt`, full SEO head, `Restaurant` JSON-LD.

## Design system, keep faithful to the client's build
Palette, strict, nothing outside this, and no darkened or near-black variants beyond these:
- green `#0b1f0c` (primary dark background)
- cream `#e1c7ae` (light background, text on dark)
- copper `#b36512` (accent, the saffron)
- deep surface `#061508`, card `#112a13`
- white and off-white for crisp contrast only

Fonts, keep these, do not swap:
- Montserrat, sans, for everything: headings, body, nav, marquee, prices, forms
- Cinzel, serif, for the "The Indian Kitchen" wordmark only, nothing else

Set via `--font-display` / `--font-body` (both Montserrat) and `--font-wordmark`
(Cinzel) in `global.css`. The `font-wordmark` utility is the only way Cinzel
should ever be applied.

Signature CSS utilities to carry over exactly: `container-x`, `brand-wordmark`, `exotic-border`, `corner-ornaments`, and the welcome animation keyframes. The ornate copper detailing is the motif.

## Pages, keep the client's structure
- Home: hero with the cinematic multi-language Welcome animation, signature dishes carousel, menu preview, order and delivery, reviews, visit and contact, footer.
- Menu: cinematic per-category hero, then 10 categories (biryani, tiffins, dosa, street, appetizers, soups, snacks, curries, drinks, desserts) with the existing dish data (name, description, price, spice level, veg flag, image, popular and featured flags). Port the data exactly.
- Catering: inquiry form, now via Web3Forms.
- Nav: Menu, Catering, Contact Us (#visit), logo links home.

## The client's requested changes, all minor
1. Real photos: every dish and hero image is a placeholder to swap after the photoshoot. Each image slot keeps a real src and a `GOES HERE` note.
2. Order Now: the delivery cards (Uber Eats, DoorDash, Pickup) link to real storefront URLs. Placeholders for now.
3. Instagram: a curated grid of images linking to the profile, styled minimalist luxury. Not a live widget for now.
4. Google reviews: the reviews block shows real Google review quotes, curated, styled cleanly with star rating, name, and "via Google". Placeholders until the client sends real ones.
5. Marquee: a slow horizontal scrolling row of dish or category names, brewed-style, in the palette.

## Rules
- Faithful port, not a redesign. Do not change layout or styling beyond the five items above.
- Minimalist luxury, not flashy. The gold-glow welcome and the copper glow shadows on cards may be toned down later per the client, do not amplify them, and do not add new glows or motion.
- Strict palette plus white and off-white. Do not add new colours and do not darken the palette further.
- No em dashes anywhere, copy, comments, or alt text.
- Fully responsive, no mobile horizontal overflow.
- SEO on every page: unique title and meta, OG and Twitter, canonical, `Restaurant` JSON-LD (Yonge Street, North York, Toronto, ON, Canada), sitemap, robots, semantic head, one h1 per page, real alt text.
- Every media slot keeps a real src and a `GOES HERE` note so the client can swap after the shoot.