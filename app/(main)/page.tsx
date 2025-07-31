"use client";

import { useEffect, useRef } from 'react';
import Hero from "@/components/sections/Hero";
import { GlassCard } from "@/components/common/GlassCard";
import { GradientText } from "@/components/common/GradientText";
import Link from "next/link";

export default function Home() {
  const contentCanvasRef = useRef<HTMLCanvasElement>(null)

  // Content area starfield and particles
  useEffect(() => {
    const canvas = contentCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to cover content area
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = window.innerWidth
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight) // Full page height
      console.log('Canvas resized:', canvas.width, 'x', canvas.height) // Debug log
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Content area starfield - lighter density than hero
    const stars: Array<{
      x: number
      y: number
      size: number
      baseSize: number
      opacity: number
      baseOpacity: number
      color: string
      pulsePhase: number
      pulseSpeed: number
      starType: 'major' | 'minor' | 'micro'
    }> = []

    const colors = ['#8a2be2', '#d946a0', '#e96b3a', '#ffffff', '#a855f7']
    const starCount = 200 // Half the density of hero for subtle effect

    // Initialize content starfield
    for (let i = 0; i < starCount; i++) {
      const rand = Math.random()
      let starType: 'major' | 'minor' | 'micro'
      let baseSize: number
      let baseOpacity: number
      let colorIndex: number

      if (rand < 0.05) {
        // Fewer major stars in content area
        starType = 'major'
        baseSize = Math.random() * 0.8 + 0.8 // 0.8 to 1.6 (smaller than hero)
        baseOpacity = Math.random() * 0.3 + 0.2 // 0.2 to 0.5 (dimmer than hero)
        colorIndex = Math.floor(Math.random() * 3)
      } else if (rand < 0.3) {
        starType = 'minor'
        baseSize = Math.random() * 0.6 + 0.4 // 0.4 to 1.0
        baseOpacity = Math.random() * 0.2 + 0.15 // 0.15 to 0.35
        colorIndex = Math.floor(Math.random() * colors.length)
      } else {
        starType = 'micro'
        baseSize = Math.random() * 0.4 + 0.1 // 0.1 to 0.5
        baseOpacity = Math.random() * 0.15 + 0.05 // 0.05 to 0.2
        colorIndex = Math.random() < 0.8 ? 3 : 4 // Mostly white
      }
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: baseSize,
        baseSize: baseSize,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        color: colors[colorIndex],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.003 + 0.0005, // Even slower than hero
        starType: starType
      })
    }

    // Content area rising particles
    const risingParticles: Array<{
      x: number
      y: number
      size: number
      speedY: number
      opacity: number
      color: string
      life: number
      maxLife: number
    }> = []

    const maxRisingParticles = 12 // Fewer particles in content area
    const particleColors = ['#8a2be2', '#d946a0', '#e96b3a', '#ffffff']

    const spawnRisingParticle = () => {
      if (risingParticles.length < maxRisingParticles) {
        const particlesToSpawn = Math.floor(Math.random() * 2) + 1 // 1-2 particles
        
        for (let i = 0; i < particlesToSpawn; i++) {
          const maxLife = Math.random() * 25000 + 20000 // 20-45 seconds
          risingParticles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            size: Math.random() * 0.6 + 0.1, // 0.1 to 0.7px (tiny)
            speedY: -(Math.random() * 0.2 + 0.03), // 0.03 to 0.23 upward (very slow)
            opacity: Math.random() * 0.25 + 0.03, // 0.03 to 0.28 (very subtle)
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            life: 0,
            maxLife: maxLife
          })
        }
      }
    }

    // Initial spawn and continuous spawning
    spawnRisingParticle()
    const particleSpawnInterval = setInterval(spawnRisingParticle, Math.random() * 3000 + 1500) // Every 1.5-4.5 seconds

    // Animation loop
    let animationId: number
    let frameCount = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Debug log every 60 frames (1 second at 60fps)
      if (frameCount % 60 === 0) {
        console.log(`Content animation frame ${frameCount}, stars: ${stars.length}, particles: ${risingParticles.length}`)
      }
      frameCount++

      // Update and draw stars
      stars.forEach(star => {
        star.pulsePhase += star.pulseSpeed
        const fadeMultiplier = (Math.sin(star.pulsePhase) + 1) / 2
        const smoothTwinkle = 0.4 + (fadeMultiplier * 0.6) // 0.4 to 1.0 range
        
        star.size = star.baseSize
        star.opacity = star.baseOpacity * smoothTwinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        
        if (star.starType === 'major') {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2.5
          )
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(0.7, `${star.color}15`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
        } else if (star.starType === 'minor') {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 1.8
          )
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(0.8, `${star.color}08`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = star.color
        }
        
        ctx.globalAlpha = star.opacity
        ctx.fill()
      })

      // Update and draw rising particles
      for (let i = risingParticles.length - 1; i >= 0; i--) {
        const particle = risingParticles[i]
        
        particle.y += particle.speedY
        particle.life += 16.67

        const lifetimeProgress = particle.life / particle.maxLife
        let fadeMultiplier
        
        if (lifetimeProgress < 0.3) {
          fadeMultiplier = lifetimeProgress / 0.3
        } else if (lifetimeProgress < 0.7) {
          fadeMultiplier = 1
        } else {
          fadeMultiplier = (1 - lifetimeProgress) / 0.3
        }
        
        particle.opacity = (particle.opacity * 0.4) * fadeMultiplier // Even more subtle in content

        if (particle.life >= particle.maxLife || particle.y < -10) {
          risingParticles.splice(i, 1)
          continue
        }
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(particleSpawnInterval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <main className="relative min-h-screen">
      {/* Hero Section with proper design */}
      <Hero />
      
      {/* Content area starfield and particles */}
      <canvas 
        ref={contentCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ 
          opacity: 0.8,
          zIndex: 1,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Demo-style floating particles (CSS-based like demo) */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Rising particles matching demo exactly */}
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              background: ['#8a2be2', '#d946a0', '#e96b3a'][i % 3],
              opacity: 0.3,
              animationName: 'particleFloat',
              animationDuration: `${20 + Math.random() * 10}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${i * 2.5}s`,
              boxShadow: `0 0 2px ${['#8a2be2', '#d946a0', '#e96b3a'][i % 3]}40`
            }}
          />
        ))}
      </div>
      
      {/* Nebula background for main content - subtle atmospheric effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 30%, rgba(138, 43, 226, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 20%, rgba(217, 70, 160, 0.06) 0%, transparent 45%),
            radial-gradient(ellipse at 40% 70%, rgba(233, 107, 58, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 80%, rgba(138, 43, 226, 0.04) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 85%, rgba(217, 70, 160, 0.045) 0%, transparent 30%),
            radial-gradient(ellipse at 15% 88%, rgba(233, 107, 58, 0.055) 0%, transparent 30%),
            radial-gradient(ellipse at 60% 40%, rgba(138, 43, 226, 0.04) 0%, transparent 25%),
            radial-gradient(ellipse at 90% 15%, rgba(217, 70, 160, 0.035) 0%, transparent 20%),
            radial-gradient(ellipse at 55% 45%, rgba(138, 43, 226, 0.025) 0%, transparent 50%),
            radial-gradient(ellipse at 58% 35%, rgba(217, 70, 160, 0.019) 0%, transparent 40%),
            radial-gradient(ellipse at 47% 55%, rgba(233, 107, 58, 0.023) 0%, transparent 45%),
            radial-gradient(ellipse at 65% 50%, rgba(138, 43, 226, 0.015) 0%, transparent 35%),
            radial-gradient(ellipse at 50% 45%, rgba(217, 70, 160, 0.013) 0%, transparent 60%),
            radial-gradient(ellipse at 75% 75%, rgba(233, 107, 58, 0.025) 0%, transparent 35%)
          `
        }}
      />

      {/* Featured Mentors Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h3 className="text-4xl font-light mb-6 text-center">
                Learn from <GradientText gradient="brand" className="inline-block" style={{ fontSize: '38px' }}>Featured Mentors</GradientText>
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
                    <p className="text-base text-white">Alex Developer</p>
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
                    <p className="text-base text-white">Marcus Rodriguez</p>
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
                    <p className="text-base text-white">Jennifer Liu</p>
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-8">
              Yes, AI Can Be <GradientText gradient="brand" style={{ fontSize: '38px', display: 'inline', paddingRight: '0.2em' }}>Frustrating</GradientText>
            </h3>
            <p className="text-gray-400">I know what you&apos;re thinking...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-vybe-purple rounded-full"></div>
                <span className="text-vybe-purple font-medium">&quot;But AI hallucinates!&quot;</span>
              </div>
              <p className="text-sm text-gray-400">
                True. AI will confidently invent APIs and &quot;solutions&quot; that don&apos;t exist. We&apos;ll show you how to catch and prevent this.
              </p>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-vybe-pink rounded-full"></div>
                <span className="text-vybe-pink font-medium">&quot;It&apos;s just toxic positivity!&quot;</span>
              </div>
              <p className="text-sm text-gray-400">
                Also true. Getting honest feedback from AI is hard. Our workflows teach you to get critical, useful responses.
              </p>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-vybe-orange rounded-full"></div>
                <span className="text-vybe-orange font-medium">&quot;All AI sites look the same!&quot;</span>
              </div>
              <p className="text-sm text-gray-400">
                Yes, including ours. AI works best with familiar patterns it&apos;s learned from. Learn how to add unique touches while keeping AI-friendly foundations.
              </p>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-medium">&quot;It breaks with complex logic!&quot;</span>
              </div>
              <p className="text-sm text-gray-400">
                Multi-step workflows and intricate business logic confuse AI. We&apos;ll teach you how to break down complexity into AI-digestible chunks.
              </p>
            </div>
          </div>
          
          <div className="text-center p-4 bg-vybe-purple/10 rounded-lg border border-vybe-purple/20">
            <p className="text-sm text-gray-300">
              <span className="text-vybe-purple font-medium">These challenges are real, but they&apos;re solvable.</span> That&apos;s why our guides focus on practical workflows that actually work.
            </p>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-light mb-12 text-center">
            Everything You Need to <GradientText gradient="brand" className="inline-block" style={{ fontSize: '38px' }}>Succeed with AI</GradientText>
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
                <Link href="/guides" className="block text-vybe-purple hover:text-vybe-purple-light text-sm font-medium transition-colors">
                  Browse Guides →
                </Link>
                <Link href="/apps" className="block text-vybe-purple hover:text-vybe-purple-light text-sm font-medium transition-colors">
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
            The <GradientText gradient="brand" className="inline-block" style={{ fontSize: '38px' }}>Build → Guide → Grow</GradientText> Pattern
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
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-light mb-12 text-center">
              What You Could <GradientText gradient="brand" className="inline-block" style={{ fontSize: '38px' }}>Build & Share</GradientText>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto" style={{ marginLeft: '9%' }}>
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
                <Link href="/apps/submit" className="px-8 py-3 bg-gradient-to-r from-vybe-pink to-red-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-vybe-pink/25 hover:-translate-y-0.5 transition-all duration-300">
                  Submit an App
                </Link>
                <Link href="/guides/create" className="px-8 py-3 bg-gradient-to-r from-vybe-purple to-vybe-pink text-white rounded-full font-medium hover:shadow-lg hover:shadow-vybe-purple/25 hover:-translate-y-0.5 transition-all duration-300">
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
            A Rising Tide <GradientText gradient="brand" className="inline-block" style={{ fontSize: '38px' }}>Lifts All Boats</GradientText>
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
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Verified patterns</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Real code that ships</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
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

      {/* Feedback Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-2xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feedback Card */}
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-vybe-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-vybe-purple" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Feedback</h3>
              <p className="text-gray-400 text-sm">Share your thoughts</p>
            </div>

            {/* Bug Reports Card */}
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-vybe-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-vybe-pink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-white">Bug Reports</h3>
              <p className="text-gray-400 text-sm">Help us improve</p>
            </div>
          </div>

          {/* Submit Feedback Button */}
          <div className="text-center mt-8">
            <div className="mb-4">
              <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            <Link href="/feedback" className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-vybe-pink to-red-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-vybe-pink/25 hover:-translate-y-0.5 transition-all duration-300">
              Submit Feedback
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}