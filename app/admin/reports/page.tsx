"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import {
  CalendarIcon,
  Download,
  BarChart,
  PieChart,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Filter,
  PlusCircle,
} from "lucide-react"
import { blightCases } from "@/data/blight-cases"

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("cases-by-status")
  const [timeRange, setTimeRange] = useState("last-30-days")
  const [organization, setOrganization] = useState("all")
  const [area, setArea] = useState("all")

  // Get unique organizations and areas
  const organizations = ["all", ...Array.from(new Set(blightCases.map((c) => c.organization)))]
  const areas = ["all", ...Array.from(new Set(blightCases.map((c) => c.area)))]

  // Count cases by status
  const pendingCount = blightCases.filter((c) => c.status === "pending").length
  const approvedCount = blightCases.filter((c) => c.status === "approved").length
  const revisionCount = blightCases.filter((c) => c.status === "revision").length
  const addedCount = blightCases.filter((c) => c.status === "added").length
  const closedCount = blightCases.filter((c) => c.status === "closed").length
  const totalCount = pendingCount + approvedCount + revisionCount + addedCount + closedCount

  // Count cases by organization
  const orgCounts = blightCases.reduce(
    (acc, curr) => {
      acc[curr.organization] = (acc[curr.organization] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Count cases by area
  const areaCounts = blightCases.reduce(
    (acc, curr) => {
      acc[curr.area] = (acc[curr.area] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Count cases by category
  const categoryCounts = blightCases.reduce(
    (acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Sample data for charts
  const statusChartData = [
    { name: "Approved", value: approvedCount, color: "#22c55e" },
    { name: "Pending", value: pendingCount, color: "#f59e0b" },
    { name: "Revision", value: revisionCount, color: "#ef4444" },
    { name: "Added", value: addedCount, color: "#3b82f6" },
    { name: "Closed", value: closedCount, color: "#8b5cf6" },
    { name: "Total", value: totalCount, color: "#4f46e5" },
  ]

  const categoryChartData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
    color: "#4f46e5",
  }))

  const areaChartData = Object.entries(areaCounts).map(([name, value]) => ({
    name,
    value,
    color: "#3b82f6",
  }))

  const orgChartData = Object.entries(orgCounts).map(([name, value]) => ({
    name,
    value,
    color: "#8b5cf6",
  }))

  // Sample time series data
  const timeSeriesData = [
    { date: "Nov 1", approved: 2, pending: 5, revision: 1, added: 1 },
    { date: "Nov 5", approved: 4, pending: 6, revision: 2 },
    { date: "Nov 10", approved: 6, pending: 4, revision: 3 , added: 2},
    { date: "Nov 15", approved: 8, pending: 3, revision: 2, added: 1 },
    { date: "Nov 20", approved: 10, pending: 4, revision: 1, added: 1 },
    { date: "Nov 25", approved: 12, pending: 3, revision: 2 },
    { date: "Nov 30", approved: 15, pending: 2, revision: 1 },
  ]

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal md:w-[240px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="year-to-date">Year to date</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Report Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-auto">
                <label className="text-sm font-medium mb-1 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cases-by-status">Cases by Status</SelectItem>
                    <SelectItem value="cases-by-category">Cases by Category</SelectItem>
                    <SelectItem value="cases-by-organization">Cases by Organization</SelectItem>
                    <SelectItem value="cases-by-area">Cases by Area</SelectItem>
                    <SelectItem value="time-series">Time Series Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto">
                <label className="text-sm font-medium mb-1 block">Organization</label>
                <Select value={organization} onValueChange={setOrganization}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select organization" />
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
              <div className="w-full md:w-auto">
                <label className="text-sm font-medium mb-1 block">Area</label>
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a === "all" ? "All Areas" : a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto flex items-end">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Cases</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approval Rate</p>
                <p className="text-2xl font-bold">{Math.round((approvedCount / totalCount) * 100)}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
                <p className="text-2xl font-bold">3.2 days</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Cases by Status</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* This would be a real chart in a production app */}
                  <div className="flex h-full flex-col items-center justify-center">
                    <PieChart className="h-40 w-40 text-gray-300" />
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {statusChartData.map((item) => (
                        <div key={item.name} className="text-center">
                          <div className="mx-auto h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <p className="mt-1 text-sm font-medium">{item.name}</p>
                          <p className="text-xl font-bold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Cases by Category</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* This would be a real chart in a production app */}
                  <div className="flex h-full flex-col items-center justify-center">
                    <BarChart className="h-40 w-40 text-gray-300" />
                    <div className="mt-4 w-full space-y-2">
                      {Object.entries(categoryCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(([category, count]) => (
                          <div key={category} className="flex items-center">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{category}</span>
                                <span className="text-sm text-gray-500">{count} cases</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 bg-indigo-600 rounded-full"
                                  style={{ width: `${(count / totalCount) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Cases by Area</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* This would be a real chart in a production app */}
                  <div className="flex h-full flex-col items-center justify-center">
                    <MapPin className="h-40 w-40 text-gray-300" />
                    <div className="mt-4 w-full space-y-2">
                      {Object.entries(areaCounts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([area, count]) => (
                          <div key={area} className="flex items-center">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{area}</span>
                                <span className="text-sm text-gray-500">{count} cases</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{ width: `${(count / totalCount) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Time Series Analysis</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">Export</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* This would be a real chart in a production app */}
                  <div className="flex h-full flex-col items-center justify-center">
                    <BarChart className="h-40 w-40 text-gray-300" />
                    <div className="mt-4 w-full">
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                          <span className="text-xs">Approved</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                          <span className="text-xs">Pending</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                          <span className="text-xs">Revision</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div>
                          <span className="text-xs">Added</span>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr>
                              <th className="px-2 py-1 text-left">Date</th>
                              <th className="px-2 py-1 text-right">Approved</th>
                              <th className="px-2 py-1 text-right">Pending</th>
                              <th className="px-2 py-1 text-right">Revision</th>
                              <th className="px-2 py-1 text-right">Added</th>
                            </tr>
                          </thead>
                          <tbody>
                            {timeSeriesData.map((item) => (
                              <tr key={item.date}>
                                <td className="px-2 py-1 text-left">{item.date}</td>
                                <td className="px-2 py-1 text-right">{item.approved}</td>
                                <td className="px-2 py-1 text-right">{item.pending}</td>
                                <td className="px-2 py-1 text-right">{item.revision}</td>
                                <td className="px-2 py-1 text-right">{item.added}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Case Report</CardTitle>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blightCases.map((blightCase) => (
                      <TableRow key={blightCase.id}>
                        <TableCell className="font-medium">{blightCase.id}</TableCell>
                        <TableCell>{blightCase.category}</TableCell>
                        <TableCell>{blightCase.area}</TableCell>
                        <TableCell>{blightCase.organization}</TableCell>
                        <TableCell>{blightCase.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {blightCase.status === "approved" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : blightCase.status === "pending" ? (
                              <Clock className="w-4 h-4 text-amber-500" />
                            ) : blightCase.status === "revision" ? (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            ): (
                              <PlusCircle className="w-4 h-4 text-indigo-600" />
                            )}
                            <span className="capitalize">{blightCase.status}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Geographic Distribution</CardTitle>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Map
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Map visualization would appear here</p>
                  <p className="text-sm text-gray-400">Showing geographic distribution of cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

