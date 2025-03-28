"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useTF2Sounds } from './tf2-sounds-component';

interface WeaponHoverButtonProps {
  children: React.ReactNode;
  className?: string;
  weaponImage: string;
  onClick?: () => void;
}

const WeaponHoverButton: React.FC<WeaponHoverButtonProps> = ({
  children,
  className = "",
  weaponImage,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playSound } = useTF2Sounds();
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    // removed for my own sake
  };
  
  const handleClick = (e: React.MouseEvent) => {
    playSound('buttonClick');
    if (onClick) onClick();
  };
  
  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`${className} relative z-10`}
        onClick={handleClick}
      >
        {children}
      </button>
      
      {isHovered && (
        <div className="absolute -bottom-12 right-0 z-0 opacity-70 transition-all duration-300 transform rotate-12" style={{pointerEvents: 'none'}}>
          <Image 
            src={weaponImage} 
            alt="TF2 Weapon" 
            width={100} 
            height={50} 
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default WeaponHoverButton;