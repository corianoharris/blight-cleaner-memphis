"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "lucide-react"

interface BlightCase {
  id: string
  category: string
  latitude: number
  longitude: number
  points: number
}

interface CaseTooltipProps {
  blightCase: BlightCase
  onClose: () => void
  onViewDetails: () => void
}

export function CaseTooltip({ blightCase, onClose, onViewDetails }: CaseTooltipProps) {
  return (
    <div className="absolute bottom-20 left-0 right-0 mx-auto w-full max-w-sm px-4">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Case ID: {blightCase.id}</h3>
              <p className="text-sm text-gray-500">Case category: {blightCase.category}</p>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-500">Latitude: {blightCase.latitude.toFixed(5)}</p>
                <p className="text-sm text-gray-500 ml-2">Longitude: {blightCase.longitude.toFixed(5)}</p>
              </div>
            </div>
            <div className="text-indigo-600 font-bold text-lg">+{blightCase.points}</div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={onViewDetails}>
              View Details
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="mt-2 w-full flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" />
            <span>Take me there</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

