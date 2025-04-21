"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function BankingDetailsForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Banking / Ecocash Details</h3>

          <div className="space-y-2">
            <Label htmlFor="bankName">Name of Bank / Registered Name</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => updateFormData({ bankName: e.target.value })}
              placeholder="Enter bank name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankBranch">Branch</Label>
            <Input
              id="bankBranch"
              value={formData.bankBranch}
              onChange={(e) => updateFormData({ bankBranch: e.target.value })}
              placeholder="Enter branch"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => updateFormData({ accountNumber: e.target.value })}
              placeholder="Enter account number"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
