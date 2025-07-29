"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Settings, 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Save,
  RefreshCw
} from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = async (section: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic configuration for your HARKA platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="HARKA" />
                </div>
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="HARKA Labs" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea 
                  id="platform-description" 
                  defaultValue="AI der leverer reel forretningsværdi - Transform your organization through comprehensive AI training"
                  className="h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="default-language">Default Language</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="da">Danish</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="Europe/Copenhagen">Europe/Copenhagen</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
              </div>

              <Button onClick={() => handleSave('general')} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : 'Save General Settings'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme across the platform</p>
                </div>
                <Switch id="dark-mode" />
              </div>

              <div>
                <Label htmlFor="brand-color">Primary Brand Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                  <Input defaultValue="#3b82f6" className="flex-1" />
                </div>
              </div>

              <Button onClick={() => handleSave('appearance')} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                Save Appearance
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>Manage your personal account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Sven" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Arnarsson" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="sven@harka.dk" />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself..."
                  className="h-20"
                />
              </div>

              <div>
                <Label htmlFor="profile-image">Profile Image</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <Button variant="outline">Upload New Image</Button>
                </div>
              </div>

              <Button onClick={() => handleSave('account')}>
                <Save className="mr-2 h-4 w-4" />
                Save Account Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Course Completions</Label>
                    <p className="text-sm text-muted-foreground">Notify when students complete courses</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Enrollments</Label>
                    <p className="text-sm text-muted-foreground">Notify when new students enroll</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Important platform updates and maintenance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">Product updates and educational content</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button onClick={() => handleSave('notifications')}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Change Password</Label>
                <div className="space-y-2 mt-2">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button className="mt-2">Update Password</Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <Label>Active Sessions</Label>
                  <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Copenhagen, Denmark • Chrome on macOS</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys & Integrations
              </CardTitle>
              <CardDescription>Manage external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    id="openai-key" 
                    type="password" 
                    placeholder="sk-..." 
                    className="flex-1"
                  />
                  <Button size="sm">Test Connection</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="calendly-url">Calendly URL</Label>
                <Input 
                  id="calendly-url" 
                  defaultValue="https://calendly.com/harka-ai-workshop"
                  placeholder="https://calendly.com/your-link"
                />
              </div>

              <div>
                <Label htmlFor="stripe-key">Stripe API Key</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    id="stripe-key" 
                    type="password" 
                    placeholder="sk_..." 
                    className="flex-1"
                  />
                  <Button size="sm">Test Connection</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="analytics-id">Google Analytics ID</Label>
                <Input 
                  id="analytics-id" 
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>

              <Button onClick={() => handleSave('integrations')}>
                <Save className="mr-2 h-4 w-4" />
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed logging and debugging</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable user behavior tracking</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put platform in maintenance mode</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label>Data Export</Label>
                <p className="text-sm text-muted-foreground mb-4">Export your platform data</p>
                <div className="flex gap-2">
                  <Button variant="outline">
                    Export Users
                  </Button>
                  <Button variant="outline">
                    Export Courses
                  </Button>
                  <Button variant="outline">
                    Export Analytics
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label>Cache Management</Label>
                <p className="text-sm text-muted-foreground mb-4">Clear application cache</p>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear All Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}