'use client'

import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Globe, Users, Lock, Download, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPrivacyPage() {
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'authenticated' | 'private'>('public')
  const [showEmail, setShowEmail] = useState(false)
  const [showLocation, setShowLocation] = useState(true)
  const [showSocialLinks, setShowSocialLinks] = useState(true)
  const [showActivity, setShowActivity] = useState(true)
  const [allowDirectMessages, setAllowDirectMessages] = useState(true)
  const [allowMentorshipInquiries, setAllowMentorshipInquiries] = useState(true)
  const [searchEngineIndexing, setSearchEngineIndexing] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)
  const [analyticsTracking, setAnalyticsTracking] = useState(true)

  return (
    <div className="py-6 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard/settings" className="text-vybe-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Settings
        </Link>
        <span className="text-vybe-gray-600">/</span>
        <span className="text-white">Privacy</span>
      </div>

      {/* Profile Visibility */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h3 className="text-base font-semibold text-white">Profile Visibility</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-vybe-gray-400 mb-4">Who can view your profile?</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="visibility" 
                    value="public" 
                    checked={profileVisibility === 'public'}
                    onChange={(e) => setProfileVisibility(e.target.value as 'public' | 'authenticated' | 'private')}
                    className="text-vybe-purple focus:ring-vybe-purple" 
                  />
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-vybe-purple" />
                    <div>
                      <span className="text-white">Public</span>
                      <p className="text-xs text-vybe-gray-400">Anyone on the internet can view your profile</p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="visibility" 
                    value="authenticated" 
                    checked={profileVisibility === 'authenticated'}
                    onChange={(e) => setProfileVisibility(e.target.value as 'public' | 'authenticated' | 'private')}
                    className="text-vybe-purple focus:ring-vybe-purple" 
                  />
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-vybe-pink" />
                    <div>
                      <span className="text-white">Authenticated Users Only</span>
                      <p className="text-xs text-vybe-gray-400">Only logged-in users can view your profile</p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="visibility" 
                    value="private" 
                    checked={profileVisibility === 'private'}
                    onChange={(e) => setProfileVisibility(e.target.value as 'public' | 'authenticated' | 'private')}
                    className="text-vybe-purple focus:ring-vybe-purple" 
                  />
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-400" />
                    <div>
                      <span className="text-white">Private</span>
                      <p className="text-xs text-vybe-gray-400">Only you can view your profile</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="border-t border-vybe-gray-700 pt-6">
              <h4 className="text-sm font-medium text-vybe-gray-400 mb-4">Profile Information Display</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-vybe-gray-400" />
                    <div>
                      <span className="text-white">Email Address</span>
                      <p className="text-xs text-vybe-gray-400">Show your email on your public profile</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showEmail}
                      onChange={(e) => setShowEmail(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-vybe-gray-400" />
                    <div>
                      <span className="text-white">Location</span>
                      <p className="text-xs text-vybe-gray-400">Show your location on your profile</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showLocation}
                      onChange={(e) => setShowLocation(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-vybe-gray-400" />
                    <div>
                      <span className="text-white">Social Links</span>
                      <p className="text-xs text-vybe-gray-400">Show your social media links</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSocialLinks}
                      onChange={(e) => setShowSocialLinks(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-vybe-gray-400" />
                    <div>
                      <span className="text-white">Activity Status</span>
                      <p className="text-xs text-vybe-gray-400">Show when you were last active</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showActivity}
                      onChange={(e) => setShowActivity(e.target.checked)}
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

      {/* Communication Preferences */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Communication Preferences</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Allow Direct Messages</span>
                <p className="text-xs text-vybe-gray-400">Let other users send you direct messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDirectMessages}
                  onChange={(e) => setAllowDirectMessages(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Allow Mentorship Inquiries</span>
                <p className="text-xs text-vybe-gray-400">Let users contact you for mentorship opportunities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowMentorshipInquiries}
                  onChange={(e) => setAllowMentorshipInquiries(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Indexing */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Search & Indexing</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Search Engine Indexing</span>
                <p className="text-xs text-vybe-gray-400">Allow search engines like Google to index your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchEngineIndexing}
                  onChange={(e) => setSearchEngineIndexing(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Analytics & Data Collection</span>
                <p className="text-xs text-vybe-gray-400">Allow us to collect usage data to improve your experience</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataCollection}
                  onChange={(e) => setDataCollection(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Marketing Analytics</span>
                <p className="text-xs text-vybe-gray-400">Allow third-party analytics for advertising purposes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsTracking}
                  onChange={(e) => setAnalyticsTracking(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h3 className="text-base font-semibold text-white">Data Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-vybe-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Export Your Data</p>
                  <p className="text-xs text-vybe-gray-400">Download all your content, settings, and activity data</p>
                </div>
              </div>
              <button className="btn btn-secondary">Request Export</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-red-400 font-medium">Delete All Data</p>
                  <p className="text-xs text-vybe-gray-300">Permanently delete your account and all associated data</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-400/20 text-red-400 rounded-lg hover:bg-red-400/30 transition-all text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GDPR Information */}
      <div className="bg-vybe-gray-800/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-3">Privacy Rights</h4>
        <p className="text-xs text-vybe-gray-400 mb-3">
          Under GDPR and other privacy laws, you have the right to access, rectify, erase, restrict, and port your personal data. 
          You also have the right to withdraw consent and object to processing.
        </p>
        <div className="flex gap-3 text-xs">
          <Link href="/privacy-policy" className="text-vybe-purple hover:text-vybe-pink transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-vybe-purple hover:text-vybe-pink transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-vybe-purple hover:text-vybe-pink transition-colors">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn btn-primary-fuchsia">
          Save Privacy Settings
        </button>
      </div>
    </div>
  )
}