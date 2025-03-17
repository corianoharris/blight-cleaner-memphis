"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo purposes
    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    // Demo credentials check
    if (email === "admin@myport901.gov" && password === "admin123") {
      // Set authentication in localStorage
      localStorage.setItem("adminAuthenticated", "true")

      toast({
        title: "Login successful",
        description: "Welcome to MyPort 901 Admin Portal",
        duration: 3000,
      })

      // Add a small delay to ensure localStorage is set before redirect
      setTimeout(() => {
        router.push("/admin")
      }, 100)
    } else {
      setError("Invalid email or password")
      setIsLoading(false)
    }
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
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin portal</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-red-50 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@myport901.gov"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/admin/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Need an admin account?{" "}
            <Link href="/admin/request-access" className="font-medium text-indigo-600 hover:text-indigo-500">
              Request access
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Not an administrator?{" "}
            <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Return to main app
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>For demo purposes, use:</p>
          <p>Email: admin@myport901.gov</p>
          <p>Password: admin123</p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>For donor login, use:</p>
          <p>Email: donor@myport901.com</p>
          <p>Password: donor123</p>
        </div>
      </div>
    </div>
  )
}

