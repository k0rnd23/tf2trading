"use client"

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

type KeyProps = {
  id: number
  left: number
  delay: number
  rotation: number
  duration: number
  size: number
}

interface FallingKeysProps {
  keyCount?: number;      // number of keys to display
  duration?: number;      // how long the animation lasts in seconds
  autoDisable?: boolean;  // whether to automatically stop after a certain time
  autoDisableTime?: number; // time in ms after which to auto-disable
  keySize?: [number, number]; // min and max key size range [min, max]
}

const FallingKeys: React.FC<FallingKeysProps> = ({
  keyCount = 15,
  duration = 15000,
  autoDisable = true,
  autoDisableTime = 15000,
  keySize = [30, 50]
}) => {
  const [keys, setKeys] = useState<KeyProps[]>([])
  const [isActive, setIsActive] = useState(true)

  const createKey = useCallback((id: number) => {
    return {
      id,
      left: Math.random() * 100, // random position across the screen
      delay: Math.random() * 3, // random delay before starting to fall
      rotation: Math.random() * 360, // random initial rotation
      duration: 5 + Math.random() * 10, // random falling speed
      size: keySize[0] + Math.random() * (keySize[1] - keySize[0]) // random size between min-max
    }
  }, [keySize])

  useEffect(() => {
    const initialKeys = Array.from({ length: keyCount }, (_, i) => createKey(i))
    setKeys(initialKeys)

    if (autoDisable) {
      const timer = setTimeout(() => {
        setIsActive(false)
      }, autoDisableTime)

      return () => clearTimeout(timer)
    }
  }, [keyCount, autoDisable, autoDisableTime, createKey])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setKeys(prevKeys => {
        // remove a key that no longer is active
        const newKeys = [...prevKeys]
        if (newKeys.length > 0) {
          newKeys.shift()
        }
        newKeys.push(createKey(Date.now()))
        return newKeys
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive, createKey])

  if (!isActive) return null

  const keyframesFall = `
    @keyframes fall {
      0% { transform: translateY(-100px) rotate(${Math.random() * 360}deg); }
      100% { transform: translateY(100vh) rotate(${Math.random() * 360}deg); }
    }
  `;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>{keyframesFall}</style>
      {keys.map(key => (
        <div
          key={key.id}
          className="absolute"
          style={{
            left: `${key.left}%`,
            top: '-50px',
            animation: `fall ${key.duration}s linear ${key.delay}s forwards`,
            transform: `rotate(${key.rotation}deg)`,
          }}
        >
          <Image
            src="/tf2-key.png"
            alt="TF2 Key"
            width={key.size}
            height={key.size}
            className="object-contain animate-spin-slow"
          />
        </div>
      ))}
    </div>
  )
}

export default FallingKeys