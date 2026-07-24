// Recolour the flat background of a hero image to brand green #0b1f0c.
// Node/sharp port of scripts/recolour-hero.py (no Python needed; sharp already
// ships with Astro). Same target, feather, top-20% modal detection, backups
// and diagnostic checks.
import { copyFileSync } from "node:fs";
import sharp from "sharp";

const TARGET = [0x0b, 0x1f, 0x0c];
const INNER = 18.0, OUTER = 30.0; // full replace <=18, falls off to 0 at 30
const UPSCALE_TO = 2560;

const hex = (r, g, b) =>
  "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");

async function rawRGB(input) {
  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

async function recolour(path) {
  const { data: src, w, h } = await rawRGB(path);

  // Reference = modal colour of the TOP 20% of the image (always flat bg).
  const topRows = Math.max(1, Math.floor(h / 5));
  const counts = new Map();
  for (let i = 0; i < topRows * w * 3; i += 3) {
    const key = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  let refKey = 0, best = -1;
  for (const [k, c] of counts) if (c > best) { best = c; refKey = k; }
  const ref = [(refKey >> 16) & 255, (refKey >> 8) & 255, refKey & 255];
  console.log(`${path.split(/[\\/]/).pop()}: (${w}, ${h})  detected bg = ${hex(...ref)}`);

  const out = Buffer.alloc(src.length);
  let creamChanged = 0, beyondChanged = 0;
  for (let p = 0; p < w * h; p++) {
    const i = p * 3;
    const r = src[i], g = src[i + 1], b = src[i + 2];
    const d = Math.sqrt((r - ref[0]) ** 2 + (g - ref[1]) ** 2 + (b - ref[2]) ** 2);
    let alpha = (OUTER - d) / (OUTER - INNER);
    alpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
    const or = Math.min(255, Math.max(0, Math.round(r * (1 - alpha) + TARGET[0] * alpha)));
    const og = Math.min(255, Math.max(0, Math.round(g * (1 - alpha) + TARGET[1] * alpha)));
    const ob = Math.min(255, Math.max(0, Math.round(b * (1 - alpha) + TARGET[2] * alpha)));
    out[i] = or; out[i + 1] = og; out[i + 2] = ob;
    const changed = or !== r || og !== g || ob !== b;
    if (changed && r + g + b > 450) creamChanged++;   // cream px must be 0
    if (changed && d >= OUTER) beyondChanged++;        // beyond feather must be 0
  }
  console.log(`  cream px changed:          ${creamChanged}`);
  console.log(`  px beyond feather changed: ${beyondChanged}`);

  let outBuf = out, ow = w, oh = h;

  // Only upscale landscape (desktop) art; leave portrait mobile art alone.
  if (w > h && w < UPSCALE_TO) {
    oh = Math.round(h * UPSCALE_TO / w);
    ow = UPSCALE_TO;
    const up = await sharp(out, { raw: { width: w, height: h, channels: 3 } })
      .resize(ow, oh, { kernel: "lanczos3" })
      .raw()
      .toBuffer();
    // re-seat exact hex after Lanczos
    for (let p = 0; p < ow * oh; p++) {
      const i = p * 3;
      const dd = Math.sqrt(
        (up[i] - TARGET[0]) ** 2 + (up[i + 1] - TARGET[1]) ** 2 + (up[i + 2] - TARGET[2]) ** 2
      );
      if (dd < 4) { up[i] = TARGET[0]; up[i + 1] = TARGET[1]; up[i + 2] = TARGET[2]; }
    }
    outBuf = up;
    console.log(`  upscaled to (${ow}, ${oh})`);
  }

  copyFileSync(path, path + ".bak");
  await sharp(outBuf, { raw: { width: ow, height: oh, channels: 3 } })
    .png({ compressionLevel: 9 })
    .toFile(path);

  const { data: chk, w: cw } = await rawRGB(path);
  const j = (5 * cw + 5) * 3;
  console.log(`  top-left px now: ${hex(chk[j], chk[j + 1], chk[j + 2])}`);
}

for (const p of process.argv.slice(2)) await recolour(p);
