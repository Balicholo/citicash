"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function DeclarationsForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Declarations</h3>

          <div className="space-y-3 border-b pb-4">
            <h4 className="font-medium">Security and Consent Clause</h4>
            <p className="text-sm">
              I have agreed to cede as security worth
              USD to AUTHENTIC FINANCIAL SERVICES in the event of any damages to the
              assets during the storage AUTHENTIC FINANCIAL SERVICES Microfinance will not be liable for the damages
              on the asset kept. The borrower understands that it is fraudulent act for him/her to dispose pledged
              assets as security without written consent or to pledge assets that he/she does not own.
            </p>
            <p className="text-sm font-medium">Consent Clause</p>
            <p className="text-sm">
              The customer agrees and authorizes the Microfinance or approved credit reference bureau to:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li>
                make inquiries from any bank, financial institution or approved credit reference bureau in Zimbabwe to
                confirm any information provided by the customer;
              </li>
              <li>
                Seek information from any bank, financial institution or approved credit reference bureau when
                assessing the client at any time during the existence of the customer&apos;s account.
              </li>
              <li>
                Disclose to any approved credit reference bureau information relating to the account maintained at the
                financial institution.
              </li>
            </ul>
          </div>

          <div className="space-y-4 border-b pb-4">
            <h4 className="font-medium">Declaration by Client</h4>
            <p className="text-sm">
              I certify that the above information in support
              of my application for a loan are true and complete, and I understand that in the event of any
              information proving to be incorrect, this application may be declined. In the event of a loan granted, I
              agree to abide by the terms and conditions of the loan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => updateFormData({ clientName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientSignatureDate">Date</Label>
                <Input
                  id="clientSignatureDate"
                  type="date"
                  value={formData.clientSignatureDate}
                  onChange={(e) => updateFormData({ clientSignatureDate: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Year: 2026</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-b pb-4">
            <h4 className="font-medium">Declaration by Guarantor</h4>
            <p className="text-sm">
              I hereby declare that I am the guarantor and I will oversee all instalments and ensure they are paid
              timeously and in agreed amounts.
            </p>
            <div className="space-y-2">
              <Label htmlFor="guarantorSignatureDate">Guarantor Signature Date</Label>
              <Input
                id="guarantorSignatureDate"
                type="date"
                value={formData.guarantorSignatureDate}
                onChange={(e) => updateFormData({ guarantorSignatureDate: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">Year: 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Declaration by Microfinance Representative</h4>
            <p className="text-sm">
              
              I hereby declare that I have administered this application.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="representativeName">Full Name</Label>
                <Input
                  id="representativeName"
                  value={formData.representativeName}
                  onChange={(e) => updateFormData({ representativeName: e.target.value })}
                  placeholder="Enter representative name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="representativeIdNumber">ID Number</Label>
                <Input
                  id="representativeIdNumber"
                  value={formData.representativeIdNumber}
                  onChange={(e) => updateFormData({ representativeIdNumber: e.target.value })}
                  placeholder="Enter ID number"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="representativeSignatureDate">Representative Signature Date</Label>
                <Input
                  id="representativeSignatureDate"
                  type="date"
                  value={formData.representativeSignatureDate}
                  onChange={(e) => updateFormData({ representativeSignatureDate: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Year: 2026</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerSignatureDate">Managers Signature Date</Label>
                <Input
                  id="managerSignatureDate"
                  type="date"
                  value={formData.managerSignatureDate}
                  onChange={(e) => updateFormData({ managerSignatureDate: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Year: 2026</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
