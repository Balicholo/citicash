import { handleUpload } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import { ALLOWED_MIME_TYPES } from "@/lib/form/constants.js"
import { MAX_FILE_SIZE_BYTES } from "@/lib/form/constants.js"

export const runtime = "nodejs"

/**
 * Token endpoint for client-side Vercel Blob uploads.
 * Files upload directly to Blob storage, avoiding the serverless 4.5 MB body limit.
 */
export async function POST(request) {
  const body = await request.json()

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...ALLOWED_MIME_TYPES, "application/octet-stream"],
        maximumSizeInBytes: MAX_FILE_SIZE_BYTES,
        addRandomSuffix: true,
      }),
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Blob upload token error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload authorization failed",
      },
      { status: 400 },
    )
  }
}
