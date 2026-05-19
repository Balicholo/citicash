import { NextResponse } from "next/server"
import { parseMultipartForm } from "@/lib/form/parseMultipartForm.js"
import {
  parseApplicationData,
  validateApplicationData,
  validateUploadedFiles,
  validateBlobFileMetadata,
} from "@/lib/form/validateSubmission.js"
import { FILE_FIELD_NAMES } from "@/lib/form/constants.js"
import { downloadBlobFilesToTemp } from "@/lib/form/downloadBlobFiles.js"
import { processSubmission } from "@/lib/form/processSubmission.js"

export const runtime = "nodejs"
export const maxDuration = 60

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

/** JSON body: { applicationData, uploadedFiles: [{ fieldName, url, originalFilename, contentType }] } */
async function handleJsonSubmission(request) {
  const body = await request.json()
  const applicationData = body.applicationData
  const blobFiles = body.uploadedFiles || []

  if (!applicationData || typeof applicationData !== "object") {
    throw new Error("Missing application data")
  }

  validateApplicationData(applicationData)
  validateBlobFileMetadata(blobFiles)

  const uploadedFiles = await downloadBlobFilesToTemp(blobFiles)
  const { applicantName } = await processSubmission(applicationData, uploadedFiles)

  return NextResponse.json(
    {
      success: true,
      message: "Application submitted successfully",
      applicantName,
    },
    { status: 200 },
  )
}

/** Multipart body — used for local development without Vercel Blob */
async function handleMultipartSubmission(request) {
  const { fields, files } = await parseMultipartForm(request)
  const applicationData = parseApplicationData(fields)

  validateApplicationData(applicationData)
  validateUploadedFiles(files)

  const uploadedFiles = collectUploadedFiles(files)
  const { applicantName } = await processSubmission(applicationData, uploadedFiles)

  return NextResponse.json(
    {
      success: true,
      message: "Application submitted successfully",
      applicantName,
    },
    { status: 200 },
  )
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      return await handleJsonSubmission(request)
    }

    if (contentType.includes("multipart/form-data")) {
      return await handleMultipartSubmission(request)
    }

    return NextResponse.json(
      { success: false, message: "Unsupported Content-Type" },
      { status: 415 },
    )
  } catch (error) {
    console.error("Application submission error:", error)

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred during submission"

    const status =
      message.includes("Missing") ||
      message.includes("Invalid") ||
      message.includes("must agree") ||
      message.includes("multipart") ||
      message.includes("Unsupported")
        ? 400
        : 500

    return NextResponse.json({ success: false, message }, { status })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
}
