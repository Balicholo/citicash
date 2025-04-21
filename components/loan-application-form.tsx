"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import PersonalDetailsForm from "./form-steps/personal-details"
import BusinessDetailsForm from "./form-steps/business-details"
import NextOfKinForm from "./form-steps/next-of-kin"
import GuarantorForm from "./form-steps/guarantor"
import BankingDetailsForm from "./form-steps/banking-details"
import LoanDetailsForm from "./form-steps/loan-details"
import DeclarationsForm from "./form-steps/declarations"
import DocumentUploadForm from "./form-steps/document-upload"
import SummaryForm from "./form-steps/summary"
import TermsAndConditions from "./form-steps/terms-and-conditions"
import SuccessMessage from "./form-steps/success-message"
import { FormProvider } from "@/context/form-context"

const steps = [
  "Personal Details",
  "Business Details",
  "Next of Kin",
  "Guarantor",
  "Banking Details",
  "Loan Details",
  "Document Upload",
  "Declarations",
  "Terms & Conditions",
  "Summary",
]

export default function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // In a real application, this would submit the form data to the server
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <SuccessMessage />
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetailsForm />
      case 1:
        return <BusinessDetailsForm />
      case 2:
        return <NextOfKinForm />
      case 3:
        return <GuarantorForm />
      case 4:
        return <BankingDetailsForm />
      case 5:
        return <LoanDetailsForm />
      case 6:
        return <DocumentUploadForm />
      case 7:
        return <DeclarationsForm />
      case 8:
        return <TermsAndConditions />
      case 9:
        return <SummaryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      default:
        return <PersonalDetailsForm />
    }
  }

  return (
    <FormProvider>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{steps[currentStep]}</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        {renderStep()}

        <div className="flex justify-between pt-4">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep === 0 && <div />}

          {currentStep < steps.length - 1 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  )
}
