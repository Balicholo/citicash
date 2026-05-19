import path from "path"
import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  REQUIRED_TEXT_FIELDS,
  FILE_FIELD_NAMES,
} from "./constants.js"

/**
 * Parse the JSON application payload sent as a form field.
 */
export function parseApplicationData(fields) {
  const raw = fields.applicationData
  if (!raw) {
    throw new Error("Missing application data")
  }

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error("Invalid application data format")
  }
}

/**
 * Validate required text fields and terms acceptance.
 */
export function validateApplicationData(data) {
  const missing = REQUIRED_TEXT_FIELDS.filter((field) => !String(data[field] ?? "").trim())
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`)
  }

  const email = String(data.email).trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address")
  }

  if (!data.agreedToTerms) {
    throw new Error("You must agree to the terms and conditions")
  }
}

/**
 * Validate uploaded file type and size.
 */
export function validateUploadedFile(file, fieldName) {
  if (!file) return

  const originalName = file.originalFilename || file.newFilename || "upload"
  const ext = path.extname(originalName).toLowerCase()

  if (!ALLOWED_FILE_EXTENSIONS.includes(ext)) {
    throw new Error(
      `Invalid file type for ${fieldName}. Allowed: ${ALLOWED_FILE_EXTENSIONS.join(", ")}`,
    )
  }

  const mime = (file.mimetype || "").toLowerCase()
  if (mime && !ALLOWED_MIME_TYPES.includes(mime) && mime !== "application/octet-stream") {
    throw new Error(`Invalid MIME type for ${fieldName}: ${mime}`)
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File too large for ${fieldName}. Maximum size is 10 MB.`)
  }
}

/**
 * Validate all uploaded files in the submission.
 */
/** Validate file metadata sent from Vercel Blob client uploads */
export function validateBlobFileMetadata(blobFiles) {
  if (!Array.isArray(blobFiles)) {
    throw new Error("Invalid uploaded files data")
  }

  for (const file of blobFiles) {
    if (!FILE_FIELD_NAMES.includes(file.fieldName)) {
      throw new Error(`Invalid upload field: ${file.fieldName}`)
    }
    if (!file.url || !file.originalFilename) {
      throw new Error(`Incomplete file metadata for ${file.fieldName}`)
    }
  }
}

export function validateUploadedFiles(files) {
  for (const fieldName of FILE_FIELD_NAMES) {
    const fileList = files[fieldName]
    if (!fileList) continue

    for (const file of fileList) {
      validateUploadedFile(file, fieldName)
    }
  }
}
