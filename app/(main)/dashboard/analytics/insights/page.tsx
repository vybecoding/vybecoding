'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Search, Download, ChevronDown } from 'lucide-react'

interface InsightMetric {
  label: string
  value: string
  change?: string
  sparklineData?: number[]
}

interface OptimizationOpportunity {
  title: string
  description: string
  impact: string
  basis: string
}

interface ComparisonMetric {
  metric: string
  you: string
  average: string
  top10: string
  rank: string
  isTop?: boolean
}

interface DetailedTransaction {
  date: string
  product: string
  customer: string
  type: 'Guide' | 'App' | 'Session'
  country: string
  net: number
  fee: number
  total: number
  status: 'Paid' | 'Pending' | 'Failed'
}

export default function DashboardAnalyticsInsightsPage() {
  const { user } = useUser()
  const [timePeriod, setTimePeriod] = useState<'7d' | '30d' | 'all'>('30d')
  const [searchTerm, setSearchTerm] = useState('')
  const [productFilter, setProductFilter] = useState<string>('All Products')
  const [dateFilter, setDateFilter] = useState<string>('Last 30 Days')
  
  // Mock data - will be replaced with Convex queries
  const keyInsights = [
    { 
      icon: '•',
      color: 'text-green-400',
      text: 'Your TypeScript content converts',
      highlight: '3.2x better',
      suffix: 'than other topics'
    },
    {
      icon: '•',
      color: 'text-green-400', 
      text: 'Posting on Thursdays gets',
      highlight: '47% more views',
      suffix: ''
    },
    {
      icon: '•',
      color: 'text-green-400',
      text: '$45-65 price point has',
      highlight: 'highest conversion rate',
      suffix: ''
    }
  ]
  
  const growthMetrics: InsightMetric[] = [
    { label: 'Views', value: '127K', change: '↑ 12%', sparklineData: [0, 20, 22, 15, 10, 5] },
    { label: 'Conversion', value: '5.2%', change: '↑ 0.3%', sparklineData: [20, 18, 15, 12, 8, 10] },
    { label: 'Avg Sale', value: '$47', change: '↑ $3', sparklineData: [22, 20, 18, 14, 12, 8] },
    { label: 'Followers', value: '287', change: '↑ 23', sparklineData: [25, 22, 20, 15, 12, 5] }
  ]
  
  const optimizations: OptimizationOpportunity[] = [
    {
      title: 'Underpriced Content',
      description: '"React AI Components" could be $85 (not $65)',
      impact: '$85',
      basis: 'Similar content performance metrics'
    },
    {
      title: 'Content Gap',
      description: 'Your audience wants more "System Design" content',
      impact: '"System Design"',
      basis: 'Search queries & engagement patterns'
    },
    {
      title: 'Timing Optimization',
      description: 'Release new guides Thursday 2-4 PM EST',
      impact: 'Thursday 2-4 PM EST',
      basis: 'Your audience activity patterns'
    }
  ]
  
  const comparisons: ComparisonMetric[] = [
    { metric: 'View Rate', you: '4.2%', average: '3.1%', top10: '5.8%', rank: 'Top 35%' },
    { metric: 'Conversion', you: '5.2%', average: '2.8%', top10: '7.1%', rank: 'Top 25% 🎉', isTop: true },
    { metric: 'Avg Sale', you: '$47', average: '$38', top10: '$72', rank: 'Top 40%' },
    { metric: 'Retention', you: '68%', average: '51%', top10: '84%', rank: 'Top 30% 🎉', isTop: true }
  ]
  
  const transactions: DetailedTransaction[] = [
    {
      date: 'Dec 22, 2:34 PM',
      product: 'Claude + VSCode Mastery',
      customer: 'j.smith@g***',
      type: 'Guide',
      country: '🇺🇸 US',
      net: 44.82,
      fee: 2.18,
      total: 47.00,
      status: 'Paid'
    },
    {
      date: 'Dec 22, 11:21 AM',
      product: 'TypeScript Pro Patterns',
      customer: 'dev.pro@t***',
      type: 'Guide',
      country: '🇬🇧 UK',
      net: 35.27,
      fee: 1.73,
      total: 37.00,
      status: 'Paid'
    },
    {
      date: 'Dec 21, 9:45 PM',
      product: '1-on-1 Mentorship',
      customer: 'startup@v***',
      type: 'Session',
      country: '🇨🇦 CA',
      net: 142.50,
      fee: 7.50,
      total: 150.00,
      status: 'Pending'
    },
    {
      date: 'Dec 21, 3:12 PM',
      product: 'AI Agents Crash Course',
      customer: 'tech.lead@m***',
      type: 'Guide',
      country: '🇦🇺 AU',
      net: 63.84,
      fee: 3.16,
      total: 67.00,
      status: 'Paid'
    }
  ]
  
  const transactionMetrics = {
    avgOrderValue: 31.45,
    itemsPerOrder: 1.7,
    paymentSuccess: 87,
    avgTimeToBuy: 4.2
  }
  
  const customerInsights = {
    topSegment: 'Senior Developers',
    topSegmentPercentage: 42,
    peakPurchaseTime: 'Weekdays 2-5 PM EST'
  }

  const getTypeColor = (type: DetailedTransaction['type']) => {
    switch (type) {
      case 'Guide':
        return 'bg-vybe-purple/20 text-vybe-purple'
      case 'App':
        return 'bg-blue-500/20 text-blue-400'
      case 'Session':
        return 'bg-pink-500/20 text-pink-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: DetailedTransaction['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/20 text-green-400'
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'Failed':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="py-6 space-y-8">
      {/* Analytics Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-vybe-gray-800 flex-wrap justify-center">
          <Link 
            href="/dashboard/analytics/overview" 
            className="px-6 py-3 font-medium rounded-lg text-vybe-gray-400 hover:text-white transition-colors"
          >
            Overview
          </Link>
          <button className="px-6 py-3 font-medium rounded-lg bg-vybe-purple text-white">
            Insights <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">PRO</span>
          </button>
        </div>
      </div>
      
      {/* Performance Insights Container */}
      <div className="vybe-card overflow-hidden mb-6" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Performance Insights</h3>
            {/* Time Period Toggle */}
            <div className="flex gap-1 bg-vybe-gray-800/50 p-1 rounded-lg">
              <button 
                onClick={() => setTimePeriod('7d')} 
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-all",
                  timePeriod === '7d' 
                    ? "bg-vybe-purple text-white" 
                    : "text-vybe-gray-400 hover:text-white"
                )}
              >
                7 Days
              </button>
              <button 
                onClick={() => setTimePeriod('30d')} 
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-all",
                  timePeriod === '30d' 
                    ? "bg-vybe-purple text-white" 
                    : "text-vybe-gray-400 hover:text-white"
                )}
              >
                30 Days
              </button>
              <button 
                onClick={() => setTimePeriod('all')} 
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-all",
                  timePeriod === 'all' 
                    ? "bg-vybe-purple text-white" 
                    : "text-vybe-gray-400 hover:text-white"
                )}
              >
                All Time
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {/* Key Insights */}
          <div className="mb-6 p-4 bg-gradient-to-r from-vybe-purple/10 to-vybe-pink/10 rounded-lg border border-vybe-purple/30">
            <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              💡 Key Insights
            </h5>
            <ul className="space-y-2">
              {keyInsights.map((insight, index) => (
                <li key={index} className="text-sm text-vybe-gray-300 flex items-start gap-2">
                  <span className={insight.color}>{insight.icon}</span>
                  {insight.text} <span className="text-white font-medium">{insight.highlight}</span> {insight.suffix}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Growth Metrics */}
          <h5 className="text-sm font-medium text-white mb-4">📈 Growth Metrics</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {growthMetrics.map((metric) => (
              <div key={metric.label} className="bg-vybe-gray-800/30 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-vybe-gray-400">{metric.label}</p>
                  <span className="text-xs text-green-400 font-medium">{metric.change}</span>
                </div>
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <div className="mt-2 h-8">
                  {/* Mini sparkline chart */}
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path 
                      d={`M${metric.sparklineData?.map((point, i) => 
                        `${i * 20},${30 - point}`
                      ).join(' L')}`}
                      stroke="url(#gradient)" 
                      strokeWidth="2" 
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#d946a0', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Optimization Opportunities */}
      <div className="vybe-card overflow-hidden mb-6" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Optimization Opportunities</h3>
        </div>
        <div className="p-6">
          <div className="mb-4 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/30">
            <p className="text-lg font-medium text-white">💰 Potential Revenue: <span className="text-green-400">+$842/month</span></p>
          </div>
          
          <div className="space-y-4">
            {optimizations.map((opt, index) => (
              <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h5 className="text-sm font-medium text-white mb-2">{index + 1}. {opt.title}</h5>
                <p className="text-sm text-vybe-gray-300 mb-2">
                  {opt.description.split(opt.impact).map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i === 0 && <span className="text-white font-medium">{opt.impact}</span>}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-xs text-vybe-gray-400">Based on: {opt.basis}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Comparative Analysis */}
      <div className="vybe-card overflow-hidden mb-6" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Comparative Analysis</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-vybe-gray-400 mb-4">You vs Similar Creators:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-vybe-gray-700">
                  <th className="text-left text-xs text-vybe-gray-400 font-medium pb-3">Metric</th>
                  <th className="text-center text-xs text-vybe-gray-400 font-medium pb-3">You</th>
                  <th className="text-center text-xs text-vybe-gray-400 font-medium pb-3">Avg</th>
                  <th className="text-center text-xs text-vybe-gray-400 font-medium pb-3">Top 10%</th>
                  <th className="text-right text-xs text-vybe-gray-400 font-medium pb-3">Your Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vybe-gray-800">
                {comparisons.map((comp) => (
                  <tr key={comp.metric}>
                    <td className="py-3 text-sm text-vybe-gray-300">{comp.metric}</td>
                    <td className="py-3 text-sm text-white text-center font-medium">{comp.you}</td>
                    <td className="py-3 text-sm text-vybe-gray-400 text-center">{comp.average}</td>
                    <td className="py-3 text-sm text-vybe-gray-400 text-center">{comp.top10}</td>
                    <td className="py-3 text-sm text-vybe-gray-300 text-right">{comp.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Complete Sales History (Pro Feature) */}
      <div className="vybe-card overflow-hidden mb-6">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Complete Sales History</h3>
            <div className="flex gap-2">
              {/* Filter Options */}
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-vybe-gray-800 text-white text-xs px-3 py-1 rounded border border-vybe-gray-700 focus:border-vybe-purple w-32"
              />
              <select 
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="bg-vybe-gray-800 text-white text-xs px-3 py-1 rounded border border-vybe-gray-700 focus:border-vybe-purple"
              >
                <option>All Products</option>
                <option>Guides</option>
                <option>Apps</option>
                <option>Mentorship</option>
              </select>
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-vybe-gray-800 text-white text-xs px-3 py-1 rounded border border-vybe-gray-700 focus:border-vybe-purple"
              >
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
              <button className="bg-vybe-purple text-white text-xs px-3 py-1 rounded hover:bg-vybe-pink transition-colors">
                Export CSV
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {/* Transaction Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-vybe-gray-800/30 rounded-lg">
              <p className="text-2xl font-semibold text-white">${transactionMetrics.avgOrderValue}</p>
              <p className="text-xs text-vybe-gray-400">Avg. Order Value</p>
            </div>
            <div className="text-center p-3 bg-vybe-gray-800/30 rounded-lg">
              <p className="text-2xl font-semibold text-white">{transactionMetrics.itemsPerOrder}</p>
              <p className="text-xs text-vybe-gray-400">Items per Order</p>
            </div>
            <div className="text-center p-3 bg-vybe-gray-800/30 rounded-lg">
              <p className="text-2xl font-semibold text-white">{transactionMetrics.paymentSuccess}%</p>
              <p className="text-xs text-vybe-gray-400">Payment Success</p>
            </div>
            <div className="text-center p-3 bg-vybe-gray-800/30 rounded-lg">
              <p className="text-2xl font-semibold text-white">{transactionMetrics.avgTimeToBuy} days</p>
              <p className="text-xs text-vybe-gray-400">Avg. Time to Buy</p>
            </div>
          </div>
          
          {/* Detailed Transaction History */}
          <div className="overflow-x-auto">
            <p className="text-sm font-medium text-white mb-3">1,847 Total Transactions</p>
            <table className="w-full">
              <thead>
                <tr className="border-b border-vybe-gray-700">
                  <th className="text-left py-3 text-xs font-medium text-vybe-gray-400">Date</th>
                  <th className="text-left py-3 text-xs font-medium text-vybe-gray-400">Product</th>
                  <th className="text-left py-3 text-xs font-medium text-vybe-gray-400">Customer</th>
                  <th className="text-center py-3 text-xs font-medium text-vybe-gray-400">Type</th>
                  <th className="text-center py-3 text-xs font-medium text-vybe-gray-400">Country</th>
                  <th className="text-right py-3 text-xs font-medium text-vybe-gray-400">Net</th>
                  <th className="text-right py-3 text-xs font-medium text-vybe-gray-400">Fee</th>
                  <th className="text-right py-3 text-xs font-medium text-vybe-gray-400">Total</th>
                  <th className="text-center py-3 text-xs font-medium text-vybe-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vybe-gray-700/50">
                {transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-vybe-gray-800/20 transition-colors">
                    <td className="py-3 text-xs text-vybe-gray-300">{transaction.date}</td>
                    <td className="py-3 text-xs text-white">{transaction.product}</td>
                    <td className="py-3 text-xs text-vybe-gray-300">{transaction.customer}</td>
                    <td className="py-3 text-xs text-center">
                      <span className={cn("px-2 py-0.5 text-xs rounded-full", getTypeColor(transaction.type))}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-center text-vybe-gray-400">{transaction.country}</td>
                    <td className="py-3 text-xs text-vybe-gray-400 text-right">${transaction.net.toFixed(2)}</td>
                    <td className="py-3 text-xs text-vybe-gray-500 text-right">${transaction.fee.toFixed(2)}</td>
                    <td className="py-3 text-xs text-white text-right font-medium">${transaction.total.toFixed(2)}</td>
                    <td className="py-3 text-xs text-center">
                      <span className={cn("px-2 py-0.5 text-xs rounded-full", getStatusColor(transaction.status))}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Customer Insights */}
          <div className="mt-6 p-4 bg-gradient-to-r from-vybe-purple/10 to-vybe-pink/10 rounded-lg border border-vybe-purple/30">
            <h5 className="text-sm font-medium text-white mb-3">🎯 Customer Insights</h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-vybe-gray-400 mb-1">Top Customer Segment</p>
                <p className="text-sm text-white font-medium">{customerInsights.topSegment} ({customerInsights.topSegmentPercentage}%)</p>
              </div>
              <div>
                <p className="text-xs text-vybe-gray-400 mb-1">Peak Purchase Time</p>
                <p className="text-sm text-white font-medium">{customerInsights.peakPurchaseTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}