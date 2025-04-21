"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function NextOfKinForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Next of Kin Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kinTitle">Title</Label>
              <Select value={formData.kinTitle} onValueChange={(value) => updateFormData({ kinTitle: value })}>
                <SelectTrigger id="kinTitle">
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
              <Label htmlFor="kinFullName">Full Name</Label>
              <Input
                id="kinFullName"
                value={formData.kinFullName}
                onChange={(e) => updateFormData({ kinFullName: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kinRelationship">Relationship</Label>
              <Input
                id="kinRelationship"
                value={formData.kinRelationship}
                onChange={(e) => updateFormData({ kinRelationship: e.target.value })}
                placeholder="Enter relationship"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kinMobileNumber">Mobile Number</Label>
              <Input
                id="kinMobileNumber"
                value={formData.kinMobileNumber}
                onChange={(e) => updateFormData({ kinMobileNumber: e.target.value })}
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kinCell">Cell</Label>
              <Input
                id="kinCell"
                value={formData.kinCell}
                onChange={(e) => updateFormData({ kinCell: e.target.value })}
                placeholder="Enter cell"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kinEducation">Level of Education</Label>
              <Select value={formData.kinEducation} onValueChange={(value) => updateFormData({ kinEducation: value })}>
                <SelectTrigger id="kinEducation">
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
            <Label htmlFor="kinOccupation">Occupation</Label>
            <Input
              id="kinOccupation"
              value={formData.kinOccupation}
              onChange={(e) => updateFormData({ kinOccupation: e.target.value })}
              placeholder="Enter occupation"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kinResidentialAddress">Residential Address</Label>
            <Textarea
              id="kinResidentialAddress"
              value={formData.kinResidentialAddress}
              onChange={(e) => updateFormData({ kinResidentialAddress: e.target.value })}
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
