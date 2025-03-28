"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTF2Sounds } from './tf2-sounds-component'

interface TF2CrateProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const TF2Crate: React.FC<TF2CrateProps> = ({ 
  position = 'bottom-right' 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [item, setItem] = useState<null | {
    name: string;
    quality: string;
    image: string;
  }>(null)
  const [animationStage, setAnimationStage] = useState(0) 
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, rotation: number}>>([])
  const { playSound } = useTF2Sounds()
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const positionStyles = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }
  
  const possibleItems = [
    { 
      name: 'Unusual Team Captain', 
      quality: 'tf2-unusual', 
      chance: 5,
      image: '/items/unusual-team-captain.png' 
    },
    { 
      name: 'Strange Scattergun', 
      quality: 'tf2-strange', 
      chance: 20,
      image: '/items/strange-scattergun.png'
    },
    { 
      name: 'Australium Rocket Launcher', 
      quality: 'tf2-australium', 
      chance: 10,
      image: '/items/australium-rocket-launcher.png'
    },
    { 
      name: 'Genuine AWPer Hand', 
      quality: 'tf2-genuine', 
      chance: 15,
      image: '/items/genuine-awper-hand.png' 
    },
    { 
      name: 'Mann Co. Supply Key', 
      quality: 'tf2-unique', 
      chance: 40,
      image: '/items/mann-co-key.png'
    },
    { 
      name: 'Vintage Killing Gloves of Boxing', 
      quality: 'tf2-vintage', 
      chance: 10,
      image: '/items/vintage-kgb.png' 
    }
  ]
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000) // 10 seconds delay
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (animationStage === 2) {
      createParticles()
      particleIntervalRef.current = setInterval(createParticles, 100)
      
      return () => {
        if (particleIntervalRef.current) {
          clearInterval(particleIntervalRef.current)
        }
      }
    }
  }, [animationStage])
  
  const createParticles = () => {
    const newParticles = []
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * 80 - 40, // position relative to center
        y: Math.random() * 80 - 40,
        size: 3 + Math.random() * 5,
        speed: 0.5 + Math.random() * 2,
        rotation: Math.random() * 360
      })
    }
    
    setParticles(prev => [...prev, ...newParticles])
    
    if (particles.length > 50) {
      setParticles(prev => prev.slice(prev.length - 50))
    }
  }
  
  const handleClick = () => {
    if (isOpen) return
    
    playSound('keyDrop')
    
    setIsOpen(true)
    setAnimationStage(1)
    
    const totalChance = possibleItems.reduce((sum, item) => sum + item.chance, 0)
    let randomValue = Math.random() * totalChance
    let selectedItem = null
    
    for (const potentialItem of possibleItems) {
      randomValue -= potentialItem.chance
      if (randomValue <= 0) {
        selectedItem = potentialItem
        break
      }
    }
    
    setTimeout(() => {
      setAnimationStage(2)
      playSound('crateOpen')
    }, 800)
    
    setTimeout(() => {
      if (selectedItem) {
        setItem(selectedItem)
        setAnimationStage(3)
        
        if (selectedItem.quality === 'tf2-unusual') {
          playSound('success')
          setTimeout(() => playSound('success'), 300)
        } else if (selectedItem.quality === 'tf2-strange' || selectedItem.quality === 'tf2-australium') {
          playSound('success')
        } else {
          playSound('buttonClick')
        }
      }
    }, 2000)
    
    setTimeout(() => {
      setIsOpen(false)
      setItem(null)
      setAnimationStage(0)
      setParticles([])
      
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current)
      }
    }, 8000)
  }
  
  if (!isVisible) return null
  
  return (
    <div className={`fixed ${positionStyles[position]} z-40 cursor-pointer`}>
      <div
        className={`relative w-24 h-24 ${isOpen ? 'animate-crate-open' : 'animate-bounce-slow'}`}
        onClick={handleClick}
      >
        <Image
          src="/tf2-crate.png"
          alt="TF2 Crate"
          width={96}
          height={96}
          className={`transition-all duration-500 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        />
        
        {isOpen && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {animationStage === 1 && (
              <div className="absolute inset-0 bg-white animate-flash rounded-full"></div>
            )}
            
            {animationStage >= 2 && particles.map(particle => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-yellow-400"
                style={{
                  left: 'calc(50% + ' + particle.x + 'px)',
                  top: 'calc(50% + ' + particle.y + 'px)',
                  width: particle.size + 'px',
                  height: particle.size + 'px',
                  opacity: 0.8,
                  transform: `rotate(${particle.rotation}deg)`,
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
                  animation: `particle-float-out ${2 / particle.speed}s ease-out forwards`
                }}
              />
            ))}
            
            <div className={`w-48 h-40 bg-[#2A2A2A] rounded-md border-2 border-[#CF7336] p-3 text-center 
                           ${animationStage === 2 ? 'animate-reveal-item' : 'animate-float-item'}
                           absolute -top-44 left-1/2 transform -translate-x-1/2
                           ${item?.quality === 'tf2-unusual' && 'shadow-purple'}
                           ${item?.quality === 'tf2-strange' && 'shadow-orange'}
                           ${item?.quality === 'tf2-unique' && 'shadow-yellow'}
                           ${item?.quality === 'tf2-vintage' && 'shadow-blue'}
                           ${item?.quality === 'tf2-genuine' && 'shadow-green'}
                           ${item?.quality === 'tf2-australium' && 'shadow-gold'}`}>
              
              {item ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative w-28 h-28 mb-2 animate-float-slow">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={112}
                      height={112}
                      className="object-contain"
                    />
                    
                    {item.quality === 'tf2-unusual' && (
                      <div className="absolute inset-0 animate-unusual-effect">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute inset-0 bg-purple-500 opacity-0 rounded-full"
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              animation: 'unusual-particle 2s ease-out infinite'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`${item.quality} text-base font-bold leading-tight`}>
                    {item.name}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-white animate-pulse">Unboxing...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TF2Crate
