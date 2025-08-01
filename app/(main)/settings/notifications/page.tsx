'use client'

import React, { useState } from 'react'
import { ArrowLeft, Mail, Smartphone, Bell, MessageSquare, DollarSign, Star, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function SettingsNotificationsPage() {
  // Email notification states
  const [emailNewSale, setEmailNewSale] = useState(true)
  const [emailNewReview, setEmailNewReview] = useState(true)
  const [emailMentorshipRequest, setEmailMentorshipRequest] = useState(true)
  const [emailWeeklySummary, setEmailWeeklySummary] = useState(false)
  const [emailProductUpdates, setEmailProductUpdates] = useState(true)
  const [emailSecurityAlerts, setEmailSecurityAlerts] = useState(true)
  const [emailMarketingEmails, setEmailMarketingEmails] = useState(false)

  // Push notification states
  const [pushNewSale, setPushNewSale] = useState(true)
  const [pushMentorshipReminder, setPushMentorshipReminder] = useState(true)
  const [pushNewMessage, setPushNewMessage] = useState(true)
  const [pushContentApproval, setPushContentApproval] = useState(true)

  // Notification timing
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true)
  const [quietHoursStart, setQuietHoursStart] = useState('22:00')
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00')
  const [notificationFrequency, setNotificationFrequency] = useState<'instant' | 'hourly' | 'daily'>('instant')

  return (
    <div className="py-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard/settings" className="text-vybe-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Settings
        </Link>
        <span className="text-vybe-gray-600">/</span>
        <span className="text-white">Notifications</span>
      </div>

      {/* Email Notifications */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Notifications
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-white">New Sale</span>
                  <p className="text-xs text-vybe-gray-400">Get notified when someone purchases your content</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNewSale}
                  onChange={(e) => setEmailNewSale(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <span className="text-white">New Review</span>
                  <p className="text-xs text-vybe-gray-400">Get notified when someone reviews your content</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNewReview}
                  onChange={(e) => setEmailNewReview(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-vybe-purple" />
                </div>
                <div>
                  <span className="text-white">Mentorship Request</span>
                  <p className="text-xs text-vybe-gray-400">Get notified when someone books a mentorship session</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailMentorshipRequest}
                  onChange={(e) => setEmailMentorshipRequest(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-white">Weekly Summary</span>
                  <p className="text-xs text-vybe-gray-400">Receive a weekly summary of your performance</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailWeeklySummary}
                  onChange={(e) => setEmailWeeklySummary(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="border-t border-vybe-gray-700 pt-4 mt-6">
              <h5 className="text-sm font-medium text-vybe-gray-400 mb-4">System Notifications</h5>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white">Product Updates</span>
                    <p className="text-xs text-vybe-gray-400">New features, improvements, and announcements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailProductUpdates}
                      onChange={(e) => setEmailProductUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white">Security Alerts</span>
                    <p className="text-xs text-vybe-gray-400">Important security and account notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailSecurityAlerts}
                      onChange={(e) => setEmailSecurityAlerts(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white">Marketing Emails</span>
                    <p className="text-xs text-vybe-gray-400">Tips, best practices, and promotional content</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailMarketingEmails}
                      onChange={(e) => setEmailMarketingEmails(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Push Notifications
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-white">New Sale</span>
                  <p className="text-xs text-vybe-gray-400">Get push notifications for new sales</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNewSale}
                  onChange={(e) => setPushNewSale(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-vybe-purple" />
                </div>
                <div>
                  <span className="text-white">Mentorship Reminder</span>
                  <p className="text-xs text-vybe-gray-400">Get reminded 15 minutes before sessions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushMentorshipReminder}
                  onChange={(e) => setPushMentorshipReminder(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-white">New Message</span>
                  <p className="text-xs text-vybe-gray-400">Get notified of new direct messages</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNewMessage}
                  onChange={(e) => setPushNewMessage(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <span className="text-white">Content Approval</span>
                  <p className="text-xs text-vybe-gray-400">Get notified when your content is approved or needs revision</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushContentApproval}
                  onChange={(e) => setPushContentApproval(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Timing */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Notification Timing</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="form-label">Notification Frequency</label>
              <select 
                value={notificationFrequency}
                onChange={(e) => setNotificationFrequency(e.target.value as 'instant' | 'hourly' | 'daily')}
                className="form-select w-full px-4 py-2 rounded-lg"
              >
                <option value="instant">Instant (as they happen)</option>
                <option value="hourly">Hourly digest</option>
                <option value="daily">Daily digest</option>
              </select>
              <p className="text-xs text-vybe-gray-400 mt-1">How often you want to receive notification summaries</p>
            </div>

            <div className="border-t border-vybe-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-white">Quiet Hours</h4>
                  <p className="text-xs text-vybe-gray-400">Pause notifications during specific hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={quietHoursEnabled}
                    onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                </label>
              </div>

              {quietHoursEnabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Start Time</label>
                    <input 
                      type="time"
                      value={quietHoursStart}
                      onChange={(e) => setQuietHoursStart(e.target.value)}
                      className="form-input w-full px-3 py-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="form-label">End Time</label>
                    <input 
                      type="time"
                      value={quietHoursEnd}
                      onChange={(e) => setQuietHoursEnd(e.target.value)}
                      className="form-input w-full px-3 py-2 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Browser Notifications */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Browser Notifications</h3>
        </div>
        <div className="p-6">
          <div className="bg-vybe-gray-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Browser Notifications</p>
                <p className="text-xs text-vybe-gray-400">Allow notifications to appear in your browser when the site is not open</p>
              </div>
              <button className="btn btn-secondary">
                Enable
              </button>
            </div>
          </div>
          <p className="text-xs text-vybe-gray-400 mt-3">
            Your browser will ask for permission to show notifications the first time you enable this feature.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary-fuchsia">
          Save Notification Settings
        </button>
      </div>
    </div>
  )
}