'use client'

import React, { useState } from 'react'
import { ArrowLeft, CreditCard, Download, History, AlertCircle, Check, X, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function SettingsBillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('free')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [autoRenew, setAutoRenew] = useState(true)
  const [emailReceipts, setEmailReceipts] = useState(true)

  return (
    <div className="py-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard/settings" className="text-vybe-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Settings
        </Link>
        <span className="text-vybe-gray-600">/</span>
        <span className="text-white">Billing</span>
      </div>

      {/* Current Plan */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h3 className="text-base font-semibold text-white">Current Plan</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Free Plan</h4>
                <p className="text-sm text-vybe-gray-400">Perfect for getting started</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">$0</p>
              <p className="text-sm text-vybe-gray-400">per month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="text-sm font-medium text-white mb-3">Current Features</h5>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-vybe-gray-300">
                  <Check className="w-4 h-4 text-green-400" />
                  3 apps submissions per month
                </li>
                <li className="flex items-center gap-2 text-sm text-vybe-gray-300">
                  <Check className="w-4 h-4 text-green-400" />
                  5 guides submissions per month
                </li>
                <li className="flex items-center gap-2 text-sm text-vybe-gray-300">
                  <Check className="w-4 h-4 text-green-400" />
                  Basic profile features
                </li>
                <li className="flex items-center gap-2 text-sm text-vybe-gray-300">
                  <X className="w-4 h-4 text-red-400" />
                  Priority support
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-white mb-3">Usage This Month</h5>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-vybe-gray-300">Apps Submitted</span>
                    <span className="text-white">2 / 3</span>
                  </div>
                  <div className="w-full bg-vybe-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '66%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-vybe-gray-300">Guides Published</span>
                    <span className="text-white">1 / 5</span>
                  </div>
                  <div className="w-full bg-vybe-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary-fuchsia">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Available Plans</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-vybe-gray-800 rounded-lg p-1">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  billingCycle === 'monthly' ? 'bg-vybe-purple text-white' : 'text-vybe-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  billingCycle === 'yearly' ? 'bg-vybe-purple text-white' : 'text-vybe-gray-400 hover:text-white'
                }`}
              >
                Yearly <span className="text-green-400 text-xs ml-1">(Save 20%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className={`rounded-lg border p-6 transition-all ${
              selectedPlan === 'free' ? 'border-vybe-purple bg-vybe-purple/5' : 'border-vybe-gray-700 bg-vybe-gray-800/30'
            }`}>
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Free</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">$0</span>
                  <span className="text-vybe-gray-400 text-sm">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                <p className="text-sm text-vybe-gray-400">Perfect for getting started</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">3 apps per month</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">5 guides per month</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Basic analytics</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-vybe-gray-400">Priority support</span>
                </li>
              </ul>
              <button 
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  selectedPlan === 'free' ? 'bg-vybe-purple text-white' : 'bg-vybe-gray-700 text-vybe-gray-300 hover:bg-vybe-gray-600'
                }`}
                disabled={selectedPlan === 'free'}
              >
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className={`rounded-lg border p-6 transition-all relative ${
              selectedPlan === 'pro' ? 'border-vybe-purple bg-vybe-purple/5' : 'border-vybe-gray-700 bg-vybe-gray-800/30'
            }`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-vybe-purple text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Pro</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">
                    ${billingCycle === 'monthly' ? '19' : '15'}
                  </span>
                  <span className="text-vybe-gray-400 text-sm">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                </div>
                <p className="text-sm text-vybe-gray-400">For serious creators</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Unlimited apps & guides</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Priority support</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Custom branding</span>
                </li>
              </ul>
              <button 
                onClick={() => setSelectedPlan('pro')}
                className="w-full py-2 px-4 bg-vybe-purple text-white rounded-lg text-sm font-medium hover:bg-vybe-purple/90 transition-all"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className={`rounded-lg border p-6 transition-all ${
              selectedPlan === 'enterprise' ? 'border-vybe-purple bg-vybe-purple/5' : 'border-vybe-gray-700 bg-vybe-gray-800/30'
            }`}>
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Enterprise</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">
                    ${billingCycle === 'monthly' ? '49' : '39'}
                  </span>
                  <span className="text-vybe-gray-400 text-sm">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                </div>
                <p className="text-sm text-vybe-gray-400">For teams and organizations</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Team collaboration</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">API access</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-vybe-gray-300">Dedicated support</span>
                </li>
              </ul>
              <button 
                onClick={() => setSelectedPlan('enterprise')}
                className="w-full py-2 px-4 bg-transparent border border-vybe-gray-600 text-white rounded-lg text-sm font-medium hover:bg-vybe-gray-800 transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Payment Method</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-vybe-gray-800/30 rounded-lg mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">No payment method</p>
                <p className="text-xs text-vybe-gray-400">Add a payment method to upgrade your plan</p>
              </div>
            </div>
            <button className="btn btn-secondary">
              Add Payment Method
            </button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium text-sm">Secure Payment Processing</p>
                <p className="text-xs text-vybe-gray-300 mt-1">
                  We use Stripe for secure payment processing. Your payment information is encrypted and never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Settings */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Billing Settings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Auto-Renewal</h4>
                <p className="text-xs text-vybe-gray-400">Automatically renew your subscription</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Email Receipts</h4>
                <p className="text-xs text-vybe-gray-400">Receive email receipts for payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailReceipts}
                  onChange={(e) => setEmailReceipts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-3">Billing Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="form-input w-full px-4 py-2 rounded-lg" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="form-input w-full px-4 py-2 rounded-lg" 
                />
                <input 
                  type="text" 
                  placeholder="Address Line 1" 
                  className="form-input w-full px-4 py-2 rounded-lg md:col-span-2" 
                />
                <input 
                  type="text" 
                  placeholder="City" 
                  className="form-input w-full px-4 py-2 rounded-lg" 
                />
                <input 
                  type="text" 
                  placeholder="ZIP Code" 
                  className="form-input w-full px-4 py-2 rounded-lg" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Billing History</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-vybe-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-vybe-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">No Billing History</h4>
            <p className="text-vybe-gray-400 text-sm mb-4">You haven't made any payments yet. Upgrade to a paid plan to see your billing history here.</p>
            <button className="btn btn-primary-fuchsia">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary-fuchsia">
          Save Billing Settings
        </button>
      </div>
    </div>
  )
}