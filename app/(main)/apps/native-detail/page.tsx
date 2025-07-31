'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
import { PrimaryCard } from '@/components/ui/cards/PrimaryCard'

export default function AppNativeDetailPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/apps" 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Apps</span>
        </Link>
        
        {/* App Detail Header */}
        <PrimaryCard className="p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-lg flex items-center justify-center flex-shrink-0">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-light mb-2 text-white">AI Calculator</h1>
              <p className="text-gray-400 mb-4">Smart calculator with natural language processing and advanced math capabilities</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full"></div>
                  <span className="text-sm text-gray-400">@vybecoding</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-500">Native App</span>
                <span className="text-gray-500">•</span>
                <span className="px-2 py-1 bg-vybe-purple/10 text-vybe-purple text-xs rounded-full">Built-in</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">Calculator</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">AI</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">Math</span>
              </div>
            </div>
          </div>
        </PrimaryCard>
        
        {/* App Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Interface */}
          <PrimaryCard className="p-6">
            <h3 className="text-xl font-medium mb-4 text-white">Calculator</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="bg-gray-800 rounded p-3 mb-4">
                <div className="text-right text-xl font-mono text-white">0</div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">C</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">±</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">%</button>
                <button className="bg-vybe-orange hover:bg-vybe-orange/80 text-white p-3 rounded transition-colors">÷</button>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">7</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">8</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">9</button>
                <button className="bg-vybe-orange hover:bg-vybe-orange/80 text-white p-3 rounded transition-colors">×</button>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">4</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">5</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">6</button>
                <button className="bg-vybe-orange hover:bg-vybe-orange/80 text-white p-3 rounded transition-colors">-</button>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">1</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">2</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">3</button>
                <button className="bg-vybe-orange hover:bg-vybe-orange/80 text-white p-3 rounded transition-colors">+</button>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors col-span-2">0</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded transition-colors">.</button>
                <button className="bg-vybe-purple hover:bg-vybe-purple/80 text-white p-3 rounded transition-colors">=</button>
              </div>
            </div>
          </PrimaryCard>
          
          {/* AI Features */}
          <PrimaryCard className="p-6">
            <h3 className="text-xl font-medium mb-4 text-white">AI Features</h3>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-white">Natural Language Input</h4>
                <p className="text-sm text-gray-400 mb-3">Ask questions in plain English:</p>
                <div className="bg-gray-800 rounded p-2 text-sm font-mono text-green-400">
                  "What is 15% of 250?"
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-white">Advanced Math</h4>
                <p className="text-sm text-gray-400 mb-3">Solve complex equations:</p>
                <div className="bg-gray-800 rounded p-2 text-sm font-mono text-green-400">
                  "Solve x² + 5x + 6 = 0"
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-white">Unit Conversion</h4>
                <p className="text-sm text-gray-400 mb-3">Convert between units:</p>
                <div className="bg-gray-800 rounded p-2 text-sm font-mono text-green-400">
                  "Convert 100 miles to km"
                </div>
              </div>
            </div>
          </PrimaryCard>
        </div>
      </div>
    </div>
  )
}