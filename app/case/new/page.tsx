"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Camera, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function NewCasePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([])
  const [location, setLocation] = useState({ latitude: 33.5186, longitude: -86.8104 })
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleAddImage = () => {
    // In a real app, this would open the camera or file picker
    // For this MVP, we'll just add a placeholder image
    setImages([...images, "/placeholder.svg?height=300&width=400"])
  }

  const generateCaseNumber = () => {
    // Generate a random case number for demo purposes
    const randomNum = Math.floor(10000000 + Math.random() * 90000000)
    return `M-M-${randomNum}`
  }

  const handleSubmit = () => {
    // Generate a case number
    const caseNumber = generateCaseNumber()

    // Show toast notification
    toast({
      title: "Thank you for your submission!",
      description: (
        <div className="mt-2">
          <p>Your case has been submitted successfully.</p>
          <p className="font-medium mt-1">Case Number: {caseNumber}</p>
          <p className="text-xs mt-2">You can track the status in your profile.</p>
        </div>
      ),
      duration: 5000,
    })

    // In a real app, you would submit the form data to an API
    // Redirect directly to the map page instead of the confirmation page
    router.push("/map")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Report New Case</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junky-yard">Junky Yard</SelectItem>
                    <SelectItem value="abandoned-building">Abandoned Building</SelectItem>
                    <SelectItem value="graffiti">Graffiti</SelectItem>
                    <SelectItem value="illegal-dumping">Illegal Dumping</SelectItem>
                    <SelectItem value="pothole">Pothole</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  placeholder="Describe the issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">
                    {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Your current location is being used. Tap to change.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Photos:</h3>
          {category && category !== "other" && (
            <p className="text-xs text-red-500 mb-2">* Required for this category</p>
          )}
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative h-32 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Case image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center border-dashed"
              onClick={handleAddImage}
            >
              <Camera className="w-6 h-6 mb-1" />
              <span>Add Photo</span>
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
          onClick={handleSubmit}
          disabled={!category || !description || (category !== "other" && images.length === 0)}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

