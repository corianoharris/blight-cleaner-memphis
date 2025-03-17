export interface Reviewer {
  id: string
  name: string
  department: string
  avatar?: string
  status: "online" | "offline"
  casesReviewed: number
}

export const reviewers: Reviewer[] = [
  {
    id: "rev-001",
    name: "Sarah Johnson",
    department: "Environmental Protection",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    casesReviewed: 12,
  },
  {
    id: "rev-002",
    name: "Michael Chen",
    department: "Urban Development",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    casesReviewed: 8,
  },
  {
    id: "rev-003",
    name: "Aisha Patel",
    department: "City Beautification",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    casesReviewed: 5,
  },
  {
    id: "rev-004",
    name: "Robert Wilson",
    department: "Road Maintenance",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    casesReviewed: 10,
  },
  {
    id: "rev-005",
    name: "Elena Rodriguez",
    department: "Clean City Initiative",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    casesReviewed: 7,
  },
  {
    id: "rev-006",
    name: "James Thompson",
    department: "Environmental Protection",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    casesReviewed: 9,
  },
  {
    id: "rev-007",
    name: "Olivia Washington",
    department: "Urban Development",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    casesReviewed: 6,
  },
]

