'use client'

import React from 'react'
import { Calendar, Shield, Eye, Lock, Database, Globe, AlertTriangle, Download } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 15, 2024'

  const dataTypes = [
    {
      category: 'Account Information',
      items: ['Email address', 'Username', 'Profile information', 'Authentication credentials'],
      icon: Shield
    },
    {
      category: 'Usage Data',
      items: ['Pages visited', 'Features used', 'Time spent on platform', 'Device information'],
      icon: Eye
    },
    {
      category: 'Content Data',
      items: ['Guides and apps submitted', 'Comments and reviews', 'Community interactions'],
      icon: Database
    },
    {
      category: 'Payment Information',
      items: ['Billing details', 'Transaction history', 'Payment method details (encrypted)'],
      icon: Lock
    }
  ]

  const rights = [
    {
      title: 'Access Your Data',
      description: 'Request a copy of all personal data we have about you',
      action: 'Download your data from account settings'
    },
    {
      title: 'Correct Your Data', 
      description: 'Update or correct any inaccurate personal information',
      action: 'Edit your profile and account settings'
    },
    {
      title: 'Delete Your Data',
      description: 'Request deletion of your personal data (with some exceptions)',
      action: 'Use account deletion option in privacy settings'
    },
    {
      title: 'Data Portability',
      description: 'Export your data in a machine-readable format',
      action: 'Request data export from support'
    },
    {
      title: 'Withdraw Consent',
      description: 'Withdraw consent for data processing where applicable',
      action: 'Update consent preferences in account settings'
    },
    {
      title: 'Object to Processing',
      description: 'Object to certain types of data processing',
      action: 'Contact our data protection officer'
    }
  ]

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        <div className="flex items-center justify-center gap-2 text-vybe-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last updated: {lastUpdated}</span>
        </div>
        <p className="text-lg text-vybe-gray-300 max-w-3xl mx-auto">
          We are committed to protecting your privacy and being transparent about how we collect, use, and share your information.
        </p>
      </div>

      {/* Overview */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-2xl font-bold text-white">Privacy Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Protection</h3>
              <p className="text-sm text-vybe-gray-300">We use industry-standard security measures to protect your data</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Transparency</h3>
              <p className="text-sm text-vybe-gray-300">We clearly explain what data we collect and how we use it</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Control</h3>
              <p className="text-sm text-vybe-gray-300">You have full control over your data and privacy settings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data We Collect */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((dataType, index) => (
              <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                    <dataType.icon className="w-4 h-4 text-vybe-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{dataType.category}</h3>
                </div>
                <ul className="space-y-1">
                  {dataType.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-vybe-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-vybe-purple rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Use Data */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Service Provision</h3>
                <p className="text-vybe-gray-300">To provide, maintain, and improve our platform and services.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Communication</h3>
                <p className="text-vybe-gray-300">To send you updates, notifications, and respond to your inquiries.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Personalization</h3>
                <p className="text-vybe-gray-300">To customize your experience and recommend relevant content.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Analytics</h3>
                <p className="text-vybe-gray-300">To understand how our platform is used and improve our services.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Security</h3>
                <p className="text-vybe-gray-300">To protect against fraud, abuse, and security threats.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Legal Compliance</h3>
                <p className="text-vybe-gray-300">To comply with legal obligations and enforce our terms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="vybe-card overflow-hidden">
        <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Data Sharing and Disclosure</h2>
        </div>
        <div className="p-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium text-sm mb-1">We do not sell your personal data</p>
                <p className="text-vybe-gray-300 text-sm">
                  We may share your information only in the specific circumstances outlined below.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">With Your Consent</h3>
              <p className="text-vybe-gray-300">When you explicitly agree to share information with third parties.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Service Providers</h3>
              <p className="text-vybe-gray-300">With trusted partners who help us operate our platform (payment processors, hosting providers, analytics services).</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Legal Requirements</h3>
              <p className="text-vybe-gray-300">When required by law, court order, or to protect our rights and users' safety.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Business Transfers</h3>
              <p className="text-vybe-gray-300">In connection with a merger, acquisition, or sale of assets (users will be notified).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-2xl font-bold text-white">Your Privacy Rights</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">{right.title}</h3>
                <p className="text-vybe-gray-300 text-sm mb-3">{right.description}</p>
                <p className="text-vybe-purple text-xs font-medium">{right.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Data Security</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-vybe-gray-300">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Encryption</h3>
                <p className="text-vybe-gray-300 text-sm">Data is encrypted in transit and at rest using industry-standard protocols.</p>
              </div>
              
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Access Controls</h3>
                <p className="text-vybe-gray-300 text-sm">Strict access controls ensure only authorized personnel can access data.</p>
              </div>
              
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Regular Audits</h3>
                <p className="text-vybe-gray-300 text-sm">We conduct regular security audits and vulnerability assessments.</p>
              </div>
              
              <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Incident Response</h3>
                <p className="text-vybe-gray-300 text-sm">We have procedures in place to respond quickly to security incidents.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
          <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
          </div>
          <div className="p-6">
            <p className="text-vybe-gray-300 text-sm mb-4">
              Questions about this privacy policy or our data practices?
            </p>
            <div className="space-y-2">
              <a href="mailto:privacy@vybecoding.com" className="block text-vybe-purple hover:text-vybe-pink transition-colors text-sm">
                privacy@vybecoding.com
              </a>
              <a href="/support" className="block text-vybe-purple hover:text-vybe-pink transition-colors text-sm">
                Submit a support request
              </a>
            </div>
          </div>
        </div>

        <div className="vybe-card overflow-hidden">
          <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
            <h3 className="text-lg font-bold text-white">Manage Your Data</h3>
          </div>
          <div className="p-6">
            <p className="text-vybe-gray-300 text-sm mb-4">
              Access and control your personal data through your account settings.
            </p>
            <div className="space-y-3">
              <button className="w-full btn btn-secondary text-sm flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download My Data
              </button>
              <a href="/dashboard/settings" className="w-full btn btn-secondary text-sm block text-center">
                Privacy Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}