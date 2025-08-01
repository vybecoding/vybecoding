'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { DollarSign, TrendingUp, ShoppingCart, Eye } from 'lucide-react'
import Link from 'next/link'

interface DailyRevenue {
  day: string
  revenue: number
  sales: number
  percentage: number
}

interface TopPerformer {
  rank: number
  title: string
  type: 'Guide' | 'App'
  sales: number
  revenue: number
}

interface Transaction {
  id: string
  title: string
  timeAgo: string
  amount: number
}

export default function DashboardAnalyticsOverviewPage() {
  const { user } = useUser()
  
  // Mock data - will be replaced with Convex queries
  const currentBalance = 1874
  const nextPayoutDay = 'Friday'
  
  const last30DaysStats = {
    sales: { value: 287, change: 23 },
    revenue: { value: 4527, change: 18 },
    avgSale: { value: 15.78, change: -4 }
  }
  
  const dailyRevenue: DailyRevenue[] = [
    { day: 'Mon', revenue: 267, sales: 12, percentage: 78 },
    { day: 'Tue', revenue: 198, sales: 8, percentage: 58 },
    { day: 'Wed', revenue: 234, sales: 11, percentage: 69 },
    { day: 'Thu', revenue: 156, sales: 7, percentage: 46 },
    { day: 'Fri', revenue: 278, sales: 13, percentage: 82 },
    { day: 'Sat', revenue: 341, sales: 16, percentage: 100 },
    { day: 'Sun', revenue: 223, sales: 10, percentage: 65 }
  ]
  
  const topPerformers: TopPerformer[] = [
    { rank: 1, title: 'Claude + VSCode Mastery', type: 'Guide', sales: 23, revenue: 430 },
    { rank: 2, title: 'AI Workflow Automation', type: 'Guide', sales: 15, revenue: 234 },
    { rank: 3, title: 'React AI Components', type: 'Guide', sales: 11, revenue: 185 }
  ]
  
  const recentTransactions: Transaction[] = [
    { id: '1', title: 'Claude + VSCode Mastery', timeAgo: '2 hours ago', amount: 47 },
    { id: '2', title: 'TypeScript Pro Patterns', timeAgo: '5 hours ago', amount: 37 },
    { id: '3', title: 'React Best Practices 2024', timeAgo: 'Yesterday', amount: 29 },
    { id: '4', title: 'AI Agents Crash Course', timeAgo: 'Yesterday', amount: 67 },
    { id: '5', title: 'Tailwind CSS Components', timeAgo: '2 days ago', amount: 19 }
  ]
  
  const transactionSummary = {
    totalSales: 42,
    revenue: 1327,
    avgSale: 31.59
  }

  return (
    <div className="py-6 space-y-8">
      {/* Analytics Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-vybe-gray-800 flex-wrap justify-center">
          <button className="px-6 py-3 font-medium rounded-lg bg-vybe-purple text-white">
            Overview
          </button>
          <Link 
            href="/dashboard/analytics/insights" 
            className="px-6 py-3 font-medium rounded-lg text-vybe-gray-400 hover:text-white transition-colors"
          >
            Insights <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">PRO</span>
          </Link>
        </div>
      </div>
      
      {/* Current Balance & Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Current Balance Card */}
        <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
          <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
            <h3 className="text-base font-semibold text-white">💰 Current Balance</h3>
          </div>
          <div className="p-6">
          <p className="text-4xl font-semibold text-white mb-2">${currentBalance.toLocaleString()}</p>
          <p className="text-sm text-vybe-gray-400 mb-2">Next payout: {nextPayoutDay}</p>
          <p className="text-xs text-vybe-gray-500">
            Automatic weekly payouts via Stripe (minimum $50)
          </p>
          </div>
        </div>
        
        {/* Last 30 Days Performance Card */}
        <div className="vybe-card overflow-hidden">
          <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
            <h3 className="text-base font-semibold text-white">📈 Last 30 Days Performance</h3>
          </div>
          <div className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-vybe-gray-400">Sales</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-white">{last30DaysStats.sales.value}</span>
                <span className={cn(
                  "text-xs",
                  last30DaysStats.sales.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {last30DaysStats.sales.change > 0 ? '↑' : '↓'} {Math.abs(last30DaysStats.sales.change)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-vybe-gray-400">Revenue</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-white">${last30DaysStats.revenue.value.toLocaleString()}</span>
                <span className={cn(
                  "text-xs",
                  last30DaysStats.revenue.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {last30DaysStats.revenue.change > 0 ? '↑' : '↓'} {Math.abs(last30DaysStats.revenue.change)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-vybe-gray-400">Avg. Sale</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-white">${last30DaysStats.avgSale.value.toFixed(2)}</span>
                <span className={cn(
                  "text-xs",
                  last30DaysStats.avgSale.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {last30DaysStats.avgSale.change > 0 ? '↑' : '↓'} {Math.abs(last30DaysStats.avgSale.change)}%
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      
      {/* Daily Revenue Chart */}
      <div className="vybe-card overflow-hidden mb-6" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Daily Revenue Trend <span className="text-xs text-vybe-gray-400">(Last 7 days)</span></h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {dailyRevenue.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="text-sm text-vybe-gray-400 w-12">{day.day}</span>
                <div className="flex-1 bg-vybe-gray-800 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-vybe-purple to-vybe-pink h-full rounded-full flex items-center px-3"
                    style={{ width: `${day.percentage}%` }}
                  >
                    <span className="text-xs text-white font-medium">${day.revenue}</span>
                  </div>
                </div>
                <span className="text-xs text-vybe-gray-400">({day.sales} sales)</span>
                {day.percentage === 100 && (
                  <span className="text-xs text-green-400 font-medium">📈 Best!</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Performers This Month (Free Tier) */}
      <div className="vybe-card overflow-hidden mb-6" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Top Performers This Month</h3>
        </div>
        <div className="p-6">
          {/* Top 3 Items Only */}
          {topPerformers.map((performer) => (
            <div key={performer.rank} className="flex items-center justify-between p-3 bg-vybe-gray-900/30 rounded-lg hover:bg-vybe-gray-900/50 transition-colors mb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  performer.rank === 1 ? "bg-gradient-to-r from-vybe-purple to-vybe-pink" : "bg-vybe-gray-700"
                )}>
                  <span className="text-xs font-bold text-white">{performer.rank}</span>
                </div>
                <div>
                  <h6 className="text-sm font-medium text-white">{performer.title}</h6>
                  <p className="text-xs text-vybe-gray-400">{performer.type} • {performer.sales} sales</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-green-400">${performer.revenue}</p>
            </div>
          ))}
          
          {/* Pro Upgrade Teaser */}
          <div className="mt-4 p-4 bg-gradient-to-r from-vybe-purple/20 to-vybe-pink/20 rounded-lg border border-vybe-purple/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="text-lg">✨</span> Unlock Pro Analytics
                </p>
                <p className="text-xs text-vybe-gray-300">Views, engagement rates, audience insights & more</p>
              </div>
              <Link 
                href="/dashboard/analytics/insights" 
                className="px-5 py-2.5 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-vybe-purple/25 transition-all transform hover:scale-105"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sales History (Free Tier) */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Recent Transactions</h3>
            <span className="text-xs text-vybe-gray-400">(Latest activity)</span>
          </div>
        </div>
        <div className="p-6">
          {/* Sales Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-vybe-gray-700/30">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">{transactionSummary.totalSales}</p>
              <p className="text-xs text-vybe-gray-400">Total Sales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">${transactionSummary.revenue.toLocaleString()}</p>
              <p className="text-xs text-vybe-gray-400">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">${transactionSummary.avgSale.toFixed(2)}</p>
              <p className="text-xs text-vybe-gray-400">Avg. Sale</p>
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className={cn(
                  "flex items-center justify-between py-2",
                  index < recentTransactions.length - 1 && "border-b border-vybe-gray-700/50"
                )}
              >
                <div>
                  <p className="text-sm font-medium text-white">{transaction.title}</p>
                  <p className="text-xs text-vybe-gray-400">{transaction.timeAgo}</p>
                </div>
                <p className="text-sm font-medium text-green-400">+${transaction.amount}</p>
              </div>
            ))}
          </div>
          
          {/* View More CTA */}
          <div className="mt-6 text-center">
            <Link 
              href="/dashboard/analytics/insights" 
              className="px-4 py-2 bg-vybe-gray-800 hover:bg-vybe-gray-700 text-vybe-purple hover:text-vybe-pink transition-all text-sm font-medium rounded-lg border border-vybe-gray-700"
            >
              View Complete History (Pro) →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}