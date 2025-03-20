"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  MapPin,
  Calendar,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Home,
  Trash2,
  PaintBucket,
  Truck,
  Construction,
} from "lucide-react"
import { blightCases } from "@/data/blight-cases"
import { reviewers } from "@/data/reviewers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function AdminCaseDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [status, setStatus] = useState<string>("pending")
  const [reviewer, setReviewer] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [comments, setComments] = useState<
    Array<{
      id: string
      reviewer: string
      text: string
      timestamp: string
    }>
  >([])

  // Find the case by ID
  const blightCase = blightCases.find((c) => c.id === id) || blightCases[0]
  const issueNumber = blightCase.id.split("-")[2]

  const handleSaveReview = () => {
    // In a real app, you would save this to a database
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      reviewer: reviewer,
      text: comment,
      timestamp: new Date().toLocaleString(),
    }

    setComments([newComment, ...comments])

    // Update the case status
    toast({
      title: "Review saved",
      description: `Case ${blightCase.id} has been marked as ${status}`,
      duration: 3000,
    })

    // Clear the comment field
    setComment("")
  }

  const getCategoryIcon = () => {
    switch (blightCase.category) {
      case "Abandoned Building":
        return <Home className="w-5 h-5 text-indigo-600" />
      case "Junky Yard":
        return <Trash2 className="w-5 h-5 text-indigo-600" />
      case "Graffiti":
        return <PaintBucket className="w-5 h-5 text-indigo-600" />
      case "Illegal Dumping":
        return <Truck className="w-5 h-5 text-indigo-600" />
      case "Pothole":
        return <Construction className="w-5 h-5 text-indigo-600" />
      default:
        return <MapPin className="w-5 h-5 text-indigo-600" />
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
      case "added":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Added</Badge>
      case "closed":
        return <Badge className="bg-indigo-100 text-gray-800 hover:bg-indigo-100">Added</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Cases
        </Button>
        <h1 className="text-2xl font-bold">Case Review</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Case Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon()}
                    <CardTitle>{blightCase.category}</CardTitle>
                    {getStatusBadge(blightCase.status)}
                  </div>
                  <p className="text-sm text-gray-500">Case ID: {issueNumber}</p>
                </div>
                <div className="bg-indigo-100 text-indigo-800 font-bold text-lg p-2 rounded-lg">
                  +{blightCase.points} pts
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 mb-4 rounded-md overflow-hidden">
                <Image
                  src={blightCase.images[0] || "/placeholder.svg?height=300&width=400"}
                  alt={`Case image`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Submitted:</span>
                    <span className="text-sm">{blightCase.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Submitted by:</span>
                    <span className="text-sm">Mayor Young</span>
                    <span className="text-sm">({blightCase.id})</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{blightCase.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Organization:</span>
                    <span className="text-sm">{blightCase.organization}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Description:</h3>
                <p className="text-sm text-gray-600">{blightCase.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Location Details:</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <p>Latitude: {blightCase.latitude.toFixed(5)}</p>
                  <p>Longitude: {blightCase.longitude.toFixed(5)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Panel */}
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Review Decision</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer</label>
                  <Select value={reviewer} onValueChange={setReviewer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewers.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.name} - {r.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Approve
                        </div>
                      </SelectItem>
                      <SelectItem value="pending">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-amber-500 mr-2" />
                          Keep Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="revision">
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                          Request Revision
                        </div>
                      </SelectItem>
                      <SelectItem value="added">
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 text-indigo-500 mr-2" />
                          Case Added
                        </div>
                      </SelectItem>
                      <SelectItem value="closed">
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                          Case Closed
                        </div>
                      </SelectItem>

                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                  <Textarea
                    placeholder="Add your review comments here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveReview} disabled={!reviewer || !comment}>
                Save Review
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Review History</CardTitle>
            </CardHeader>
            <CardContent>
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((c) => {
                    const reviewer = reviewers.find((r) => r.id === c.reviewer)
                    return (
                      <div key={c.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={reviewer?.avatar || "/placeholder.svg?height=32&width=32"} />
                            <AvatarFallback>
                              {reviewer?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("") || "RV"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{reviewer?.name || "Reviewer"}</p>
                              <p className="text-xs text-gray-500">{c.timestamp}</p>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{c.text}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No review comments yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

