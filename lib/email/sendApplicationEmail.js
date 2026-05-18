import { createTransporter } from "./transporter.js"
import { FILE_FIELD_LABELS } from "../form/constants.js"

/**
 * Send the application email with generated PDF and uploaded file attachments.
 */
export async function sendApplicationEmail({
  applicantName,
  pdfBuffer,
  pdfFileName,
  uploadedFiles,
}) {
  const clientEmail = process.env.CLIENT_EMAIL
  const fromEmail = process.env.EMAIL_USER

  if (!clientEmail) {
    throw new Error("CLIENT_EMAIL is not configured")
  }

  const transporter = createTransporter()

  const attachments = [
    {
      filename: pdfFileName,
      content: pdfBuffer,
      contentType: "application/pdf",
    },
  ]

  // Attach each uploaded document with a descriptive filename
  for (const file of uploadedFiles) {
    const label = FILE_FIELD_LABELS[file.fieldName] || file.fieldName
    const safeOriginal = file.originalFilename || "document"
    attachments.push({
      filename: `${label} - ${safeOriginal}`,
      path: file.filepath,
      contentType: file.mimetype,
    })
  }

  const mailOptions = {
    from: `"Authentic Financial Services" <${fromEmail}>`,
    to: clientEmail,
    subject: `New Application Submission - ${applicantName}`,
    text: [
      "A new loan application has been submitted.",
      "",
      `Applicant: ${applicantName}`,
      `Submitted at: ${new Date().toLocaleString()}`,
      "",
      "Attachments:",
      `- ${pdfFileName} (application summary PDF)`,
      ...uploadedFiles.map(
        (f) =>
          `- ${FILE_FIELD_LABELS[f.fieldName] || f.fieldName}: ${f.originalFilename}`,
      ),
    ].join("\n"),
    attachments,
  }

  await transporter.sendMail(mailOptions)
}
