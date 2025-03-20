"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, CheckCircle, AlertCircle, Clock, TrendingUp, TrendingDown, Building, PlusIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { blightCases } from "@/data/blight-cases"
import { reviewers } from "@/data/reviewers"

export default function AdminDashboard() {
  const router = useRouter()

  // Set authentication in localStorage for demo purposes
  useEffect(() => {
    // This is just for demo purposes
    // In a real app, this would be handled by a proper auth system
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  // Count cases by status
  const pendingCount = blightCases.filter((c) => c.status === "pending").length
  const approvedCount = blightCases.filter((c) => c.status === "approved").length
  const revisionCount = blightCases.filter((c) => c.status === "revision").length
  const addedCount = blightCases.filter((c) => c.status === "added").length
  const totalCount = blightCases.length

  // Count cases by organization
  const orgCounts = blightCases.reduce(
    (acc, curr) => {
      acc[curr.organization] = (acc[curr.organization] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Get top organizations
  const topOrgs = Object.entries(orgCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Cases</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="ml-1 text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">5%</span>
              <span className="ml-1 text-gray-500">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">18%</span>
              <span className="ml-1 text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revision</p>
                <p className="text-2xl font-bold">{revisionCount}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">18%</span>
              <span className="ml-1 text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cases Added</p>
                <p className="text-2xl font-bold">{addedCount}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <PlusIcon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
              <span className="text-indigo-500 font-medium">3%</span>
              <span className="ml-1 text-gray-500">from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Cases by Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOrgs.map(([org, count]) => (
                <div key={org} className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-indigo-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{org}</span>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Reviewers</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                {reviewers.slice(0, 5).map((reviewer) => (
                  <div key={reviewer.id} className="flex items-center">
                    <div className="relative mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {reviewer.avatar ? (
                          <img
                            src={reviewer.avatar || "/placeholder.svg"}
                            alt={reviewer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          reviewer.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{reviewer.name}</p>
                      <p className="text-xs text-gray-500">{reviewer.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{reviewer.casesReviewed} cases</p>
                      <p className="text-xs text-gray-500">today</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="week" className="space-y-4">
                {reviewers.slice(0, 5).map((reviewer) => (
                  <div key={reviewer.id} className="flex items-center">
                    <div className="relative mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {reviewer.avatar ? (
                          <img
                            src={reviewer.avatar || "/placeholder.svg"}
                            alt={reviewer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          reviewer.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{reviewer.name}</p>
                      <p className="text-xs text-gray-500">{reviewer.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{reviewer.casesReviewed * 5} cases</p>
                      <p className="text-xs text-gray-500">this week</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="month" className="space-y-4">
                {reviewers.slice(0, 5).map((reviewer) => (
                  <div key={reviewer.id} className="flex items-center">
                    <div className="relative mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {reviewer.avatar ? (
                          <img
                            src={reviewer.avatar || "/placeholder.svg"}
                            alt={reviewer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          reviewer.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{reviewer.name}</p>
                      <p className="text-xs text-gray-500">{reviewer.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{reviewer.casesReviewed * 20} cases</p>
                      <p className="text-xs text-gray-500">this month</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

