'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Download,
  Upload,
  Database,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Settings,
  Play,
  Pause,
  Trash2,
  Eye,
  RefreshCw,
  Shield
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import { 
  backupService, 
  BackupMetadata, 
  BackupOptions, 
  RestoreOptions, 
  RestoreResult 
} from '@/lib/backup/backup-service'

const entityTypes = [
  { id: 'users', label: 'Users', description: 'User accounts and profiles' },
  { id: 'courses', label: 'Courses', description: 'Course content and metadata' },
  { id: 'lessons', label: 'Lessons', description: 'Individual lesson content' },
  { id: 'discussions', label: 'Discussions', description: 'Forum posts and comments' },
  { id: 'activities', label: 'Activities', description: 'User activity logs' },
  { id: 'content', label: 'Content', description: 'Media files and documents' },
  { id: 'settings', label: 'Settings', description: 'System configuration' },
  { id: 'subscriptions', label: 'Subscriptions', description: 'Payment and subscription data' }
]

export function BackupRestore() {
  const [activeTab, setActiveTab] = useState('backups')
  const [backups, setBackups] = useState<BackupMetadata[]>([])
  const [scheduledBackups, setScheduledBackups] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedBackup, setSelectedBackup] = useState<BackupMetadata | null>(null)
  const [restoreResult, setRestoreResult] = useState<RestoreResult | null>(null)

  // Create backup form state
  const [backupName, setBackupName] = useState('')
  const [backupDescription, setBackupDescription] = useState('')
  const [selectedEntities, setSelectedEntities] = useState<string[]>(['users', 'courses'])
  const [compressionEnabled, setCompressionEnabled] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)

  // Restore form state
  const [restoreOptions, setRestoreOptions] = useState<RestoreOptions>({
    backupId: '',
    overwriteExisting: false,
    selectedEntities: [],
    dryRun: true
  })

  useEffect(() => {
    loadBackups()
    loadScheduledBackups()
  }, [])

  const loadBackups = async () => {
    try {
      const backupList = await backupService.getBackups()
      setBackups(backupList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
    } catch (error) {
      console.error('Failed to load backups:', error)
    }
  }

  const loadScheduledBackups = async () => {
    try {
      const scheduled = await backupService.getScheduledBackups()
      setScheduledBackups(scheduled)
    } catch (error) {
      console.error('Failed to load scheduled backups:', error)
    }
  }

  const handleCreateBackup = async () => {
    if (!backupName.trim()) return

    setIsLoading(true)
    setProgress(0)

    try {
      const options: BackupOptions = {
        name: backupName,
        description: backupDescription,
        includedEntities: selectedEntities,
        compression: compressionEnabled,
        encryption: encryptionEnabled
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const metadata = await backupService.createBackup(options)
      
      clearInterval(progressInterval)
      setProgress(100)

      await loadBackups()
      
      // Reset form
      setBackupName('')
      setBackupDescription('')
      setSelectedEntities(['users', 'courses'])
      
      setTimeout(() => {
        setProgress(0)
      }, 1000)
    } catch (error) {
      console.error('Backup failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestoreBackup = async () => {
    if (!restoreOptions.backupId) return

    setIsLoading(true)
    try {
      const result = await backupService.restoreBackup(restoreOptions)
      setRestoreResult(result)
    } catch (error) {
      console.error('Restore failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportBackup = async (backupId: string) => {
    try {
      const blob = await backupService.exportBackup(backupId, 'json')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `backup-${backupId}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const handleImportBackup = async (file: File) => {
    setIsLoading(true)
    try {
      await backupService.importBackup(file)
      await loadBackups()
    } catch (error) {
      console.error('Import failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBackup = async (backupId: string) => {
    try {
      await backupService.deleteBackup(backupId)
      await loadBackups()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Backup & Restore</h1>
          <p className="text-muted-foreground">
            Manage system backups and restore data safely
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadBackups}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="create">Create Backup</TabsTrigger>
          <TabsTrigger value="restore">Restore</TabsTrigger>
          <TabsTrigger value="schedule">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Available Backups</h2>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".json,.zip"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImportBackup(file)
                }}
                className="hidden"
                id="import-backup"
              />
              <Label htmlFor="import-backup">
                <Button variant="outline" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </Label>
            </div>
          </div>

          <div className="grid gap-4">
            {backups.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No backups found</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first backup to get started
                  </p>
                  <Button onClick={() => setActiveTab('create')}>
                    Create Backup
                  </Button>
                </CardContent>
              </Card>
            ) : (
              backups.map((backup) => (
                <Card key={backup.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{backup.name}</h3>
                          <Badge variant="outline">v{backup.version}</Badge>
                        </div>
                        {backup.description && (
                          <p className="text-sm text-muted-foreground">
                            {backup.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(backup.createdAt, 'PPp')}
                          </span>
                          <span>{formatBytes(backup.size)}</span>
                          <span>{Object.keys(backup.entityCounts).length} entity types</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {backup.includedEntities.map((entity) => (
                            <Badge key={entity} variant="secondary" className="text-xs">
                              {entity} ({backup.entityCounts[entity] || 0})
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExportBackup(backup.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Backup Details</DialogTitle>
                              <DialogDescription>
                                Detailed information about {backup.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label>Created</Label>
                                  <p>{format(backup.createdAt, 'PPP')}</p>
                                </div>
                                <div>
                                  <Label>Size</Label>
                                  <p>{formatBytes(backup.size)}</p>
                                </div>
                                <div>
                                  <Label>Checksum</Label>
                                  <p className="font-mono text-xs">{backup.checksum}</p>
                                </div>
                                <div>
                                  <Label>Created By</Label>
                                  <p>{backup.createdBy}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Included Data</Label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  {Object.entries(backup.entityCounts).map(([entity, count]) => (
                                    <div key={entity} className="flex justify-between text-sm">
                                      <span className="capitalize">{entity}:</span>
                                      <span>{count} records</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setRestoreOptions({
                              backupId: backup.id,
                              overwriteExisting: false,
                              selectedEntities: backup.includedEntities,
                              dryRun: true
                            })
                            setActiveTab('restore')
                          }}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBackup(backup.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Backup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-name">Backup Name *</Label>
                  <Input
                    id="backup-name"
                    value={backupName}
                    onChange={(e) => setBackupName(e.target.value)}
                    placeholder="e.g., Weekly Full Backup"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-description">Description</Label>
                  <Input
                    id="backup-description"
                    value={backupDescription}
                    onChange={(e) => setBackupDescription(e.target.value)}
                    placeholder="Optional description"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Select Data to Backup</Label>
                <div className="grid grid-cols-2 gap-4">
                  {entityTypes.map((entity) => (
                    <div key={entity.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={entity.id}
                        checked={selectedEntities.includes(entity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedEntities([...selectedEntities, entity.id])
                          } else {
                            setSelectedEntities(selectedEntities.filter(e => e !== entity.id))
                          }
                        }}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={entity.id} className="text-sm font-medium">
                          {entity.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {entity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="compression"
                    checked={compressionEnabled}
                    onCheckedChange={setCompressionEnabled}
                  />
                  <Label htmlFor="compression" className="text-sm">
                    Enable compression
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="encryption"
                    checked={encryptionEnabled}
                    onCheckedChange={setEncryptionEnabled}
                  />
                  <Label htmlFor="encryption" className="text-sm">
                    Enable encryption
                  </Label>
                </div>
              </div>

              {progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Creating backup...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleCreateBackup}
                  disabled={!backupName.trim() || selectedEntities.length === 0 || isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Backup'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Restore from Backup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {restoreResult && (
                <Alert className={restoreResult.success ? 'border-green-200' : 'border-red-200'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {restoreResult.summary}
                    {restoreResult.errors.length > 0 && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-medium">
                          View errors ({restoreResult.errors.length})
                        </summary>
                        <div className="mt-2 space-y-1 text-xs">
                          {restoreResult.errors.map((error, index) => (
                            <div key={index} className="text-red-600">
                              {error.entity} #{error.id}: {error.error}
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restore-backup">Select Backup</Label>
                  <select
                    id="restore-backup"
                    className="w-full p-2 border rounded-md"
                    value={restoreOptions.backupId}
                    onChange={(e) => setRestoreOptions({
                      ...restoreOptions,
                      backupId: e.target.value
                    })}
                  >
                    <option value="">Choose a backup...</option>
                    {backups.map((backup) => (
                      <option key={backup.id} value={backup.id}>
                        {backup.name} - {format(backup.createdAt, 'PP')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="overwrite"
                      checked={restoreOptions.overwriteExisting}
                      onCheckedChange={(checked) => setRestoreOptions({
                        ...restoreOptions,
                        overwriteExisting: !!checked
                      })}
                    />
                    <Label htmlFor="overwrite" className="text-sm">
                      Overwrite existing data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dry-run"
                      checked={restoreOptions.dryRun}
                      onCheckedChange={(checked) => setRestoreOptions({
                        ...restoreOptions,
                        dryRun: !!checked
                      })}
                    />
                    <Label htmlFor="dry-run" className="text-sm">
                      Dry run (preview only)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setRestoreResult(null)}
                >
                  Clear Results
                </Button>
                <Button
                  onClick={handleRestoreBackup}
                  disabled={!restoreOptions.backupId || isLoading}
                  variant={restoreOptions.dryRun ? "default" : "destructive"}
                >
                  {isLoading ? 'Processing...' : restoreOptions.dryRun ? 'Preview Restore' : 'Restore Data'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Backups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledBackups.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{schedule.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="capitalize">{schedule.schedule}</span>
                        <span>Next: {formatDistanceToNow(schedule.nextRun, { addSuffix: true })}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={schedule.enabled ? "default" : "secondary"}>
                        {schedule.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        {schedule.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}