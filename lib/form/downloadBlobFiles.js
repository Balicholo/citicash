import fs from "fs/promises"
import path from "path"
import { mkdir } from "fs/promises"
import { UPLOAD_DIR } from "./parseMultipartForm.js"

/**
 * Download files from Vercel Blob URLs into the temp upload directory
 * so they can be attached to the outgoing email.
 */
export async function downloadBlobFilesToTemp(blobFiles = []) {
  await mkdir(UPLOAD_DIR, { recursive: true })
  const downloaded = []

  for (const meta of blobFiles) {
    const response = await fetch(meta.url)
    if (!response.ok) {
      throw new Error(`Failed to download uploaded file: ${meta.originalFilename}`)
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    const ext = path.extname(meta.originalFilename) || ""
    const tempPath = path.join(
      UPLOAD_DIR,
      `${meta.fieldName}-${Date.now()}${ext}`,
    )

    await fs.writeFile(tempPath, buffer)

    downloaded.push({
      fieldName: meta.fieldName,
      filepath: tempPath,
      originalFilename: meta.originalFilename,
      mimetype: meta.contentType || response.headers.get("content-type") || "",
      blobUrl: meta.url,
    })
  }

  return downloaded
}
