'use client'

import React, { useState } from 'react'
import { Calendar, Cookie, Settings, Shield, BarChart, Target, AlertCircle, Check, X } from 'lucide-react'

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required
    analytics: true,
    marketing: false,
    preferences: true
  })

  const cookieTypes = [
    {
      name: 'Strictly Necessary',
      key: 'necessary',
      icon: Shield,
      required: true,
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: ['Authentication tokens', 'Session management', 'Security preferences', 'CSRF protection'],
      retention: 'Session or up to 1 year',
      canDisable: false
    },
    {
      name: 'Analytics & Performance',
      key: 'analytics',
      icon: BarChart,
      required: false,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Google Analytics', 'Page view tracking', 'Performance monitoring', 'Error reporting'],
      retention: 'Up to 2 years',
      canDisable: true
    },
    {
      name: 'Marketing & Advertising',
      key: 'marketing',
      icon: Target,
      required: false,
      description: 'These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.',
      examples: ['Ad targeting', 'Social media integration', 'Conversion tracking', 'Remarketing'],
      retention: 'Up to 1 year',
      canDisable: true
    },
    {
      name: 'Preferences & Functionality',
      key: 'preferences',
      icon: Settings,
      required: false,
      description: 'These cookies allow the website to remember choices you make and provide enhanced, more personal features.',
      examples: ['Language preferences', 'Theme selection', 'Form data', 'User interface settings'],
      retention: 'Up to 1 year',
      canDisable: true
    }
  ]

  const specificCookies = [
    {
      name: '__clerk_session',
      purpose: 'User authentication and session management',
      type: 'Necessary',
      duration: '7 days',
      provider: 'Clerk'
    },
    {
      name: '_ga',
      purpose: 'Distinguishes unique users for analytics',
      type: 'Analytics',
      duration: '2 years',
      provider: 'Google Analytics'
    },
    {
      name: '_ga_*',
      purpose: 'Contains campaign, source, and medium data',
      type: 'Analytics',
      duration: '2 years',
      provider: 'Google Analytics'
    },
    {
      name: 'vybe_theme',
      purpose: 'Remembers user theme preference',
      type: 'Preferences',
      duration: '1 year',
      provider: 'Vybe Coding'
    },
    {
      name: 'vybe_consent',
      purpose: 'Stores cookie consent preferences',
      type: 'Necessary',
      duration: '1 year',
      provider: 'Vybe Coding'
    }
  ]

  const handlePreferenceChange = (key: string, value: boolean) => {
    if (key === 'necessary') return // Cannot change necessary cookies
    setCookiePreferences(prev => ({ ...prev, [key]: value }))
  }

  const savePreferences = () => {
    // In a real implementation, this would save to cookies/localStorage
    alert('Cookie preferences saved successfully!')
  }

  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    })
  }

  const rejectAll = () => {
    setCookiePreferences({
      necessary: true, // Always required
      analytics: false,
      marketing: false,
      preferences: false
    })
  }

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Cookie Policy</h1>
        <div className="flex items-center justify-center gap-2 text-vybe-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last updated: January 15, 2024</span>
        </div>
        <p className="text-lg text-vybe-gray-300 max-w-3xl mx-auto">
          This Cookie Policy explains how Vybe Coding uses cookies and similar technologies when you visit our website. 
          Learn about the types of cookies we use and how to manage your preferences.
        </p>
      </div>

      {/* What are Cookies */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cookie className="w-6 h-6" />
            What are Cookies?
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-vybe-gray-300 leading-relaxed">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">First-Party Cookies</h3>
                <p className="text-vybe-gray-300 text-sm">Set directly by our website for essential functionality and user experience.</p>
              </div>
              
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Third-Party Cookies</h3>
                <p className="text-vybe-gray-300 text-sm">Set by external services we use, such as analytics or advertising providers.</p>
              </div>
              
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Session vs Persistent</h3>
                <p className="text-vybe-gray-300 text-sm">Some cookies are temporary (session) while others remain on your device (persistent).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
          <p className="text-vybe-gray-300 text-sm mt-1">Choose which types of cookies you want to allow</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {cookieTypes.map((type) => (
              <div key={type.key} className="p-4 bg-vybe-gray-800/30 rounded-lg border border-vybe-gray-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 bg-vybe-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <type.icon className="w-4 h-4 text-vybe-purple" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                        {type.required && (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-vybe-gray-300 text-sm mb-3">{type.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="text-white font-medium mb-1">Examples:</h4>
                          <ul className="text-vybe-gray-400 space-y-1">
                            {type.examples.map((example, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">Retention:</h4>
                          <p className="text-vybe-gray-400">{type.retention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {type.canDisable ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences[type.key as keyof typeof cookiePreferences]}
                          onChange={(e) => handlePreferenceChange(type.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                      </label>
                    ) : (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <Check className="w-4 h-4" />
                        <span>Always Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Preference Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={acceptAll} className="btn btn-primary-fuchsia">
                Accept All Cookies
              </button>
              <button onClick={rejectAll} className="btn btn-secondary">
                Reject Optional Cookies
              </button>
              <button onClick={savePreferences} className="btn btn-secondary">
                Save Current Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specific Cookies */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Specific Cookies We Use</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-vybe-gray-700">
                  <th className="text-left py-3 text-sm font-medium text-vybe-gray-400">Cookie Name</th>
                  <th className="text-left py-3 text-sm font-medium text-vybe-gray-400">Purpose</th>
                  <th className="text-center py-3 text-sm font-medium text-vybe-gray-400">Type</th>
                  <th className="text-center py-3 text-sm font-medium text-vybe-gray-400">Duration</th>
                  <th className="text-center py-3 text-sm font-medium text-vybe-gray-400">Provider</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vybe-gray-700/50">
                {specificCookies.map((cookie, index) => (
                  <tr key={index} className="hover:bg-vybe-gray-800/20 transition-colors">
                    <td className="py-3 text-sm text-white font-mono">{cookie.name}</td>
                    <td className="py-3 text-sm text-vybe-gray-300">{cookie.purpose}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cookie.type === 'Necessary' ? 'bg-red-500/20 text-red-400' :
                        cookie.type === 'Analytics' ? 'bg-blue-500/20 text-blue-400' :
                        cookie.type === 'Preferences' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {cookie.type}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-vybe-gray-300 text-center">{cookie.duration}</td>
                    <td className="py-3 text-sm text-vybe-gray-300 text-center">{cookie.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Managing Cookies */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Managing Your Cookies</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <p className="text-vybe-gray-300">
              You have several options for managing cookies and your privacy preferences:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Browser Settings</h3>
                <p className="text-vybe-gray-300 text-sm">
                  Most browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="space-y-2 text-sm text-vybe-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    View and delete existing cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Block cookies from specific sites
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Block third-party cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Clear cookies when closing the browser
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Our Cookie Banner</h3>
                <p className="text-vybe-gray-300 text-sm">
                  When you first visit our site, you'll see a cookie consent banner where you can:
                </p>
                <ul className="space-y-2 text-sm text-vybe-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Accept all cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Reject optional cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Customize your preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                    Learn more about each cookie type
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium text-sm mb-1">Important Note</p>
                  <p className="text-vybe-gray-300 text-sm">
                    Disabling cookies may affect the functionality of our website. Some features may not work properly without certain cookies enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center bg-vybe-gray-800/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Questions About Our Cookie Policy?</h3>
        <p className="text-vybe-gray-300 mb-4">
          If you have any questions about how we use cookies, please contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/support" className="btn btn-secondary">
            Contact Support
          </a>
          <a href="/privacy-policy" className="btn btn-secondary">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}