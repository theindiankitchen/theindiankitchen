#!/usr/bin/env python3
"""Recolour the flat background of a hero image to brand green #0b1f0c."""
import sys, shutil, collections
from pathlib import Path
import numpy as np
from PIL import Image

TARGET = np.array([0x0b, 0x1f, 0x0c], dtype=np.float32)
INNER, OUTER = 18.0, 30.0   # feather: full replace <=18, falls off to 0 at 30
UPSCALE_TO = 2560

def recolour(path: Path):
    im = Image.open(path).convert("RGB")
    src = np.asarray(im)
    a = src.astype(np.float32)

    # Reference = modal colour of the TOP 20% of the image, which is always
    # flat background. Sampling the whole image can pick up cream instead.
    top = src[: max(1, src.shape[0] // 5)].reshape(-1, 3)
    ref = np.array(collections.Counter(map(tuple, top)).most_common(1)[0][0],
                   dtype=np.float32)
    print(f"{path.name}: {im.size}  detected bg = "
          f"#{int(ref[0]):02x}{int(ref[1]):02x}{int(ref[2]):02x}")

    d = np.sqrt(((a - ref) ** 2).sum(2))
    alpha = np.clip((OUTER - d) / (OUTER - INNER), 0.0, 1.0)[..., None]
    out = np.rint(a * (1 - alpha) + TARGET * alpha).clip(0, 255).astype(np.uint8)

    cream = src.astype(np.int16).sum(2) > 450
    print(f"  cream px changed:          {int((src[cream] != out[cream]).any(-1).sum())}")
    print(f"  px beyond feather changed: {int((src[d >= OUTER] != out[d >= OUTER]).any(-1).sum())}")

    res = Image.fromarray(out)
    # Only upscale landscape (desktop) art; leave portrait mobile art alone.
    if res.width > res.height and res.width < UPSCALE_TO:
        h = round(res.height * UPSCALE_TO / res.width)
        res = res.resize((UPSCALE_TO, h), Image.LANCZOS)
        b = np.asarray(res).astype(np.int16)
        dd = np.sqrt(((b - TARGET) ** 2).sum(2))
        b[dd < 4] = TARGET          # re-seat exact hex after Lanczos
        res = Image.fromarray(b.clip(0, 255).astype(np.uint8))
        print(f"  upscaled to {res.size}")

    shutil.copy2(path, path.with_suffix(path.suffix + ".bak"))
    res.save(path, optimize=True)
    chk = np.asarray(Image.open(path).convert("RGB"))
    print(f"  top-left px now: #{chk[5,5,0]:02x}{chk[5,5,1]:02x}{chk[5,5,2]:02x}")

for p in sys.argv[1:]:
    recolour(Path(p))
