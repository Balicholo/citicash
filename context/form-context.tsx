"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { submitApplication } from "@/utils/submitApplication"

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
  kinTitle: "",
  kinFullName: "",
  kinRelationship: "",
  kinMobileNumber: "",
  kinCell: "",
  kinEducation: "",
  kinOccupation: "",
  kinResidentialAddress: "",
  guarantorTitle: "",
  guarantorFullName: "",
  guarantorRelationship: "",
  guarantorMobileNumber: "",
  guarantorCell: "",
  guarantorEducation: "",
  guarantorOccupation: "",
  guarantorResidentialAddress: "",
  guarantorIdNumber: "",
  bankName: "",
  bankBranch: "",
  accountNumber: "",
  loanAmount: "",
  loanAmountInWords: "",
  loanPurpose: "",
  loanTenure: "",
  desiredInstalment: "",
  securityCeded: "",
  securityValue: "",
  clientName: "",
  clientSignatureDate: "",
  guarantorSignatureDate: "",
  representativeName: "",
  representativeIdNumber: "",
  representativeSignatureDate: "",
  managerSignatureDate: "",
  agreedToTerms: false,
  executionPlace: "",
  executionDate: "",
  debtorName: "",
  guarantorName: "",
  preparedByName: "",
  preparedByDate: "",
  approvedByName: "",
  approvedByDate: "",
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
  isSubmitting: boolean
  submitError: string | null
  clearSubmitError: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setSubmitError(null)
  }

  const clearSubmitError = () => setSubmitError(null)

  const submitForm = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitApplication(formData)
      resetForm()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit the form. Please try again."
      setSubmitError(message)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        submitForm,
        isSubmitting,
        submitError,
        clearSubmitError,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
