"use client"

import { useEffect, useState } from 'react'

// Sound effect paths
const SOUND_EFFECTS = {
  buttonClick: '/sounds/tf2-button-click.mp3',
  success: '/sounds/tf2-success.mp3',
  notification: '/sounds/tf2-notification.mp3',
  keyDrop: '/sounds/tf2-key-drop.mp3',
  crateOpen: '/sounds/tf2-crate.mp3'
}

// Volume levels
const DEFAULT_VOLUME = 0.3

class SoundManager {
  private static instance: SoundManager
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private muted: boolean = false
  private loadedSounds: boolean = false
  private lastPlayedTime: number = 0
  private clickDebounceTime: number = 50 // ms to prevent duplicate clicks
  
  private constructor() {
    this.loadSounds()
  }
  
  private loadSounds() {
    if (typeof window === 'undefined') return
    
    // Pre-load sounds
    Object.entries(SOUND_EFFECTS).forEach(([name, path]) => {
      try {
        const audio = new Audio(path)
        audio.volume = DEFAULT_VOLUME
        audio.preload = 'auto'
        this.sounds.set(name, audio)
      } catch (e) {
        console.error(`Error loading sound ${name} from ${path}:`, e)
      }
    })
    
    this.loadedSounds = true
  }
  
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }
  
  play(soundName: keyof typeof SOUND_EFFECTS, forcePlay: boolean = false): void {
    if (this.muted || typeof window === 'undefined') return
    
    // Debounce mechanism to prevent rapid repeated sounds (only for button clicks)
    const now = Date.now()
    if (soundName === 'buttonClick' && !forcePlay) {
      if (now - this.lastPlayedTime < this.clickDebounceTime) {
        return // Skip if clicked too recently
      }
      this.lastPlayedTime = now
    }
    
    if (!this.loadedSounds) {
      this.loadSounds()
    }
    
    const sound = this.sounds.get(soundName)
    if (sound) {
      // Create a clone to allow overlapping sounds
      try {
        const clone = sound.cloneNode() as HTMLAudioElement
        clone.volume = DEFAULT_VOLUME
        clone.play().catch(e => console.error(`Error playing sound ${soundName}:`, e))
      } catch (e) {
        console.error(`Error cloning sound ${soundName}:`, e)
      }
    } else {
      console.warn(`Sound ${soundName} not found`)
    }
  }
  
  setMuted(muted: boolean): void {
    this.muted = muted
    // Store mute preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tf2SoundsMuted', muted ? 'true' : 'false')
    }
  }
  
  isMuted(): boolean {
    return this.muted
  }
  
  // Load mute preference from localStorage
  loadMutePreference(): void {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('tf2SoundsMuted')
      if (savedMute !== null) {
        this.muted = savedMute === 'true'
      }
    }
  }
}

// Track if global handlers have been initialized to prevent duplicates
let handlersInitialized = false

// Global event handlers for sounds
export function initGlobalSoundHandlers() {
  if (typeof window === 'undefined' || handlersInitialized) return
  handlersInitialized = true

  const soundManager = SoundManager.getInstance()
  soundManager.loadMutePreference()
  
  // Add click sound to buttons
  document.addEventListener('click', (e) => {
    // Find the actual clicked element
    const target = e.target as HTMLElement
    
    // Only play sound if the clicked element is a button or interactive element
    // AND if it doesn't have the data-no-sound attribute
    if (
      (target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]')) &&
      !target.hasAttribute('data-no-sound') &&
      !(target.closest('[data-no-sound]'))
    ) {
      soundManager.play('buttonClick')
      
      // Add data-no-sound to prevent multiple sounds with bubbling
      // and remove it after a small delay
      const elements = [
        target, 
        target.closest('button'), 
        target.closest('a'), 
        target.closest('[role="button"]')
      ].filter(Boolean) as HTMLElement[]
      
      elements.forEach(el => {
        if (el) {
          el.setAttribute('data-no-sound', 'true')
          setTimeout(() => {
            el.removeAttribute('data-no-sound')
          }, 100)
        }
      })
    }
  }, { passive: true })
}

// Hook to add sound effects to elements
export function useTF2Sounds() {
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Initialize sounds
    const soundManager = SoundManager.getInstance()
    soundManager.loadMutePreference()
    
    // Initialize global event handlers
    initGlobalSoundHandlers()
    
    // Update mute state from sound manager
    setIsMuted(soundManager.isMuted())
  }, [])
  
  const soundManager = SoundManager.getInstance()
  
  return {
    playSound: (sound: keyof typeof SOUND_EFFECTS) => soundManager.play(sound, true),
    toggleMute: () => {
      const newMuteState = !soundManager.isMuted()
      soundManager.setMuted(newMuteState)
      setIsMuted(newMuteState)
    },
    isMuted: () => soundManager.isMuted()
  }
}

// Sound toggle button component
export function SoundToggle() {
  const { toggleMute, isMuted } = useTF2Sounds()
  
  return (
    <button 
      onClick={(e) => {
        // Prevent default click sound for this button
        e.stopPropagation()
        toggleMute()
      }}
      className="fixed bottom-4 right-4 z-50 bg-[#36393F] p-2 rounded-full border border-[#CF7336]"
      aria-label={isMuted() ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted() ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CF7336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CF7336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 8a5 5 0 0 1 0 8"></path>
          <path d="M17.7 5a9 9 0 0 1 0 14"></path>
          <path d="M6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l8-5v16l-8-5z"></path>
        </svg>
      )}
    </button>
  )
}

export default useTF2Sounds;