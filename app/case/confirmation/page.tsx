"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const caseNumber = searchParams.get("caseNumber")

  const isRevision = type === "revision"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isRevision ? "Revision submitted successfully!" : "Report submitted successfully!"}
        </h1>
        <p className="text-gray-600 mb-2">
          {isRevision
            ? "Thank you for providing the additional information."
            : "Thank you for helping improve our community."}
        </p>

        {caseNumber && (
          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Your case number:</p>
            <p className="text-xl font-bold text-indigo-600">{caseNumber}</p>
            <p className="text-xs text-gray-500 mt-2">
              Save this number for your reference. You can track the status in your profile.
            </p>
          </div>
        )}

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mb-4" onClick={() => router.push("/map")}>
          Back to Map
        </Button>

        <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
          View My Profile
        </Button>
      </div>
    </div>
  )
}

