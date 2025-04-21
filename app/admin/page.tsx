import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminApplicationList from "@/components/admin/admin-application-list"

export default function AdminPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">CITICASH Admin Panel</CardTitle>
          <CardDescription>View and manage loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminApplicationList />
        </CardContent>
      </Card>
    </main>
  )
}
