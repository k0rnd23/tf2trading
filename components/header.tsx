"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="metal-background py-4 sticky top-0 z-50 shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="mr-8">
            <div className="flex items-center">
              <div className="font-bold text-[#CF7336] text-2xl">TF2 Trade API</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link href="#" className="text-[#F2F3F5] hover:text-[#CF7336]">
                Documentation
              </Link>
              <Link href="#" className="text-[#F2F3F5] hover:text-[#CF7336]">
                Pricing
              </Link>
              <Link href="#" className="text-[#F2F3F5] hover:text-[#CF7336] text-[#CF7336]">
                API Reference
              </Link>
            </nav>
            <Link href="#" className="btn-outline">
              Get API Key
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6 text-[#F2F3F5]" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="#" className="text-[#F2F3F5] hover:text-[#CF7336]">
                Documentation
              </Link>
              <Link href="#" className="text-[#F2F3F5] hover:text-[#CF7336]">
                Pricing
              </Link>
              <Link href="#" className="text-[#F2F3F5] hover:text-[#CF7336] text-[#CF7336]">
                API Reference
              </Link>
              <Link href="#" className="btn-outline inline-block text-center">
                Get API Key
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
