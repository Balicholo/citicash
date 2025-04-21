"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon } from "lucide-react"
import Link from "next/link"
import { useFormContext } from "@/context/form-context"

export default function SuccessMessage() {
  const { resetForm } = useFormContext()

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <CheckCircle2Icon className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Application Submitted</CardTitle>
        <CardDescription>
          Your loan application has been successfully submitted to CITICASH Financial Services.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          Thank you for your application. Our team will review your information and contact you shortly. Please keep
          your application reference number for future correspondence.
        </p>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="font-mono font-medium">REF: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button asChild className="w-full">
          <Link href="/" onClick={resetForm}>
            Submit Another Application
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
