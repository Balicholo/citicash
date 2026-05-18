import { NextResponse } from "next/server"
import { parseMultipartForm } from "@/lib/form/parseMultipartForm.js"
import {
  parseApplicationData,
  validateApplicationData,
  validateUploadedFiles,
} from "@/lib/form/validateSubmission.js"
import { cleanupTempFiles } from "@/lib/form/cleanupTempFiles.js"
import { FILE_FIELD_NAMES } from "@/lib/form/constants.js"
import { generateApplicationPdf } from "@/lib/pdf/generateApplicationPdf.js"
import { sendApplicationEmail } from "@/lib/email/sendApplicationEmail.js"

// Puppeteer and file system operations require the Node.js runtime
export const runtime = "nodejs"
export const maxDuration = 60

/**
 * Collect uploaded files from the parsed formidable result.
 */
function collectUploadedFiles(files) {
  const collected = []

  for (const fieldName of FILE_FIELD_NAMES) {
    const fileList = files[fieldName]
    if (!fileList) continue

    for (const file of fileList) {
      collected.push({
        fieldName,
        filepath: file.filepath,
        originalFilename: file.originalFilename || file.newFilename,
        mimetype: file.mimetype,
        size: file.size,
      })
    }
  }

  return collected
}

export async function POST(request) {
  const tempPaths = []

  try {
    // 1. Parse multipart form data (text fields + file uploads)
    const { fields, files } = await parseMultipartForm(request)
    const applicationData = parseApplicationData(fields)

    // 2. Validate required fields and uploaded files
    validateApplicationData(applicationData)
    validateUploadedFiles(files)

    const uploadedFiles = collectUploadedFiles(files)
    uploadedFiles.forEach((f) => tempPaths.push(f.filepath))

    // 3. Generate branded PDF summary
    const { pdfBuffer, pdfFileName, applicantName } = await generateApplicationPdf(
      applicationData,
      uploadedFiles,
    )

    // 4. Send email with PDF and all uploaded attachments
    await sendApplicationEmail({
      applicantName,
      pdfBuffer,
      pdfFileName,
      uploadedFiles,
    })

    // 5. Clean up temporary upload files after successful send
    await cleanupTempFiles(tempPaths)

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicantName,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Application submission error:", error)

    // Always attempt cleanup on failure
    await cleanupTempFiles(tempPaths)

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred during submission"

    const status =
      message.includes("Missing") ||
      message.includes("Invalid") ||
      message.includes("must agree") ||
      message.includes("multipart")
        ? 400
        : 500

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status },
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
}
