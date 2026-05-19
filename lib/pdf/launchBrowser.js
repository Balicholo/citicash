import fs from "fs"

const SANDBOX_ARGS = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]

/**
 * Sparticuz extracts Chromium without `.exe` on Windows — Puppeteer cannot spawn it as-is.
 */
function resolveWindowsChromiumPath(executablePath) {
  if (process.platform !== "win32" || executablePath.endsWith(".exe")) {
    return executablePath
  }

  const withExe = `${executablePath}.exe`
  if (fs.existsSync(withExe)) return withExe

  if (fs.existsSync(executablePath)) {
    fs.copyFileSync(executablePath, withExe)
    return withExe
  }

  return executablePath
}

/**
 * Launch with @sparticuz/chromium — primary on Vercel serverless.
 */
async function launchWithSparticuz() {
  const chromium = (await import("@sparticuz/chromium")).default
  const puppeteer = await import("puppeteer-core")

  chromium.setGraphicsMode = false

  const rawPath = await chromium.executablePath()
  const executablePath = resolveWindowsChromiumPath(rawPath)

  return puppeteer.default.launch({
    args: [...chromium.args, ...SANDBOX_ARGS],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless ?? true,
  })
}

/**
 * Launch with Puppeteer's bundled Chromium (requires `puppeteer browsers install chrome`).
 */
async function launchWithPuppeteerBundled() {
  const puppeteer = await import("puppeteer")
  return puppeteer.default.launch({
    headless: true,
    args: SANDBOX_ARGS,
  })
}

/**
 * Launch using Google Chrome / Edge installed on the machine.
 */
async function launchWithSystemBrowser() {
  const puppeteer = await import("puppeteer-core")

  const candidates = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
  ].filter(Boolean)

  for (const executablePath of candidates) {
    if (!fs.existsSync(executablePath)) continue

    return puppeteer.default.launch({
      executablePath,
      headless: true,
      args: SANDBOX_ARGS,
    })
  }

  return null
}

/**
 * Launch Puppeteer for PDF generation.
 * Tries multiple strategies so local dev works without manual Chrome setup.
 */
export async function launchBrowser() {
  // On Windows/Mac/Linux desktop, prefer installed Chrome/Edge (fastest locally).
  // On Vercel, system browsers are unavailable — sparticuz is used first.
  const isServerless = Boolean(process.env.VERCEL)

  const attempts = isServerless
    ? [
        { name: "sparticuz-chromium", launch: launchWithSparticuz },
        { name: "puppeteer-bundled", launch: launchWithPuppeteerBundled },
      ]
    : [
        { name: "system-browser", launch: launchWithSystemBrowser },
        { name: "sparticuz-chromium", launch: launchWithSparticuz },
        { name: "puppeteer-bundled", launch: launchWithPuppeteerBundled },
      ]

  let lastError

  for (const { name, launch } of attempts) {
    try {
      const browser = await launch()
      if (browser) return browser
    } catch (error) {
      lastError = error
      console.warn(`[pdf] ${name} launch failed:`, error instanceof Error ? error.message : error)
    }
  }

  throw new Error(
    lastError instanceof Error
      ? `PDF generation failed: ${lastError.message}`
      : "PDF generation failed: could not launch a browser",
  )
}
