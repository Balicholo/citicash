"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditions() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Terms and Conditions</h3>

          <ScrollArea className="h-[300px] border rounded-md p-4">
  <div className="space-y-4 text-sm">
    <h4 className="font-medium">AUTHENTIC FINANCIAL SERVICES MICROFINANCE P/L LOAN DETAILS:</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li>Loan amounts range from USD20.00 to a maximum loan of USD5000.00</li>
      <li>Loan tenure, maximum 60 days</li>
      <li>Low interest</li>
      <li>Low once-off admin fees</li>
    </ul>

    <h4 className="font-medium">To qualify for AUTHENTIC FINANCIAL SERVICES MICROFINANCE P/L Loan:</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li>Applicants should be aged between 18 and 60 years</li>
      <li>Applicants should complete an application form</li>
    </ul>

    <h4 className="font-medium">Applicants should attach the following items on the application form:</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li>Copy of ID for Applicant/Owners, Guarantor</li>
      <li>Proof of Residence, if not owned an affidavit</li>
      <li>Company documents for business loans (Certificate of incorporation and summary documents)</li>
      <li>Applicants are required to provide proof of income, either sales records, bank statement, or EcoCash statement</li>
      <li>Copy of contract where applicable</li>
      <li>Council Business License</li>
      <li>Tax clearance</li>
      <li>
        Security Registration book, for example a car registration book where the vehicle is pledged as collateral
      </li>
      <li>Include bank statements where applicable (at least 3 months)</li>
    </ul>

    <p>
      <strong>Note:</strong> Employer’s consent section of the application form must be signed and stamped by the employer for scheme loans.
    </p>

    <h4 className="font-medium">Consent Clause</h4>
    <p>
      "The customer agrees and authorizes the Microfinance or approved credit reference bureau to:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        make inquiries from any bank, financial institution or approved credit reference bureau in Zimbabwe to confirm any information provided by the customer;
      </li>
      <li>
        seek information from any bank, financial institution or approved credit reference bureau when assessing the client at any time during the existence of the customer's account;
      </li>
      <li>
        disclose to any approved credit reference bureau information relating to the account maintained at the financial institution."
      </li>
    </ul>

    <p>
      AUTHENTIC MICROFINANCE may approve or decline an application for a credit facility at its absolute discretion and is not obliged to disclose any reasons for approval or decline.
    </p>
  </div>
</ScrollArea>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => updateFormData({ agreedToTerms: checked === true })}
                required
              />
              <Label
                htmlFor="agreedToTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the terms and conditions
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="executionPlace">Place</Label>
                <Input
                  id="executionPlace"
                  value={formData.executionPlace}
                  onChange={(e) => updateFormData({ executionPlace: e.target.value })}
                  placeholder="Enter place of execution"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="executionDate">Date</Label>
                <Input
                  id="executionDate"
                  type="date"
                  value={formData.executionDate}
                  onChange={(e) => updateFormData({ executionDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debtorName">Debtor Name</Label>
                <Input
                  id="debtorName"
                  value={formData.debtorName}
                  onChange={(e) => updateFormData({ debtorName: e.target.value })}
                  placeholder="Enter debtor name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guarantorName">Guarantor Name</Label>
                <Input
                  id="guarantorName"
                  value={formData.guarantorName}
                  onChange={(e) => updateFormData({ guarantorName: e.target.value })}
                  placeholder="Enter guarantor name"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
