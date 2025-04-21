"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function LoanDetailsForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Loan Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount (USD)</Label>
              <Input
                id="loanAmount"
                type="number"
                min="100"
                max="2000"
                value={formData.loanAmount}
                onChange={(e) => updateFormData({ loanAmount: e.target.value })}
                placeholder="Enter loan amount"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmountInWords">Amount in Words</Label>
              <Input
                id="loanAmountInWords"
                value={formData.loanAmountInWords}
                onChange={(e) => updateFormData({ loanAmountInWords: e.target.value })}
                placeholder="Enter amount in words"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanPurpose">Loan Purpose (Breakdown)</Label>
            <Textarea
              id="loanPurpose"
              value={formData.loanPurpose}
              onChange={(e) => updateFormData({ loanPurpose: e.target.value })}
              placeholder="Describe loan purpose"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanTenure">Tenure (Days)</Label>
              <Input
                id="loanTenure"
                type="number"
                min="1"
                max="60"
                value={formData.loanTenure}
                onChange={(e) => updateFormData({ loanTenure: e.target.value })}
                placeholder="Enter loan tenure in days"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredInstalment">Desired Instalment</Label>
              <Input
                id="desiredInstalment"
                value={formData.desiredInstalment}
                onChange={(e) => updateFormData({ desiredInstalment: e.target.value })}
                placeholder="Enter desired instalment"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="securityCeded">Security Ceded</Label>
              <Input
                id="securityCeded"
                value={formData.securityCeded}
                onChange={(e) => updateFormData({ securityCeded: e.target.value })}
                placeholder="Enter security ceded"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityValue">Security Value (USD)</Label>
              <Input
                id="securityValue"
                type="number"
                min="0"
                value={formData.securityValue}
                onChange={(e) => updateFormData({ securityValue: e.target.value })}
                placeholder="Enter security value"
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
