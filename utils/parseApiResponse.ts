import type { SubmitApplicationResult } from "./submitApplication"

/**
 * Safely parse API responses — Vercel may return plain text (e.g. "Request Entity Too Large")
 * instead of JSON when the request body exceeds platform limits.
 */
export async function parseApiResponse(
  response: Response,
): Promise<SubmitApplicationResult> {
  const contentType = response.headers.get("content-type") || ""

  if (!contentType.includes("application/json")) {
    const text = await response.text()

    if (response.status === 413 || text.includes("Request Entity Too Large")) {
      throw new Error(
        "Upload too large for a single request. On production, ensure Vercel Blob is connected so files upload separately (up to 100 MB each).",
      )
    }

    throw new Error(
      text.slice(0, 200) || `Submission failed (${response.status} ${response.statusText})`,
    )
  }

  return (await response.json()) as SubmitApplicationResult
}
