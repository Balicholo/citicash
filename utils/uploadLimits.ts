import {
  MAX_FILE_SIZE_BYTES,
  MAX_TOTAL_MULTIPART_BYTES,
  FILE_FIELD_NAMES,
} from "@/lib/form/constants.js"

export { MAX_FILE_SIZE_BYTES }

/** Local multipart total cap (production uses Vercel Blob instead) */
export const MAX_TOTAL_UPLOAD_BYTES = MAX_TOTAL_MULTIPART_BYTES

export const FILE_FIELDS = FILE_FIELD_NAMES

const MAX_FILE_SIZE_MB = MAX_FILE_SIZE_BYTES / 1024 / 1024
const MAX_TOTAL_MB = MAX_TOTAL_UPLOAD_BYTES / 1024 / 1024

export function getTotalUploadSize(formData: Record<string, unknown>): number {
  let total = 0
  for (const field of FILE_FIELDS) {
    const file = formData[field]
    if (file instanceof File) {
      total += file.size
    }
  }
  return total
}

export function validateUploadSizes(formData: Record<string, unknown>): void {
  for (const field of FILE_FIELDS) {
    const file = formData[field]
    if (file instanceof File && file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(
        `File is too large (${field}). Maximum size is ${MAX_FILE_SIZE_MB} MB per document.`,
      )
    }
  }

  const total = getTotalUploadSize(formData)
  if (total > MAX_TOTAL_UPLOAD_BYTES) {
    throw new Error(
      `Total upload size (${(total / 1024 / 1024).toFixed(1)} MB) exceeds the ${MAX_TOTAL_MB} MB limit.`,
    )
  }
}
