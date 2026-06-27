'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  z: number
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Create particles
    const particles: Particle[] = []
    const particleCount = 500

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000
      })
    }

    let animationId: number
    let rotationY = 0
    let rotationX = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      rotationY += 0.0005
      rotationX += 0.0002

      particles.forEach(particle => {
        // Rotate around Y axis
        const rotatedX = particle.x * Math.cos(rotationY) - particle.z * Math.sin(rotationY)
        const rotatedZ = particle.x * Math.sin(rotationY) + particle.z * Math.cos(rotationY)

        // Rotate around X axis
        const rotatedY = particle.y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX)
        const finalZ = particle.y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX)

        // Project to 2D
        const perspective = 1000
        const scale = perspective / (perspective + finalZ)
        const x2d = rotatedX * scale + canvas.width / 2
        const y2d = rotatedY * scale + canvas.height / 2

        // Draw particle
        const size = 0.5 * scale
        const opacity = 0.6 * (1 - finalZ / 2000)

        ctx.fillStyle = `rgba(136, 136, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fill()
      })
    }
    animate()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReduced])

  if (prefersReduced) {
    return <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
