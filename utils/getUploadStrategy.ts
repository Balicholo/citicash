export type UploadStrategy = "blob" | "multipart"

let cachedStrategy: UploadStrategy | null = null

/**
 * Blob uploads require BLOB_READ_WRITE_TOKEN (set on Vercel when Blob store is linked).
 * Without it, fall back to direct multipart POST (works on localhost).
 */
export async function getUploadStrategy(): Promise<UploadStrategy> {
  if (cachedStrategy) return cachedStrategy

  try {
    const response = await fetch("/api/upload-config")
    if (response.ok) {
      const data = (await response.json()) as { useBlob?: boolean }
      cachedStrategy = data.useBlob ? "blob" : "multipart"
      return cachedStrategy
    }
  } catch {
    // Offline or misconfigured — use multipart
  }

  cachedStrategy = "multipart"
  return cachedStrategy
}

/** Reset cache (e.g. after env change in dev) */
export function resetUploadStrategyCache(): void {
  cachedStrategy = null
}
