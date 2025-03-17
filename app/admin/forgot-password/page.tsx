"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success state
    setIsSubmitted(true)
    setIsLoading(false)

    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions",
      duration: 5000,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-indigo-600"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            MyPort <span className="text-indigo-600">901</span> <span className="text-sm font-normal">Admin</span>
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>

          {isSubmitted ? (
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-1 text-lg font-medium">Check your email</h3>
                <p className="text-sm text-gray-500">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading || !email}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>

        <div className="mt-4 text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

