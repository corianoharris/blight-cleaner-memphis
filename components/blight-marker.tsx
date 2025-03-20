"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Home, Trash2, PaintBucket, Truck, Construction } from "lucide-react"
import { useRouter } from "next/navigation"
import { BlightCase } from "../data/blight-cases"

interface BlightMarkerProps {
  blightCase: BlightCase
  isVisited: boolean
  onVisit: (id: string) => void
}

export function BlightMarker({ blightCase, isVisited, onVisit }: BlightMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  // In a real app, you would position this based on actual coordinates
  // For this MVP, we'll use fixed positioning based on the ID to ensure they don't move
  const positionId = Number.parseInt(blightCase.id.split("-")[2]) % 100
  const style = {
    position: "absolute",
    left: `${30 + (positionId % 10) * 4}%`,
    top: `${30 + Math.floor(positionId / 10) * 4}%`,
    transform: "translate(-50%, -50%)",
    cursor: isPendingOrVisited() ? "default" : "pointer",
    zIndex: isHovered ? 2 : 1,
  } as React.CSSProperties

  // Update the isPendingOrVisited function to only check for pending status
  function isPendingOrVisited() {
    return blightCase.status === "pending"
  }

  // Update the getMarkerColor function to only grey out pending pins
  const getMarkerColor = () => {
    if (blightCase.status === "pending") {
      return "text-amber-500"
    }

    if (blightCase.status === "revision") {
      return "text-red-500"
    }

    return "text-indigo-600"
  }

  // Get the appropriate icon based on the blight category
  const getCategoryIcon = () => {
    const iconClass = `w-8 h-8 ${getMarkerColor()}`
    const fillColor = isVisited
      ? "rgba(156, 163, 175, 0.2)"
      : isHovered
        ? "rgba(79, 70, 229, 0.2)"
        : "rgba(79, 70, 229, 0.1)"

    switch (blightCase.category) {
      case "Abandoned Building":
        return <Home className={iconClass} fill={fillColor} />
      case "Junky Yard":
        return <Trash2 className={iconClass} fill={fillColor} />
      case "Graffiti":
        return <PaintBucket className={iconClass} fill={fillColor} />
      case "Illegal Dumping":
        return <Truck className={iconClass} fill={fillColor} />
      case "Pothole":
        return <Construction className={iconClass} fill={fillColor} />
      default:
        return <MapPin className={iconClass} fill={fillColor} />
    }
  }

  const handleClick = () => {
    if (blightCase.status !== "pending") {
      onVisit(blightCase.id)
      router.push(`/case/${blightCase.id}`)
    }
  }

  return (
    <div
      style={style}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getCategoryIcon()}

      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-lg p-2 text-sm z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{blightCase.category}</p>
              <p className="text-xs text-gray-500">Issue #{blightCase.id.split("-")[2]}</p>
              <p className="text-xs text-gray-500">Status: {blightCase.status}</p>
              <p className="text-xs text-gray-500">Org: {blightCase.organization}</p>
            </div>
            <div className="text-indigo-600 font-bold">+{blightCase.points}</div>
          </div>
          {blightCase.status === "pending" ? (
            <p className="text-xs text-amber-500 mt-1">Under review - cannot be claimed</p>
          ) : (
            <p className="text-xs text-green-500 mt-1">Available - click to claim</p>
          )}
        </div>
      )}
    </div>
  )
}

