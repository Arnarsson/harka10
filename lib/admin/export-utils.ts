export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf'
  fields?: string[]
  filters?: Record<string, any>
}

export interface ExportableUser {
  id: string
  full_name: string
  email: string
  role: string
  status: string
  created_at: string
  last_sign_in_at?: string
  courses_enrolled?: number
  courses_completed?: number
  certificates_earned?: number
  total_spent?: number
}

export interface ExportableCourse {
  id: string
  title: string
  description: string
  instructor: string
  enrollments: number
  completions: number
  completion_rate: number
  revenue: number
  created_at: string
  status: string
}

export interface ExportableAnalytics {
  date: string
  users_active: number
  courses_completed: number
  revenue: number
  new_registrations: number
}

export class ExportService {
  static generateCSV(data: any[], headers: string[]): string {
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] ?? ''
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        }).join(',')
      )
    ].join('\n')
    
    return csvContent
  }

  static generateJSON(data: any[]): string {
    return JSON.stringify(data, null, 2)
  }

  static downloadFile(content: string, filename: string, contentType: string = 'text/plain') {
    const blob = new Blob([content], { type: contentType })
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    window.URL.revokeObjectURL(url)
  }

  static async exportUsers(users: ExportableUser[], options: ExportOptions) {
    const timestamp = new Date().toISOString().split('T')[0]
    
    switch (options.format) {
      case 'csv':
        const csvHeaders = [
          'id', 'full_name', 'email', 'role', 'status', 'created_at', 
          'last_sign_in_at', 'courses_enrolled', 'courses_completed', 
          'certificates_earned', 'total_spent'
        ]
        const csvContent = this.generateCSV(users, csvHeaders)
        this.downloadFile(csvContent, `users-export-${timestamp}.csv`, 'text/csv')
        break
        
      case 'json':
        const jsonContent = this.generateJSON(users)
        this.downloadFile(jsonContent, `users-export-${timestamp}.json`, 'application/json')
        break
        
      case 'pdf':
        // For PDF generation, you would integrate with a library like jsPDF
        console.log('PDF export not implemented yet')
        break
    }
  }

  static async exportCourses(courses: ExportableCourse[], options: ExportOptions) {
    const timestamp = new Date().toISOString().split('T')[0]
    
    switch (options.format) {
      case 'csv':
        const csvHeaders = [
          'id', 'title', 'description', 'instructor', 'enrollments', 
          'completions', 'completion_rate', 'revenue', 'created_at', 'status'
        ]
        const csvContent = this.generateCSV(courses, csvHeaders)
        this.downloadFile(csvContent, `courses-export-${timestamp}.csv`, 'text/csv')
        break
        
      case 'json':
        const jsonContent = this.generateJSON(courses)
        this.downloadFile(jsonContent, `courses-export-${timestamp}.json`, 'application/json')
        break
    }
  }

  static async exportAnalytics(analytics: ExportableAnalytics[], options: ExportOptions) {
    const timestamp = new Date().toISOString().split('T')[0]
    
    switch (options.format) {
      case 'csv':
        const csvHeaders = [
          'date', 'users_active', 'courses_completed', 'revenue', 'new_registrations'
        ]
        const csvContent = this.generateCSV(analytics, csvHeaders)
        this.downloadFile(csvContent, `analytics-export-${timestamp}.csv`, 'text/csv')
        break
        
      case 'json':
        const jsonContent = this.generateJSON(analytics)
        this.downloadFile(jsonContent, `analytics-export-${timestamp}.json`, 'application/json')
        break
    }
  }

  static generateUserReport(users: ExportableUser[]) {
    const totalUsers = users.length
    const activeUsers = users.filter(u => u.status === 'active').length
    const totalRevenue = users.reduce((sum, u) => sum + (u.total_spent || 0), 0)
    const totalCertificates = users.reduce((sum, u) => sum + (u.certificates_earned || 0), 0)
    
    const report = {
      generated_at: new Date().toISOString(),
      summary: {
        total_users: totalUsers,
        active_users: activeUsers,
        active_rate: (activeUsers / totalUsers * 100).toFixed(2) + '%',
        total_revenue: totalRevenue,
        total_certificates: totalCertificates,
        avg_revenue_per_user: (totalRevenue / totalUsers).toFixed(2)
      },
      user_breakdown: {
        by_role: this.groupBy(users, 'role'),
        by_status: this.groupBy(users, 'status')
      },
      users: users
    }
    
    return report
  }

  static generateCourseReport(courses: ExportableCourse[]) {
    const totalCourses = courses.length
    const totalEnrollments = courses.reduce((sum, c) => sum + c.enrollments, 0)
    const totalRevenue = courses.reduce((sum, c) => sum + c.revenue, 0)
    const avgCompletionRate = courses.reduce((sum, c) => sum + c.completion_rate, 0) / totalCourses
    
    const report = {
      generated_at: new Date().toISOString(),
      summary: {
        total_courses: totalCourses,
        total_enrollments: totalEnrollments,
        total_revenue: totalRevenue,
        avg_completion_rate: avgCompletionRate.toFixed(2) + '%',
        avg_revenue_per_course: (totalRevenue / totalCourses).toFixed(2)
      },
      courses: courses.sort((a, b) => b.revenue - a.revenue)
    }
    
    return report
  }

  private static groupBy(array: any[], key: string) {
    return array.reduce((groups, item) => {
      const group = item[key] || 'unknown'
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    }, {})
  }
}