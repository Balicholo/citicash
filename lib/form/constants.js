/** Shared validation constants for multipart uploads and application fields */

/** Maximum size per uploaded document (100 MB) */
export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024

export const ALLOWED_FILE_EXTENSIONS = [".pdf", ".docx", ".png", ".jpg", ".jpeg"]

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
]

/** Document field names sent from the client FormData */
export const FILE_FIELD_NAMES = [
  "applicantIdDocument",
  "guarantorIdDocument",
  "proofOfResidence",
  "companyDocuments",
  "incomeProof",
  "businessLicense",
  "taxClearance",
  "securityDocument",
]

/**
 * Maximum combined size for local multipart uploads (8 document slots × 100 MB).
 * Production on Vercel uses Blob uploads and is not limited by this value.
 */
export const MAX_TOTAL_MULTIPART_BYTES =
  MAX_FILE_SIZE_BYTES * FILE_FIELD_NAMES.length

/** Human-readable labels for PDF and email attachments */
export const FILE_FIELD_LABELS = {
  applicantIdDocument: "Applicant ID Document",
  guarantorIdDocument: "Guarantor ID Document",
  proofOfResidence: "Proof of Residence",
  companyDocuments: "Company Documents",
  incomeProof: "Sales/Income Proof",
  businessLicense: "Business License",
  taxClearance: "Tax Clearance",
  securityDocument: "Security Document",
}

/** Required text fields checked before processing */
export const REQUIRED_TEXT_FIELDS = ["fullName", "email", "mobileNumber", "identityNumber"]
