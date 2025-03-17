"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Logo />
          <h1 className="mt-6 text-2xl font-bold text-center text-gray-900">
            MyPort <span className="text-indigo-600">901</span> <span className="text-sm font-normal">Game</span>
          </h1>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="donor@myport901.com"
              />
            </div>

            <PasswordInput />
          </div>

          <div>
            <Link href="/verification">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                Log In
              </Button>
            </Link>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 p-3 bg-gray-50 rounded-lg mt-4">
        <p>For demo purposes, use:</p>
        <p className="font-medium">Email: donor@myport901.com</p>
        <p className="font-medium">Password: donor123</p>
      </div>
    </div>
  )
}

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div className="relative mt-1">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          className="pr-10"
          placeholder="donor123"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
    </div>
  )
}

