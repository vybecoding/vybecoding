'use client'

import React from 'react'
import { Calendar, AlertCircle, Shield, Scale } from 'lucide-react'

export default function TermsOfServicePage() {
  const lastUpdated = 'January 15, 2024'

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Vybe Coding ("Service"), you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These Terms of Service apply to all users of the Service, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.'
      ]
    },
    {
      title: 'Use License',
      content: [
        'Permission is granted to temporarily download one copy of the materials on Vybe Coding for personal, non-commercial transitory viewing only.',
        'This is the grant of a license, not a transfer of title, and under this license you may not:',
        '• Modify or copy the materials',
        '• Use the materials for any commercial purpose or for any public display',
        '• Attempt to reverse engineer any software contained on the website',
        '• Remove any copyright or other proprietary notations from the materials'
      ]
    },
    {
      title: 'User Accounts',
      content: [
        'To access certain features of the Service, you must register for an account.',
        'You are responsible for maintaining the confidentiality of your account and password.',
        'You agree to accept responsibility for all activities that occur under your account.',
        'You must notify us immediately of any unauthorized use of your account.',
        'We reserve the right to terminate accounts that violate these terms.'
      ]
    },
    {
      title: 'Content and Conduct',
      content: [
        'Users may submit content including guides, applications, and comments.',
        'You retain ownership of content you submit, but grant us a license to use, modify, and distribute it.',
        'Prohibited content includes but is not limited to:',
        '• Illegal, harmful, or offensive material',
        '• Content that infringes on intellectual property rights',
        '• Spam, malware, or malicious code',
        '• Personal information of others without consent',
        'We reserve the right to remove content and suspend accounts for violations.'
      ]
    },
    {
      title: 'Payment Terms',
      content: [
        'Certain features of the Service require payment of fees.',
        'All fees are non-refundable except as required by law or as explicitly stated.',
        'We may change our fees at any time with 30 days notice to users.',
        'For content creators, we retain a commission on sales as detailed in our Creator Agreement.',
        'Payouts are processed according to our payment schedule and minimum thresholds.'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'The Service and its original content are owned by Vybe Coding and protected by copyright laws.',
        'Our trademarks and trade dress may not be used without our written permission.',
        'User-generated content remains owned by the user but is licensed to us for Service operation.',
        'We respect intellectual property rights and respond to valid DMCA takedown notices.'
      ]
    },
    {
      title: 'Privacy and Data',
      content: [
        'Your privacy is important to us. Please review our Privacy Policy.',
        'We collect and use information as described in our Privacy Policy.',
        'You consent to data processing as necessary for Service provision.',
        'We implement appropriate security measures to protect your data.'
      ]
    },
    {
      title: 'Disclaimers',
      content: [
        'The information on this website is provided on an "as is" basis.',
        'We make no warranties, expressed or implied, and hereby disclaim all other warranties.',
        'We do not warrant that the Service will be uninterrupted or error-free.',
        'Content accuracy is not guaranteed and should be independently verified.'
      ]
    },
    {
      title: 'Limitations of Liability',
      content: [
        'In no event shall Vybe Coding be liable for any damages arising out of the use or inability to use the Service.',
        'This includes but is not limited to damages for loss of profits, data, or other intangible losses.',
        'Our total liability shall not exceed the amount paid by you for the Service in the preceding 12 months.',
        'Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability.'
      ]
    },
    {
      title: 'Termination',
      content: [
        'We may terminate or suspend your account immediately for any reason.',
        'Upon termination, your right to use the Service will cease immediately.',
        'Provisions that should survive termination will remain in effect.',
        'You may terminate your account at any time through your account settings.'
      ]
    },
    {
      title: 'Governing Law',
      content: [
        'These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction].',
        'Any disputes shall be resolved in the courts of [Jurisdiction].',
        'If any provision of these Terms is deemed invalid, the remainder shall remain in effect.'
      ]
    },
    {
      title: 'Changes to Terms',
      content: [
        'We reserve the right to update these Terms at any time.',
        'Users will be notified of material changes via email or Service notification.',
        'Continued use of the Service after changes constitutes acceptance of new Terms.',
        'Previous versions of Terms are archived and available upon request.'
      ]
    }
  ]

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
        <div className="flex items-center justify-center gap-2 text-vybe-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Important Notice */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Important Notice
          </h2>
        </div>
        <div className="p-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 font-medium text-sm mb-2">Please Read Carefully</p>
            <p className="text-vybe-gray-300 text-sm leading-relaxed">
              These Terms of Service govern your use of the Vybe Coding platform. By creating an account or using our services, 
              you agree to be bound by these terms. If you disagree with any part of these terms, you may not use our Service.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h2 className="text-lg font-bold text-white">{index + 1}. {section.title}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-vybe-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">Related Documents</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/privacy-policy" 
              className="flex items-center gap-3 p-4 bg-vybe-gray-800/30 rounded-lg hover:bg-vybe-gray-800/50 transition-colors group"
            >
              <Shield className="w-5 h-5 text-vybe-purple group-hover:text-vybe-pink transition-colors" />
              <div>
                <p className="text-white font-medium">Privacy Policy</p>
                <p className="text-xs text-vybe-gray-400">How we handle your data</p>
              </div>
            </a>
            
            <a 
              href="/cookie-policy" 
              className="flex items-center gap-3 p-4 bg-vybe-gray-800/30 rounded-lg hover:bg-vybe-gray-800/50 transition-colors group"
            >
              <Scale className="w-5 h-5 text-vybe-purple group-hover:text-vybe-pink transition-colors" />
              <div>
                <p className="text-white font-medium">Cookie Policy</p>
                <p className="text-xs text-vybe-gray-400">Our use of cookies</p>
              </div>
            </a>
            
            <a 
              href="/support" 
              className="flex items-center gap-3 p-4 bg-vybe-gray-800/30 rounded-lg hover:bg-vybe-gray-800/50 transition-colors group"
            >
              <AlertCircle className="w-5 h-5 text-vybe-purple group-hover:text-vybe-pink transition-colors" />
              <div>
                <p className="text-white font-medium">Contact Support</p>
                <p className="text-xs text-vybe-gray-400">Questions about terms</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center bg-vybe-gray-800/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Questions About These Terms?</h3>
        <p className="text-vybe-gray-300 mb-4">
          If you have any questions about these Terms of Service, please contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/support" className="btn btn-secondary">
            Contact Support
          </a>
          <a href="mailto:legal@vybecoding.com" className="btn btn-secondary">
            Email Legal Team
          </a>
        </div>
      </div>
    </div>
  )
}