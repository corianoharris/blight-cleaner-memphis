"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Navigation,
  Share2,
  Award,
  Building,
  AlertTriangle,
  Info,
  Home,
  Trash2,
  PaintBucket,
  Truck,
  Construction,
  Edit,
} from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { blightCases } from "@/data/blight-cases"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function CaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [revisionNotes, setRevisionNotes] = useState("")
  const { id } = useParams()

  // Find the case by ID
  const blightCase = blightCases.find((c) => c.id === id) || blightCases[0]
  const issueNumber = blightCase.id.split("-")[2]
  const isPending = blightCase.status === "pending"
  const needsRevision = blightCase.status === "revision"

  // Get safety tips based on category
  const getSafetyTips = (category: string) => {
    switch (category) {
      case "Junky Yard":
        return [
          "Wear gloves and protective clothing when handling debris",
          "Separate recyclables from general waste",
          "Be cautious of sharp objects like broken glass or metal",
          "Consider renting a dumpster for large cleanups",
          "Check local regulations for proper disposal of appliances",
        ]
      case "Abandoned Building":
        return [
          "Never enter an unstable structure",
          "Report structural hazards to local authorities",
          "Secure the perimeter to prevent unauthorized access",
          "Remove overgrown vegetation around the building",
          "Contact a professional for asbestos or lead paint concerns",
        ]
      case "Illegal Dumping":
        return [
          "Don't handle hazardous materials (chemicals, batteries, etc.)",
          "Document the site before cleanup for reporting purposes",
          "Use heavy-duty trash bags for collection",
          "Organize a community cleanup event for larger areas",
          "Report to environmental authorities if hazardous waste is present",
        ]
      case "Graffiti":
        return [
          "Test cleaning solutions on a small area first",
          "Use appropriate solvents based on the surface material",
          "Wear respiratory protection when using chemical removers",
          "Pressure washing works well for most surfaces",
          "Consider applying anti-graffiti coating after cleanup",
        ]
      default:
        return [
          "Always wear appropriate protective equipment",
          "Work with neighbors to share cleanup responsibilities",
          "Contact local authorities for guidance on proper disposal",
          "Take before and after photos to document improvement",
          "Consider organizing a community cleanup day",
        ]
    }
  }

  const safetyTips = getSafetyTips(blightCase.category)

  // Get revision instructions based on category
  const getRevisionInstructions = () => {
    switch (blightCase.category) {
      case "Junky Yard":
        return [
          "Take clearer photos showing the full extent of the yard",
          "Provide specific details about any hazardous materials present",
          "Include information about property ownership if available",
          "Estimate the approximate size of the affected area",
          "Note any immediate safety concerns for neighbors",
        ]
      case "Abandoned Building":
        return [
          "Take photos of all sides of the building",
          "Document any visible structural damage",
          "Note if there are signs of recent activity or trespassing",
          "Check if doors and windows are properly secured",
          "Provide information about nearby occupied buildings",
        ]
      case "Illegal Dumping":
        return [
          "Take photos that show the scale of the dumping",
          "Document any identifying information found in the waste",
          "Note if this is a recurring issue at this location",
          "Estimate the volume of waste (truck loads, cubic yards, etc.)",
          "Identify any hazardous materials visible in the dump",
        ]
      case "Graffiti":
        return [
          "Take close-up photos of the graffiti content",
          "Document the full area affected",
          "Note the type of surface that has been vandalized",
          "Check if the graffiti contains offensive content or gang symbols",
          "Estimate how long the graffiti has been present",
        ]
      default:
        return [
          "Provide clearer photos of the issue",
          "Add more specific details about the location",
          "Include information about how long the issue has existed",
          "Document any attempts to address the issue previously",
          "Note any immediate safety concerns",
        ]
    }
  }

  const revisionInstructions = getRevisionInstructions()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold">Blight Issue</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Card className="mb-4 overflow-hidden border-0 shadow-md">
          <div className="relative h-48">
            <Image
              src={blightCase.images[0] || "/placeholder.svg?height=300&width=400"}
              alt={`Case image`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-indigo-600">
                      <div className="flex items-center gap-1">
                        {blightCase.category === "Abandoned Building" && <Home className="w-3 h-3" />}
                        {blightCase.category === "Junky Yard" && <Trash2 className="w-3 h-3" />}
                        {blightCase.category === "Graffiti" && <PaintBucket className="w-3 h-3" />}
                        {blightCase.category === "Illegal Dumping" && <Truck className="w-3 h-3" />}
                        {blightCase.category === "Pothole" && <Construction className="w-3 h-3" />}
                        {blightCase.category}
                      </div>
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold">Issue #{issueNumber}</h2>
                  <p className="text-sm opacity-90">Case ID: {blightCase.id}</p>
                </div>
                <div className="bg-indigo-600 text-white font-bold text-xl p-2 rounded-lg">+{blightCase.points}</div>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    blightCase.status === "approved"
                      ? "text-green-600 border-green-600"
                      : blightCase.status === "pending"
                        ? "text-amber-600 border-amber-600"
                        : "text-red-600 border-red-600"
                  }
                >
                  {blightCase.status.charAt(0).toUpperCase() + blightCase.status.slice(1)}
                </Badge>
                <p className="text-sm text-gray-500">Reported on {blightCase.createdAt}</p>
              </div>
            </div>

            {isPending && (
              <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-700">This issue is still being reviewed</p>
                    <p className="text-sm text-amber-600">
                      You cannot submit a report for this issue until review is complete.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {needsRevision && (
              <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start gap-2">
                  <Edit className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-700">This report needs revision</p>
                    <p className="text-sm text-red-600 mb-2">
                      Please address the following items to complete your submission:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-red-600 space-y-1">
                      {revisionInstructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-red-700 mb-1">Your Revision Notes:</label>
                  <Textarea
                    placeholder="Describe the changes you've made to address the revision requests..."
                    className="border-red-200 focus:border-red-300"
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <h3 className="text-md font-medium">Blight Organization:</h3>
              </div>
              <p className="text-sm text-gray-600 ml-7">{blightCase.organization}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Description:</h3>
              <p className="text-sm text-gray-600">{blightCase.description}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Location:</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <p>Area: {blightCase.area}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <p>Latitude: {blightCase.latitude.toFixed(5)}</p>
                <p>Longitude: {blightCase.longitude.toFixed(5)}</p>
              </div>
              <Button variant="outline" className="mt-2 w-full flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </Button>
            </div>

            <Accordion type="single" collapsible className="mb-4">
              <AccordionItem value="safety-tips">
                <AccordionTrigger className="text-md font-medium flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                  Safety & Cleanup Tips
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 mt-2 text-sm">
                    {safetyTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-green-600 font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 text-xs">
                        Always prioritize safety. Contact {blightCase.organization} at (205) 555-0123 for professional
                        assistance with hazardous materials.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Completion Progress:</h3>
              <Progress value={75} className="h-2 mb-2" />
              <p className="text-sm text-gray-500 text-center">75% complete</p>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Rewards:</h3>
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg">
                <Award className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="font-medium">Earn {blightCase.points} points</p>
                  <p className="text-sm text-gray-600">Complete this report to earn points</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {id !== "new" && (
          <Button
            className={`w-full shadow-md ${
              isPending ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isPending}
            onClick={() => {
              if (!isPending) {
                // Show toast notification
                const toastMessage = needsRevision
                  ? "Thank you for submitting your revision!"
                  : "Thank you for your report!"

                toast({
                  title: toastMessage,
                  description: (
                    <div className="mt-2">
                      <p>Your submission has been received.</p>
                      <p className="font-medium mt-1">Case Number: {issueNumber}</p>
                      <p className="text-xs mt-2">You can track the status in your profile.</p>
                    </div>
                  ),
                  duration: 5000,
                })

                // Redirect to map page
                router.push("/map")
              }
            }}
          >
            {isPending ? "Awaiting Review" : needsRevision ? "Submit Revision" : "Submit Report"}
          </Button>
        )}
      </div>
    </div>
  )
}

