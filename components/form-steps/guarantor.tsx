"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function GuarantorForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Guarantor Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guarantorTitle">Title</Label>
              <Select
                value={formData.guarantorTitle}
                onValueChange={(value) => updateFormData({ guarantorTitle: value })}
              >
                <SelectTrigger id="guarantorTitle">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Miss">Miss</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                  <SelectItem value="Prof">Prof</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="guarantorFullName">Full Name</Label>
              <Input
                id="guarantorFullName"
                value={formData.guarantorFullName}
                onChange={(e) => updateFormData({ guarantorFullName: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guarantorRelationship">Relationship</Label>
              <Input
                id="guarantorRelationship"
                value={formData.guarantorRelationship}
                onChange={(e) => updateFormData({ guarantorRelationship: e.target.value })}
                placeholder="Enter relationship"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guarantorMobileNumber">Mobile Number</Label>
              <Input
                id="guarantorMobileNumber"
                value={formData.guarantorMobileNumber}
                onChange={(e) => updateFormData({ guarantorMobileNumber: e.target.value })}
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guarantorCell">Cell</Label>
              <Input
                id="guarantorCell"
                value={formData.guarantorCell}
                onChange={(e) => updateFormData({ guarantorCell: e.target.value })}
                placeholder="Enter cell"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guarantorEducation">Level of Education</Label>
              <Select
                value={formData.guarantorEducation}
                onValueChange={(value) => updateFormData({ guarantorEducation: value })}
              >
                <SelectTrigger id="guarantorEducation">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Secondary">Secondary</SelectItem>
                  <SelectItem value="Certificate">Certificate</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Degree">Degree</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guarantorOccupation">Occupation</Label>
            <Input
              id="guarantorOccupation"
              value={formData.guarantorOccupation}
              onChange={(e) => updateFormData({ guarantorOccupation: e.target.value })}
              placeholder="Enter occupation"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guarantorIdNumber">ID Number</Label>
            <Input
              id="guarantorIdNumber"
              value={formData.guarantorIdNumber}
              onChange={(e) => updateFormData({ guarantorIdNumber: e.target.value })}
              placeholder="Enter ID number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guarantorResidentialAddress">Residential Address</Label>
            <Textarea
              id="guarantorResidentialAddress"
              value={formData.guarantorResidentialAddress}
              onChange={(e) => updateFormData({ guarantorResidentialAddress: e.target.value })}
              placeholder="Enter residential address"
              required
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
