'use client'

import React from 'react'
import Link from 'next/link'
import { GradientText } from '@/components/effects/GradientText'
import { GlassCard } from '@/components/effects/GlassCard'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Nebula background effects would go here */}
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Build with AI,{' '}
            <GradientText gradient="brand">
              Share Your Knowledge
            </GradientText>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The community platform for AI developers to create apps, share guides, 
            offer mentorship, and grow together.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/sign-up"
            className="px-8 py-4 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-vybe-purple/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Building Today
          </Link>
          <Link
            href="/guides"
            className="px-8 py-4 border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Browse Guides
          </Link>
        </div>
        
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Apps Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1,200+</div>
            <div className="text-gray-400">Guides Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-gray-400">Expert Mentors</div>
          </div>
        </div>
      </div>
    </section>
  )
}