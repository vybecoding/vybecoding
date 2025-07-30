'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
}

export default function Hero({ className }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Galaxy Starfield - Fixed pulsing stars
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

    const colors = ['#8a2be2', '#d946a0', '#e96b3a', '#ffffff', '#a855f7'] // vybe colors + white/light purple
    const starCount = 400 // Double the stars - dense galaxy

    // Initialize galaxy starfield
    for (let i = 0; i < starCount; i++) {
      // Star distribution: 10% major, 30% minor, 60% micro
      const rand = Math.random()
      let starType: 'major' | 'minor' | 'micro'
      let baseSize: number
      let baseOpacity: number
      let colorIndex: number

      if (rand < 0.1) {
        // Major stars - bright, larger, brand colors (capped size)
        starType = 'major'
        baseSize = Math.random() * 1 + 1.2 // 1.2 to 2.2 (smaller max)
        baseOpacity = Math.random() * 0.4 + 0.4 // 0.4 to 0.8
        colorIndex = Math.floor(Math.random() * 3) // Only brand colors
      } else if (rand < 0.4) {
        // Minor stars - medium, mix of colors (capped size)
        starType = 'minor'
        baseSize = Math.random() * 0.8 + 0.6 // 0.6 to 1.4 (smaller max)
        baseOpacity = Math.random() * 0.3 + 0.25 // 0.25 to 0.55
        colorIndex = Math.floor(Math.random() * colors.length) // All colors
      } else {
        // Micro stars - small, mostly white/subtle (capped size)
        starType = 'micro'
        baseSize = Math.random() * 0.6 + 0.2 // 0.2 to 0.8 (smaller max)
        baseOpacity = Math.random() * 0.2 + 0.1 // 0.1 to 0.3
        colorIndex = Math.random() < 0.7 ? 3 : 4 // Mostly white, some light purple
      }
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: baseSize,
        baseSize: baseSize,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        color: colors[colorIndex],
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        pulseSpeed: Math.random() * 0.004 + 0.001, // 0.001 to 0.005 (even slower, more realistic)
        starType: starType
      })
    }

    // Rising particles system (like demo)
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

    const maxRisingParticles = 25 // More particles for denser effect
    const particleColors = ['#8a2be2', '#d946a0', '#e96b3a', '#ffffff'] // Add white like demo

    // Function to spawn new rising particles (exact demo style)
    const spawnRisingParticle = () => {
      if (risingParticles.length < maxRisingParticles) {
        // Spawn 1-3 particles at once (like demo bursts)
        const particlesToSpawn = Math.floor(Math.random() * 3) + 1
        
        for (let i = 0; i < particlesToSpawn; i++) {
          const maxLife = Math.random() * 20000 + 15000 // 15-35 seconds (very long journey)
          risingParticles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50, // Spawn slightly below screen
            size: Math.random() * 0.8 + 0.2, // 0.2 to 1px (very tiny like demo)
            speedY: -(Math.random() * 0.3 + 0.05), // 0.05 to 0.35 upward (very slow drift)
            opacity: Math.random() * 0.35 + 0.05, // 0.05 to 0.4 (very subtle)
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            life: 0,
            maxLife: maxLife
          })
        }
      }
    }

    // Initial spawn and continuous spawning (demo pattern)
    spawnRisingParticle() // Spawn some immediately
    const particleSpawnInterval = setInterval(spawnRisingParticle, Math.random() * 2000 + 800) // Every 0.8-2.8 seconds

    // Galaxy animation loop - fixed pulsing stars + rising particles
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      stars.forEach(star => {
        // Stars are fixed in position - smooth fade in/out twinkling
        star.pulsePhase += star.pulseSpeed
        
        // Smooth sine wave for gentle fade in/out (no harsh blinking)
        const fadeMultiplier = (Math.sin(star.pulsePhase) + 1) / 2 // 0 to 1 (smooth fade)
        const smoothTwinkle = 0.3 + (fadeMultiplier * 0.7) // 0.3 to 1.0 range (never fully disappears)
        
        star.size = star.baseSize // Keep size constant
        star.opacity = star.baseOpacity * smoothTwinkle

        // Draw star with appropriate glow based on type
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        
        if (star.starType === 'major') {
          // Major stars get strong glow
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          )
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(0.6, `${star.color}20`) // 20% opacity
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
        } else if (star.starType === 'minor') {
          // Minor stars get subtle glow  
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
          )
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(0.8, `${star.color}10`) // 10% opacity
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
        } else {
          // Micro stars are simple dots
          ctx.fillStyle = star.color
        }
        
        ctx.globalAlpha = star.opacity
        ctx.fill()
      })

      // Update and draw rising particles
      for (let i = risingParticles.length - 1; i >= 0; i--) {
        const particle = risingParticles[i]
        
        // Update particle
        particle.y += particle.speedY
        particle.life += 16.67 // Assuming 60fps (1000/60)
        
        // Demo-style fade: Start faint, peak in middle, fade out
        const lifetimeProgress = particle.life / particle.maxLife
        let fadeMultiplier
        
        if (lifetimeProgress < 0.3) {
          // Fade in during first 30% of life
          fadeMultiplier = lifetimeProgress / 0.3
        } else if (lifetimeProgress < 0.7) {
          // Stay visible during middle 40% of life
          fadeMultiplier = 1
        } else {
          // Fade out during last 30% of life
          fadeMultiplier = (1 - lifetimeProgress) / 0.3
        }
        
        particle.opacity = (particle.opacity * 0.6) * fadeMultiplier // Apply demo-style fade curve
        
        // Remove particle if it's done
        if (particle.life >= particle.maxLife || particle.y < -10) {
          risingParticles.splice(i, 1)
          continue
        }
        
        // Draw tiny rising particle
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
    <section className={cn('relative min-h-[90vh] overflow-hidden', className)}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Hero mesh background from demo */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse at 15% 30%, rgba(75, 18, 0, 0.38) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 20%, rgba(38, 0, 75, 0.34) 0%, transparent 45%),
            radial-gradient(ellipse at 40% 70%, rgba(0, 18, 75, 0.28) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 80%, rgba(75, 0, 50, 0.17) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 85%, rgba(0, 0, 0, 0.24) 0%, transparent 30%),
            radial-gradient(ellipse at 15% 88%, rgba(0, 20, 80, 0.35) 0%, transparent 30%),
            radial-gradient(ellipse at 60% 40%, rgba(0, 18, 75, 0.24) 0%, transparent 25%),
            radial-gradient(ellipse at 90% 15%, rgba(25, 0, 75, 0.28) 0%, transparent 20%),
            radial-gradient(ellipse at 55% 45%, rgba(19, 9, 75, 0.20) 0%, transparent 50%),
            radial-gradient(ellipse at 58% 35%, rgba(28, 9, 75, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 47% 55%, rgba(10, 14, 75, 0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 65% 50%, rgba(20, 10, 60, 0.12) 0%, transparent 35%),
            radial-gradient(ellipse at 50% 45%, rgba(15, 5, 50, 0.10) 0%, transparent 60%),
            radial-gradient(ellipse at 75% 75%, rgba(60, 0, 40, 0.10) 0%, transparent 35%),
            conic-gradient(from 225deg at 70% 30%, transparent 0deg, rgba(75, 18, 0, 0.19) 90deg, transparent 180deg)
          `,
          backgroundColor: '#000000'
        }}
      />

      {/* Floating particles */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[90vh] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight">
              <span className="font-medium gradient-text">vybecoding.ai</span>
            </h1>
            <p className="text-2xl md:text-4xl text-gray-300 font-light mb-8">
              Where <span className="gradient-text">vibe coding</span> meets<br/>
              <span className="bg-gradient-to-r from-vybe-orange via-vybe-pink to-vybe-purple bg-clip-text text-transparent">
                context engineering
              </span>.
            </p>
            <h2 className="text-xl md:text-2xl text-gray-300 font-light mb-8">
              Learn from AI builders who've shipped real products.<br/>
              Get <span className="text-vybe-purple-light">guides</span>, showcase <span className="text-vybe-pink">apps</span>, connect with <span className="text-vybe-orange">mentors</span>.
            </h2>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/pricing"
              className={cn(
                "inline-block bg-gradient-to-r from-vybe-purple to-vybe-orange",
                "text-white text-xl px-12 py-4 rounded-3xl font-semibold",
                "hover:shadow-lg hover:shadow-vybe-purple/25 hover:-translate-y-0.5",
                "transition-all duration-300 transform",
                "focus:outline-none focus:ring-2 focus:ring-vybe-purple focus:ring-offset-2 focus:ring-offset-gray-900"
              )}
            >
              Start Building with AI
            </Link>
            <p className="text-sm text-gray-400 mt-4">Start free • No credit card required</p>
            
            {/* Subtle Credibility */}
            <div className="flex justify-center items-center gap-6 text-xs text-gray-500 mt-6">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Coined by Karpathy
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                Merriam-Webster Official
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-12 h-12 text-gray-500 mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}