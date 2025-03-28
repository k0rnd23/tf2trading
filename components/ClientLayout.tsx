"use client"

import { useEffect } from "react"
import ParallaxBackground from "@/components/ParallaxBackground"
import { SoundToggle, initGlobalSoundHandlers } from "@/components/tf2-sounds-component"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    initGlobalSoundHandlers()
  }, [])

  return (
    <>
      <ParallaxBackground />
      <SoundToggle />
      {children}
    </>
  )
}