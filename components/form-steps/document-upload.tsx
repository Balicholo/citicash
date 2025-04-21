"use client"

import type React from "react"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUpIcon, CheckCircle2Icon } from "lucide-react"

type FileUploadProps = {
  id: string
  label: string
  accept?: string
  onChange: (file: File | null) => void
  value: File | null
}

function FileUpload({ id, label, accept, onChange, value }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="border rounded-md p-4 bg-muted/30">
        {value ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2Icon className="h-5 w-5 text-green-500" />
              <span className="text-sm truncate max-w-[200px]">{value.name}</span>
            </div>
            <button type="button" onClick={() => onChange(null)} className="text-sm text-destructive hover:underline">
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <FileUpIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <label htmlFor={id} className="text-sm text-center cursor-pointer text-primary hover:underline">
              Click to upload {label}
              <Input id={id} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
            </label>
            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DocumentUploadForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Document Upload</h3>
          <p className="text-sm text-muted-foreground">
            Please upload the following required documents to complete your application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
              id="applicantIdDocument"
              label="Copy of ID (Applicant)"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.applicantIdDocument}
              onChange={(file) => updateFormData({ applicantIdDocument: file })}
            />

            <FileUpload
              id="guarantorIdDocument"
              label="Copy of ID (Guarantor)"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.guarantorIdDocument}
              onChange={(file) => updateFormData({ guarantorIdDocument: file })}
            />

            <FileUpload
              id="proofOfResidence"
              label="Proof of Residence"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.proofOfResidence}
              onChange={(file) => updateFormData({ proofOfResidence: file })}
            />

            <FileUpload
              id="companyDocuments"
              label="Company Documents"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.companyDocuments}
              onChange={(file) => updateFormData({ companyDocuments: file })}
            />

            <FileUpload
              id="incomeProof"
              label="Sales/Income Proof"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.incomeProof}
              onChange={(file) => updateFormData({ incomeProof: file })}
            />

            <FileUpload
              id="businessLicense"
              label="Business License"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.businessLicense}
              onChange={(file) => updateFormData({ businessLicense: file })}
            />

            <FileUpload
              id="taxClearance"
              label="Tax Clearance"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.taxClearance}
              onChange={(file) => updateFormData({ taxClearance: file })}
            />

            <FileUpload
              id="securityDocument"
              label="Security Document"
              accept=".pdf,.jpg,.jpeg,.png"
              value={formData.securityDocument}
              onChange={(file) => updateFormData({ securityDocument: file })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
