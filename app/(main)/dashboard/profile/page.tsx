'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Camera, User, Globe, Lock, Save, AlertCircle } from 'lucide-react'

export default function DashboardProfilePage() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Form state - would be synced with Convex in real implementation
  const [formData, setFormData] = useState({
    displayName: user?.fullName || '',
    username: user?.username || '',
    bio: 'Full-stack developer passionate about building AI-powered applications. I love sharing knowledge and helping others grow in their coding journey.',
    location: 'San Francisco, CA',
    website: 'https://myportfolio.com',
    twitter: '@myhandle',
    github: 'myusername',
    linkedin: 'in/myprofile',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'AI/ML'],
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    showSocials: true
  })

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSkillRemove = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const input = e.currentTarget
      const skill = input.value.trim()
      if (skill && !formData.skills.includes(skill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, skill]
        }))
        input.value = ''
      }
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-8">
      {/* Profile Header */}
      <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user?.imageUrl || '/api/placeholder/120/120'}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-vybe-purple rounded-full hover:bg-vybe-purple/80 transition-all">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/300 characters</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-vybe-purple" />
          Contact & Social Links
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Twitter
              </label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                placeholder="@handle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                GitHub
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                LinkedIn
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
                placeholder="in/profile"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span className="text-2xl">💪</span>
          Skills & Expertise
        </h3>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-vybe-purple/20 text-vybe-purple-light rounded-full text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleSkillRemove(skill)}
                  className="text-vybe-purple-light/60 hover:text-vybe-purple-light transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            onKeyDown={handleSkillAdd}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-vybe-purple focus:outline-none transition-colors"
            placeholder="Type a skill and press Enter..."
          />
          <p className="text-xs text-gray-500">Add up to 10 skills that showcase your expertise</p>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-vybe-shadow/80 backdrop-blur-sm border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-vybe-purple" />
          Privacy Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Profile Visibility
            </label>
            <div className="space-y-2">
              {['public', 'authenticated', 'private'].map((visibility) => (
                <label key={visibility} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value={visibility}
                    checked={formData.profileVisibility === visibility}
                    onChange={(e) => setFormData({ ...formData, profileVisibility: e.target.value })}
                    className="w-4 h-4 text-vybe-purple focus:ring-vybe-purple"
                  />
                  <div>
                    <span className="text-white capitalize">{visibility}</span>
                    <p className="text-xs text-gray-500">
                      {visibility === 'public' && 'Anyone can view your profile'}
                      {visibility === 'authenticated' && 'Only logged-in users can view your profile'}
                      {visibility === 'private' && 'Only you can view your profile'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Show on Profile
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showEmail}
                  onChange={(e) => setFormData({ ...formData, showEmail: e.target.checked })}
                  className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                />
                <span className="text-white">Email Address</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showLocation}
                  onChange={(e) => setFormData({ ...formData, showLocation: e.target.checked })}
                  className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                />
                <span className="text-white">Location</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showSocials}
                  onChange={(e) => setFormData({ ...formData, showSocials: e.target.checked })}
                  className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple"
                />
                <span className="text-white">Social Links</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {saved && (
            <>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">Profile saved successfully!</span>
            </>
          )}
        </div>
        <div className="flex gap-3">
          <a
            href={`/profile/${formData.username}`}
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-medium"
          >
            View Public Profile
          </a>
          <button
            onClick={handleSave}
            disabled={loading}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
              "bg-gradient-to-r from-vybe-purple to-vybe-pink text-white",
              "hover:shadow-lg hover:shadow-vybe-purple/25",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? (
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

      {/* Profile Completion Tips */}
      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-400 mb-1">
              Complete your profile to increase visibility
            </p>
            <p className="text-xs text-gray-300">
              Profiles with complete information, skills, and social links get 3x more engagement and mentorship requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}