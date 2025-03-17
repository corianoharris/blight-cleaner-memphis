interface BlightCase {
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

