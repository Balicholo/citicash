import { buildApplicationHtml, sanitizeApplicantFileName } from "./buildApplicationHtml.js"
import { launchBrowser } from "./launchBrowser.js"

/**
 * Generate a branded PDF buffer from application data using Puppeteer.
 */
export async function generateApplicationPdf(applicationData, uploadedFilesMeta) {
  const html = buildApplicationHtml(applicationData, uploadedFilesMeta)

  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "16mm",
        right: "12mm",
        bottom: "16mm",
        left: "12mm",
      },
    })

    const applicantName = [applicationData.title, applicationData.fullName]
      .filter(Boolean)
      .join(" ")
      .trim()
    const safeName = sanitizeApplicantFileName(applicantName)
    const pdfFileName = `application-${safeName}.pdf`

    return { pdfBuffer, pdfFileName, applicantName: applicantName || "Applicant" }
  } finally {
    await browser.close()
  }
}
