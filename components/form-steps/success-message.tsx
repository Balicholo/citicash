"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon } from "lucide-react"

type SuccessMessageProps = {
  onStartNewApplication: () => void
}

export default function SuccessMessage({ onStartNewApplication }: SuccessMessageProps) {
  const referenceRef = useRef(
    Math.random().toString(36).substring(2, 10).toUpperCase(),
  )

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <CheckCircle2Icon className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Application Submitted</CardTitle>
        <CardDescription>
          Your loan application has been successfully submitted to Authentic Financial Services.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          Thank you for your application. Our team will review your information and contact you shortly. Please keep
          your application reference number for future correspondence.
        </p>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="font-mono font-medium">REF: {referenceRef.current}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button type="button" className="w-full" onClick={onStartNewApplication}>
          Submit Another Application
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={onStartNewApplication}>
          Return to Home
        </Button>
      </CardFooter>
    </Card>
  )
}
