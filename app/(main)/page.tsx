"use client";

import Hero from "@/components/sections/Hero";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section with proper design */}
      <Hero />

      {/* Featured Content Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <GradientText variant="primary">Featured Content</GradientText>
          </h2>
          
          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* App Card */}
            <GlassCard className="p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-vybe-pink/20 text-vybe-pink text-xs font-medium rounded-full border border-vybe-pink/30">
                  App
                </span>
                <span className="px-2 py-1 bg-vybe-orange/20 text-vybe-orange text-xs font-medium rounded-full border border-vybe-orange/30">
                  New
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Code Generator</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                Generate complete applications from natural language descriptions using advanced AI models.
              </p>
              <Link href="/apps" className="text-vybe-purple-light hover:text-vybe-pink transition-colors text-sm font-medium">
                Explore App →
              </Link>
            </GlassCard>

            {/* Guide Card */}
            <GlassCard className="p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-vybe-purple/20 text-vybe-purple-light text-xs font-medium rounded-full border border-vybe-purple/30">
                  Guide
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Building with Claude AI</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                Learn how to leverage Claude AI for rapid prototyping and full-stack development workflows.
              </p>
              <Link href="/guides" className="text-vybe-purple-light hover:text-vybe-pink transition-colors text-sm font-medium">
                Read Guide →
              </Link>
            </GlassCard>

            {/* Featured Developer Card */}
            <GlassCard className="p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-vybe-orange/20 text-vybe-orange text-xs font-medium rounded-full border border-vybe-orange/30">
                  Developer
                </span>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30">
                  Featured
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Alex Developer</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                Senior Full-Stack Developer specializing in AI-powered applications and workflows.
              </p>
              <Link href="/members" className="text-vybe-purple-light hover:text-vybe-pink transition-colors text-sm font-medium">
                View Profile →
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <GradientText variant="primary">Start Building?</GradientText>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers already using AI to build the future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary-purple px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105">
              Get Started Free
            </Link>
            <Link href="/pricing" className="btn-secondary px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}