import formidable from "formidable"
import fs from "fs"
import path from "path"
import { Readable } from "stream"
import { mkdir } from "fs/promises"
import { MAX_FILE_SIZE_BYTES, FILE_FIELD_NAMES } from "./constants.js"

const UPLOAD_DIR = path.join(process.cwd(), "tmp", "uploads")

/**
 * Flatten formidable field values (arrays) into plain strings.
 */
function normalizeFields(fields) {
  const normalized = {}
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      normalized[key] = value[0] ?? ""
    } else {
      normalized[key] = value ?? ""
    }
  }
  return normalized
}

/**
 * Normalize formidable file objects into a consistent array per field.
 */
function normalizeFiles(files) {
  const normalized = {}
  for (const fieldName of FILE_FIELD_NAMES) {
    const entry = files[fieldName]
    if (!entry) continue
    normalized[fieldName] = Array.isArray(entry) ? entry : [entry]
  }
  return normalized
}

/**
 * Parse multipart/form-data from a Next.js Request using Formidable.
 * Uploaded files are written to a temporary directory under tmp/uploads.
 */
export async function parseMultipartForm(request) {
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.includes("multipart/form-data")) {
    throw new Error("Content-Type must be multipart/form-data")
  }

  await mkdir(UPLOAD_DIR, { recursive: true })

  const arrayBuffer = await request.arrayBuffer()
  const body = Buffer.from(arrayBuffer)

  const headers = Object.fromEntries(request.headers.entries())
  headers["content-length"] = String(body.length)

  const nodeStream = Readable.from(body)
  nodeStream.headers = headers
  nodeStream.method = "POST"
  nodeStream.url = "/api/submit-application"

  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: UPLOAD_DIR,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE_BYTES,
      maxFiles: FILE_FIELD_NAMES.length,
      allowEmptyFiles: false,
      filter: ({ name }) => {
        // Only accept known file fields; other parts are treated as fields
        if (!name) return true
        return FILE_FIELD_NAMES.includes(name) || name === "applicationData"
      },
    })

    form.parse(nodeStream, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }

      resolve({
        fields: normalizeFields(fields),
        files: normalizeFiles(files),
        uploadDir: UPLOAD_DIR,
      })
    })
  })
}

export { UPLOAD_DIR }
