"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Edit, Trash2, UserPlus, Shield, Key, AlertCircle, CheckCircle, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample user data
const users = [
  {
    id: "user-001",
    name: "Admin User",
    email: "admin@myport901.gov",
    role: "Administrator",
    department: "IT Department",
    status: "active",
    lastLogin: "2023-11-28 09:15 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@myport901.gov",
    role: "Reviewer",
    department: "Environmental Protection",
    status: "active",
    lastLogin: "2023-11-28 10:30 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-003",
    name: "Michael Chen",
    email: "michael.chen@myport901.gov",
    role: "Reviewer",
    department: "Urban Development",
    status: "active",
    lastLogin: "2023-11-27 03:45 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-004",
    name: "Aisha Patel",
    email: "aisha.patel@myport901.gov",
    role: "Reviewer",
    department: "City Beautification",
    status: "inactive",
    lastLogin: "2023-11-20 11:20 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-005",
    name: "Robert Wilson",
    email: "robert.wilson@myport901.gov",
    role: "Viewer",
    department: "Road Maintenance",
    status: "active",
    lastLogin: "2023-11-28 08:05 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-006",
    name: "Elena Rodriguez",
    email: "elena.rodriguez@myport901.gov",
    role: "Viewer",
    department: "Clean City Initiative",
    status: "active",
    lastLogin: "2023-11-27 01:15 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Sample departments
const departments = [
  "IT Department",
  "Environmental Protection",
  "Urban Development",
  "City Beautification",
  "Road Maintenance",
  "Clean City Initiative",
]

// Sample roles with permissions
const roles = [
  {
    name: "Administrator",
    permissions: [
      "View all cases",
      "Edit all cases",
      "Manage organizations",
      "Manage users",
      "View reports",
      "System settings",
    ],
  },
  {
    name: "Reviewer",
    permissions: ["View all cases", "Edit assigned cases", "View reports"],
  },
  {
    name: "Viewer",
    permissions: ["View all cases", "View reports"],
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [selectedUserId, setSelectedUserId] = useState("")

  // Form state for new/edit user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    department: "",
    status: "active",
    password: "",
    confirmPassword: "",
  })

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddOrEdit = () => {
    // In a real app, this would save to a database
    toast({
      title: editingUser ? "User updated" : "User added",
      description: `${formData.name} has been ${editingUser ? "updated" : "added"} successfully.`,
      duration: 3000,
    })

    // Reset form and close dialog
    setFormData({
      name: "",
      email: "",
      role: "Viewer",
      department: "",
      status: "active",
      password: "",
      confirmPassword: "",
    })
    setEditingUser(null)
    setShowAddDialog(false)
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      password: "",
      confirmPassword: "",
    })
    setShowAddDialog(true)
  }

  const handleResetPassword = (userId: string) => {
    setSelectedUserId(userId)
    setShowResetPasswordDialog(true)
  }

  const handleResetPasswordSubmit = () => {
    // In a real app, this would reset the password
    toast({
      title: "Password reset",
      description: "A password reset link has been sent to the user's email.",
      duration: 3000,
    })
    setShowResetPasswordDialog(false)
  }

  const handleDelete = (userId: string) => {
    // In a real app, this would delete from a database
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
      duration: 3000,
    })
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogDescription>
                  {editingUser ? "Update the user details below." : "Fill in the details to add a new user."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@myport901.gov"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.name} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">
                      Department
                    </label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {!editingUser && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleAddOrEdit}>
                  {editingUser ? "Save Changes" : "Add User"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === "Administrator"
                              ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                              : user.role === "Reviewer"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(user)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleResetPassword(user.id)}
                          >
                            <Key className="h-4 w-4" />
                            <span className="sr-only">Reset Password</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-600" />
              <CardTitle>User Roles</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.name} className="space-y-2">
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm text-gray-500">
                    <ul className="list-disc pl-5 space-y-1">
                      {role.permissions.map((permission, index) => (
                        <li key={index}>{permission}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              <CardTitle>Users by Department</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => {
                const count = users.filter((user) => user.department === dept).length
                return (
                  <div key={dept} className="flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{dept}</span>
                        <span className="text-sm text-gray-500">{count} users</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-indigo-600 rounded-full"
                          style={{ width: `${(count / users.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
              <CardTitle>User Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Active</span>
                    <span className="text-sm text-gray-500">
                      {users.filter((user) => user.status === "active").length} users
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{
                        width: `${(users.filter((user) => user.status === "active").length / users.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Inactive</span>
                    <span className="text-sm text-gray-500">
                      {users.filter((user) => user.status === "inactive").length} users
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-gray-500 rounded-full"
                      style={{
                        width: `${(users.filter((user) => user.status === "inactive").length / users.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset Password Dialog */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Send a password reset link to the user's email address.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-amber-50 text-amber-600 mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>This will invalidate the user's current password.</span>
            </div>
            <p className="text-sm text-gray-500">
              Are you sure you want to reset the password for this user? They will receive an email with instructions to
              set a new password.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleResetPasswordSubmit}>
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

