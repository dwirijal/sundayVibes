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

    // DPR-aware sizing so particles stay crisp on retina/HiDPI displays.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Scale particle count by viewport so mobile isn't overworked.
    const area = window.innerWidth * window.innerHeight
    const particleCount = Math.min(500, Math.max(150, Math.round(area / 4000)))

    const particles: Particle[] = []
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
    const w0 = () => window.innerWidth
    const h0 = () => window.innerHeight

    let isVisible = true

    const animate = () => {
      if (!isVisible) return

      animationId = requestAnimationFrame(animate)

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, w0(), h0())

      rotationY += 0.0005
      rotationX += 0.0002

      const cw = w0()
      const ch = h0()

      particles.forEach(particle => {
        // Rotate around Y axis
        const rotatedX = particle.x * Math.cos(rotationY) - particle.z * Math.sin(rotationY)
        const rotatedZ = particle.x * Math.sin(rotationY) + particle.z * Math.cos(rotationY)

        // Rotate around X axis
        const rotatedY = particle.y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX)
        const finalZ = particle.y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX)

        // Project to 2D
        const perspective = 1000
        // Skip particles behind the camera (finalZ <= -perspective) — drawing
        // them would produce a negative/NaN radius and throw IndexSizeError.
        if (finalZ <= -perspective) return
        const scale = perspective / (perspective + finalZ)
        const x2d = rotatedX * scale + cw / 2
        const y2d = rotatedY * scale + ch / 2

        // Draw particle
        const size = Math.max(0, 0.5 * scale)
        const opacity = 0.6 * (1 - finalZ / 2000)

        ctx.fillStyle = `rgba(136, 136, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Intersection Observer to pause animation when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting
          if (isVisible) {
            // Resume animation if it was paused
            cancelAnimationFrame(animationId)
            animate()
          }
        })
      },
      { threshold: 0 }
    )

    observer.observe(canvas)

    // Debounce resize so rapid window drags don't thrash the canvas.
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [prefersReduced])

  if (prefersReduced) {
    return <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
