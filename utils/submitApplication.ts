import { parseApiResponse } from "./parseApiResponse"
import { uploadFilesToBlob } from "./uploadFilesToBlob"
import { getUploadStrategy } from "./getUploadStrategy"
import { FILE_FIELDS, validateUploadSizes } from "./uploadLimits"

export type ApplicationFormPayload = Record<string, unknown> & {
  applicantIdDocument?: File | null
  guarantorIdDocument?: File | null
  proofOfResidence?: File | null
  companyDocuments?: File | null
  incomeProof?: File | null
  businessLicense?: File | null
  taxClearance?: File | null
  securityDocument?: File | null
}

export type SubmitApplicationResult = {
  success: boolean
  message: string
  applicantName?: string
}

function hasUploadedFiles(formData: ApplicationFormPayload): boolean {
  return FILE_FIELDS.some((field) => formData[field] instanceof File)
}

function stripFileFields(formData: ApplicationFormPayload): Record<string, unknown> {
  const payload: Record<string, unknown> = { ...formData }
  for (const field of FILE_FIELDS) {
    delete payload[field]
  }
  return payload
}

function buildMultipartFormData(formData: ApplicationFormPayload): FormData {
  const multipart = new FormData()
  multipart.append("applicationData", JSON.stringify(stripFileFields(formData)))

  for (const field of FILE_FIELDS) {
    const file = formData[field]
    if (file instanceof File) {
      multipart.append(field, file, file.name)
    }
  }

  return multipart
}

async function submitViaBlob(
  formData: ApplicationFormPayload,
): Promise<SubmitApplicationResult> {
  const uploadedFiles = await uploadFilesToBlob(formData)

  const response = await fetch("/api/submit-application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      applicationData: stripFileFields(formData),
      uploadedFiles,
    }),
  })

  const result = await parseApiResponse(response)

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to submit application")
  }

  return result
}

async function submitViaMultipart(
  formData: ApplicationFormPayload,
): Promise<SubmitApplicationResult> {
  // Per-file and total limits enforced in validateUploadSizes()
  const response = await fetch("/api/submit-application", {
    method: "POST",
    body: buildMultipartFormData(formData),
  })

  const result = await parseApiResponse(response)

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to submit application")
  }

  return result
}

async function submitWithFiles(
  formData: ApplicationFormPayload,
): Promise<SubmitApplicationResult> {
  const strategy = await getUploadStrategy()

  if (strategy === "blob") {
    return submitViaBlob(formData)
  }

  return submitViaMultipart(formData)
}

/**
 * Submit the loan application.
 * - Production (Vercel + Blob): files upload to Vercel Blob, then JSON to API
 * - Local dev (no Blob token): files sent via multipart FormData
 */
export async function submitApplication(
  formData: ApplicationFormPayload,
): Promise<SubmitApplicationResult> {
  validateUploadSizes(formData)

  if (hasUploadedFiles(formData)) {
    return submitWithFiles(formData)
  }

  const response = await fetch("/api/submit-application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      applicationData: stripFileFields(formData),
      uploadedFiles: [],
    }),
  })

  const result = await parseApiResponse(response)

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to submit application")
  }

  return result
}
