'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Hero() {
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

    const colors = ['#8a2be2', '#d946a0', '#e96b3a', '#ffffff', '#a855f7']
    const starCount = 400

    // Initialize galaxy starfield
    for (let i = 0; i < starCount; i++) {
      const rand = Math.random()
      let starType: 'major' | 'minor' | 'micro'
      let baseSize: number
      let baseOpacity: number
      let colorIndex: number

      if (rand < 0.1) {
        starType = 'major'
        baseSize = Math.random() * 1 + 1.2
        baseOpacity = Math.random() * 0.4 + 0.4
        colorIndex = Math.floor(Math.random() * 3)
      } else if (rand < 0.4) {
        starType = 'minor'
        baseSize = Math.random() * 0.8 + 0.6
        baseOpacity = Math.random() * 0.3 + 0.25
        colorIndex = Math.floor(Math.random() * colors.length)
      } else {
        starType = 'micro'
        baseSize = Math.random() * 0.6 + 0.2
        baseOpacity = Math.random() * 0.2 + 0.1
        colorIndex = Math.random() < 0.7 ? 3 : 4
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
        pulseSpeed: Math.random() * 0.004 + 0.001,
        starType: starType
      })
    }

    // Rising particles system
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

    const maxRisingParticles = 25
    const particleColors = ['#0066ff', '#ffffff', '#8a2be2', '#a855f7']

    const spawnRisingParticle = () => {
      if (risingParticles.length < maxRisingParticles) {
        const particlesToSpawn = Math.floor(Math.random() * 3) + 1
        
        for (let i = 0; i < particlesToSpawn; i++) {
          const maxLife = Math.random() * 20000 + 15000
          risingParticles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            size: Math.random() * 0.4 + 0.1,
            speedY: -(Math.random() * 0.15 + 0.025),
            opacity: Math.random() * 0.35 + 0.05,
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            life: 0,
            maxLife: maxLife
          })
        }
      }
    }

    spawnRisingParticle()
    const particleSpawnInterval = setInterval(spawnRisingParticle, Math.random() * 2000 + 800)

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      stars.forEach(star => {
        star.pulsePhase += star.pulseSpeed
        const fadeMultiplier = (Math.sin(star.pulsePhase) + 1) / 2
        const smoothTwinkle = 0.3 + (fadeMultiplier * 0.7)
        
        star.size = star.baseSize
        star.opacity = star.baseOpacity * smoothTwinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        
        if (star.starType === 'major') {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          )
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(0.6, `${star.color}20`)
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
        } else if (star.starType === 'minor') {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
          )
          gradient.addColorStop(0, star.color)
          gradient.addColorStop(0.8, `${star.color}10`)
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
        
        particle.opacity = (particle.opacity * 0.6) * fadeMultiplier
        
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
    <section className="relative min-h-[94vh] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Hero mesh background */}
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
            radial-gradient(ellipse at 75% 75%, rgba(60, 0, 40, 0.10) 0%, transparent 35%)
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
      <div className="relative z-20 flex items-center justify-center min-h-[94vh] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              Build with AI,{' '}
              <span className="bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange bg-clip-text text-transparent">
                Share Your Knowledge
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The community platform for AI developers to create apps, share guides, 
              offer mentorship, and grow together.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
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
          </motion.div>
          
          {/* Hero Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1</div>
              <div className="text-gray-400">Developer</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Vibe Coded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-400">Coffee Consumed</div>
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