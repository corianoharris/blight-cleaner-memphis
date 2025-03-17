"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock, Search, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { blightCases } from "@/data/blight-cases"

export default function AdminCasesPage() {
  const [statusFilter, setStatusFilter] = useState("pending")
  const [orgFilter, setOrgFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Get unique organizations
  const organizations = ["all", ...Array.from(new Set(blightCases.map((c) => c.organization)))]

  // Filter cases
  let filteredCases = [...blightCases]

  if (statusFilter !== "all") {
    filteredCases = filteredCases.filter((c) => c.status === statusFilter)
  }

  if (orgFilter !== "all") {
    filteredCases = filteredCases.filter((c) => c.organization === orgFilter)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredCases = filteredCases.filter(
      (c) =>
        c.id.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.area.toLowerCase().includes(query) ||
        c.organization.toLowerCase().includes(query),
    )
  }

  // Sort cases - newest first
  filteredCases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "revision":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      case "revision":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Needs Revision</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Case Management</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search cases..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="revision">Needs Revision</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org} value={org}>
                    {org === "all" ? "All Organizations" : org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Case List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCases.length > 0 ? (
                  paginatedCases.map((blightCase) => (
                    <TableRow key={blightCase.id}>
                      <TableCell className="font-medium">{blightCase.id}</TableCell>
                      <TableCell>{blightCase.category}</TableCell>
                      <TableCell>{blightCase.area}</TableCell>
                      <TableCell>{blightCase.organization}</TableCell>
                      <TableCell>{blightCase.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(blightCase.status)}
                          {getStatusBadge(blightCase.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/cases/${blightCase.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View case</span>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No cases found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCases.length)} of{" "}
                {filteredCases.length} cases
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

