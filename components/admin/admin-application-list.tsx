"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Download, Eye, FileText } from "lucide-react"

// Mock data for demonstration
const mockApplications = [
  {
    id: "APP-001",
    name: "John Doe",
    businessName: "JD Enterprises",
    amount: 1500,
    date: "2025-04-15",
    status: "pending",
    email: "john@example.com",
    phone: "+1234567890",
    documents: ["ID", "Proof of Residence", "Business License"],
  },
  {
    id: "APP-002",
    name: "Jane Smith",
    businessName: "Smith Trading",
    amount: 800,
    date: "2025-04-14",
    status: "approved",
    email: "jane@example.com",
    phone: "+1234567891",
    documents: ["ID", "Proof of Residence", "Income Proof"],
  },
  {
    id: "APP-003",
    name: "Robert Johnson",
    businessName: "RJ Solutions",
    amount: 2000,
    date: "2025-04-13",
    status: "rejected",
    email: "robert@example.com",
    phone: "+1234567892",
    documents: ["ID", "Company Documents", "Tax Clearance"],
  },
  {
    id: "APP-004",
    name: "Sarah Williams",
    businessName: "SW Consultancy",
    amount: 1200,
    date: "2025-04-12",
    status: "pending",
    email: "sarah@example.com",
    phone: "+1234567893",
    documents: ["ID", "Proof of Residence", "Security Document"],
  },
  {
    id: "APP-005",
    name: "Michael Brown",
    businessName: "Brown Retail",
    amount: 1000,
    date: "2025-04-11",
    status: "approved",
    email: "michael@example.com",
    phone: "+1234567894",
    documents: ["ID", "Business License", "Income Proof"],
  },
]

type Application = (typeof mockApplications)[0]

export default function AdminApplicationList() {
  const [applications] = useState(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredApplications = applications.filter(
    (app) =>
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Amount (USD)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.id}</TableCell>
                  <TableCell>{application.name}</TableCell>
                  <TableCell>{application.businessName}</TableCell>
                  <TableCell>${application.amount}</TableCell>
                  <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(application.status)} text-white capitalize`}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewApplication(application)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedApplication && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Application {selectedApplication.id}</DialogTitle>
              <DialogDescription>
                Submitted on {new Date(selectedApplication.date).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Applicant Details</TabsTrigger>
                <TabsTrigger value="loan">Loan Information</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Personal Information</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-1 text-sm">
                        <div className="font-medium">Name:</div>
                        <div>{selectedApplication.name}</div>
                        <div className="font-medium">Email:</div>
                        <div>{selectedApplication.email}</div>
                        <div className="font-medium">Phone:</div>
                        <div>{selectedApplication.phone}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Business Information</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-1 text-sm">
                        <div className="font-medium">Business Name:</div>
                        <div>{selectedApplication.businessName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="loan" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="font-medium">Loan Amount:</div>
                    <div>${selectedApplication.amount}</div>
                    <div className="font-medium">Status:</div>
                    <div>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(selectedApplication.status)} text-white capitalize`}
                      >
                        {selectedApplication.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    Approve
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Reject
                  </Button>
                  <Button variant="default" className="flex-1">
                    Request More Info
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-md">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="flex-1">{doc}</span>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
