"use client"

import React, { useState } from 'react'
import FallingKeys from './FallingKeys'

interface KeyRainButtonProps {
  buttonText?: string;
  buttonClassName?: string;
  keyCount?: number;
  duration?: number;
  keySize?: [number, number];
}

const KeyRainButton: React.FC<KeyRainButtonProps> = ({
  buttonText = "Make It Rain Keys!",
  buttonClassName = "btn-primary",
  keyCount = 150,
  duration = 15000,
  keySize = [60, 90]
}) => {
  const [showKeys, setShowKeys] = useState(false)
  
  const handleClick = () => {
    if (showKeys) return;
    
    setShowKeys(true)
    
    setTimeout(() => {
      setShowKeys(false)
    }, duration)
  }
  
  return (
    <>
      <button 
        className={buttonClassName}
        onClick={handleClick}
        disabled={showKeys}
      >
        {buttonText}
      </button>
      
      {showKeys && (
        <FallingKeys 
          keyCount={keyCount}
          autoDisableTime={duration}
          keySize={keySize}
        />
      )}
    </>
  )
}

export default KeyRainButton