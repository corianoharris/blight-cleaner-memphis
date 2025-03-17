"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Building, MapPin, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample organization data
const organizations = [
  {
    id: "org-001",
    name: "Clean City Initiative",
    type: "Government",
    address: "123 Main St, Birmingham, AL 35203",
    phone: "(205) 555-0123",
    email: "contact@cleancity.gov",
    status: "active",
    casesCount: 42,
    contactPerson: "Sarah Johnson",
    description: "Focused on cleaning up abandoned properties and junky yards across the city.",
  },
  {
    id: "org-002",
    name: "Urban Development",
    type: "Government",
    address: "456 Park Ave, Birmingham, AL 35204",
    phone: "(205) 555-0124",
    email: "info@urbandevelopment.gov",
    status: "active",
    casesCount: 38,
    contactPerson: "Michael Chen",
    description: "Handles abandoned buildings and urban renewal projects.",
  },
  {
    id: "org-003",
    name: "Environmental Protection",
    type: "Government",
    address: "789 Oak St, Birmingham, AL 35205",
    phone: "(205) 555-0125",
    email: "contact@envprotect.gov",
    status: "active",
    casesCount: 27,
    contactPerson: "Aisha Patel",
    description: "Focuses on environmental issues including illegal dumping and pollution.",
  },
  {
    id: "org-004",
    name: "City Beautification",
    type: "Non-profit",
    address: "321 Elm St, Birmingham, AL 35206",
    phone: "(205) 555-0126",
    email: "hello@beautify.org",
    status: "active",
    casesCount: 19,
    contactPerson: "Robert Wilson",
    description: "Volunteer organization dedicated to beautifying public spaces and removing graffiti.",
  },
  {
    id: "org-005",
    name: "Road Maintenance",
    type: "Government",
    address: "654 Pine St, Birmingham, AL 35207",
    phone: "(205) 555-0127",
    email: "roads@birmingham.gov",
    status: "active",
    casesCount: 31,
    contactPerson: "Elena Rodriguez",
    description: "Responsible for road repairs, pothole fixing, and street maintenance.",
  },
  {
    id: "org-006",
    name: "Community Cleanup Coalition",
    type: "Non-profit",
    address: "987 Maple St, Birmingham, AL 35208",
    phone: "(205) 555-0128",
    email: "info@cleanupcoalition.org",
    status: "inactive",
    casesCount: 0,
    contactPerson: "James Thompson",
    description: "Coalition of neighborhood associations focused on community-led cleanup efforts.",
  },
]

export default function OrganizationsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingOrg, setEditingOrg] = useState<any>(null)

  // Form state for new/edit organization
  const [formData, setFormData] = useState({
    name: "",
    type: "Government",
    address: "",
    phone: "",
    email: "",
    status: "active",
    contactPerson: "",
    description: "",
  })

  // Filter organizations based on search query
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddOrEdit = () => {
    // In a real app, this would save to a database
    toast({
      title: editingOrg ? "Organization updated" : "Organization added",
      description: `${formData.name} has been ${editingOrg ? "updated" : "added"} successfully.`,
      duration: 3000,
    })

    // Reset form and close dialog
    setFormData({
      name: "",
      type: "Government",
      address: "",
      phone: "",
      email: "",
      status: "active",
      contactPerson: "",
      description: "",
    })
    setEditingOrg(null)
    setShowAddDialog(false)
  }

  const handleEdit = (org: any) => {
    setEditingOrg(org)
    setFormData({
      name: org.name,
      type: org.type,
      address: org.address,
      phone: org.phone,
      email: org.email,
      status: org.status,
      contactPerson: org.contactPerson,
      description: org.description,
    })
    setShowAddDialog(true)
  }

  const handleDelete = (orgId: string) => {
    // In a real app, this would delete from a database
    toast({
      title: "Organization deleted",
      description: "The organization has been deleted successfully.",
      duration: 3000,
    })
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search organizations..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{editingOrg ? "Edit Organization" : "Add New Organization"}</DialogTitle>
                <DialogDescription>
                  {editingOrg
                    ? "Update the organization details below."
                    : "Fill in the details to add a new organization."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Organization Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Organization name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Type
                    </label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="Non-profit">Non-profit</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(205) 555-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@organization.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contactPerson" className="text-sm font-medium">
                      Contact Person
                    </label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the organization"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleAddOrEdit}>
                  {editingOrg ? "Save Changes" : "Add Organization"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Organization List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden md:table-cell">Cases</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-xs text-gray-500 hidden md:block">{org.address}</div>
                      </TableCell>
                      <TableCell>{org.type}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{org.contactPerson}</div>
                        <div className="text-xs text-gray-500">{org.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{org.casesCount}</TableCell>
                      <TableCell>
                        {org.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(org)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(org.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No organizations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-indigo-600" />
              <CardTitle>Organization Types</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                  <span>Government</span>
                </div>
                <span className="font-medium">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Non-profit</span>
                </div>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span>Private</span>
                </div>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Community</span>
                </div>
                <span className="font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
              <CardTitle>Areas Covered</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Downtown</span>
                <span className="font-medium">5 orgs</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Southside</span>
                <span className="font-medium">4 orgs</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Northside</span>
                <span className="font-medium">3 orgs</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Eastside</span>
                <span className="font-medium">2 orgs</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Westside</span>
                <span className="font-medium">2 orgs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
              <CardTitle>Organization Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Active</span>
                    <span className="text-sm text-gray-500">5 orgs</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "83%" }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Inactive</span>
                    <span className="text-sm text-gray-500">1 org</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-500 rounded-full" style={{ width: "17%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

