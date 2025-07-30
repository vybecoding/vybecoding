'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { 
  Bell, 
  DollarSign, 
  Calendar, 
  Shield, 
  Zap,
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

export default function SettingsPage() {
  const { user } = useUser()
  const [activeSection, setActiveSection] = useState<'notifications' | 'payments' | 'mentorship' | 'account'>('notifications')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Settings state - would be synced with Convex
  const [settings, setSettings] = useState({
    notifications: {
      emailNewSale: true,
      emailNewReview: true,
      emailMentorshipRequest: true,
      emailWeeklySummary: false,
      pushNewSale: true,
      pushNewReview: true,
      pushMentorshipReminder: true
    },
    payments: {
      stripeConnected: true,
      payoutSchedule: 'weekly',
      minimumPayout: 50,
      currency: 'USD',
      taxForm: 'completed'
    },
    mentorship: {
      available: true,
      hourlyRate: 60,
      minimumDuration: 30,
      maximumDuration: 120,
      advanceBooking: 7,
      autoApprove: false,
      calendarUrl: 'https://cal.com/username',
      expertiseAreas: ['React', 'TypeScript', 'System Design', 'Career Guidance']
    },
    account: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      dataExportRequested: false
    }
  })

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const sections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'mentorship', label: 'Mentorship', icon: Calendar },
    { id: 'account', label: 'Account', icon: Shield }
  ]

  return (
    <div className="py-6 space-y-8">
      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                activeSection === section.id
                  ? "bg-vybe-purple/20 text-vybe-purple-light border border-vybe-purple/40"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
              )}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          )
        })}
      </div>

      {/* Notifications Settings */}
      {activeSection === 'notifications' && (
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-4">Email Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-white">New Sale</span>
                    <p className="text-xs text-gray-500">Get notified when someone purchases your content</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNewSale}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNewSale: e.target.checked }
                    })}
                    className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-white">New Review</span>
                    <p className="text-xs text-gray-500">Get notified when someone reviews your content</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNewReview}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNewReview: e.target.checked }
                    })}
                    className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-white">Mentorship Request</span>
                    <p className="text-xs text-gray-500">Get notified when someone books a mentorship session</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailMentorshipRequest}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailMentorshipRequest: e.target.checked }
                    })}
                    className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-white">Weekly Summary</span>
                    <p className="text-xs text-gray-500">Receive a weekly summary of your performance</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailWeeklySummary}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailWeeklySummary: e.target.checked }
                    })}
                    className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-4">Push Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-white">New Sale</span>
                    <p className="text-xs text-gray-500">Get push notifications for new sales</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushNewSale}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, pushNewSale: e.target.checked }
                    })}
                    className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-white">Mentorship Reminder</span>
                    <p className="text-xs text-gray-500">Get reminded 15 minutes before sessions</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushMentorshipReminder}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, pushMentorshipReminder: e.target.checked }
                    })}
                    className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payments Settings */}
      {activeSection === 'payments' && (
        <div className="space-y-6">
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Payment Settings</h3>
            
            {/* Stripe Connection Status */}
            <div className="mb-6 p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">Stripe Connected</p>
                    <p className="text-xs text-gray-300">Your account is set up to receive payments</p>
                  </div>
                </div>
                <a
                  href="https://dashboard.stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-vybe-purple hover:text-vybe-pink transition-colors"
                >
                  Dashboard
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Payout Schedule
                </label>
                <select
                  value={settings.payments.payoutSchedule}
                  onChange={(e) => setSettings({
                    ...settings,
                    payments: { ...settings.payments, payoutSchedule: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Minimum Payout Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={settings.payments.minimumPayout}
                    onChange={(e) => setSettings({
                      ...settings,
                      payments: { ...settings.payments, minimumPayout: parseInt(e.target.value) }
                    })}
                    className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Payouts will only be sent when your balance exceeds this amount
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tax Information
                </label>
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">W-9 Form</p>
                      <p className="text-xs text-gray-400">Submitted on January 15, 2024</p>
                    </div>
                    <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h4 className="text-lg font-semibold text-white mb-4">Earnings Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-semibold text-white">$1,874</p>
                <p className="text-sm text-gray-400">Available Balance</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">$4,527</p>
                <p className="text-sm text-gray-400">Lifetime Earnings</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">$287</p>
                <p className="text-sm text-gray-400">Pending Clearance</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mentorship Settings */}
      {activeSection === 'mentorship' && (
        <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-white mb-6">Mentorship Settings</h3>
          
          <div className="space-y-6">
            {/* Availability Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">Available for Mentorship</p>
                <p className="text-xs text-gray-400">Allow users to book mentorship sessions with you</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.mentorship.available}
                  onChange={(e) => setSettings({
                    ...settings,
                    mentorship: { ...settings.mentorship, available: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            {settings.mentorship.available && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Hourly Rate
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={settings.mentorship.hourlyRate}
                        onChange={(e) => setSettings({
                          ...settings,
                          mentorship: { ...settings.mentorship, hourlyRate: parseInt(e.target.value) }
                        })}
                        className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Session Duration
                    </label>
                    <select
                      value={settings.mentorship.minimumDuration}
                      onChange={(e) => setSettings({
                        ...settings,
                        mentorship: { ...settings.mentorship, minimumDuration: parseInt(e.target.value) }
                      })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                    >
                      <option value="30">30 minutes minimum</option>
                      <option value="45">45 minutes minimum</option>
                      <option value="60">60 minutes minimum</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Cal.com Integration
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={settings.mentorship.calendarUrl}
                      onChange={(e) => setSettings({
                        ...settings,
                        mentorship: { ...settings.mentorship, calendarUrl: e.target.value }
                      })}
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                      placeholder="https://cal.com/username"
                    />
                    <a
                      href="https://cal.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-vybe-purple/20 text-vybe-purple-light rounded-lg hover:bg-vybe-purple/30 transition-all text-sm font-medium flex items-center gap-1"
                    >
                      Setup
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Connect your Cal.com account to manage availability and bookings
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Expertise Areas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settings.mentorship.expertiseAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 bg-vybe-purple/20 text-vybe-purple-light rounded-full text-sm font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Edit your profile to update expertise areas
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Account Settings */}
      {activeSection === 'account' && (
        <div className="space-y-6">
          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-vybe-purple/20 text-vybe-purple-light rounded-lg hover:bg-vybe-purple/30 transition-all text-sm font-medium">
                  {settings.account.twoFactorEnabled ? 'Manage' : 'Enable'}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Session Timeout
                </label>
                <select
                  value={settings.account.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    account: { ...settings.account, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Automatically log out after this period of inactivity
                </p>
              </div>
            </div>
          </div>

          <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Data & Privacy</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Export Your Data</p>
                    <p className="text-xs text-gray-400">Download all your content, settings, and activity</p>
                  </div>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium">
                    Request Export
                  </button>
                </div>
              </div>

              <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-400 font-medium">Delete Account</p>
                    <p className="text-xs text-gray-300">Permanently delete your account and all data</p>
                  </div>
                  <button className="px-4 py-2 bg-red-400/20 text-red-400 rounded-lg hover:bg-red-400/30 transition-all text-sm font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Settings saved successfully!</span>
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
            "bg-gradient-to-r from-vybe-purple to-vybe-pink text-white",
            "hover:shadow-lg hover:shadow-vybe-purple/25",
            saving && "opacity-50 cursor-not-allowed"
          )}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  )
}