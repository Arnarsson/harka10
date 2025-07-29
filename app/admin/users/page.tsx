'use client'

import { withAuth } from '@/lib/auth/hooks'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Search, Filter, MoreVertical, Edit, Trash2, 
  Shield, UserPlus, Mail, Calendar, Activity, ChevronLeft,
  Ban, CheckCircle, Clock, Award, BookOpen, DollarSign,
  ChevronUp, ChevronDown, Download, Eye, RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: 'admin' | 'instructor' | 'student'
  created_at: string
  last_sign_in_at?: string
  metadata?: {
    courses_enrolled?: number
    courses_completed?: number
    certificates_earned?: number
    total_spent?: number
    last_active?: string
  }
  status: 'active' | 'inactive' | 'banned'
}

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'instructor' | 'student'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'banned'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [sortField, setSortField] = useState<'name' | 'email' | 'created_at' | 'last_sign_in'>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [dateFilter, setDateFilter] = useState<'all' | 'week' | 'month' | 'quarter' | 'year'>('all')

  const supabase = createClient()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      // Mock data for demo
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'john.doe@example.com',
          full_name: 'John Doe',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
          role: 'student',
          created_at: '2023-06-15T10:30:00Z',
          last_sign_in_at: '2024-02-20T15:45:00Z',
          metadata: {
            courses_enrolled: 5,
            courses_completed: 3,
            certificates_earned: 3,
            total_spent: 269.97,
            last_active: '2 hours ago'
          },
          status: 'active'
        },
        {
          id: '2',
          email: 'sarah.johnson@example.com',
          full_name: 'Sarah Johnson',
          avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
          role: 'instructor',
          created_at: '2023-05-10T08:15:00Z',
          last_sign_in_at: '2024-02-21T09:30:00Z',
          metadata: {
            courses_enrolled: 0,
            courses_completed: 0,
            certificates_earned: 0,
            total_spent: 0,
            last_active: 'Just now'
          },
          status: 'active'
        },
        {
          id: '3',
          email: 'admin@example.com',
          full_name: 'Admin User',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          role: 'admin',
          created_at: '2023-01-01T00:00:00Z',
          last_sign_in_at: '2024-02-21T10:00:00Z',
          metadata: {
            last_active: 'Online'
          },
          status: 'active'
        },
        {
          id: '4',
          email: 'inactive.user@example.com',
          full_name: 'Inactive User',
          role: 'student',
          created_at: '2023-08-20T14:00:00Z',
          last_sign_in_at: '2023-12-01T10:00:00Z',
          metadata: {
            courses_enrolled: 1,
            courses_completed: 0,
            certificates_earned: 0,
            total_spent: 89.99,
            last_active: '2 months ago'
          },
          status: 'inactive'
        }
      ]

      setUsers(mockUsers)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter

    // Date filtering
    let matchesDate = true
    if (dateFilter !== 'all') {
      const userDate = new Date(user.created_at)
      const now = new Date()
      const diffTime = now.getTime() - userDate.getTime()
      const diffDays = diffTime / (1000 * 3600 * 24)

      switch (dateFilter) {
        case 'week':
          matchesDate = diffDays <= 7
          break
        case 'month':
          matchesDate = diffDays <= 30
          break
        case 'quarter':
          matchesDate = diffDays <= 90
          break
        case 'year':
          matchesDate = diffDays <= 365
          break
      }
    }

    return matchesSearch && matchesRole && matchesStatus && matchesDate
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortField) {
      case 'name':
        aValue = a.full_name.toLowerCase()
        bValue = b.full_name.toLowerCase()
        break
      case 'email':
        aValue = a.email.toLowerCase()
        bValue = b.email.toLowerCase()
        break
      case 'created_at':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      case 'last_sign_in':
        aValue = new Date(a.last_sign_in_at || '1970-01-01')
        bValue = new Date(b.last_sign_in_at || '1970-01-01')
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleUpdateRole = async (userId: string, newRole: User['role']) => {
    // TODO: Update user role in database
    console.log('Update role:', userId, newRole)
  }

  const handleBanUser = async (userId: string) => {
    if (confirm('Are you sure you want to ban this user?')) {
      // TODO: Ban user in database
      console.log('Ban user:', userId)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // TODO: Delete user from database
      console.log('Delete user:', userId)
    }
  }

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)))
    } else {
      setSelectedUsers(new Set())
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers)
    if (checked) {
      newSelected.add(userId)
    } else {
      newSelected.delete(userId)
    }
    setSelectedUsers(newSelected)
  }

  const handleBulkAction = async (action: 'delete' | 'ban' | 'activate' | 'export') => {
    const selectedUserIds = Array.from(selectedUsers)
    
    switch (action) {
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedUserIds.length} users? This action cannot be undone.`)) {
          console.log('Bulk delete:', selectedUserIds)
          setSelectedUsers(new Set())
        }
        break
      case 'ban':
        if (confirm(`Are you sure you want to ban ${selectedUserIds.length} users?`)) {
          console.log('Bulk ban:', selectedUserIds)
          setSelectedUsers(new Set())
        }
        break
      case 'activate':
        console.log('Bulk activate:', selectedUserIds)
        setSelectedUsers(new Set())
        break
      case 'export':
        console.log('Export users:', selectedUserIds)
        // TODO: Implement export functionality
        break
    }
  }

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'instructor': return 'bg-blue-100 text-blue-800'
      case 'student': return 'bg-green-100 text-green-800'
    }
  }

  const getStatusBadgeColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'banned': return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold">User Management</h1>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <UserPlus size={20} />
              Invite User
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-zinc-600" />
              <span className="text-sm text-green-600 font-medium">+12%</span>
            </div>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-zinc-600">Total Users</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <Activity size={20} className="text-zinc-600" />
              <span className="text-sm font-medium">{users.filter(u => u.status === 'active').length}</span>
            </div>
            <p className="text-2xl font-bold">{Math.round((users.filter(u => u.status === 'active').length / users.length) * 100)}%</p>
            <p className="text-sm text-zinc-600">Active Rate</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <Award size={20} className="text-zinc-600" />
              <span className="text-sm text-green-600 font-medium">+23%</span>
            </div>
            <p className="text-2xl font-bold">
              {users.reduce((sum, u) => sum + (u.metadata?.certificates_earned || 0), 0)}
            </p>
            <p className="text-sm text-zinc-600">Certificates</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={20} className="text-zinc-600" />
              <span className="text-sm text-green-600 font-medium">+18%</span>
            </div>
            <p className="text-2xl font-bold">
              ${users.reduce((sum, u) => sum + (u.metadata?.total_spent || 0), 0).toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600">Total Revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
                <option value="student">Student</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <button
                onClick={() => loadUsers()}
                className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-blue-900">
                  {selectedUsers.size} user{selectedUsers.size === 1 ? '' : 's'} selected
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 text-sm bg-white border border-blue-300 text-blue-700 rounded hover:bg-blue-50 transition-colors flex items-center gap-1"
                >
                  <Download size={14} />
                  Export
                </button>
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 text-sm bg-white border border-green-300 text-green-700 rounded hover:bg-green-50 transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('ban')}
                  className="px-3 py-1 text-sm bg-white border border-yellow-300 text-yellow-700 rounded hover:bg-yellow-50 transition-colors"
                >
                  Ban
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 text-sm bg-white border border-red-300 text-red-700 rounded hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedUsers(new Set())}
                  className="px-3 py-1 text-sm bg-white border border-zinc-300 text-zinc-700 rounded hover:bg-zinc-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-zinc-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
                    >
                      User
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp size={14} /> : 
                          <ChevronDown size={14} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('created_at')}
                      className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
                    >
                      Joined
                      {sortField === 'created_at' && (
                        sortDirection === 'asc' ? 
                          <ChevronUp size={14} /> : 
                          <ChevronDown size={14} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                        className="rounded border-zinc-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200">
                          {user.avatar_url ? (
                            <Image
                              src={user.avatar_url}
                              alt={user.full_name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              {user.full_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-zinc-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-zinc-900">{user.metadata?.last_active || 'Never'}</p>
                        <p className="text-zinc-600">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.role === 'student' && (
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <BookOpen size={16} className="text-zinc-400" />
                            <span>{user.metadata?.courses_enrolled || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award size={16} className="text-zinc-400" />
                            <span>{user.metadata?.certificates_earned || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} className="text-zinc-400" />
                            <span>${user.metadata?.total_spent || 0}</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserModal(true)
                          }}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                          disabled={user.status === 'banned'}
                        >
                          <Ban size={16} className={user.status === 'banned' ? 'text-zinc-300' : ''} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Edit Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-200">
              <h2 className="text-xl font-semibold">Edit User</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-200">
                  {selectedUser.avatar_url ? (
                    <Image
                      src={selectedUser.avatar_url}
                      alt={selectedUser.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-zinc-600">
                      {selectedUser.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.full_name}</h3>
                  <p className="text-zinc-600">{selectedUser.email}</p>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">User Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => handleUpdateRole(selectedUser.id, e.target.value as User['role'])}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* User Stats */}
              {selectedUser.role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-lg">
                    <p className="text-sm text-zinc-600 mb-1">Courses Enrolled</p>
                    <p className="text-2xl font-bold">{selectedUser.metadata?.courses_enrolled || 0}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-lg">
                    <p className="text-sm text-zinc-600 mb-1">Certificates Earned</p>
                    <p className="text-2xl font-bold">{selectedUser.metadata?.certificates_earned || 0}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-lg">
                    <p className="text-sm text-zinc-600 mb-1">Total Spent</p>
                    <p className="text-2xl font-bold">${selectedUser.metadata?.total_spent || 0}</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-lg">
                    <p className="text-sm text-zinc-600 mb-1">Last Active</p>
                    <p className="text-lg font-medium">{selectedUser.metadata?.last_active || 'Never'}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Send Email
                </button>
                <button className="w-full py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                  <Clock size={20} />
                  View Activity Log
                </button>
                {selectedUser.status !== 'banned' && (
                  <button 
                    onClick={() => handleBanUser(selectedUser.id)}
                    className="w-full py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Ban size={20} />
                    Ban User
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-zinc-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default withAuth(AdminUsersPage, {
  requireAuth: true,
  requireRole: 'admin',
  redirectTo: '/login'
})