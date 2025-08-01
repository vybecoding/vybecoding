'use client'

import React, { useState } from 'react'
import { Palette, Type, Layout, Zap, Eye, Copy, Check, ChevronDown, Star, User, Settings, Bell, Heart, Download, Search, Filter, Play, Pause, Volume2, MoreHorizontal, Edit, Trash2, Share2, RefreshCw, ArrowRight, ExternalLink, Calendar, Clock, DollarSign, TrendingUp, Users, MessageSquare, BookOpen, Shield, AlertTriangle, Info, CheckCircle, XCircle, AlertCircle, Home, FileText, PlusCircle, Minus, Plus, X, Mail, Phone, Github, Twitter, Linkedin, Youtube, Instagram, Facebook, BadgeCheck, Trophy } from 'lucide-react'

export default function DesignSystemShowcasePage() {
  const [activeTab, setActiveTab] = useState('colors')
  const [copiedText, setCopiedText] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general',
    priority: 'medium',
    agreement: false
  })

  const tabs = [
    { id: 'colors', label: 'Colors & Gradients', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'components', label: 'Components', icon: Layout },
    { id: 'cards', label: 'Card System', icon: Eye },
    { id: 'forms', label: 'Forms & Inputs', icon: Settings },
    { id: 'interactive', label: 'Interactive Elements', icon: Zap }
  ]

  const colors = {
    primary: [
      { name: 'Vybe Purple', hex: '#8A2BE2', rgb: 'rgb(138, 43, 226)', usage: 'Primary brand color, buttons, links' },
      { name: 'Vybe Pink', hex: '#D946A0', rgb: 'rgb(217, 70, 160)', usage: 'Secondary brand color, accents' },
      { name: 'Vybe Orange', hex: '#E96B3A', rgb: 'rgb(233, 107, 58)', usage: 'Tertiary brand color, highlights' }
    ],
    neutral: [
      { name: 'Pure White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Text on dark backgrounds' },
      { name: 'Gray 50', hex: '#F9FAFB', rgb: 'rgb(249, 250, 251)', usage: 'Light backgrounds' },
      { name: 'Gray 100', hex: '#F3F4F6', rgb: 'rgb(243, 244, 246)', usage: 'Subtle backgrounds' },
      { name: 'Gray 200', hex: '#E5E7EB', rgb: 'rgb(229, 231, 235)', usage: 'Borders, dividers' },
      { name: 'Gray 300', hex: '#D1D5DB', rgb: 'rgb(209, 213, 219)', usage: 'Disabled states' },
      { name: 'Gray 400', hex: '#9CA3AF', rgb: 'rgb(156, 163, 175)', usage: 'Secondary text' },
      { name: 'Gray 500', hex: '#6B7280', rgb: 'rgb(107, 114, 128)', usage: 'Icons, placeholders' },
      { name: 'Gray 600', hex: '#4B5563', rgb: 'rgb(75, 85, 99)', usage: 'Main text' },
      { name: 'Gray 700', hex: '#374151', rgb: 'rgb(55, 65, 81)', usage: 'Headings' },
      { name: 'Gray 800', hex: '#1F2937', rgb: 'rgb(31, 41, 55)', usage: 'Cards, surfaces' },
      { name: 'Gray 900', hex: '#111827', rgb: 'rgb(17, 24, 39)', usage: 'Main background' },
      { name: 'True Black', hex: '#000000', rgb: 'rgb(0, 0, 0)', usage: 'Maximum contrast' }
    ],
    semantic: [
      { name: 'Success Green', hex: '#10B981', rgb: 'rgb(16, 185, 129)', usage: 'Success states, confirmations' },
      { name: 'Warning Yellow', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', usage: 'Warnings, cautions' },
      { name: 'Error Red', hex: '#EF4444', rgb: 'rgb(239, 68, 68)', usage: 'Errors, destructive actions' },
      { name: 'Info Blue', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)', usage: 'Information, links' }
    ]
  }

  const gradients = [
    { name: 'Primary Gradient', css: 'linear-gradient(90deg, #8A2BE2, #D946A0)', usage: 'Hero sections, primary CTAs' },
    { name: 'Extended Gradient', css: 'linear-gradient(90deg, #8A2BE2, #D946A0, #E96B3A)', usage: 'Headers, special cards' },
    { name: 'Subtle Purple', css: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', usage: 'Card headers, backgrounds' },
    { name: 'Subtle Pink', css: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', usage: 'Card headers, backgrounds' },
    { name: 'Subtle Orange', css: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', usage: 'Card headers, backgrounds' }
  ]

  const typography = {
    headings: [
      { level: 'h1', size: '2.25rem (36px)', weight: '700', usage: 'Page titles, hero headings' },
      { level: 'h2', size: '1.875rem (30px)', weight: '600', usage: 'Section headings' },
      { level: 'h3', size: '1.5rem (24px)', weight: '600', usage: 'Card titles, subsections' },
      { level: 'h4', size: '1.25rem (20px)', weight: '500', usage: 'Component titles' },
      { level: 'h5', size: '1.125rem (18px)', weight: '500', usage: 'Small headings' },
      { level: 'h6', size: '1rem (16px)', weight: '500', usage: 'Labels, captions' }
    ],
    body: [
      { type: 'Large', size: '1.125rem (18px)', weight: '400', usage: 'Hero descriptions, important text' },
      { type: 'Regular', size: '1rem (16px)', weight: '400', usage: 'Body text, descriptions' },
      { type: 'Small', size: '0.875rem (14px)', weight: '400', usage: 'Helper text, captions' },
      { type: 'Extra Small', size: '0.75rem (12px)', weight: '400', usage: 'Labels, metadata' }
    ]
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const buttonVariants = [
    { name: 'Primary Fuchsia', className: 'btn btn-primary-fuchsia', usage: 'Main actions, CTAs' },
    { name: 'Primary Purple', className: 'btn btn-primary-purple', usage: 'Alternative primary actions' },
    { name: 'Secondary', className: 'btn btn-secondary', usage: 'Secondary actions, cancel buttons' },
    { name: 'Ghost', className: 'btn btn-ghost', usage: 'Subtle actions, navigation' },
    { name: 'Outline', className: 'btn btn-outline', usage: 'Alternative actions' },
    { name: 'Destructive', className: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors', usage: 'Delete, remove actions' }
  ]

  const cardExamples = [
    {
      type: 'Primary Card - Purple',
      code: `<div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
  <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
    <h3 className="text-base font-semibold text-white">Card Title</h3>
  </div>
  <div className="p-6">
    Card content goes here
  </div>
</div>`
    },
    {
      type: 'Primary Card - Pink',
      code: `<div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
  <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
    <h3 className="text-base font-semibold text-white">Card Title</h3>
  </div>
  <div className="p-6">
    Card content goes here
  </div>
</div>`
    },
    {
      type: 'Primary Card - Orange',
      code: `<div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
  <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
    <h3 className="text-base font-semibold text-white">Card Title</h3>
  </div>
  <div className="p-6">
    Card content goes here
  </div>
</div>`
    },
    {
      type: 'Neutral Card',
      code: `<div className="vybe-card overflow-hidden">
  <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
    <h3 className="text-base font-semibold text-white">Card Title</h3>
  </div>
  <div className="p-6">
    Card content goes here
  </div>
</div>`
    }
  ]

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center mx-auto">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white">Design System Showcase</h1>
        <p className="text-xl text-vybe-gray-300 max-w-3xl mx-auto">
          Explore the complete Vybe Coding design system including colors, typography, components, and interaction patterns.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(138, 43, 226, 0.3)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(138, 43, 226, 0.08))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)'}}>
          <h2 className="text-xl font-bold text-white">Design System Components</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-vybe-purple/20 text-vybe-purple border border-vybe-purple/30'
                    : 'bg-vybe-gray-800 text-vybe-gray-300 hover:bg-vybe-gray-700 hover:text-white border border-vybe-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Colors & Gradients */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          {/* Primary Colors */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Brand Colors</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {colors.primary.map((color, index) => (
                  <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                    <div 
                      className="w-full h-20 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="text-white font-medium text-sm">{color.name}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-vybe-gray-400">HEX</span>
                        <button 
                          onClick={() => copyToClipboard(color.hex)}
                          className="flex items-center gap-1 text-xs text-white hover:text-vybe-purple transition-colors"
                        >
                          {copiedText === color.hex ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {color.hex}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-vybe-gray-400">RGB</span>
                        <button 
                          onClick={() => copyToClipboard(color.rgb)}
                          className="flex items-center gap-1 text-xs text-white hover:text-vybe-purple transition-colors"
                        >
                          {copiedText === color.rgb ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {color.rgb}
                        </button>
                      </div>
                      <p className="text-xs text-vybe-gray-400 mt-2">{color.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gradients */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Gradients</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {gradients.map((gradient, index) => (
                  <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                    <div 
                      className="w-full h-16 rounded-lg mb-4 flex items-center justify-center"
                      style={{ background: gradient.css }}
                    >
                      <span className="text-white font-medium text-sm">{gradient.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-vybe-gray-400">CSS</span>
                      <button 
                        onClick={() => copyToClipboard(gradient.css)}
                        className="flex items-center gap-1 text-xs text-white hover:text-vybe-purple transition-colors"
                      >
                        {copiedText === gradient.css ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        Copy
                      </button>
                    </div>
                    <code className="text-xs text-vybe-gray-300 bg-vybe-gray-900 p-2 rounded block mb-2 overflow-x-auto">
                      {gradient.css}
                    </code>
                    <p className="text-xs text-vybe-gray-400">{gradient.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="vybe-card overflow-hidden">
            <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Semantic Colors</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {colors.semantic.map((color, index) => (
                  <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                    <div 
                      className="w-full h-16 rounded-lg mb-4 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="text-white font-medium text-sm">{color.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-vybe-gray-400">HEX</span>
                      <button 
                        onClick={() => copyToClipboard(color.hex)}
                        className="flex items-center gap-1 text-xs text-white hover:text-vybe-purple transition-colors"
                      >
                        {copiedText === color.hex ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {color.hex}
                      </button>
                    </div>
                    <p className="text-xs text-vybe-gray-400">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Typography */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Typography System</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Headings */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Headings</h4>
                  <div className="space-y-4">
                    {typography.headings.map((heading, index) => (
                      <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                        <div className="mb-2">
                          <span className={`font-bold text-white`} style={{ fontSize: heading.size, fontWeight: heading.weight }}>
                            {heading.level.toUpperCase()} - Sample Heading Text
                          </span>
                        </div>
                        <div className="text-sm text-vybe-gray-400">
                          <span>{heading.size} • Weight {heading.weight}</span>
                        </div>
                        <p className="text-xs text-vybe-gray-400 mt-1">{heading.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Text */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Body Text</h4>
                  <div className="space-y-4">
                    {typography.body.map((body, index) => (
                      <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg">
                        <div className="mb-2">
                          <p className="text-white" style={{ fontSize: body.size, fontWeight: body.weight }}>
                            This is sample {body.type.toLowerCase()} body text that shows how content will appear in the interface.
                          </p>
                        </div>
                        <div className="text-sm text-vybe-gray-400">
                          <span>{body.size} • Weight {body.weight}</span>
                        </div>
                        <p className="text-xs text-vybe-gray-400 mt-1">{body.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Components */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          {/* Buttons */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Button Components</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buttonVariants.map((button, index) => (
                  <div key={index} className="p-4 bg-vybe-gray-800/30 rounded-lg text-center">
                    <button className={button.className}>
                      {button.name}
                    </button>
                    <p className="text-xs text-vybe-gray-400 mt-3">{button.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Icon System</h3>
              <p className="text-sm text-vybe-gray-300 mt-1">Using Lucide React icons</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                {[Star, User, Settings, Bell, Heart, Download, Search, Filter, Play, Pause, Volume2, MoreHorizontal, Edit, Trash2, Share2, RefreshCw, ArrowRight, ExternalLink, Calendar, Clock, DollarSign, TrendingUp, Users, MessageSquare, BookOpen, Shield, AlertTriangle, Info, CheckCircle, XCircle, AlertCircle, Home, FileText, PlusCircle, Minus, Plus, X, Mail, Phone, Github, Twitter, Linkedin, Youtube, Instagram, Facebook].map((Icon, index) => (
                  <div key={index} className="p-3 bg-vybe-gray-800/30 rounded-lg flex items-center justify-center hover:bg-vybe-gray-800/50 transition-colors">
                    <Icon className="w-5 h-5 text-vybe-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges & Pills */}
          <div className="vybe-card overflow-hidden">
            <div style={{padding: '1rem', background: 'rgba(55, 65, 81, 0.4)', borderBottom: '1px solid rgba(75, 85, 99, 0.3)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Badges & Status Indicators</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">Status Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">Approved</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">Pending</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">Rejected</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">In Review</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">Draft</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">Priority Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-medium">High</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">Medium</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">Low</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">Skill Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30 text-xs">React</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 text-xs">TypeScript</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 text-xs">Node.js</span>
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30 text-xs">Next.js</span>
                    <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded border border-pink-500/30 text-xs">AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          {/* Specialized Card Components */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Card Component Previews
              </h3>
              <p className="text-sm text-vybe-gray-300 mt-1">Preview of specialized card components used throughout the platform</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* App Card */}
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">App Card (Featured Style)</h4>
                  <div className="vybe-card bg-vybe-gray-800 border border-vybe-gray-700 hover:border-vybe-purple/50 transition-all duration-300 cursor-pointer group relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2 py-1 bg-vybe-purple text-white text-xs font-bold rounded-md">APP</span>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <button className="p-2 bg-vybe-gray-900/80 backdrop-blur-sm rounded-lg text-vybe-gray-400 hover:text-white hover:bg-vybe-gray-900 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-vybe-purple/20 to-vybe-pink/20 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-vybe-purple/30 rounded-lg"></div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">AI Code Review Assistant</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full"></div>
                          <span className="text-sm text-vybe-gray-300">@devtools</span>
                        </div>
                        <span className="px-2 py-0.5 bg-vybe-purple/20 text-vybe-purple text-xs font-medium rounded-full">PRO</span>
                        <span className="text-vybe-gray-400 text-xs">• 01/02/25</span>
                      </div>
                      <p className="text-sm text-vybe-gray-300 mb-4 line-clamp-2">
                        Interactive tool that analyzes your code for bugs, suggests improvements, and explains best...
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">productivity</span>
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">developer-tools</span>
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">TypeScript</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-700">
                        <div className="flex items-center gap-1">
                          <BadgeCheck className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-vybe-gray-400">Verified 2w ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-vybe-gray-400">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            89
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* News Card */}
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">News Card (Featured Style)</h4>
                  <div className="vybe-card bg-vybe-gray-800 border border-vybe-gray-700 hover:border-vybe-purple/50 transition-all duration-300 cursor-pointer group relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2 py-1 bg-vybe-orange text-white text-xs font-bold rounded-md">NEWS</span>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-vybe-orange/20 to-vybe-purple/20 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-vybe-orange/30 rounded-lg"></div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">OpenAI Releases Claude 4.0 with Enhanced Reasoning</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vybe-orange to-vybe-purple rounded-full"></div>
                          <span className="text-sm text-vybe-gray-300">OpenAI Blog</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">Official</span>
                        </div>
                        <span className="text-vybe-gray-400 text-xs">• 01/16/25</span>
                      </div>
                      <p className="text-sm text-vybe-gray-300 mb-4 line-clamp-2">
                        The latest Claude model brings significant improvements to reasoning capabilities and...
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">news</span>
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">announcement</span>
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">claude</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-700">
                        <div className="flex items-center gap-1">
                          <BadgeCheck className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-vybe-gray-400">Verified 2h ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-vybe-gray-400">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            567
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Card */}
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">Member Card (Demo Style)</h4>
                  <div className="vybe-card bg-vybe-gray-800 border border-vybe-gray-700 hover:border-vybe-purple/50 transition-all duration-300 cursor-pointer group">
                    <div className="p-6">
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-vybe-purple text-white text-xs font-bold rounded-md">MEMBER</span>
                      </div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                          AC
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">Machine Learning Expert</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-vybe-gray-300">@alexchen</span>
                            <span className="px-2 py-0.5 bg-vybe-purple/20 text-vybe-purple text-xs font-medium rounded-full">PRO</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4 text-sm text-vybe-gray-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          8 guides
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          3 apps
                        </span>
                      </div>
                      <p className="text-sm text-vybe-gray-300 mb-4 line-clamp-2">
                        Pioneering next-generation AI systems and advancing machine learning capabilities
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-vybe-purple/20 text-vybe-purple text-xs rounded-full border border-vybe-purple/30">🏆 Top Mentor</span>
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">Production AI</span>
                        <span className="px-2 py-1 bg-vybe-gray-700/50 text-xs text-vybe-gray-300 rounded">Python</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-vybe-gray-700">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-vybe-gray-400">Mentor</span>
                          <span className="text-xs text-vybe-gray-400">•</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-vybe-gray-600'}`} />
                            ))}
                            <span className="text-xs text-vybe-gray-400 ml-1">4.9 (47)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guide Card */}
                <div>
                  <h4 className="text-sm font-medium text-vybe-gray-400 mb-3">Guide Card (New Card System)</h4>
                  <div className="vybe-card bg-vybe-gray-800 border border-vybe-gray-700 hover:border-vybe-purple/50 transition-all duration-300 cursor-pointer group relative lg:col-span-2">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2 py-1 bg-vybe-purple text-white text-xs font-bold rounded-md">GUIDE</span>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-xs text-vybe-gray-400 bg-vybe-gray-900/80 backdrop-blur-sm px-2 py-1 rounded">2h ago</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="text-green-400">🚀</span>
                        TEST GUIDE - Static Demo Page
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full flex items-center justify-center text-white text-xs font-bold">
                            TE
                          </div>
                          <span className="text-sm text-vybe-gray-300">Test Author</span>
                        </div>
                        <span className="px-2 py-0.5 bg-vybe-purple/20 text-vybe-purple text-xs font-medium rounded-full">PRO</span>
                      </div>
                      <p className="text-sm text-vybe-gray-300 mb-4">
                        ⚠️ This is a static test page for development. Use this to test guide pages without authentication.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-vybe-purple/20 text-vybe-purple text-xs rounded-full border border-vybe-purple/30">test</span>
                        <span className="px-2 py-1 bg-vybe-purple/20 text-vybe-purple text-xs rounded-full border border-vybe-purple/30">static</span>
                        <span className="px-2 py-1 bg-vybe-purple/20 text-vybe-purple text-xs rounded-full border border-vybe-purple/30">demo</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-vybe-gray-700">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">Beginner</span>
                          <div className="flex items-center gap-1">
                            <BadgeCheck className="w-4 h-4 text-green-400" />
                            <span className="text-xs text-vybe-gray-400">Verified 2h ago</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-vybe-gray-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            123
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            45
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            5m
                          </span>
                          <span className="text-xs px-2 py-1 bg-vybe-purple/20 text-vybe-purple rounded-full font-medium">Tutorial</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card System Examples */}
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Card System Structure</h3>
            </div>
            <div className="p-6">
              <div className="space-y-8">
                {cardExamples.map((card, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold text-white mb-4">{card.type}</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Preview */}
                      <div>
                        <h5 className="text-sm font-medium text-vybe-gray-400 mb-3">Preview</h5>
                        <div dangerouslySetInnerHTML={{ __html: card.code.replace(/className="/g, 'class="').replace(/style=\{\{([^}]+)\}\}/g, 'style="$1"') }} />
                      </div>
                      
                      {/* Code */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-medium text-vybe-gray-400">Code</h5>
                          <button 
                            onClick={() => copyToClipboard(card.code)}
                            className="flex items-center gap-1 text-xs text-vybe-purple hover:text-vybe-pink transition-colors"
                          >
                            {copiedText === card.code ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            Copy Code
                          </button>
                        </div>
                        <pre className="text-xs text-vybe-gray-300 bg-vybe-gray-900 p-4 rounded-lg overflow-x-auto">
                          <code>{card.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forms */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Form Components</h3>
            </div>
            <div className="p-6">
              <div className="max-w-2xl space-y-6">
                {/* Text Inputs */}
                <div>
                  <label className="form-label">Text Input</label>
                  <input 
                    type="text" 
                    className="form-input w-full px-4 py-2 rounded-lg" 
                    placeholder="Enter your text here"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <p className="text-xs text-vybe-gray-400 mt-1">Helper text goes here</p>
                </div>

                {/* Email Input */}
                <div>
                  <label className="form-label">Email Input</label>
                  <input 
                    type="email" 
                    className="form-input w-full px-4 py-2 rounded-lg" 
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                {/* Textarea */}
                <div>
                  <label className="form-label">Textarea</label>
                  <textarea 
                    className="form-textarea w-full px-4 py-2 rounded-lg h-32" 
                    placeholder="Enter your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                {/* Select */}
                <div>
                  <label className="form-label">Select Dropdown</label>
                  <select 
                    className="form-select w-full px-4 py-2 rounded-lg"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Radio Buttons */}
                <div>
                  <label className="form-label">Priority Level</label>
                  <div className="space-y-2">
                    {['low', 'medium', 'high'].map((priority) => (
                      <label key={priority} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="priority" 
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                          className="text-vybe-purple focus:ring-vybe-purple" 
                        />
                        <span className="text-white capitalize">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Checkbox */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.agreement}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreement: e.target.checked }))}
                      className="w-4 h-4 text-vybe-purple rounded focus:ring-vybe-purple" 
                    />
                    <span className="text-white">I agree to the terms and conditions</span>
                  </label>
                </div>

                {/* Toggle Switch */}
                <div>
                  <label className="form-label">Toggle Switch</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vybe-purple"></div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button className="btn btn-primary-fuchsia">
                    Submit Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Elements */}
      {activeTab === 'interactive' && (
        <div className="space-y-6">
          <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(217, 70, 160, 0.3)'}}>
            <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(217, 70, 160, 0.2), rgba(217, 70, 160, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
              <h3 className="text-xl font-bold text-white">Interactive Components</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Loading States */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Loading States</h4>
                  
                  <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                    <h5 className="text-white font-medium mb-3">Spinner</h5>
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vybe-purple"></div>
                      <span className="text-vybe-gray-300">Loading...</span>
                    </div>
                  </div>

                  <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                    <h5 className="text-white font-medium mb-3">Progress Bar</h5>
                    <div className="w-full bg-vybe-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-vybe-purple to-vybe-pink h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                    </div>
                    <p className="text-xs text-vybe-gray-400 mt-2">65% complete</p>
                  </div>

                  <div className="p-4 bg-vybe-gray-800/30 rounded-lg">
                    <h5 className="text-white font-medium mb-3">Skeleton Loading</h5>
                    <div className="space-y-3">
                      <div className="h-4 bg-vybe-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-vybe-gray-700 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-vybe-gray-700 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Alerts & Messages */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Alerts & Messages</h4>
                  
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-400 font-medium text-sm">Success!</p>
                        <p className="text-vybe-gray-300 text-sm">Your changes have been saved successfully.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex gap-3">
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 font-medium text-sm">Error</p>
                        <p className="text-vybe-gray-300 text-sm">Something went wrong. Please try again.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 font-medium text-sm">Warning</p>
                        <p className="text-vybe-gray-300 text-sm">This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-blue-400 font-medium text-sm">Information</p>
                        <p className="text-vybe-gray-300 text-sm">Here's some helpful information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Guidelines */}
      <div className="vybe-card overflow-hidden" style={{border: '1px solid rgba(233, 107, 58, 0.4)'}}>
        <div style={{padding: '1rem', background: 'linear-gradient(90deg, rgba(233, 107, 58, 0.2), rgba(233, 107, 58, 0.15))', borderBottom: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '8px 8px 0 0', overflow: 'hidden'}}>
          <h2 className="text-2xl font-bold text-white">Design System Guidelines</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Consistency</h3>
              <p className="text-vybe-gray-300 text-sm">Use consistent spacing, colors, and typography throughout all interfaces to create a cohesive user experience.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Accessibility</h3>
              <p className="text-vybe-gray-300 text-sm">Ensure all components meet WCAG 2.1 AA standards with proper contrast ratios and keyboard navigation support.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Scalability</h3>
              <p className="text-vybe-gray-300 text-sm">Design components that work across different screen sizes and can be easily maintained and updated.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}