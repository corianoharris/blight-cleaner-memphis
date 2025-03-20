"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Settings,
  LogOut,
  Trophy,
  Award,
  Star,
  Calendar,
  MapPin,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  PlusCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Extended submission data with timestamps and detailed status
const submissionHistory = [
  {
    id: "M-M-23456789",
    category: "Junky Yard",
    organization: "Clean City Initiative",
    submittedAt: "2023-11-15 09:23 AM",
    lastUpdated: "2023-11-16 02:45 PM",
    status: "approved",
    detailedStatus: "Case Added",
    points: 25,
    area: "Downtown",
  },
  {
    id: "M-M-23456790",
    category: "Abandoned Building",
    organization: "Urban Development",
    submittedAt: "2023-11-18 11:05 AM",
    lastUpdated: "2023-11-18 11:05 AM",
    status: "pending",
    detailedStatus: "Waiting for Review",
    points: 30,
    area: "Southside",
  },
  {
    id: "M-M-23456791",
    category: "Illegal Dumping",
    organization: "Environmental Protection",
    submittedAt: "2023-11-20 03:17 PM",
    lastUpdated: "2023-11-22 10:30 AM",
    status: "revision",
    detailedStatus: "Needs Additional Information",
    points: 20,
    area: "Northside",
  },
  {
    id: "M-M-23456792",
    category: "Graffiti",
    organization: "City Beautification",
    submittedAt: "2023-11-22 08:45 AM",
    lastUpdated: "2023-11-23 01:15 PM",
    status: "approved",
    detailedStatus: "Approved",
    points: 15,
    area: "Downtown",
  },
  {
    id: "M-M-23456793",
    category: "Pothole",
    organization: "Road Maintenance",
    submittedAt: "2023-11-25 02:30 PM",
    lastUpdated: "2023-11-26 09:10 AM",
    status: "added",
    detailedStatus: "Case Added",
    points: 10,
    area: "Eastside",
  },
  {
    id: "M-M-23456794",
    category: "Abandoned Building",
    organization: "Urban Development",
    submittedAt: "2023-11-27 10:15 AM",
    lastUpdated: "2023-11-27 04:20 PM",
    status: "pending",
    detailedStatus: "In Review",
    points: 25,
    area: "Westside",
  },
  {
    id: "M-M-23456795",
    category: "Illegal Dumping",
    organization: "Environmental Protection",
    submittedAt: "2023-11-29 05:00 PM",
    lastUpdated: "2023-11-30 11:30 AM",
    status: "revision",
    detailedStatus: "Needs Additional Information",
    points: 20,
    area: "Northside",
  },
  {
    id: "M-M-23456796",
    category: "Graffiti",
    organization: "City Beautification",
    submittedAt: "2023-12-01 09:45 AM",
    lastUpdated: "2023-12-02 02:15 PM",
    status: "added",
    detailedStatus: "Case Added",
    points: 15,
    area: "Downtown",
  },
  {
    id: "M-M-23456797",
    category: "Pothole",
    organization: "Road Maintenance",
    submittedAt: "2023-12-03 03:30 PM",
    lastUpdated: "2023-12-04 10:10 AM",
    status: "approved",
    detailedStatus: "Approved",
    points: 10,
    area: "Eastside",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter cases by status
  const filteredSubmissions =
    statusFilter === "all" ? submissionHistory : submissionHistory.filter((s) => s.status === statusFilter)

  const handleCaseClick = (id: string) => {
    router.push(`/case/${id}`)
  }

  const getStatusIcon = (status: string, detailedStatus: string) => {
    if (status === "approved") {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (status === "pending") {
      return detailedStatus === "In Review" ? (
        <Clock className="w-4 h-4 text-amber-500" />
      ) : (
        <AlertCircle className="w-4 h-4 text-amber-500" />
      )
    } else if (status === "revision") {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    } else if (status === "added") {
      return <PlusCircle className="w-4 h-4 text-indigo-600" />
    } else {
      return <Edit className="w-4 h-4 text-red-500" />
    }
  }

  console.log(filteredSubmissions)
  console.log("selected status", statusFilter)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/map")} className="mr-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Profile</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="relative mb-16">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg"></div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden bg-white">
              <Image src="/placeholder.svg?height=96&width=96" alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Mayor Young</h1>
          <p className="text-gray-500">Community Leader</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge className="bg-amber-500">Top Contributor</Badge>
            <Badge variant="outline" className="border-indigo-600 text-indigo-600">
              Level 5
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="stats" className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <p className="text-gray-500 text-sm">Current points</p>
                    <p className="text-2xl font-bold text-indigo-600">25</p>
                  </div>

                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-gray-500 text-sm">Rank</p>
                    <p className="text-2xl font-bold text-amber-600">#3</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">Level Progress</p>
                    <p className="text-xs text-gray-500">75/100</p>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                      </div>
                      <p className="text-sm font-medium">Total submitted cases</p>
                    </div>
                    <p className="font-semibold">25</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">Approved</p>
                    </div>
                    <p className="font-semibold text-green-600">10</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium">Review in progress</p>
                    </div>
                    <p className="font-semibold text-amber-600">3</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <Award className="w-4 h-4 text-red-600" />
                      </div>
                      <p className="text-sm font-medium">Revisions needed</p>
                    </div>
                    <p className="font-semibold text-red-600">6</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Award className="w-4 h-4 text-indigo-600" />
                      </div>
                      <p className="text-sm font-medium">Cases added</p>
                    </div>
                    <p className="font-semibold text-indigo-600">8</p>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-indigo-50 rounded-lg">
                  <h3 className="font-medium mb-2">Recent Point Increase</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">Issue #23456789</p>
                      <p className="text-xs text-gray-500">Junky Yard - Downtown</p>
                    </div>
                    <div className="text-indigo-600 font-bold">+25 points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">My Submissions</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="all">All Submissions</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="added">Added</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="revision">Needs Revision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Issue #</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Area</TableHead>
                        <TableHead className="hidden md:table-cell">Submitted</TableHead>
                        <TableHead>Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission) => (
                        <TableRow
                          key={submission.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleCaseClick(submission.id)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {getStatusIcon(submission.status, submission.detailedStatus)}
                              <span className="text-xs whitespace-nowrap">{submission.detailedStatus}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{submission.id.split("-")[2]}</TableCell>
                          <TableCell>{submission.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{submission.area}</TableCell>
                          <TableCell className="hidden md:table-cell text-xs">
                            <div className="flex flex-col">
                              <span>{submission.submittedAt.split(" ")[0]}</span>
                              <span className="text-gray-500">
                                {submission.submittedAt.split(" ")[1]} {submission.submittedAt.split(" ")[2]}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-indigo-600 font-bold">+{submission.points}</TableCell>
                        </TableRow>
                      ))}
                      {filteredSubmissions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                            No {statusFilter === "all" ? "" : statusFilter} submissions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <Tabs defaultValue="weekly" className="mb-2">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily" className="space-y-4 mt-4">
                    <LeaderboardItem rank={1} name="Mayor Young" points={125} isCurrentUser={true} />
                    <LeaderboardItem rank={2} name="Jane Smith" points={110} />
                    <LeaderboardItem rank={3} name="John Doe" points={95} />
                    <LeaderboardItem rank={4} name="Alice Johnson" points={80} />
                    <LeaderboardItem rank={5} name="Bob Williams" points={75} />
                  </TabsContent>

                  <TabsContent value="weekly" className="space-y-4 mt-4">
                    <LeaderboardItem rank={1} name="Jane Smith" points={320} />
                    <LeaderboardItem rank={2} name="Mayor Young" points={290} isCurrentUser={true} />
                    <LeaderboardItem rank={3} name="John Doe" points={245} />
                    <LeaderboardItem rank={4} name="Alice Johnson" points={210} />
                    <LeaderboardItem rank={5} name="Bob Williams" points={185} />
                  </TabsContent>

                  <TabsContent value="monthly" className="space-y-4 mt-4">
                    <LeaderboardItem rank={1} name="John Doe" points={950} />
                    <LeaderboardItem rank={2} name="Jane Smith" points={875} />
                    <LeaderboardItem rank={3} name="Alice Johnson" points={820} />
                    <LeaderboardItem rank={4} name="Mayor Young" points={780} isCurrentUser={true} />
                    <LeaderboardItem rank={5} name="Bob Williams" points={720} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                      <Trophy className="w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-xs font-medium text-center">First Report</p>
                  </div>

                  <div className="flex flex-col items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                      <Star className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-xs font-medium text-center">5 Reports</p>
                  </div>

                  <div className="flex flex-col items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs font-medium text-center">10 Approved</p>
                  </div>

                  <div className="flex flex-col items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <MapPin className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-xs font-medium text-center">Explorer</p>
                  </div>

                  <div className="flex flex-col items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-xs font-medium text-center">Top 10</p>
                  </div>

                  <div className="flex flex-col items-center p-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 opacity-50">
                      <Award className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-xs font-medium text-center text-gray-400">25 Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-sm text-white"
            onClick={() => router.push("/map")}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Back to Map
          </Button>

          <Button variant="outline" className="w-full justify-start shadow-sm">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 shadow-sm"
            onClick={() => router.push("/")}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

interface LeaderboardItemProps {
  rank: number
  name: string
  points: number
  isCurrentUser?: boolean
}

function LeaderboardItem({ rank, name, points, isCurrentUser = false }: LeaderboardItemProps) {
  return (
    <div className={`flex items-center p-3 rounded-lg ${isCurrentUser ? "bg-indigo-50" : ""}`}>
      <div className="font-bold text-lg w-8">{rank}</div>
      <Avatar className="mr-3">
        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-medium flex items-center">
          {name}
          {isCurrentUser && (
            <Badge variant="outline" className="ml-2 text-xs">
              You
            </Badge>
          )}
        </div>
      </div>
      <div className="font-bold text-indigo-600">{points} pts</div>
    </div>
  )
}

