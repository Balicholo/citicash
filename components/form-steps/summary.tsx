"use client"

import type React from "react"

import { useFormContext } from "@/context/form-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2 } from "lucide-react"

type SummaryFormProps = {
  onSubmit: () => Promise<void>
  isSubmitting: boolean
}

export default function SummaryForm({ onSubmit, isSubmitting }: SummaryFormProps) {
  const { formData } = useFormContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Application Summary</h3>
            <p className="text-sm text-muted-foreground">
              Please review your application details before submitting. You can go back to previous steps to make
              changes if needed.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal">
                <AccordionTrigger>Personal Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Full Name:</div>
                      <div>
                        {formData.title} {formData.fullName}
                      </div>
                      <div className="font-medium">ID Number:</div>
                      <div>{formData.identityNumber}</div>
                      <div className="font-medium">Mobile Number:</div>
                      <div>{formData.mobileNumber}</div>
                      <div className="font-medium">Email:</div>
                      <div>{formData.email}</div>
                      <div className="font-medium">Marital Status:</div>
                      <div>{formData.maritalStatus}</div>
                      <div className="font-medium">Residential Address:</div>
                      <div>{formData.residentialAddress}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business">
                <AccordionTrigger>Business Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Business Name:</div>
                      <div>{formData.businessName}</div>
                      <div className="font-medium">Business Address:</div>
                      <div>{formData.businessAddress}</div>
                      <div className="font-medium">Type of Business:</div>
                      <div>{formData.typeOfBusiness}</div>
                      <div className="font-medium">TIN Number:</div>
                      <div>{formData.tinNumber}</div>
                      <div className="font-medium">Years in Business:</div>
                      <div>{formData.yearsInBusiness}</div>
                      <div className="font-medium">Registered:</div>
                      <div>{formData.isRegistered ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kin">
                <AccordionTrigger>Next of Kin</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Full Name:</div>
                      <div>
                        {formData.kinTitle} {formData.kinFullName}
                      </div>
                      <div className="font-medium">Relationship:</div>
                      <div>{formData.kinRelationship}</div>
                      <div className="font-medium">Mobile Number:</div>
                      <div>{formData.kinMobileNumber}</div>
                      <div className="font-medium">Residential Address:</div>
                      <div>{formData.kinResidentialAddress}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="guarantor">
                <AccordionTrigger>Guarantor</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Full Name:</div>
                      <div>
                        {formData.guarantorTitle} {formData.guarantorFullName}
                      </div>
                      <div className="font-medium">Relationship:</div>
                      <div>{formData.guarantorRelationship}</div>
                      <div className="font-medium">Mobile Number:</div>
                      <div>{formData.guarantorMobileNumber}</div>
                      <div className="font-medium">ID Number:</div>
                      <div>{formData.guarantorIdNumber}</div>
                      <div className="font-medium">Residential Address:</div>
                      <div>{formData.guarantorResidentialAddress}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="banking">
                <AccordionTrigger>Banking Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Bank Name:</div>
                      <div>{formData.bankName}</div>
                      <div className="font-medium">Branch:</div>
                      <div>{formData.bankBranch}</div>
                      <div className="font-medium">Account Number:</div>
                      <div>{formData.accountNumber}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="loan">
                <AccordionTrigger>Loan Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Loan Amount:</div>
                      <div>USD {formData.loanAmount}</div>
                      <div className="font-medium">Amount in Words:</div>
                      <div>{formData.loanAmountInWords}</div>
                      <div className="font-medium">Loan Purpose:</div>
                      <div>{formData.loanPurpose}</div>
                      <div className="font-medium">Tenure:</div>
                      <div>{formData.loanTenure} days</div>
                      <div className="font-medium">Security Ceded:</div>
                      <div>{formData.securityCeded}</div>
                      <div className="font-medium">Security Value:</div>
                      <div>USD {formData.securityValue}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="documents">
                <AccordionTrigger>Documents</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Applicant ID:</div>
                      <div>{formData.applicantIdDocument ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Guarantor ID:</div>
                      <div>{formData.guarantorIdDocument ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Proof of Residence:</div>
                      <div>{formData.proofOfResidence ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Company Documents:</div>
                      <div>{formData.companyDocuments ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Income Proof:</div>
                      <div>{formData.incomeProof ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Business License:</div>
                      <div>{formData.businessLicense ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Tax Clearance:</div>
                      <div>{formData.taxClearance ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                      <div className="font-medium">Security Document:</div>
                      <div>{formData.securityDocument ? "✓ Uploaded" : "✗ Not uploaded"}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting || !formData.agreedToTerms}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
              {!formData.agreedToTerms && (
                <p className="text-sm text-destructive mt-2">
                  You must agree to the terms and conditions before submitting.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
