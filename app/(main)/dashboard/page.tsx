'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Award } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useUser()
  const [activeSection, setActiveSection] = useState<'earnings' | 'analytics'>('earnings')

  // Mock data - would come from Convex in real implementation
  const earnings = {
    balance: 1874,
    last30Days: {
      sales: 287,
      salesChange: 23,
      revenue: 4527,
      revenueChange: 18,
      avgSale: 15.78,
      avgSaleChange: -4
    },
    dailyRevenue: [
      { day: 'Mon', revenue: 267, sales: 12, percent: 78 },
      { day: 'Tue', revenue: 198, sales: 8, percent: 58 },
      { day: 'Wed', revenue: 234, sales: 11, percent: 69 },
      { day: 'Thu', revenue: 156, sales: 7, percent: 46 },
      { day: 'Fri', revenue: 278, sales: 13, percent: 82 },
      { day: 'Sat', revenue: 341, sales: 16, percent: 100, isBest: true },
      { day: 'Sun', revenue: 223, sales: 10, percent: 65 }
    ],
    topPerformers: [
      { rank: 1, title: 'Claude + VSCode Mastery', type: 'Guide', sales: 23, revenue: 430 },
      { rank: 2, title: 'AI Workflow Automation', type: 'Guide', sales: 15, revenue: 234 },
      { rank: 3, title: 'React AI Components', type: 'Guide', sales: 11, revenue: 185 }
    ],
    recentTransactions: [
      { title: 'Claude + VSCode Mastery', time: '2 hours ago', amount: 47 },
      { title: 'TypeScript Pro Patterns', time: '5 hours ago', amount: 37 },
      { title: 'React Best Practices 2024', time: 'Yesterday', amount: 29 },
      { title: 'AI Agents Crash Course', time: 'Yesterday', amount: 67 },
      { title: 'Tailwind CSS Components', time: '2 days ago', amount: 19 }
    ]
  }

  return (
    <div className="py-6 space-y-8">
      {/* Earnings/Analytics Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-white/10 flex-wrap justify-center">
          <button
            onClick={() => setActiveSection('earnings')}
            className={cn(
              "px-6 py-3 font-medium rounded-lg relative transition-all",
              "hover:bg-white/5",
              activeSection === 'earnings' && "bg-vybe-purple/20 text-vybe-purple-light",
              activeSection !== 'earnings' && "text-white/60 hover:text-white/80"
            )}
          >
            Overview
            {activeSection === 'earnings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vybe-purple to-vybe-orange" />
            )}
          </button>
          <button
            onClick={() => setActiveSection('analytics')}
            className={cn(
              "px-6 py-3 font-medium rounded-lg relative transition-all",
              "hover:bg-white/5",
              activeSection === 'analytics' && "bg-vybe-purple/20 text-vybe-purple-light",
              activeSection !== 'analytics' && "text-white/60 hover:text-white/80"
            )}
          >
            Insights{' '}
            <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium ml-1">
              PRO
            </span>
            {activeSection === 'analytics' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vybe-purple to-vybe-orange" />
            )}
          </button>
        </div>
      </div>

      {/* Overview Section */}
      {activeSection === 'earnings' && (
        <div className="space-y-6">
          {/* Current Balance & Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Balance Card */}
            <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-vybe-purple" />
                  Current Balance
                </h4>
              </div>
              <p className="text-4xl font-semibold text-white mb-2">${earnings.balance}</p>
              <p className="text-sm text-gray-400 mb-2">Next payout: Friday</p>
              <p className="text-xs text-gray-500">
                Automatic weekly payouts via Stripe (minimum $50)
              </p>
            </div>

            {/* Last 30 Days Performance Card */}
            <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-vybe-pink" />
                  Last 30 Days Performance
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Sales</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-white">{earnings.last30Days.sales}</span>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {earnings.last30Days.salesChange}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Revenue</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-white">${earnings.last30Days.revenue}</span>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {earnings.last30Days.revenueChange}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Avg. Sale</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-white">${earnings.last30Days.avgSale}</span>
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {Math.abs(earnings.last30Days.avgSaleChange)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Revenue Chart */}
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-gray-700/40 border-b border-gray-600/30 px-6 py-4">
              <h4 className="font-medium text-white flex items-center gap-3">
                <div className="w-1 h-4 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full" />
                Daily Revenue Trend
                <span className="text-xs text-gray-400">(Last 7 days)</span>
              </h4>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {earnings.dailyRevenue.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 w-12">{day.day}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-vybe-purple to-vybe-pink h-full rounded-full flex items-center px-3"
                        style={{ width: `${day.percent}%` }}
                      >
                        <span className="text-xs text-white font-medium">${day.revenue}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">({day.sales} sales)</span>
                    {day.isBest && (
                      <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Best!
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-gray-700/40 border-b border-gray-600/30 px-6 py-4">
              <h4 className="font-medium text-white flex items-center gap-3">
                <div className="w-1 h-4 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full" />
                Top Performers This Month
              </h4>
            </div>
            <div className="p-6">
              {earnings.topPerformers.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        item.rank === 1 && "bg-gradient-to-r from-vybe-purple to-vybe-pink",
                        item.rank > 1 && "bg-gray-700"
                      )}
                    >
                      <span className="text-xs font-bold text-white">{item.rank}</span>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium text-white">{item.title}</h6>
                      <p className="text-xs text-gray-400">
                        {item.type} • {item.sales} sales
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-green-400">${item.revenue}</p>
                </div>
              ))}

              {/* Pro Upgrade Teaser */}
              <div className="mt-4 p-4 bg-gradient-to-r from-vybe-purple/20 to-vybe-pink/20 rounded-lg border border-vybe-purple/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white flex items-center gap-2">
                      <span className="text-lg">✨</span> Unlock Pro Analytics
                    </p>
                    <p className="text-xs text-gray-300">
                      Views, engagement rates, audience insights & more
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection('analytics')}
                    className={cn(
                      "px-5 py-2.5 bg-gradient-to-r from-vybe-purple to-vybe-pink",
                      "text-white text-sm font-semibold rounded-lg",
                      "hover:shadow-lg hover:shadow-vybe-purple/25",
                      "transition-all transform hover:scale-105"
                    )}
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-gray-700/40 border-b border-gray-600/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white flex items-center gap-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full" />
                  Recent Transactions
                </h4>
                <span className="text-xs text-gray-400">(Latest activity)</span>
              </div>
            </div>
            <div className="p-6">
              {/* Sales Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-700/30">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-white">42</p>
                  <p className="text-xs text-gray-400">Total Sales</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-white">$1,327</p>
                  <p className="text-xs text-gray-400">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-white">$31.59</p>
                  <p className="text-xs text-gray-400">Avg. Sale</p>
                </div>
              </div>

              {/* Recent Transactions List */}
              <div className="space-y-3">
                {earnings.recentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{transaction.title}</p>
                      <p className="text-xs text-gray-400">{transaction.time}</p>
                    </div>
                    <p className="text-sm font-medium text-green-400">+${transaction.amount}</p>
                  </div>
                ))}
              </div>

              {/* View More CTA */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setActiveSection('analytics')}
                  className={cn(
                    "px-4 py-2 bg-gray-800 hover:bg-gray-700",
                    "text-vybe-purple hover:text-vybe-pink",
                    "transition-all text-sm font-medium rounded-lg",
                    "border border-gray-700"
                  )}
                >
                  View Complete History (Pro) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Pro Section */}
      {activeSection === 'analytics' && (
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-vybe-purple to-vybe-pink rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Unlock Pro Analytics
            </h3>
            <p className="text-gray-300 mb-8">
              Get detailed insights into your content performance, audience demographics,
              engagement metrics, and revenue trends with Pro analytics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-medium text-white mb-1">Advanced Metrics</h4>
                <p className="text-xs text-gray-400">
                  Views, completion rates, engagement scores
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-medium text-white mb-1">Audience Insights</h4>
                <p className="text-xs text-gray-400">
                  Demographics, interests, behavior patterns
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <h4 className="font-medium text-white mb-1">AI Recommendations</h4>
                <p className="text-xs text-gray-400">
                  Personalized tips to boost your earnings
                </p>
              </div>
            </div>
            <a
              href="/pricing"
              className={cn(
                "inline-block px-8 py-3",
                "bg-gradient-to-r from-vybe-purple to-vybe-pink",
                "text-white font-semibold rounded-lg",
                "hover:shadow-lg hover:shadow-vybe-purple/25",
                "transition-all transform hover:scale-105"
              )}
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      )}
    </div>
  )
}