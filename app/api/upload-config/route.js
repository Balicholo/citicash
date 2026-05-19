import { NextResponse } from "next/server"

/**
 * Tell the client whether Vercel Blob is configured.
 * Local dev without BLOB_READ_WRITE_TOKEN uses multipart upload instead.
 */
export async function GET() {
  return NextResponse.json({
    useBlob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  })
}
