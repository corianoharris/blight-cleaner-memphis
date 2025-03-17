"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative">
      <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2 bg-white shadow-md rounded-md" />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  )
}

