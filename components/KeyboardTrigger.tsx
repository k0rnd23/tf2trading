"use client"

import { useState, useEffect } from 'react'
import FallingKeys from "./FallingKeys"

interface KeyboardTriggerProps {
  triggerKey?: string;
  keyCount?: number;
  duration?: number;
  keySize?: [number, number];
}

export default function KeyboardTrigger({
  triggerKey = 'k',
  keyCount = 40,
  duration = 10000,
  keySize = [70, 100]
}: KeyboardTriggerProps) {
  const [showKeys, setShowKeys] = useState(false)
  
  useEffect(() => {
    // only on client-side
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // when the trigger key activated
      if (e.key.toLowerCase() === triggerKey.toLowerCase()) {
        // if there is keys on screen then do nothing
        if (showKeys) return;
        
        setShowKeys(true)
        setTimeout(() => setShowKeys(false), duration)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [triggerKey, duration, showKeys])
  
  if (!showKeys) return null;
  
  return (
    <FallingKeys 
      keyCount={keyCount}
      autoDisableTime={duration}
      keySize={keySize}
    />
  )
}