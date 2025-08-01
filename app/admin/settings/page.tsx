'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { ErrorBoundary } from '@/components/error/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-states'
import { 
  Settings, 
  Palette,
  Bell, 
  Shield, 
  Database,
  CreditCard,
  Save,
  AlertCircle
} from 'lucide-react'
import type { AdminSettings, GeneralSettings, AppearanceSettings, NotificationSettings, SecuritySettings, SystemSettings } from '@/lib/types/admin'
import { adminApi, useAdminApi } from '@/lib/api/admin-api'
import { sanitizeInput, sanitizeHexColor, sanitizeNumber, sanitizeStringArray } from '@/lib/utils/sanitize'

// Default settings values
const defaultSettings: AdminSettings = {
  general: {
    siteName: 'HARKA Learning Platform',
    siteDescription: 'Advanced learning platform for professionals',
    defaultLanguage: 'en',
    timezone: 'UTC',
    platformName: 'HARKA',
    companyName: 'HARKA Labs'
  },
  appearance: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    darkMode: false
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false,
    courseCompletions: true,
    newEnrollments: true,
    systemUpdates: true,
    marketingCommunications: false
  },
  security: {
    registrationEnabled: true,
    requireEmailVerification: true,
    twoFactorEnabled: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true
    }
  },
  system: {
    maintenanceMode: false,
    maxFileUploadSize: 100,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'mp4', 'mov', 'avi'],
    apiRateLimit: 100,
    sessionTimeout: 60
  }
}

function AdminSettingsContent() {
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  
  // API hooks
  const { execute: fetchSettings, loading: loadingSettings } = useAdminApi(adminApi.getSettings.bind(adminApi))
  const { execute: saveSettings, loading: savingSettings } = useAdminApi(adminApi.updateSettings.bind(adminApi))
  
  // Load settings on mount
  useEffect(() => {
    fetchSettings().then(data => {
      setSettings(data)
    }).catch(error => {
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive'
      })
      // Use defaults if API fails
      setSettings(defaultSettings)
    })
  }, [])

  const updateSettings = <K extends keyof AdminSettings>(
    section: K,
    field: keyof AdminSettings[K],
    value: any
  ) => {
    if (!settings) return

    // Sanitize value based on field type
    let sanitizedValue = value
    
    switch (section) {
      case 'general':
        if (field === 'siteName' || field === 'companyName' || field === 'platformName') {
          sanitizedValue = sanitizeInput(value, { maxLength: 100 })
        } else if (field === 'siteDescription') {
          sanitizedValue = sanitizeInput(value, { maxLength: 500 })
        }
        break
        
      case 'appearance':
        if (field === 'primaryColor' || field === 'secondaryColor') {
          sanitizedValue = sanitizeHexColor(value)
        } else if (field === 'logoUrl' || field === 'faviconUrl') {
          sanitizedValue = sanitizeInput(value, { maxLength: 255 })
        }
        break
        
      case 'system':
        if (field === 'maxFileUploadSize' || field === 'sessionTimeout' || field === 'apiRateLimit') {
          sanitizedValue = sanitizeNumber(value, { min: 1, max: 10000, integer: true })
        } else if (field === 'allowedFileTypes') {
          sanitizedValue = Array.isArray(value) ? sanitizeStringArray(value, {
            maxItems: 50,
            maxItemLength: 10,
            allowedChars: /[a-z0-9]/
          }) : value
        }
        break
        
      case 'security':
        if (field === 'passwordPolicy' && typeof value === 'object') {
          sanitizedValue = {
            ...value,
            minLength: sanitizeNumber(value.minLength || 8, { min: 6, max: 32, integer: true })
          }
        }
        break
    }

    setSettings(prev => ({
      ...prev!,
      [section]: {
        ...prev![section],
        [field]: sanitizedValue
      }
    }))
    
    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[`${section}.${String(field)}`]
      return newErrors
    })
  }

  const validateSettings = (section: keyof AdminSettings): boolean => {
    if (!settings) return false
    
    const newErrors: Record<string, string> = {}

    switch (section) {
      case 'general':
        if (!settings.general.siteName.trim()) {
          newErrors['general.siteName'] = 'Site name is required'
        }
        if (!settings.general.defaultLanguage) {
          newErrors['general.defaultLanguage'] = 'Default language is required'
        }
        break
      
      case 'appearance':
        if (!settings.appearance.primaryColor.match(/^#[0-9A-F]{6}$/i)) {
          newErrors['appearance.primaryColor'] = 'Invalid color format'
        }
        break
      
      case 'system':
        if (settings.system.maxFileUploadSize < 1 || settings.system.maxFileUploadSize > 1000) {
          newErrors['system.maxFileUploadSize'] = 'File size must be between 1 and 1000 MB'
        }
        if (settings.system.sessionTimeout < 5 || settings.system.sessionTimeout > 1440) {
          newErrors['system.sessionTimeout'] = 'Session timeout must be between 5 and 1440 minutes'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async (section: keyof AdminSettings) => {
    if (!settings) return
    
    if (!validateSettings(section)) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving',
        variant: 'destructive'
      })
      return
    }

    try {
      const updatedSettings = await saveSettings(section, settings[section])
      setSettings(updatedSettings)
      
      toast({
        title: 'Settings Saved',
        description: `${section} settings have been updated successfully`
      })
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save settings',
        variant: 'destructive'
      })
    }
  }

  // Show loading state while fetching settings
  if (loadingSettings || !settings) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your platform settings and preferences
          </p>
        </div>
        <LoadingSpinner size="lg" text="Loading settings..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your platform settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic information about your learning platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name *</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => updateSettings('general', 'siteName', e.target.value)}
                    className={errors['general.siteName'] ? 'border-destructive' : ''}
                  />
                  {errors['general.siteName'] && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors['general.siteName']}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language *</Label>
                  <Select 
                    value={settings.general.defaultLanguage}
                    onValueChange={(value) => updateSettings('general', 'defaultLanguage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="da">Danish</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSettings('general', 'siteDescription', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.general.platformName}
                    onChange={(e) => updateSettings('general', 'platformName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSettings('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Copenhagen">Copenhagen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={() => handleSave('general')} 
                disabled={savingSettings || !settings}
              >
                {savingSettings ? <LoadingSpinner size="sm" /> : <Save className="mr-2 h-4 w-4" />}
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColorPicker"
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSettings('appearance', 'primaryColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      id="primaryColor"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSettings('appearance', 'primaryColor', e.target.value)}
                      className={`flex-1 ${errors['appearance.primaryColor'] ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors['appearance.primaryColor'] && (
                    <p className="text-sm text-destructive">{errors['appearance.primaryColor']}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColorPicker"
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => updateSettings('appearance', 'secondaryColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      id="secondaryColor"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => updateSettings('appearance', 'secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark theme across the platform</p>
                </div>
                <Switch
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => updateSettings('appearance', 'darkMode', checked)}
                />
              </div>

              <Button 
                onClick={() => handleSave('appearance')} 
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save className="mr-2 h-4 w-4" />}
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSettings('notifications', 'emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to users</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSettings('notifications', 'pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Completions</Label>
                    <p className="text-sm text-muted-foreground">Notify when students complete courses</p>
                  </div>
                  <Switch
                    checked={settings.notifications.courseCompletions}
                    onCheckedChange={(checked) => updateSettings('notifications', 'courseCompletions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Enrollments</Label>
                    <p className="text-sm text-muted-foreground">Notify when new students enroll</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newEnrollments}
                    onCheckedChange={(checked) => updateSettings('notifications', 'newEnrollments', checked)}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSave('notifications')} 
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save className="mr-2 h-4 w-4" />}
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registration Enabled</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register</p>
                  </div>
                  <Switch
                    checked={settings.security.registrationEnabled}
                    onCheckedChange={(checked) => updateSettings('security', 'registrationEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">Require users to verify their email address</p>
                  </div>
                  <Switch
                    checked={settings.security.requireEmailVerification}
                    onCheckedChange={(checked) => updateSettings('security', 'requireEmailVerification', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorEnabled}
                    onCheckedChange={(checked) => updateSettings('security', 'twoFactorEnabled', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Password Policy</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                    <Input
                      id="minPasswordLength"
                      type="number"
                      min="6"
                      max="32"
                      value={settings.security.passwordPolicy.minLength}
                      onChange={(e) => updateSettings('security', 'passwordPolicy', {
                        ...settings.security.passwordPolicy,
                        minLength: parseInt(e.target.value) || 8
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireUppercase"
                      checked={settings.security.passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) => updateSettings('security', 'passwordPolicy', {
                        ...settings.security.passwordPolicy,
                        requireUppercase: checked
                      })}
                    />
                    <Label htmlFor="requireUppercase">Require uppercase letters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireNumbers"
                      checked={settings.security.passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) => updateSettings('security', 'passwordPolicy', {
                        ...settings.security.passwordPolicy,
                        requireNumbers: checked
                      })}
                    />
                    <Label htmlFor="requireNumbers">Require numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireSymbols"
                      checked={settings.security.passwordPolicy.requireSymbols}
                      onCheckedChange={(checked) => updateSettings('security', 'passwordPolicy', {
                        ...settings.security.passwordPolicy,
                        requireSymbols: checked
                      })}
                    />
                    <Label htmlFor="requireSymbols">Require special characters</Label>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleSave('security')} 
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save className="mr-2 h-4 w-4" />}
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system-level settings and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.system.maintenanceMode}
                  onCheckedChange={(checked) => updateSettings('system', 'maintenanceMode', checked)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                  <Input
                    id="maxFileUploadSize"
                    type="number"
                    min="1"
                    max="1000"
                    value={settings.system.maxFileUploadSize}
                    onChange={(e) => updateSettings('system', 'maxFileUploadSize', parseInt(e.target.value) || 100)}
                    className={errors['system.maxFileUploadSize'] ? 'border-destructive' : ''}
                  />
                  {errors['system.maxFileUploadSize'] && (
                    <p className="text-sm text-destructive">{errors['system.maxFileUploadSize']}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.system.sessionTimeout}
                    onChange={(e) => updateSettings('system', 'sessionTimeout', parseInt(e.target.value) || 60)}
                    className={errors['system.sessionTimeout'] ? 'border-destructive' : ''}
                  />
                  {errors['system.sessionTimeout'] && (
                    <p className="text-sm text-destructive">{errors['system.sessionTimeout']}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.system.allowedFileTypes.join(', ')}
                  onChange={(e) => updateSettings('system', 'allowedFileTypes', 
                    e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  )}
                  placeholder="pdf, doc, docx, mp4, etc."
                />
                <p className="text-sm text-muted-foreground">Comma-separated list of file extensions</p>
              </div>

              <Button 
                onClick={() => handleSave('system')} 
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save className="mr-2 h-4 w-4" />}
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing Configuration
              </CardTitle>
              <CardDescription>
                Configure payment and billing settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Billing configuration coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ErrorBoundary>
      <AdminSettingsContent />
    </ErrorBoundary>
  )
}