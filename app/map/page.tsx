"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapContainer } from "@/components/map-container"
import { BlightMarker } from "@/components/blight-marker"
import { useRouter } from "next/navigation"
import { Plus, User, Trophy, Filter, MapPin, Home, Trash2, PaintBucket, Truck, Construction } from "lucide-react"
import Link from "next/link"
import { blightCases } from "@/data/blight-cases"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MapPage() {
  const router = useRouter()
  const [visitedCases, setVisitedCases] = useState<string[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filteredCases, setFilteredCases] = useState(blightCases)
  const [areaFilter, setAreaFilter] = useState("all")
  const [organizationFilter, setOrganizationFilter] = useState("all")

  // Extract unique areas and organizations for filters
  const areas = ["all", ...Array.from(new Set(blightCases.map((c) => c.area)))]
  const organizations = ["all", ...Array.from(new Set(blightCases.map((c) => c.organization)))]

  // Load visited cases from localStorage on component mount
  useEffect(() => {
    const storedVisitedCases = localStorage.getItem("visitedCases")
    if (storedVisitedCases) {
      setVisitedCases(JSON.parse(storedVisitedCases))
    }
  }, [])

  // Save visited cases to localStorage when they change
  useEffect(() => {
    localStorage.setItem("visitedCases", JSON.stringify(visitedCases))
  }, [visitedCases])

  // Filter cases when filters change
  useEffect(() => {
    let filtered = blightCases

    if (areaFilter !== "all") {
      filtered = filtered.filter((c) => c.area === areaFilter)
    }

    if (organizationFilter !== "all") {
      filtered = filtered.filter((c) => c.organization === organizationFilter)
    }

    setFilteredCases(filtered)
  }, [areaFilter, organizationFilter])

  const handleVisitCase = (id: string) => {
    if (!visitedCases.includes(id)) {
      setVisitedCases([...visitedCases, id])
    }
  }

  return (
    <div className="relative flex flex-col h-screen">
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex items-center justify-between">
          <Link href="/profile">
            <Button variant="outline" size="sm" className="bg-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              <span>Profile</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/case/new">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>New Case</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="bg-white flex items-center gap-2"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Leaderboard</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="absolute top-16 right-4 w-full max-w-md z-20">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center">
                  <Filter className="w-5 h-5 text-indigo-600 mr-2" />
                  Filter Map
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  Close
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Area</label>
                  <Select value={areaFilter} onValueChange={setAreaFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area === "all" ? "All Areas" : area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Blight Organization</label>
                  <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
                    <SelectTrigger>
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

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAreaFilter("all")
                      setOrganizationFilter("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showLeaderboard && (
        <div className="absolute top-16 right-4 w-full max-w-md z-20">
          <Card className="shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center">
                  <Trophy className="w-5 h-5 text-amber-500 mr-2" />
                  Leaderboard
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowLeaderboard(false)}>
                  Close
                </Button>
              </div>

              <Tabs defaultValue="weekly">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="space-y-4">
                  <LeaderboardItem rank={1} name="Mayor Young" points={125} isCurrentUser={true} />
                  <LeaderboardItem rank={2} name="Jane Smith" points={110} />
                  <LeaderboardItem rank={3} name="John Doe" points={95} />
                  <LeaderboardItem rank={4} name="Alice Johnson" points={80} />
                  <LeaderboardItem rank={5} name="Bob Williams" points={75} />
                </TabsContent>

                <TabsContent value="weekly" className="space-y-4">
                  <LeaderboardItem rank={1} name="Jane Smith" points={320} />
                  <LeaderboardItem rank={2} name="Mayor Young" points={290} isCurrentUser={true} />
                  <LeaderboardItem rank={3} name="John Doe" points={245} />
                  <LeaderboardItem rank={4} name="Alice Johnson" points={210} />
                  <LeaderboardItem rank={5} name="Bob Williams" points={185} />
                </TabsContent>

                <TabsContent value="monthly" className="space-y-4">
                  <LeaderboardItem rank={1} name="John Doe" points={950} />
                  <LeaderboardItem rank={2} name="Jane Smith" points={875} />
                  <LeaderboardItem rank={3} name="Alice Johnson" points={820} />
                  <LeaderboardItem rank={4} name="Mayor Young" points={780} isCurrentUser={true} />
                  <LeaderboardItem rank={5} name="Bob Williams" points={720} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      <MapContainer>
        {filteredCases.map((blightCase) => (
          <BlightMarker
            key={blightCase.id}
            blightCase={blightCase}
            isVisited={visitedCases.includes(blightCase.id)}
            onVisit={handleVisitCase}
          />
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-4 py-3 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-indigo-600 mr-1" />
              <span className="text-xs font-medium">{filteredCases.length} Issues</span>
            </div>
            {areaFilter !== "all" && (
              <Badge variant="outline" className="text-xs">
                {areaFilter}
              </Badge>
            )}
            {organizationFilter !== "all" && (
              <Badge variant="outline" className="text-xs">
                {organizationFilter}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
            <div className="flex items-center">
              <Home className="w-3 h-3 text-indigo-600 mr-1" />
              <span>Building</span>
            </div>
            <div className="flex items-center">
              <Trash2 className="w-3 h-3 text-indigo-600 mr-1" />
              <span>Junky Yard</span>
            </div>
            <div className="flex items-center">
              <PaintBucket className="w-3 h-3 text-indigo-600 mr-1" />
              <span>Graffiti</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-3 h-3 text-indigo-600 mr-1" />
              <span>Dumping</span>
            </div>
            <div className="flex items-center">
              <Construction className="w-3 h-3 text-indigo-600 mr-1" />
              <span>Pothole</span>
            </div>
          </div>
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

