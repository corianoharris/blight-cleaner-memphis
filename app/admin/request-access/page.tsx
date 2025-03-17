"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function RequestAccessPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "Thanks! Your request will be reviewed shortly.",
      })
      setIsLoading(false)
      router.push("/admin/login")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            MyPort <span className="text-indigo-600">901</span> <span className="text-sm font-normal">Admin</span>
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Administrative Access</CardTitle>
            <CardDescription>Fill out this form to request access to the admin portal</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="John Doe" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="organization" className="text-sm font-medium">
                  Organization
                </label>
                <Input id="organization" placeholder="City of Memphis" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason for Access
                </label>
                <textarea
                  id="reason"
                  className="w-full min-h-[100px] rounded-md border border-gray-300 p-2 text-sm"
                  placeholder="Please explain why you need access to the administrative portal"
                  required
                ></textarea>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm font-medium leading-none">
                  I agree to the terms of service and privacy policy
                </label>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Request"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <Link href="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

