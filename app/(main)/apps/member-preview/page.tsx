'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function AppMemberPreviewPage() {
  return (
    <div className="pt-5 pb-16 relative bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/apps" 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Apps</span>
        </Link>
        
        {/* App Preview Header */}
        <div className="p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-vybe-orange to-vybe-pink rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-light mb-2 text-white">Fitness Coach App</h1>
              <p className="text-gray-400 mb-4">AI-powered personal fitness trainer and nutrition advisor</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-vybe-orange to-vybe-pink rounded-full"></div>
                  <span className="text-sm text-gray-400">@fitnessdev</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-500">Member App</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">Health</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">AI Training</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">Nutrition</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* App Description */}
          <div className="p-6">
            <h3 className="text-xl font-medium mb-4 text-white">About This App</h3>
            <p className="text-gray-300 mb-4">
              Transform your fitness journey with our AI-powered personal trainer. Get customized workout plans, 
              nutrition advice, and real-time coaching based on your goals and preferences.
            </p>
            <h4 className="font-medium mb-2 text-white">Key Features:</h4>
            <ul className="text-gray-300 space-y-1">
              <li>• Personalized workout plans</li>
              <li>• AI nutrition advisor</li>
              <li>• Progress tracking and analytics</li>
              <li>• Video exercise demonstrations</li>
              <li>• Community challenges</li>
            </ul>
          </div>
          
          {/* App Preview */}
          <div className="p-6">
            <h3 className="text-xl font-medium mb-4 text-white">Preview</h3>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <p>App preview will be available soon</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Launch Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => window.open('https://fitnesscoach.app', '_blank')}
            className="px-8 py-3 text-lg bg-transparent text-vybe-pink border border-vybe-pink/30 rounded font-medium hover:bg-vybe-pink/10 hover:border-vybe-pink/50 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center"
          >
            Launch App
            <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
          <p className="text-sm text-gray-500 mt-2">
            This will open the app in a new tab
          </p>
        </div>
      </div>
    </div>
  )
}