"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    role: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))

    // Clear error when user checks
    if (errors.agreeTerms) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.agreeTerms
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.organization) {
      newErrors.organization = "Organization is required"
    }

    if (!formData.role) {
      newErrors.role = "Role is required"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just show a success message and redirect
    toast({
      title: "Account request submitted",
      description: "Your request will be reviewed by an administrator.",
      duration: 5000,
    })

    setIsLoading(false)
    router.push("/admin/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg">
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
            <CardTitle>Request Admin Access</CardTitle>
            <CardDescription>
              Fill out this form to request administrative access to the MyPort 901 platform
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-red-50 text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Please correct the errors in the form</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@organization.gov"
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="organization" className="text-sm font-medium">
                  Organization
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="City of Memphis"
                    className={`pl-10 ${errors.organization ? "border-red-500" : ""}`}
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
                {errors.organization && <p className="text-xs text-red-500">{errors.organization}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="reviewer">Case Reviewer</SelectItem>
                    <SelectItem value="manager">Department Manager</SelectItem>
                    <SelectItem value="analyst">Data Analyst</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
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
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={handleCheckboxChange}
                  className={errors.agreeTerms ? "border-red-500" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-500">
                      terms and conditions
                    </Link>
                  </label>
                  {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Submitting request..." : "Submit request"}
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

