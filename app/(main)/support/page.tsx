'use client'

import React, { useState } from 'react'
import { MessageSquare, Mail, Phone, Clock, AlertCircle, CheckCircle, HelpCircle, Bug, CreditCard, User } from 'lucide-react'

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    priority: 'medium',
    subject: '',
    message: ''
  })

  const categories = [
    { id: 'general', label: 'General Question', icon: HelpCircle },
    { id: 'technical', label: 'Technical Issue', icon: Bug },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'account', label: 'Account & Profile', icon: User }
  ]

  const priorities = [
    { id: 'low', label: 'Low - General inquiry', color: 'text-green-400' },
    { id: 'medium', label: 'Medium - Need help but not urgent', color: 'text-yellow-400' },
    { id: 'high', label: 'High - Blocking my work', color: 'text-orange-400' },
    { id: 'critical', label: 'Critical - Service down/broken', color: 'text-red-400' }
  ]

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get immediate help from our support team',
      availability: 'Monday-Friday, 9 AM - 6 PM EST',
      responseTime: 'Usually within 2 minutes',
      icon: MessageSquare,
      color: 'vybe-purple',
      available: true
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message with your issue',
      availability: '24/7 - We respond to all emails',
      responseTime: 'Within 4-6 hours',
      icon: Mail,
      color: 'vybe-pink',
      available: true
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with a technical specialist',
      availability: 'Monday-Friday, 10 AM - 4 PM EST',
      responseTime: 'Schedule a callback',
      icon: Phone,
      color: 'vybe-orange',
      available: false // Pro feature
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Support ticket submitted! We\'ll get back to you within 4-6 hours.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Get Support</h1>
        <p className="text-xl text-vybe-gray-300 max-w-2xl mx-auto">
          We're here to help! Choose the support option that works best for you, or submit a detailed support request below.
        </p>
      </div>

      {/* Support Options */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-2xl font-bold text-white">Support Options</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className={`p-6 rounded-lg border ${option.available ? 'border-gray-700 bg-vybe-gray-800/30' : 'border-gray-700 bg-vybe-gray-800/10 opacity-60'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    option.available 
                      ? `bg-${option.color}/20` 
                      : 'bg-gray-500/20'
                  }`}>
                    <option.icon className={`w-6 h-6 ${
                      option.available 
                        ? `text-${option.color}` 
                        : 'text-gray-500'
                    }`} />
                  </div>
                  {!option.available && (
                    <span className="px-2 py-1 bg-vybe-orange/20 text-vybe-orange text-xs rounded-full font-medium">
                      Pro Only
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-vybe-gray-300 text-sm mb-4">{option.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-vybe-gray-400" />
                    <span className="text-xs text-vybe-gray-400">{option.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400">{option.responseTime}</span>
                  </div>
                </div>
                
                <button 
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    option.available
                      ? 'bg-vybe-purple/20 text-vybe-purple hover:bg-vybe-purple/30 border border-vybe-purple/30'
                      : 'bg-gray-600/20 text-gray-500 cursor-not-allowed border border-gray-600/30'
                  }`}
                  disabled={!option.available}
                >
                  {option.available ? 'Get Help Now' : 'Upgrade for Access'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Form */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Submit a Support Request</h2>
          <p className="text-vybe-gray-300 text-sm mt-1">
            The more details you provide, the faster we can help resolve your issue.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-2 rounded-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-2 rounded-lg"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select w-full px-4 py-2 rounded-lg"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Priority *</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="form-select w-full px-4 py-2 rounded-lg"
                  required
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="form-label">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-input w-full px-4 py-2 rounded-lg"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea w-full px-4 py-2 rounded-lg h-32"
                placeholder="Please provide as much detail as possible about your issue, including any error messages, steps to reproduce, and what you expected to happen."
                required
              />
            </div>

            {/* Additional Information */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium text-sm mb-1">Tips for faster resolution:</p>
                  <ul className="text-xs text-vybe-gray-300 space-y-1">
                    <li>• Include screenshots or error messages when relevant</li>
                    <li>• Mention your browser and operating system</li>
                    <li>• List the steps you took before the issue occurred</li>
                    <li>• Include your account email if different from above</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary-fuchsia">
                Submit Support Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-xl font-bold text-white">Emergency Support</h2>
        </div>
        <div className="p-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium text-sm mb-2">Critical Issues Only</p>
                <p className="text-vybe-gray-300 text-sm mb-3">
                  For service outages, security issues, or payment processing problems that affect multiple users.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium">
                    Emergency Chat
                  </button>
                  <span className="text-xs text-vybe-gray-400 flex items-center">
                    Available 24/7 for critical issues only
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}