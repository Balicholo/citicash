import { cleanupTempFiles } from "./cleanupTempFiles.js"
import { generateApplicationPdf } from "../pdf/generateApplicationPdf.js"
import { sendApplicationEmail } from "../email/sendApplicationEmail.js"
import { del } from "@vercel/blob"

/**
 * Shared pipeline: generate PDF, send email, clean up temp files and blob storage.
 */
export async function processSubmission(applicationData, uploadedFiles) {
  const tempPaths = uploadedFiles.map((f) => f.filepath)
  const blobUrls = uploadedFiles.map((f) => f.blobUrl).filter(Boolean)

  try {
    const { pdfBuffer, pdfFileName, applicantName } = await generateApplicationPdf(
      applicationData,
      uploadedFiles,
    )

    await sendApplicationEmail({
      applicantName,
      pdfBuffer,
      pdfFileName,
      uploadedFiles,
    })

    return { applicantName }
  } finally {
    await cleanupTempFiles(tempPaths)

    if (blobUrls.length > 0) {
      try {
        await del(blobUrls)
      } catch (error) {
        console.error("Failed to delete blob files:", error)
      }
    }
  }
}
