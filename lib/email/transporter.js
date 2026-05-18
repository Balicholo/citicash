import nodemailer from "nodemailer"

/**
 * Create a reusable Nodemailer transporter using Gmail SMTP credentials.
 * Uses EMAIL_USER and EMAIL_PASS from environment variables.
 */
export function createTransporter() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) {
    throw new Error("Email credentials are not configured (EMAIL_USER, EMAIL_PASS)")
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  })
}
