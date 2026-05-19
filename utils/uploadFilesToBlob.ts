import { upload } from "@vercel/blob/client"
import { FILE_FIELDS } from "./uploadLimits"

export type BlobUploadedFile = {
  fieldName: string
  url: string
  originalFilename: string
  contentType: string
  pathname: string
}

/**
 * Upload form files directly to Vercel Blob (bypasses the 4.5 MB API body limit).
 */
export async function uploadFilesToBlob(
  formData: Record<string, unknown>,
): Promise<BlobUploadedFile[]> {
  const uploaded: BlobUploadedFile[] = []

  for (const fieldName of FILE_FIELDS) {
    const file = formData[fieldName]
    if (!(file instanceof File)) continue

    const pathname = `applications/${fieldName}/${Date.now()}-${file.name}`

    const blob = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/upload-document",
      contentType: file.type || undefined,
    })

    uploaded.push({
      fieldName,
      url: blob.url,
      originalFilename: file.name,
      contentType: blob.contentType || file.type || "application/octet-stream",
      pathname: blob.pathname,
    })
  }

  return uploaded
}
