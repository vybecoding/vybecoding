'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function SettingsPage() {
  const { user } = useUser()
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'notifications' | 'privacy' | 'billing'>('profile')
  
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'billing', label: 'Billing & Subscription' }
  ]

  return (
    <div className="py-6 space-y-8">
      {/* Settings Sub-tabs Navigation */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-vybe-gray-800 flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={cn(
                "px-6 py-3 font-medium rounded-lg transition-all hover:bg-vybe-gray-800",
                activeSection === tab.id ? "text-white active" : "text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Settings Content */}
      <div className="space-y-6">
        {/* Profile Section - Redirect to dedicated profile page */}
        {activeSection === 'profile' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-white mb-4">Profile Settings</h3>
            <p className="text-vybe-gray-400 mb-6">Manage your profile information, skills, and social links.</p>
            <Link 
              href="/dashboard/profile" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white rounded-lg hover:shadow-lg hover:shadow-vybe-purple/25 transition-all font-medium"
            >
              Go to Profile Settings
            </Link>
          </div>
        )}

        {/* Account Section */}
        {activeSection === 'account' && (
          <div className="space-y-6">
            <div className="vybe-card overflow-hidden">
              <div className="vybe-card-header">
                <h3 className="vybe-section-header">
                  <div className="vybe-gradient-accent-bar"></div>
                  Account Settings
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      value={user?.emailAddresses[0]?.emailAddress || ''}
                      disabled
                      className="form-input w-full px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" 
                    />
                    <p className="text-xs text-vybe-gray-400 mt-1">Email cannot be changed. Contact support if needed.</p>
                  </div>
                  
                  <div>
                    <label className="form-label">Password</label>
                    <div className="flex gap-3">
                      <input 
                        type="password" 
                        value="••••••••"
                        disabled
                        className="form-input flex-1 px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" 
                      />
                      <button className="btn btn-secondary">Change Password</button>
                    </div>
                  </div>
                  
                  <div className="border-t border-vybe-gray-700 pt-6">
                    <h4 className="text-sm font-medium text-white mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 bg-vybe-gray-800/30 rounded-lg">
                      <div>
                        <p className="text-white">Enable 2FA</p>
                        <p className="text-xs text-vybe-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn btn-secondary">Enable</button>
                    </div>
                  </div>
                  
                  <div className="border-t border-vybe-gray-700 pt-6">
                    <h4 className="text-sm font-medium text-white mb-4">Session Management</h4>
                    <div>
                      <label className="form-label">Session Timeout</label>
                      <select className="form-select w-full px-4 py-2 rounded-lg">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                      </select>
                      <p className="text-xs text-vybe-gray-400 mt-1">Automatically log out after this period of inactivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="vybe-card overflow-hidden">
            <div className="vybe-card-header">
              <h3 className="vybe-section-header">
                <div className="vybe-gradient-accent-bar"></div>
                Notification Preferences
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white">New Sale</span>
                        <p className="text-xs text-vybe-gray-400">Get notified when someone purchases your content</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white">New Review</span>
                        <p className="text-xs text-vybe-gray-400">Get notified when someone reviews your content</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white">Mentorship Request</span>
                        <p className="text-xs text-vybe-gray-400">Get notified when someone books a mentorship session</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white">Weekly Summary</span>
                        <p className="text-xs text-vybe-gray-400">Receive a weekly summary of your performance</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                    </label>
                  </div>
                </div>

                <div className="border-t border-vybe-gray-700 pt-6">
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-4">Push Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white">New Sale</span>
                        <p className="text-xs text-vybe-gray-400">Get push notifications for new sales</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="text-white">Mentorship Reminder</span>
                        <p className="text-xs text-vybe-gray-400">Get reminded 15 minutes before sessions</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Section */}
        {activeSection === 'privacy' && (
          <div className="space-y-6">
            <div className="vybe-card overflow-hidden">
              <div className="vybe-card-header">
                <h3 className="vybe-section-header">
                  <div className="vybe-gradient-accent-bar"></div>
                  Privacy Settings
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-vybe-gray-400 mb-4">Profile Visibility</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="visibility" value="public" defaultChecked className="text-vybe-purple focus:ring-vybe-purple" />
                        <div>
                          <span className="text-white">Public</span>
                          <p className="text-xs text-vybe-gray-400">Anyone can view your profile</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="visibility" value="authenticated" className="text-vybe-purple focus:ring-vybe-purple" />
                        <div>
                          <span className="text-white">Authenticated Users Only</span>
                          <p className="text-xs text-vybe-gray-400">Only logged-in users can view your profile</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="visibility" value="private" className="text-vybe-purple focus:ring-vybe-purple" />
                        <div>
                          <span className="text-white">Private</span>
                          <p className="text-xs text-vybe-gray-400">Only you can view your profile</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-vybe-gray-700 pt-6">
                    <h4 className="text-sm font-medium text-vybe-gray-400 mb-4">Show on Profile</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                        <span className="text-white">Email Address</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                        <span className="text-white">Location</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" />
                        <span className="text-white">Social Links</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vybe-card overflow-hidden">
              <div className="vybe-card-header">
                <h3 className="vybe-section-header">
                  <div className="vybe-gradient-accent-bar"></div>
                  Data & Privacy
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-vybe-gray-800/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Export Your Data</p>
                      <p className="text-xs text-vybe-gray-400">Download all your content, settings, and activity</p>
                    </div>
                    <button className="btn btn-secondary">Request Export</button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
                    <div>
                      <p className="text-red-400 font-medium">Delete Account</p>
                      <p className="text-xs text-vybe-gray-300">Permanently delete your account and all data</p>
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

        {/* Billing Section */}
        {activeSection === 'billing' && (
          <div className="space-y-6">
            <div className="vybe-card overflow-hidden">
              <div className="vybe-card-header">
                <h3 className="vybe-section-header">
                  <div className="vybe-gradient-accent-bar"></div>
                  Payment Settings
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6 p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-400 font-medium">Stripe Connected</p>
                        <p className="text-xs text-vybe-gray-300">Your account is set up to receive payments</p>
                      </div>
                    </div>
                    <a href="#" className="text-sm text-vybe-purple hover:text-vybe-pink transition-colors">
                      Dashboard →
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Payout Schedule</label>
                    <select className="form-select w-full px-4 py-2 rounded-lg">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Minimum Payout Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-vybe-gray-500">$</span>
                      <input type="number" defaultValue="50" className="form-input w-full pl-8 pr-4 py-2 rounded-lg" />
                    </div>
                    <p className="text-xs text-vybe-gray-400 mt-1">Payouts will only be sent when your balance exceeds this amount</p>
                  </div>

                  <div>
                    <label className="form-label">Tax Information</label>
                    <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">W-9 Form</p>
                          <p className="text-xs text-vybe-gray-400">Submitted on January 15, 2024</p>
                        </div>
                        <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vybe-card overflow-hidden">
              <div className="vybe-card-header">
                <h3 className="vybe-section-header">
                  <div className="vybe-gradient-accent-bar"></div>
                  Earnings Summary
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-white">$1,874</p>
                    <p className="text-sm text-vybe-gray-400">Available Balance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-white">$4,527</p>
                    <p className="text-sm text-vybe-gray-400">Lifetime Earnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-white">$287</p>
                    <p className="text-sm text-vybe-gray-400">Pending Clearance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="btn btn-primary-fuchsia">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}