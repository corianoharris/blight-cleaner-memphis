"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VerificationPage() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    // In a real app, you would verify the code with an API
    // For this MVP, we'll just navigate to the map page
    router.push("/map")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Verification</h1>
          <p className="mt-2 text-sm text-gray-600">A 4-digit code was sent to your email. Please enter it below.</p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3].map((index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-xl text-center"
                value={code[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <div className="mt-6">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg" onClick={handleVerify}>
              Verify
            </Button>
          </div>

          <div className="mt-4">
            <Button variant="outline" className="w-full" size="lg">
              Resend Code
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive a code?{" "}
            <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

