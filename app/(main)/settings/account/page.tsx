'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, Shield, Clock, Key } from 'lucide-react'
import Link from 'next/link'

export default function SettingsAccountPage() {
  const { user } = useUser()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30)

  return (
    <div className="py-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard/settings" className="text-vybe-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Settings
        </Link>
        <span className="text-vybe-gray-600">/</span>
        <span className="text-white">Account</span>
      </div>

      {/* Account Information */}  
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Account Information</h3>
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
              <label className="form-label">Account ID</label>
              <input 
                type="text" 
                value={user?.id || 'user_xxxxxxxxxxxxxxxxxx'}
                disabled
                className="form-input w-full px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" 
              />
              <p className="text-xs text-vybe-gray-400 mt-1">Your unique account identifier</p>
            </div>

            <div>
              <label className="form-label">Account Created</label>
              <input 
                type="text" 
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 15, 2024'}
                disabled
                className="form-input w-full px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" 
              />
              <p className="text-xs text-vybe-gray-400 mt-1">Date when your account was created</p>
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
                <button className="btn btn-secondary flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
              <p className="text-xs text-vybe-gray-400 mt-1">Update your password for security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h3 className="text-base font-semibold text-white">Security Settings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-vybe-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-vybe-purple" />
                </div>
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-vybe-gray-400">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button 
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  twoFactorEnabled 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'btn btn-secondary'
                }`}
              >
                {twoFactorEnabled ? 'Enabled' : 'Enable'}
              </button>
            </div>

            {twoFactorEnabled && (
              <div className="ml-13 p-4 bg-green-900/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400 mb-2">✓ Two-Factor Authentication is active</p>
                <p className="text-xs text-vybe-gray-400 mb-3">Your account is protected with 2FA. You'll need your authenticator app to sign in.</p>
                <div className="flex gap-3">
                  <button className="px-3 py-1.5 text-xs bg-green-600/20 text-green-400 rounded border border-green-500/30 hover:bg-green-600/30 transition-colors">
                    View Backup Codes
                  </button>
                  <button className="px-3 py-1.5 text-xs bg-red-600/20 text-red-400 rounded border border-red-500/30 hover:bg-red-600/30 transition-colors">
                    Disable 2FA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Session Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="form-label flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Session Timeout
              </label>
              <select 
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                className="form-select w-full px-4 py-2 rounded-lg"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={480}>8 hours</option>
                <option value={1440}>24 hours</option>
              </select>
              <p className="text-xs text-vybe-gray-400 mt-1">Automatically log out after this period of inactivity</p>
            </div>

            <div className="border-t border-vybe-gray-700 pt-6">
              <h4 className="text-sm font-medium text-white mb-4">Active Sessions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-vybe-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm text-white">Chrome on Windows</p>
                      <p className="text-xs text-vybe-gray-400">Current session • New York, NY</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">CURRENT</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-vybe-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-vybe-gray-700 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-vybe-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm text-white">Safari on iPhone</p>
                      <p className="text-xs text-vybe-gray-400">2 hours ago • New York, NY</p>
                    </div>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-300 font-medium">
                    Revoke
                  </button>
                </div>
              </div>
              
              <button className="mt-4 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all text-sm font-medium">
                Sign Out All Other Sessions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Account Actions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-vybe-gray-800/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Download Account Data</p>
                <p className="text-xs text-vybe-gray-400">Export all your profile data, content, and activity</p>
              </div>
              <button className="btn btn-secondary">
                Request Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
              <div>
                <p className="text-red-400 font-medium">Deactivate Account</p>
                <p className="text-xs text-vybe-gray-300">Temporarily disable your account (can be reactivated)</p>
              </div>
              <button className="px-4 py-2 bg-red-400/20 text-red-400 rounded-lg hover:bg-red-400/30 transition-all text-sm font-medium">
                Deactivate
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
              <div>
                <p className="text-red-500 font-medium">Delete Account</p>
                <p className="text-xs text-vybe-gray-300">Permanently delete your account and all data (cannot be undone)</p>
              </div>
              <button className="px-4 py-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 transition-all text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary-fuchsia">
          Save Changes
        </button>
      </div>
    </div>
  )
}