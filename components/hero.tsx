"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import KeyRainButton from "./KeyRainButton"
import WeaponHoverButton from "./WeaponHoverButton"

const DynamicChart = dynamic(() => import("./DynamicChart"), { ssr: false })

export default function Hero() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A] to-[#36393F] z-0"></div>
      
      <div 
        className="absolute inset-0 z-0 opacity-30" 
        style={{
          backgroundImage: `url('/tf2-noise.png')`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="absolute bottom-0 left-0 opacity-40 z-0">
        <Image src="/tf2-heavy.png" alt="Heavy" width={200} height={300} />
      </div>
      <div className="absolute bottom-0 right-0 opacity-40 z-0">
        <Image src="/tf2-spy.png" alt="Spy" width={200} height={300} />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-[#CF7336] h-1 w-32"></div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center max-w-4xl mx-auto">
          Access real-time <span className="text-[#B8383B] inline-block transform -skew-x-6">TF2</span> item prices and{" "}
          <span className="text-[#5885A2] inline-block transform -skew-x-6">
            trading data
            <span className="text-[#CF7336]">.</span>
          </span>{" "}
          with our powerful API
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#CF7336]"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#CF7336]"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#CF7336]"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#CF7336]"></div>

              <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden shadow-xl card-tf2 border-2 border-[#444444]">
                <div className="bg-[#1E2124] px-3 py-2 border-b border-[#444444] flex items-center">
                  <div className="h-3 w-3 rounded-full bg-[#B8383B] mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-[#5885A2] mr-2"></div>
                  <span className="text-xs text-gray-400 flex-grow"></span>
                </div>
                <DynamicChart />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-6">
              <div className="card-tf2 p-4 hover:border-[#CF7336] transition-duration-300">
                <div className="flex">
                  <div className="mr-3">
                    <div className="w-10 h-10 bg-[#2A2A2A] rounded-full border-2 border-[#CF7336] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1L13 5H17V9L19 10L17 11V15H13L10 19L7 15H3V11L1 10L3 9V5H7L10 1Z" fill="#CF7336" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
                    <p className="text-gray-300">
                      Track price trends across all TF2 items, from keys to unusuals to limited cosmetics
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-tf2 p-4 hover:border-[#B8383B] transition-duration-300">
                <div className="flex">
                  <div className="mr-3">
                    <div className="w-10 h-10 bg-[#2A2A2A] rounded-full border-2 border-[#B8383B] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 5V15M15 10H5" stroke="#B8383B" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="10" cy="10" r="8" stroke="#B8383B" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                    <p className="text-gray-300">
                      Get up-to-the-minute data on price changes, market fluctuations, and trading activity
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-tf2 p-4 hover:border-[#5885A2] transition-duration-300">
                <div className="flex">
                  <div className="mr-3">
                    <div className="w-10 h-10 bg-[#2A2A2A] rounded-full border-2 border-[#5885A2] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="14" height="10" rx="1" stroke="#5885A2" strokeWidth="2"/>
                        <path d="M7 8H13" stroke="#5885A2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M7 12H11" stroke="#5885A2" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Inventory Management</h3>
                    <p className="text-gray-300">
                      Easily fetch user inventories and calculate their value with accurate pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <WeaponHoverButton 
                weaponImage="/tf2-scattergun.png" 
                className="btn-red-team flex items-center justify-center"
              >
                <span className="mr-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8L6 12L14 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Try Demo Endpoint
              </WeaponHoverButton>
              
              <WeaponHoverButton 
                weaponImage="/tf2-wrench.png" 
                className="btn-outline flex items-center justify-center"
              >
                <span className="mr-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4V12M12 8H4" stroke="#CF7336" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                Register for API Access
              </WeaponHoverButton>

              <KeyRainButton 
                buttonText="Make It Rain Keys!"
                buttonClassName="btn-blu-team flex items-center justify-center"
                keyCount={40}
                keySize={[70, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}