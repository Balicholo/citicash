import LoanApplicationForm from "@/components/loan-application-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">CITICASH Financial Services</CardTitle>
          <CardDescription>Loan Application Form</CardDescription>
        </CardHeader>
        <CardContent>
          <LoanApplicationForm />
        </CardContent>
      </Card>
    </main>
  )
}
