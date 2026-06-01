import fs from "fs"
import path from "path"
import { FILE_FIELD_LABELS, FILE_FIELD_NAMES } from "../form/constants.js"

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatValue(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (value === null || value === undefined || value === "") return "—"
  return escapeHtml(value)
}

function renderSection(title, rows) {
  const rowHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td class="label">${escapeHtml(label)}</td>
        <td class="value">${formatValue(value)}</td>
      </tr>`,
    )
    .join("")

  return `
    <section class="card">
      <h2>${escapeHtml(title)}</h2>
      <table>${rowHtml}</table>
    </section>
  `
}

/** Authentic Financial Services logo (override with PDF_LOGO_URL env if needed) */
const DEFAULT_LOGO_URL = "https://i.ibb.co/Kjn8HXbK/Authentic-logo.png"

/**
 * Load logo as a base64 data URI so Puppeteer renders it reliably on Vercel (no external fetch at render time).
 */
async function getLogoSrc() {
  const logoUrl = process.env.PDF_LOGO_URL || DEFAULT_LOGO_URL

  try {
    const response = await fetch(logoUrl)
    if (response.ok) {
      const buffer = Buffer.from(await response.arrayBuffer())
      const contentType = response.headers.get("content-type") || "image/png"
      return `data:${contentType};base64,${buffer.toString("base64")}`
    }
  } catch (error) {
    console.warn("Failed to fetch PDF logo from URL:", error)
  }

  try {
    const logoPath = path.join(process.cwd(), "public", "placeholder-logo.png")
    const buffer = fs.readFileSync(logoPath)
    return `data:image/png;base64,${buffer.toString("base64")}`
  } catch {
    return logoUrl
  }
}

/**
 * Build branded HTML used by Puppeteer to render the application PDF.
 */
export async function buildApplicationHtml(applicationData, uploadedFilesMeta) {
  const logoSrc = await getLogoSrc()
  const applicantName = [applicationData.title, applicationData.fullName]
    .filter(Boolean)
    .join(" ")
    .trim()
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  })

  const documentList = FILE_FIELD_NAMES.map((field) => {
    const meta = uploadedFilesMeta.find((f) => f.fieldName === field)
    const label = FILE_FIELD_LABELS[field]
    return `<li><span class="doc-label">${escapeHtml(label)}</span><span class="doc-status">${meta ? escapeHtml(meta.originalFilename) : "Not uploaded"}</span></li>`
  }).join("")

  const sections = [
    renderSection("Personal Details", [
      ["Full Name", applicantName],
      ["Identity Number", applicationData.identityNumber],
      ["Mobile Number", applicationData.mobileNumber],
      ["Email", applicationData.email],
      ["Marital Status", applicationData.maritalStatus],
      ["Number of Children", applicationData.numberOfChildren],
      ["Occupation", applicationData.occupation],
      ["Residential Address", applicationData.residentialAddress],
      ["Personal Assets", applicationData.personalAssets],
      ["Number of Dependants", applicationData.numberOfDependants],
      ["Personal Obligations", applicationData.personalObligations],
    ]),
    renderSection("Business Details", [
      ["Business Name", applicationData.businessName],
      ["Business Address", applicationData.businessAddress],
      ["Type of Business", applicationData.typeOfBusiness],
      ["TIN Number", applicationData.tinNumber],
      ["Years in Business", applicationData.yearsInBusiness],
      ["Number of Employees", applicationData.numberOfEmployees],
      ["Main Products", applicationData.mainProducts],
      ["Sales Per Period", applicationData.salesPerPeriod],
      ["Registered", applicationData.isRegistered],
      ["Not Registered Reason", applicationData.notRegisteredReason],
      ["Main Challenges", applicationData.mainChallenges],
      ["Credit Facilities", applicationData.creditFacilities],
      ["Business Assets", applicationData.businessAssets],
    ]),
    renderSection("Next of Kin", [
      ["Full Name", `${applicationData.kinTitle || ""} ${applicationData.kinFullName || ""}`.trim()],
      ["Relationship", applicationData.kinRelationship],
      ["Mobile Number", applicationData.kinMobileNumber],
      ["Cell", applicationData.kinCell],
      ["Education", applicationData.kinEducation],
      ["Occupation", applicationData.kinOccupation],
      ["Residential Address", applicationData.kinResidentialAddress],
    ]),
    renderSection("Guarantor", [
      [
        "Full Name",
        `${applicationData.guarantorTitle || ""} ${applicationData.guarantorFullName || ""}`.trim(),
      ],
      ["Relationship", applicationData.guarantorRelationship],
      ["Mobile Number", applicationData.guarantorMobileNumber],
      ["ID Number", applicationData.guarantorIdNumber],
      ["Residential Address", applicationData.guarantorResidentialAddress],
    ]),
    renderSection("Banking Details", [
      ["Bank Name", applicationData.bankName],
      ["Branch", applicationData.bankBranch],
      ["Account Number", applicationData.accountNumber],
    ]),
    renderSection("Loan Details", [
      ["Loan Amount (USD)", applicationData.loanAmount],
      ["Amount in Words", applicationData.loanAmountInWords],
      ["Loan Purpose", applicationData.loanPurpose],
      ["Tenure (days)", applicationData.loanTenure],
      ["Desired Instalment", applicationData.desiredInstalment],
      ["Security Ceded", applicationData.securityCeded],
      ["Security Value (USD)", applicationData.securityValue],
    ]),
    renderSection("Declarations & Terms", [
      ["Client Name", applicationData.clientName],
      ["Agreed to Terms", applicationData.agreedToTerms],
      ["Execution Place", applicationData.executionPlace],
      ["Execution Date", applicationData.executionDate],
      ["Debtor Name", applicationData.debtorName],
      ["Guarantor Name", applicationData.guarantorName],
    ]),
  ].join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Loan Application - ${escapeHtml(applicantName)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color:rgb(16, 76, 25);
      background: #f4f6f8;
      font-size: 11px;
      line-height: 1.5;
    }
    .page {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg,rgb(15, 96, 16) 0%,rgb(24, 62, 22) 100%);
      color: #fff;
      padding: 24px 28px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .header-left { display: flex; align-items: center; gap: 16px; }
    .logo {
      width: 64px;
      height: 64px;
      object-fit: contain;
      background: #fff;
      border-radius: 8px;
      padding: 4px;
      flex-shrink: 0;
    }
    .brand h1 { font-size: 20px; font-weight: 700; letter-spacing: 0.3px; }
    .brand p { font-size: 11px; opacity: 0.85; margin-top: 4px; }
    .header-meta { text-align: right; font-size: 10px; opacity: 0.9; }
    .header-meta strong { display: block; font-size: 12px; margin-bottom: 4px; }
    .card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 18px 20px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .card h2 {
      font-size: 13px;
      font-weight: 700;
      color:rgb(15, 96, 32);
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table { width: 100%; border-collapse: collapse; }
    tr:nth-child(even) { background: #f8fafc; }
    td { padding: 7px 10px; vertical-align: top; }
    td.label {
      width: 38%;
      font-weight: 600;
      color:rgb(71, 105, 76);
    }
    td.value { color:rgb(30, 59, 31); }
    .documents ul { list-style: none; }
    .documents li {
      display: flex;
      justify-content: space-between;
      padding: 8px 10px;
      border-bottom: 1px solid #f1f5f9;
    }
    .documents li:last-child { border-bottom: none; }
    .doc-label { font-weight: 600; color:rgb(71, 105, 78); }
    .doc-status { color:rgb(15, 96, 32); }
    .footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      color:rgb(100, 139, 103);
      font-size: 9px;
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">
      <div class="header-left">
        ${logoSrc ? `<img class="logo" src="${logoSrc}" alt="Logo" />` : ""}
        <div class="brand">
          <h1>Authentic Financial Services</h1>
          <p>Loan Application Summary</p>
        </div>
      </div>
      <div class="header-meta">
        <strong>${escapeHtml(applicantName)}</strong>
        <span>Submitted: ${escapeHtml(submittedAt)}</span>
      </div>
    </header>

    ${sections}

    <section class="card documents">
      <h2>Uploaded Documents</h2>
      <ul>${documentList}</ul>
    </section>

    <footer class="footer">
      Confidential — Generated automatically by Authentic Financial Services application portal.
    </footer>
  </div>
</body>
</html>`
}

/**
 * Sanitize applicant name for use in PDF filenames.
 */
export function sanitizeApplicantFileName(name) {
  return (
    String(name || "applicant")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "applicant"
  )
}
