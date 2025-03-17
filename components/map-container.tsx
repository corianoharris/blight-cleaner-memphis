"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface MapContainerProps {
  children: ReactNode
}

export function MapContainer({ children }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, you would initialize a map library like Google Maps or Mapbox here
    // For this MVP, we'll just use a static map image
    const loadMap = async () => {
      if (mapRef.current) {
        // Set background image to a map of Birmingham
        mapRef.current.style.backgroundImage =
          "url('https://maps.googleapis.com/maps/api/staticmap?center=Birmingham,AL&zoom=13&size=600x600&scale=2&maptype=roadmap')"
        mapRef.current.style.backgroundSize = "cover"
        mapRef.current.style.backgroundPosition = "center"
      }
    }

    loadMap()
  }, [])

  return (
    <div ref={mapRef} className="flex-1 w-full h-full bg-gray-200 relative">
      {children}
    </div>
  )
}

