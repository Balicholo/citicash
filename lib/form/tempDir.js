import os from "os"
import path from "path"

/**
 * Writable temp directory for uploaded files.
 * - Vercel/Lambda: os.tmpdir() is /tmp (only writable path)
 * - Local dev: system temp folder or project tmp/
 */
export function getUploadDir() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "citicash-uploads")
  }
  return path.join(process.cwd(), "tmp", "uploads")
}
