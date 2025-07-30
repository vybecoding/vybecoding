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

    // Particle system
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
    }> = []

    const colors = ['#8a2be2', '#d946a0', '#e96b3a']
    const particleCount = 80

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
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
                "inline-block bg-gradient-to-r from-vybe-purple to-vybe-pink",
                "text-white text-xl px-12 py-4 rounded-lg font-semibold",
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