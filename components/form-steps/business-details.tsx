"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function BusinessDetailsForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData({ businessName: e.target.value })}
                placeholder="Enter business name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeOfBusiness">Type of Business</Label>
              <Input
                id="typeOfBusiness"
                value={formData.typeOfBusiness}
                onChange={(e) => updateFormData({ typeOfBusiness: e.target.value })}
                placeholder="Enter type of business"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Physical Address</Label>
            <Textarea
              id="businessAddress"
              value={formData.businessAddress}
              onChange={(e) => updateFormData({ businessAddress: e.target.value })}
              placeholder="Enter business address"
              required
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tinNumber">TIN Number</Label>
              <Input
                id="tinNumber"
                value={formData.tinNumber}
                onChange={(e) => updateFormData({ tinNumber: e.target.value })}
                placeholder="Enter TIN number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsInBusiness">Years in Current Business</Label>
              <Input
                id="yearsInBusiness"
                type="number"
                min="0"
                value={formData.yearsInBusiness}
                onChange={(e) => updateFormData({ yearsInBusiness: e.target.value })}
                placeholder="Enter years in business"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfEmployees">Number of Employees</Label>
              <Input
                id="numberOfEmployees"
                type="number"
                min="0"
                value={formData.numberOfEmployees}
                onChange={(e) => updateFormData({ numberOfEmployees: e.target.value })}
                placeholder="Enter number of employees"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainProducts">Main Products</Label>
              <Input
                id="mainProducts"
                value={formData.mainProducts}
                onChange={(e) => updateFormData({ mainProducts: e.target.value })}
                placeholder="Enter main products"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salesPerPeriod">Sales per Week/Month</Label>
            <Input
              id="salesPerPeriod"
              value={formData.salesPerPeriod}
              onChange={(e) => updateFormData({ salesPerPeriod: e.target.value })}
              placeholder="Enter sales figures"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Is your business registered?</Label>
            <RadioGroup
              value={formData.isRegistered ? "yes" : "no"}
              onValueChange={(value) => updateFormData({ isRegistered: value === "yes" })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="registered-yes" />
                <Label htmlFor="registered-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="registered-no" />
                <Label htmlFor="registered-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {!formData.isRegistered && (
            <div className="space-y-2">
              <Label htmlFor="notRegisteredReason">If NOT registered, state why</Label>
              <Textarea
                id="notRegisteredReason"
                value={formData.notRegisteredReason}
                onChange={(e) => updateFormData({ notRegisteredReason: e.target.value })}
                placeholder="State reason for not being registered"
                rows={2}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="mainChallenges">Main Challenges Faced by Business</Label>
            <Textarea
              id="mainChallenges"
              value={formData.mainChallenges}
              onChange={(e) => updateFormData({ mainChallenges: e.target.value })}
              placeholder="Describe main challenges"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditFacilities">Companies/Banks or Individuals Where You Get Credit Facilities</Label>
            <Textarea
              id="creditFacilities"
              value={formData.creditFacilities}
              onChange={(e) => updateFormData({ creditFacilities: e.target.value })}
              placeholder="List credit facilities"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAssets">Business Assets</Label>
            <Textarea
              id="businessAssets"
              value={formData.businessAssets}
              onChange={(e) => updateFormData({ businessAssets: e.target.value })}
              placeholder="List business assets"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
