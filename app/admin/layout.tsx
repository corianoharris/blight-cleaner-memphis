"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, ClipboardList, Users, Settings, LogOut, Menu, X, Building, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if the user is on the login or forgot password page
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password"

  // Simple auth check - in a real app, this would verify a token or session
  useEffect(() => {
    // For demo purposes, we'll just check if we're on an auth page
    // In a real app, you would verify authentication status here
    if (!isAuthPage) {
      // Simulate checking auth status
      const checkAuth = async () => {
        // This is just for demo purposes
        // In a real app, you would check if the user is authenticated
        const fakeAuthCheck = localStorage.getItem("adminAuthenticated") === "true"

        if (!fakeAuthCheck && !isAuthPage) {
          router.push("/admin/login")
        } else {
          setIsAuthenticated(fakeAuthCheck)
        }
      }

      checkAuth()
    }
  }, [pathname, isAuthPage, router])

  // If on login or forgot password page, just render the children
  if (isAuthPage) {
    return <>{children}</>
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Cases",
      href: "/admin/cases",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      name: "Organizations",
      href: "/admin/organizations",
      icon: <Building className="w-5 h-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  const handleLogout = () => {
    // In a real app, you would clear the auth token or session
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 z-40 lg:hidden">
        <Button variant="ghost" size="icon" className="m-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/admin" className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-indigo-600"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="ml-2 text-lg font-bold">
              MyPort <span className="text-indigo-600">901</span> <span className="text-xs font-normal">Admin</span>
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-4 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md group",
                  pathname === item.href ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <span
                  className={cn(
                    "mr-3",
                    pathname === item.href ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-600",
                  )}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="flex items-center px-3 py-2 mb-4">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@myport901.gov</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

