"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Database, Globe, Palette, Save, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "MyPort 901 Admin",
    siteDescription: "Administrative portal for MyPort 901 blight management system",
    contactEmail: "admin@myport901.gov",
    supportPhone: "(205) 555-0100",
    timezone: "America/Chicago",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    caseUpdates: true,
    userRegistrations: true,
    systemAlerts: true,
    dailyDigest: false,
    weeklyReport: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiration: "90",
    passwordMinLength: "8",
    passwordComplexity: "medium",
    twoFactorAuth: true,
    sessionTimeout: "30",
    loginAttempts: "5",
  })

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    primaryColor: "indigo",
    accentColor: "amber",
    fontSize: "medium",
    density: "comfortable",
  })

  const handleSaveSettings = (settingType: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: `${settingType} settings have been updated successfully.`,
        duration: 3000,
      })
    }, 1000)
  }

  const handleResetSettings = (settingType: string) => {
    // In a real app, this would reset to default values
    toast({
      title: "Settings reset",
      description: `${settingType} settings have been reset to defaults.`,
      duration: 3000,
    })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <Badge variant="outline" className="text-xs">
          Version 1.0.5
        </Badge>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-6">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger
                value="general"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:bg-muted"
              >
                <Settings className="w-4 h-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:bg-muted"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:bg-muted"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:bg-muted"
              >
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="database"
                className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:bg-muted"
              >
                <Database className="w-4 h-4 mr-2" />
                Database
              </TabsTrigger>
              <TabsTrigger value="api" className="justify-start px-3 py-2 h-9 font-normal data-[state=active]:bg-muted">
                <Globe className="w-4 h-4 mr-2" />
                API
              </TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-sm">System Status</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-green-600">Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Uptime</span>
                    <span className="font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Backup</span>
                    <span className="font-medium">Today, 3:45 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Server Load</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <TabsContent value="general" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure basic system settings and information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="siteName" className="text-sm font-medium">
                        Site Name
                      </label>
                      <Input
                        id="siteName"
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contactEmail" className="text-sm font-medium">
                        Contact Email
                      </label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={generalSettings.contactEmail}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="siteDescription" className="text-sm font-medium">
                      Site Description
                    </label>
                    <Textarea
                      id="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="supportPhone" className="text-sm font-medium">
                        Support Phone
                      </label>
                      <Input
                        id="supportPhone"
                        value={generalSettings.supportPhone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="timezone" className="text-sm font-medium">
                        Timezone
                      </label>
                      <Select
                        value={generalSettings.timezone}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="dateFormat" className="text-sm font-medium">
                        Date Format
                      </label>
                      <Select
                        value={generalSettings.dateFormat}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="timeFormat" className="text-sm font-medium">
                        Time Format
                      </label>
                      <Select
                        value={generalSettings.timeFormat}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, timeFormat: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleResetSettings("General")}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleSaveSettings("General")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when notifications are sent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Enable Email Notifications</label>
                          <p className="text-xs text-gray-500">Send email notifications for system events</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications: checked,
                            })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Case Updates</label>
                          <p className="text-xs text-gray-500">Notify when cases are updated or status changes</p>
                        </div>
                        <Switch
                          checked={notificationSettings.caseUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              caseUpdates: checked,
                            })
                          }
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">User Registrations</label>
                          <p className="text-xs text-gray-500">Notify when new users register or are added</p>
                        </div>
                        <Switch
                          checked={notificationSettings.userRegistrations}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              userRegistrations: checked,
                            })
                          }
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">System Alerts</label>
                          <p className="text-xs text-gray-500">Notify for important system events and errors</p>
                        </div>
                        <Switch
                          checked={notificationSettings.systemAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              systemAlerts: checked,
                            })
                          }
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Digest & Reports</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Daily Digest</label>
                          <p className="text-xs text-gray-500">Send a daily summary of all activity</p>
                        </div>
                        <Switch
                          checked={notificationSettings.dailyDigest}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              dailyDigest: checked,
                            })
                          }
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Weekly Report</label>
                          <p className="text-xs text-gray-500">Send a weekly summary with statistics and trends</p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReport}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              weeklyReport: checked,
                            })
                          }
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="fromEmail" className="text-sm font-medium">
                          From Email
                        </label>
                        <Input
                          id="fromEmail"
                          type="email"
                          defaultValue="notifications@myport901.gov"
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="replyToEmail" className="text-sm font-medium">
                          Reply-To Email
                        </label>
                        <Input
                          id="replyToEmail"
                          type="email"
                          defaultValue="support@myport901.gov"
                          disabled={!notificationSettings.emailNotifications}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleResetSettings("Notification")}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleSaveSettings("Notification")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="passwordExpiration" className="text-sm font-medium">
                          Password Expiration (days)
                        </label>
                        <Input
                          id="passwordExpiration"
                          type="number"
                          value={securitySettings.passwordExpiration}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              passwordExpiration: e.target.value,
                            })
                          }
                        />
                        <p className="text-xs text-gray-500">Set to 0 for no expiration</p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="passwordMinLength" className="text-sm font-medium">
                          Minimum Password Length
                        </label>
                        <Input
                          id="passwordMinLength"
                          type="number"
                          value={securitySettings.passwordMinLength}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              passwordMinLength: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="passwordComplexity" className="text-sm font-medium">
                        Password Complexity
                      </label>
                      <Select
                        value={securitySettings.passwordComplexity}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            passwordComplexity: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (letters only)</SelectItem>
                          <SelectItem value="medium">Medium (letters + numbers)</SelectItem>
                          <SelectItem value="high">High (letters, numbers, symbols)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Two-Factor Authentication</label>
                        <p className="text-xs text-gray-500">Require two-factor authentication for all users</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: checked,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="sessionTimeout" className="text-sm font-medium">
                          Session Timeout (minutes)
                        </label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              sessionTimeout: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="loginAttempts" className="text-sm font-medium">
                          Max Login Attempts
                        </label>
                        <Input
                          id="loginAttempts"
                          type="number"
                          value={securitySettings.loginAttempts}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              loginAttempts: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleResetSettings("Security")}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleSaveSettings("Security")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of the admin interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="theme" className="text-sm font-medium">
                        Theme
                      </label>
                      <Select
                        value={appearanceSettings.theme}
                        onValueChange={(value) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            theme: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="primaryColor" className="text-sm font-medium">
                        Primary Color
                      </label>
                      <Select
                        value={appearanceSettings.primaryColor}
                        onValueChange={(value) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            primaryColor: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indigo">Indigo</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="accentColor" className="text-sm font-medium">
                        Accent Color
                      </label>
                      <Select
                        value={appearanceSettings.accentColor}
                        onValueChange={(value) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            accentColor: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="amber">Amber</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="pink">Pink</SelectItem>
                          <SelectItem value="cyan">Cyan</SelectItem>
                          <SelectItem value="lime">Lime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="fontSize" className="text-sm font-medium">
                        Font Size
                      </label>
                      <Select
                        value={appearanceSettings.fontSize}
                        onValueChange={(value) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            fontSize: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="density" className="text-sm font-medium">
                      Interface Density
                    </label>
                    <Select
                      value={appearanceSettings.density}
                      onValueChange={(value) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          density: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="text-sm font-medium mb-2">Preview</h3>
                    <div className="flex items-center justify-center p-4 border rounded-md bg-white">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Theme preview would appear here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleResetSettings("Appearance")}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleSaveSettings("Appearance")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Database Settings</CardTitle>
                  <CardDescription>Configure database connections and maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Connection Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="dbHost" className="text-sm font-medium">
                          Database Host
                        </label>
                        <Input id="dbHost" defaultValue="localhost" disabled />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="dbPort" className="text-sm font-medium">
                          Database Port
                        </label>
                        <Input id="dbPort" defaultValue="5432" disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="dbName" className="text-sm font-medium">
                          Database Name
                        </label>
                        <Input id="dbName" defaultValue="myport901_prod" disabled />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="dbUser" className="text-sm font-medium">
                          Database User
                        </label>
                        <Input id="dbUser" defaultValue="myport_admin" disabled />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Backup & Maintenance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="backupSchedule" className="text-sm font-medium">
                          Backup Schedule
                        </label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue placeholder="Select schedule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="backupRetention" className="text-sm font-medium">
                          Backup Retention (days)
                        </label>
                        <Input id="backupRetention" type="number" defaultValue="30" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Automatic Optimization</label>
                        <p className="text-xs text-gray-500">Automatically optimize database performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Run Manual Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Optimize Database
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleResetSettings("Database")}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleSaveSettings("Database")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>Configure API access and integration settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">API Access</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Enable API Access</label>
                        <p className="text-xs text-gray-500">Allow external applications to access the API</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">API Key</h4>
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                      <div className="flex">
                        <Input value="sk_live_51NzQpTGk8MzHk9Uj7tVz6TWzT..." readOnly className="font-mono text-xs" />
                        <Button variant="ghost" size="sm" className="ml-2">
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Keep this key secret. You can regenerate it at any time.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Rate Limiting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="rateLimit" className="text-sm font-medium">
                          Rate Limit (requests per minute)
                        </label>
                        <Input id="rateLimit" type="number" defaultValue="60" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="rateLimitBurst" className="text-sm font-medium">
                          Burst Limit
                        </label>
                        <Input id="rateLimitBurst" type="number" defaultValue="100" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Webhooks</h3>
                    <div className="space-y-2">
                      <label htmlFor="webhookUrl" className="text-sm font-medium">
                        Webhook URL
                      </label>
                      <Input id="webhookUrl" placeholder="https://example.com/webhook" />
                      <p className="text-xs text-gray-500">We'll send POST requests to this URL when events occur</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Webhook Events</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="case.created" />
                          <label
                            htmlFor="case.created"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            case.created
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="case.updated" />
                          <label
                            htmlFor="case.updated"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            case.updated
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="case.deleted" />
                          <label
                            htmlFor="case.deleted"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            case.deleted
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="user.created" />
                          <label
                            htmlFor="user.created"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            user.created
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleResetSettings("API")}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleSaveSettings("API")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

