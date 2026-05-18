import fs from "fs/promises"

/**
 * Remove temporary files created during upload and PDF generation.
 */
export async function cleanupTempFiles(paths = []) {
  await Promise.all(
    paths.map(async (filePath) => {
      if (!filePath) return
      try {
        await fs.unlink(filePath)
      } catch {
        // File may already be removed; ignore
      }
    }),
  )
}
