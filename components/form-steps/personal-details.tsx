"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function PersonalDetailsForm() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Select value={formData.title} onValueChange={(value) => updateFormData({ title: value })}>
                <SelectTrigger id="title">
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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData({ fullName: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="identityNumber">Identity Number</Label>
              <Input
                id="identityNumber"
                value={formData.identityNumber}
                onChange={(e) => updateFormData({ identityNumber: e.target.value })}
                placeholder="Enter your ID number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => updateFormData({ mobileNumber: e.target.value })}
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) => updateFormData({ maritalStatus: value })}
              >
                <SelectTrigger id="maritalStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfChildren">Number of Children</Label>
              <Input
                id="numberOfChildren"
                type="number"
                min="0"
                value={formData.numberOfChildren}
                onChange={(e) => updateFormData({ numberOfChildren: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfDependants">Number of Dependants</Label>
              <Input
                id="numberOfDependants"
                type="number"
                min="0"
                value={formData.numberOfDependants}
                onChange={(e) => updateFormData({ numberOfDependants: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => updateFormData({ occupation: e.target.value })}
                placeholder="Enter your occupation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="residentialAddress">Residential Address</Label>
            <Textarea
              id="residentialAddress"
              value={formData.residentialAddress}
              onChange={(e) => updateFormData({ residentialAddress: e.target.value })}
              placeholder="Enter your residential address"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personalAssets">Personal Assets</Label>
              <Textarea
                id="personalAssets"
                value={formData.personalAssets}
                onChange={(e) => updateFormData({ personalAssets: e.target.value })}
                placeholder="List your personal assets"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalObligations">Personal Obligations</Label>
              <Textarea
                id="personalObligations"
                value={formData.personalObligations}
                onChange={(e) => updateFormData({ personalObligations: e.target.value })}
                placeholder="List your personal obligations"
                rows={3}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
