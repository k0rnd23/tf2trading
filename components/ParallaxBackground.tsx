"use client"

import React, { useEffect, useRef } from 'react'

const ParallaxBackground: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      
      const scrollPosition = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#1a3c5a]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(50, 130, 184, 0.15) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(50, 130, 184, 0.15) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div 
        ref={parallaxRef}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-5 w-full max-w-3xl"
      >
        <img 
          src="/tf2-sentry-blueprint.svg" 
          alt="TF2 Blueprint" 
          className="w-full h-auto"
        />
      </div>
      
      <div 
        className="absolute inset-0 opacity-10 animate-slow-drift"
        style={{
          backgroundImage: `radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(0, 0, 0, 0) 70%
          )`
        }}
      />
    </div>
  )
}

export default ParallaxBackground