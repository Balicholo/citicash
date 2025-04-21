"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { sendFormData } from "@/utils/emailService"; // Import the helper function

type FormData = {
  // Personal Details
  title: string
  fullName: string
  identityNumber: string
  mobileNumber: string
  maritalStatus: string
  numberOfChildren: string
  occupation: string
  email: string
  personalAssets: string
  numberOfDependants: string
  personalObligations: string
  residentialAddress: string

  // Business Details
  businessName: string
  businessAddress: string
  typeOfBusiness: string
  tinNumber: string
  yearsInBusiness: string
  numberOfEmployees: string
  mainProducts: string
  salesPerPeriod: string
  isRegistered: boolean
  notRegisteredReason: string
  mainChallenges: string
  creditFacilities: string
  businessAssets: string

  // Next of Kin
  kinTitle: string
  kinFullName: string
  kinRelationship: string
  kinMobileNumber: string
  kinCell: string
  kinEducation: string
  kinOccupation: string
  kinResidentialAddress: string

  // Guarantor
  guarantorTitle: string
  guarantorFullName: string
  guarantorRelationship: string
  guarantorMobileNumber: string
  guarantorCell: string
  guarantorEducation: string
  guarantorOccupation: string
  guarantorResidentialAddress: string
  guarantorIdNumber: string

  // Banking Details
  bankName: string
  bankBranch: string
  accountNumber: string

  // Loan Details
  loanAmount: string
  loanAmountInWords: string
  loanPurpose: string
  loanTenure: string
  desiredInstalment: string
  securityCeded: string
  securityValue: string

  // Declarations
  clientName: string
  clientSignatureDate: string
  guarantorSignatureDate: string
  representativeName: string
  representativeIdNumber: string
  representativeSignatureDate: string
  managerSignatureDate: string

  // Terms and Conditions
  agreedToTerms: boolean
  executionPlace: string
  executionDate: string
  debtorName: string
  guarantorName: string
  preparedByName: string
  preparedByDate: string
  approvedByName: string
  approvedByDate: string

  // Document Upload
  applicantIdDocument: File | null
  guarantorIdDocument: File | null
  proofOfResidence: File | null
  companyDocuments: File | null
  incomeProof: File | null
  businessLicense: File | null
  taxClearance: File | null
  securityDocument: File | null
}

const initialFormData: FormData = {
  // Personal Details
  title: "",
  fullName: "",
  identityNumber: "",
  mobileNumber: "",
  maritalStatus: "",
  numberOfChildren: "",
  occupation: "",
  email: "",
  personalAssets: "",
  numberOfDependants: "",
  personalObligations: "",
  residentialAddress: "",

  // Business Details
  businessName: "",
  businessAddress: "",
  typeOfBusiness: "",
  tinNumber: "",
  yearsInBusiness: "",
  numberOfEmployees: "",
  mainProducts: "",
  salesPerPeriod: "",
  isRegistered: false,
  notRegisteredReason: "",
  mainChallenges: "",
  creditFacilities: "",
  businessAssets: "",

  // Next of Kin
  kinTitle: "",
  kinFullName: "",
  kinRelationship: "",
  kinMobileNumber: "",
  kinCell: "",
  kinEducation: "",
  kinOccupation: "",
  kinResidentialAddress: "",

  // Guarantor
  guarantorTitle: "",
  guarantorFullName: "",
  guarantorRelationship: "",
  guarantorMobileNumber: "",
  guarantorCell: "",
  guarantorEducation: "",
  guarantorOccupation: "",
  guarantorResidentialAddress: "",
  guarantorIdNumber: "",

  // Banking Details
  bankName: "",
  bankBranch: "",
  accountNumber: "",

  // Loan Details
  loanAmount: "",
  loanAmountInWords: "",
  loanPurpose: "",
  loanTenure: "",
  desiredInstalment: "",
  securityCeded: "",
  securityValue: "",

  // Declarations
  clientName: "",
  clientSignatureDate: "",
  guarantorSignatureDate: "",
  representativeName: "",
  representativeIdNumber: "",
  representativeSignatureDate: "",
  managerSignatureDate: "",

  // Terms and Conditions
  agreedToTerms: false,
  executionPlace: "",
  executionDate: "",
  debtorName: "",
  guarantorName: "",
  preparedByName: "",
  preparedByDate: "",
  approvedByName: "",
  approvedByDate: "",

  // Document Upload
  applicantIdDocument: null,
  guarantorIdDocument: null,
  proofOfResidence: null,
  companyDocuments: null,
  incomeProof: null,
  businessLicense: null,
  taxClearance: null,
  securityDocument: null,
}

type FormContextType = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
  submitForm: () => Promise<void>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const submitForm = async () => {
    try {
      await sendFormData(formData); // Send the form data via EmailJS
      alert("Form submitted successfully!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      alert("Failed to submit the form. Please try again.");
    }
  };

  return <FormContext.Provider value={{ formData, updateFormData, resetForm, submitForm }}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

import React from "react";
import { useFormContext as useFormContextFromProvider } from "@/context/form-context";

export default function Form() {
  const { formData, updateFormData, submitForm } = useFormContextFromProvider();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(); // Call the submitForm function
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add more fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
}
