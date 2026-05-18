/** File upload field names — must match server FILE_FIELD_NAMES */
const FILE_FIELDS = [
  "applicantIdDocument",
  "guarantorIdDocument",
  "proofOfResidence",
  "companyDocuments",
  "incomeProof",
  "businessLicense",
  "taxClearance",
  "securityDocument",
] as const

type FileField = (typeof FILE_FIELDS)[number]

export type ApplicationFormPayload = Record<string, unknown> & {
  [K in FileField]?: File | null
}

/**
 * Build multipart FormData for the submit-application API route.
 * Text fields are sent as JSON; files are appended separately.
 */
export function buildApplicationFormData(formData: ApplicationFormPayload): FormData {
  const payload: Record<string, unknown> = { ...formData }

  const multipart = new FormData()

  for (const field of FILE_FIELDS) {
    const file = formData[field]
    if (file instanceof File) {
      multipart.append(field, file, file.name)
    }
    delete payload[field]
  }

  multipart.append("applicationData", JSON.stringify(payload))
  return multipart
}

export type SubmitApplicationResult = {
  success: boolean
  message: string
  applicantName?: string
}

/**
 * Submit the loan application to the Next.js API route.
 */
export async function submitApplication(
  formData: ApplicationFormPayload,
): Promise<SubmitApplicationResult> {
  const body = buildApplicationFormData(formData)

  const response = await fetch("/api/submit-application", {
    method: "POST",
    body,
  })

  const result = (await response.json()) as SubmitApplicationResult

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to submit application")
  }

  return result
}
