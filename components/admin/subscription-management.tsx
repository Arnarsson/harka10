"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone
} from "lucide-react"

export function SubscriptionManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const subscriptionStats = {
    totalRevenue: 127500,
    activeSubscriptions: 42,
    churnRate: 3.2,
    conversionRate: 8.7
  }

  const subscriptions = [
    {
      id: "sub_1234",
      customer: {
        name: "Danske Bank",
        email: "it@danskebank.dk",
        phone: "+45 70 12 34 56"
      },
      plan: "Premium",
      status: "active",
      amount: 299,
      currency: "DKK",
      billingCycle: "monthly",
      currentPeriodStart: "2024-01-01",
      currentPeriodEnd: "2024-02-01",
      created: "2023-11-15",
      users: 25,
      maxUsers: 50
    },
    {
      id: "sub_1235", 
      customer: {
        name: "Novo Nordisk",
        email: "ai-team@novonordisk.com",
        phone: "+45 44 44 88 88"
      },
      plan: "Premium",
      status: "past_due",
      amount: 299,
      currency: "DKK", 
      billingCycle: "monthly",
      currentPeriodStart: "2024-01-01",
      currentPeriodEnd: "2024-02-01",
      created: "2023-10-22",
      users: 47,
      maxUsers: 50
    },
    {
      id: "sub_1236",
      customer: {
        name: "Carlsberg Group",
        email: "digital@carlsberg.com", 
        phone: "+45 33 27 33 00"
      },
      plan: "Premium",
      status: "active",
      amount: 299,
      currency: "DKK",
      billingCycle: "annual",
      currentPeriodStart: "2024-01-01", 
      currentPeriodEnd: "2025-01-01",
      created: "2023-12-01",
      users: 38,
      maxUsers: 50
    },
    {
      id: "sub_1237",
      customer: {
        name: "TDC NET",
        email: "learning@tdc.dk",
        phone: "+45 80 40 40 40"
      },
      plan: "Free Trial",
      status: "trialing", 
      amount: 0,
      currency: "DKK",
      billingCycle: "monthly",
      currentPeriodStart: "2024-01-20",
      currentPeriodEnd: "2024-01-27",
      created: "2024-01-20",
      users: 1,
      maxUsers: 1
    },
    {
      id: "sub_1238",
      customer: {
        name: "Maersk",
        email: "innovation@maersk.com",
        phone: "+45 33 63 33 63"
      }, 
      plan: "Premium",
      status: "cancelled",
      amount: 299,
      currency: "DKK",
      billingCycle: "monthly",
      currentPeriodStart: "2024-01-01",
      currentPeriodEnd: "2024-02-01", 
      created: "2023-09-15",
      users: 0,
      maxUsers: 50
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
      case 'trialing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'trialing':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'past_due':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage customer subscriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Customers
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(subscriptionStats.totalRevenue, 'DKK')}
            </div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.churnRate}%</div>
            <p className="text-xs text-muted-foreground">-0.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions">
        <TabsList>
          <TabsTrigger value="subscriptions">All Subscriptions</TabsTrigger>
          <TabsTrigger value="trials">Free Trials</TabsTrigger>
          <TabsTrigger value="overdue">Past Due</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customer Subscriptions</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-10 w-80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-3 py-2 border rounded-md text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="trialing">Trialing</option>
                    <option value="past_due">Past Due</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(subscription.status)}
                          <h3 className="font-medium">{subscription.customer.name}</h3>
                          <Badge className={getStatusColor(subscription.status)}>
                            {subscription.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {subscription.customer.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {subscription.customer.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{subscription.plan}</p>
                        <p className="text-muted-foreground">
                          {formatAmount(subscription.amount, subscription.currency)}
                          /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="font-medium">{subscription.users}/{subscription.maxUsers}</p>
                        <p className="text-muted-foreground">Users</p>
                      </div>

                      <div className="text-center">
                        <p className="font-medium">{formatDate(subscription.currentPeriodEnd)}</p>
                        <p className="text-muted-foreground">Next billing</p>
                      </div>

                      <div className="text-center">
                        <p className="font-medium">{formatDate(subscription.created)}</p>
                        <p className="text-muted-foreground">Customer since</p>
                      </div>

                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Free Trial Customers</CardTitle>
              <CardDescription>Monitor trial usage and conversion opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscriptions
                  .filter(sub => sub.status === 'trialing')
                  .map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{subscription.customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{subscription.customer.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(subscription.status)}>
                        Trial ends {formatDate(subscription.currentPeriodEnd)}
                      </Badge>
                      <Button size="sm">
                        <Mail className="mr-2 h-3 w-3" />
                        Send Follow-up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Past Due Subscriptions
              </CardTitle>
              <CardDescription>Customers with failed payments requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscriptions
                  .filter(sub => sub.status === 'past_due')
                  .map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <div className="space-y-1">
                      <h3 className="font-medium">{subscription.customer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Payment failed for {formatAmount(subscription.amount, subscription.currency)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="mr-2 h-3 w-3" />
                        Call Customer
                      </Button>
                      <Button size="sm">
                        <Mail className="mr-2 h-3 w-3" />
                        Send Notice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Subscriptions</CardTitle>
              <CardDescription>Review churn patterns and win-back opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscriptions
                  .filter(sub => sub.status === 'cancelled')
                  .map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{subscription.customer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Cancelled on {formatDate(subscription.currentPeriodEnd)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        <Mail className="mr-2 h-3 w-3" />
                        Win-back Campaign
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