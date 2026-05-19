/**
 * Optional postinstall: download Puppeteer's Chromium when pnpm allows build scripts.
 * PDF generation also works via @sparticuz/chromium without this step.
 */
import { execSync } from "node:child_process"

try {
  execSync("npx puppeteer browsers install chrome", {
    stdio: "inherit",
    env: process.env,
  })
  console.log("[postinstall] Puppeteer Chrome installed.")
} catch {
  console.warn(
    "[postinstall] Skipped Puppeteer Chrome install — PDFs will use @sparticuz/chromium instead.",
  )
}
