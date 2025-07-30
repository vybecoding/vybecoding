import * as React from "react"
import { GradientText } from "@/components/common/GradientText"
import { cn } from "@/lib/utils"

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn("relative min-h-screen flex items-center justify-center", className)}>
      {/* Floating Particles Background */}
      <div className="floating-particles absolute inset-0 pointer-events-none">
        {/* Rising particles */}
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        {/* Neural nodes */}
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <GradientText variant="primary" className="block">
              Code Beyond
            </GradientText>
            <span className="text-white">Limits</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover AI-powered development tools, expert guides, and a community 
            that pushes the boundaries of what's possible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <button className="btn-primary-purple px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105">
              Get Started Free
            </button>
            <button className="btn-secondary px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105">
              Explore Apps
            </button>
          </div>
        </div>
        
        {/* Stats or features could go here */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl font-bold text-vybe-purple-light mb-2">50+</div>
            <div className="text-gray-400">AI Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-vybe-pink mb-2">1000+</div>
            <div className="text-gray-400">Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-vybe-orange mb-2">200+</div>
            <div className="text-gray-400">Guides</div>
          </div>
        </div>
      </div>
    </section>
  )
}