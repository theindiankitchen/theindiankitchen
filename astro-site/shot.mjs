// Dev-only screenshot helper. Usage:
//   node shot.mjs <url> <out.png> [selector] [width] [height]
// If a selector is given, scrolls it into view and screenshots that element.
// Otherwise screenshots the current viewport.
import puppeteer from "puppeteer-core";

const [url, out, selector, width = "1440", height = "900"] = process.argv.slice(2);

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: Number(width), height: Number(height) },
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
// Scroll through the page so IntersectionObserver reveal animations fire.
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
// Let fonts, islands and animations settle.
await new Promise((r) => setTimeout(r, 1200));

if (selector === "BOTTOM") {
  await page.evaluate(() => window.scrollTo(0, (document.scrollingElement || document.documentElement).scrollHeight));
  await new Promise((r) => setTimeout(r, 400));
  await page.evaluate(() => window.scrollTo(0, (document.scrollingElement || document.documentElement).scrollHeight));
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: out });
} else if (selector) {
  await page.waitForSelector(selector, { timeout: 15000 });
  const el = await page.$(selector);
  await el.scrollIntoView();
  await new Promise((r) => setTimeout(r, 900));
  await el.screenshot({ path: out });
} else {
  await page.screenshot({ path: out });
}

await browser.close();
console.log("saved", out);
