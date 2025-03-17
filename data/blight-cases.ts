export interface BlightCase {
  id: string
  category: string
  latitude: number
  longitude: number
  points: number
  description: string
  images: string[]
  status: "approved" | "pending" | "revision"
  createdAt: string
  area: string
  organization: string
}

export const blightCases: BlightCase[] = [
  {
    id: "M-M-23456789",
    category: "Junky Yard",
    latitude: 33.5186,
    longitude: -86.8104,
    points: 25,
    description:
      "Abandoned property with overgrown vegetation and accumulated trash in the yard. Several broken appliances visible from the street.",
    images: ["/placeholder.svg?height=300&width=400"],
    status: "approved",
    createdAt: "2023-11-15",
    area: "Downtown",
    organization: "Clean City Initiative",
  },
  {
    id: "M-M-23456790",
    category: "Abandoned Building",
    latitude: 33.5176,
    longitude: -86.8124,
    points: 30,
    description: "Vacant building with broken windows and structural damage. Appears to be a safety hazard.",
    images: ["/placeholder.svg?height=300&width=400"],
    status: "pending",
    createdAt: "2023-11-18",
    area: "Southside",
    organization: "Urban Development",
  },
  {
    id: "M-M-23456791",
    category: "Illegal Dumping",
    latitude: 33.5196,
    longitude: -86.8084,
    points: 20,
    description:
      "Large pile of construction debris dumped on vacant lot. Includes broken concrete, wood, and metal scraps.",
    images: ["/placeholder.svg?height=300&width=400"],
    status: "revision",
    createdAt: "2023-11-20",
    area: "Northside",
    organization: "Environmental Protection",
  },
  {
    id: "M-M-23456792",
    category: "Graffiti",
    latitude: 33.5166,
    longitude: -86.8114,
    points: 15,
    description: "Extensive graffiti on public building wall. Approximately 10 feet wide and 6 feet tall.",
    images: ["/placeholder.svg?height=300&width=400"],
    status: "approved",
    createdAt: "2023-11-22",
    area: "Downtown",
    organization: "City Beautification",
  },
  {
    id: "M-M-23456793",
    category: "Pothole",
    latitude: 33.5156,
    longitude: -86.8134,
    points: 10,
    description:
      "Large pothole in residential street, approximately 2 feet in diameter and 6 inches deep. Causing traffic hazard.",
    images: ["/placeholder.svg?height=300&width=400"],
    status: "approved",
    createdAt: "2023-11-25",
    area: "Eastside",
    organization: "Road Maintenance",
  },
]

