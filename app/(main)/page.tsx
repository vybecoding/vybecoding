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

      {/* Featured Mentors Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h3 className="text-4xl font-light mb-6 text-center">
                Learn from <GradientText variant="primary">Featured Mentors</GradientText>
              </h3>
              
              <p className="text-gray-400 text-center mb-8">
                Connect with AI developers who&apos;ve already built successful projects and can guide your journey.
              </p>
            </div>
            <div className="relative">
              <div className="space-y-4">
                
                {/* Featured Mentor 1 */}
                <div className="p-4 flex items-center gap-4 relative">
                  <div className="absolute -top-2 right-4 px-2 py-0.5 bg-vybe-orange text-white text-xs rounded-full">Featured</div>
                  <div className="w-14 h-14 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    AD
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">Alex Developer</h5>
                    <p className="text-xs text-gray-400">Senior Full-Stack Developer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                      <span className="text-xs text-gray-500">4.9 (127)</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-vybe-purple/20 text-vybe-purple-light hover:bg-vybe-purple hover:text-white rounded transition-colors">
                    View
                  </button>
                </div>
                
                {/* Featured Mentor 2 */}
                <div className="p-4 flex items-center gap-4 relative">
                  <div className="absolute -top-2 right-4 px-2 py-0.5 bg-vybe-orange text-white text-xs rounded-full">Featured</div>
                  <div className="w-14 h-14 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    MR
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">Marcus Rodriguez</h5>
                    <p className="text-xs text-gray-400">Principal Engineer at Meta</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                      <span className="text-xs text-gray-500">4.8 (89)</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-vybe-purple/20 text-vybe-purple-light hover:bg-vybe-purple hover:text-white rounded transition-colors">
                    View
                  </button>
                </div>
                
                {/* Featured Mentor 3 */}
                <div className="p-4 flex items-center gap-4 relative">
                  <div className="absolute -top-2 right-4 px-2 py-0.5 bg-vybe-orange text-white text-xs rounded-full">Featured</div>
                  <div className="w-14 h-14 bg-gradient-to-br from-vybe-purple to-vybe-orange rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    JL
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">Jennifer Liu</h5>
                    <p className="text-xs text-gray-400">AI Research Lead at Google</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                      <span className="text-xs text-gray-500">5.0 (156)</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-vybe-purple/20 text-vybe-purple-light hover:bg-vybe-purple hover:text-white rounded transition-colors">
                    View
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <Link href="/members" className="text-sm text-vybe-purple-light hover:text-vybe-pink transition-colors">
                    Browse all mentors →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Reality Check Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-light mb-12 text-center">
              Yes, AI Can Be <GradientText variant="primary">Frustrating</GradientText>
            </h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4 pl-4">
                <div className="text-2xl mt-1">🤔</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">When AI gives you outdated patterns</h4>
                  <p className="text-gray-400">and the docs have changed three times since</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pl-4">
                <div className="text-2xl mt-1">😤</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">When it hallucinates packages that don&apos;t exist</h4>
                  <p className="text-gray-400">but sound so convincing you spend 20 minutes searching npm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pl-4">
                <div className="text-2xl mt-1">🙄</div>
                <div>
                  <h4 className="text-xl font-medium mb-2">When you explain the same context five times</h4>
                  <p className="text-gray-400">and it still forgets your project structure</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl text-gray-300 mb-8">
                <strong>We get it.</strong> That&apos;s why vybecoding exists.
              </p>
              <p className="text-lg text-gray-400">
                Real developers sharing real patterns that actually work.<br />
                No hallucinations. No outdated code. Just proven solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-light mb-12 text-center">
            Everything You Need to <GradientText variant="primary">Succeed with AI</GradientText>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Create & Share */}
            <div className="minimal-card card-purple rounded-lg p-5 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-vybe-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-vybe-purple-light" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-white">Create & Share</h4>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-300 mb-6 flex-grow">
                <li className="flex items-start">
                  <span style={{ color: '#a855f7' }} className="mr-2">•</span>
                  <span>Guides & Apps</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#a855f7' }} className="mr-2">•</span>
                  <span>Community rated</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#a855f7' }} className="mr-2">•</span>
                  <span>Showcase your work</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#a855f7' }} className="mr-2">•</span>
                  <span>Build your portfolio</span>
                </li>
              </ul>
              
              <div className="space-y-2">
                <Link href="/guides" className="block text-vybe-pink hover:text-vybe-purple-light text-sm font-medium transition-colors">
                  Browse Guides →
                </Link>
                <Link href="/apps" className="block text-vybe-pink hover:text-vybe-purple-light text-sm font-medium transition-colors">
                  Browse Apps →
                </Link>
              </div>
            </div>

            {/* Learn & Earn */}
            <div className="minimal-card card-pink rounded-lg p-5 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-vybe-pink/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-vybe-pink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-white">Learn & Earn</h4>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-300 mb-6 flex-grow">
                <li className="flex items-start">
                  <span style={{ color: '#d946a0' }} className="mr-2">•</span>
                  <span>Book expert mentors</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#d946a0' }} className="mr-2">•</span>
                  <span>Offer your expertise</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#d946a0' }} className="mr-2">•</span>
                  <span>90-95% revenue share</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#d946a0' }} className="mr-2">•</span>
                  <span>Build mentorship business</span>
                </li>
              </ul>
              
              <Link href="/members" className="text-vybe-pink hover:text-vybe-purple-light text-sm font-medium transition-colors">
                Find Mentors →
              </Link>
            </div>

            {/* Track & Optimize */}
            <div className="minimal-card card-orange rounded-lg p-5 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-vybe-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-vybe-orange" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-white">Track & Optimize</h4>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-300 mb-6 flex-grow">
                <li className="flex items-start">
                  <span style={{ color: '#e96b3a' }} className="mr-2">•</span>
                  <span>Content analytics</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#e96b3a' }} className="mr-2">•</span>
                  <span>Mentorship metrics</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#e96b3a' }} className="mr-2">•</span>
                  <span>Revenue tracking</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#e96b3a' }} className="mr-2">•</span>
                  <span>Growth insights</span>
                </li>
              </ul>
              
              <Link href="/dashboard" className="text-vybe-orange hover:text-vybe-purple-light text-sm font-medium transition-colors">
                View Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Build → Guide → Grow Pattern Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-light mb-12 text-center">
            The <GradientText variant="primary">Build → Guide → Grow</GradientText> Pattern
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Build */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vybe-purple to-vybe-pink rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-medium mb-2">Build Something Real</h4>
              <p className="text-gray-400 text-sm">
                Use AI to create apps, tools, or automations that solve actual problems
              </p>
            </div>
            
            {/* Guide */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vybe-pink to-vybe-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-medium mb-2">Guide Others</h4>
              <p className="text-gray-400 text-sm">
                Share your prompts, workflows, and lessons learned. Help others avoid your mistakes
              </p>
            </div>
            
            {/* Grow */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-vybe-orange to-vybe-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-medium mb-2">Grow Your Business</h4>
              <p className="text-gray-400 text-sm">
                Offer mentorship, sell your guides, and build a sustainable income from your expertise
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-8">
              Every successful AI developer follows this pattern.<br />
              Start anywhere in the cycle and watch your skills compound.
            </p>
            <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white font-semibold rounded-full hover:shadow-lg hover:shadow-vybe-purple/25 hover:-translate-y-0.5 transition-all duration-300">
              Start Your Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* What You Could Build & Share Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-light mb-12">
              What You Could <GradientText variant="primary">Build & Share</GradientText>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Apps */}
              <div>
                <h4 className="text-2xl font-medium mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-vybe-pink/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-vybe-pink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  Apps
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-vybe-pink mr-2">→</span>
                    <span>SaaS dashboards built with Claude</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-pink mr-2">→</span>
                    <span>Chrome extensions for productivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-pink mr-2">→</span>
                    <span>Mobile apps with React Native</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-pink mr-2">→</span>
                    <span>Discord bots and integrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-pink mr-2">→</span>
                    <span>AI-powered CLI tools</span>
                  </li>
                </ul>
              </div>
              
              {/* Guides */}
              <div>
                <h4 className="text-2xl font-medium mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-vybe-purple/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-vybe-purple-light" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  Guides
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-vybe-purple-light mr-2">→</span>
                    <span>&quot;Zero to deployed in 30 minutes&quot;</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-purple-light mr-2">→</span>
                    <span>Prompt engineering patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-purple-light mr-2">→</span>
                    <span>AI workflow automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-purple-light mr-2">→</span>
                    <span>Debugging AI-generated code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-vybe-purple-light mr-2">→</span>
                    <span>Context management strategies</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-400 mb-6">
                Every project is a chance to teach. Every guide helps someone else succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apps/submit" className="px-6 py-3 bg-vybe-pink/20 text-vybe-pink hover:bg-vybe-pink hover:text-white rounded-lg font-medium transition-colors">
                  Submit an App
                </Link>
                <Link href="/guides/create" className="px-6 py-3 bg-vybe-purple/20 text-vybe-purple-light hover:bg-vybe-purple hover:text-white rounded-lg font-medium transition-colors">
                  Write a Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rising Tide Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-light mb-8">
            A Rising Tide <GradientText variant="primary">Lifts All Boats</GradientText>
          </h3>
          
          <div className="space-y-6 text-lg text-gray-300 mb-12">
            <p>
              When you share your AI workflows, everyone builds faster.
            </p>
            <p>
              When you teach what you&apos;ve learned, everyone avoids the same pitfalls.
            </p>
            <p>
              When you mentor others, everyone levels up together.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-8 text-sm text-gray-500 mb-12">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Verified patterns</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Real code that ships</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Community validated</span>
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-light mb-8">
              Join the community where <span className="text-white">vibe coding</span> meets <span className="text-white">context engineering</span>.
            </p>
            <Link href="/sign-up" className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-vybe-purple/25 hover:-translate-y-0.5 transition-all duration-300">
              Start Building Today
            </Link>
            <p className="text-sm text-gray-500 mt-4">Free to start • No credit card required</p>
          </div>
        </div>
      </section>
    </main>
  );
}