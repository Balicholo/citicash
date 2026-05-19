/**
 * Launch Puppeteer with the correct Chromium binary for the environment.
 * - Vercel/serverless: @sparticuz/chromium (lightweight binary for Lambda)
 * - Local dev: full puppeteer package (bundled Chromium)
 */
export async function launchBrowser() {
  if (process.env.VERCEL) {
    const chromium = (await import("@sparticuz/chromium")).default
    const puppeteer = await import("puppeteer-core")

    return puppeteer.default.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  }

  // Local development — full puppeteer includes Chromium
  const puppeteer = await import("puppeteer")
  return puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
}
