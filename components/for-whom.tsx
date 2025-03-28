import React from "react"
import Image from "next/image"
import {
  Key,
  Monitor,
  Bot,
  Video,
  TrendingUp
} from "lucide-react"

const ForWhom: React.FC = () => {
  return (
    <section className="py-16 pt-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a3c5a] z-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(rgba(50, 130, 184, 0.15) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(50, 130, 184, 0.15) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        <div className="absolute top-40 -right-20 w-full h-full opacity-15 z-0 transform -rotate-15 scale-110">
          <img 
            src="/tf2-sentry-blueprint-full.png" 
            alt="TF2 Sentry Blueprint" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 opacity-25 z-0 transform rotate-45 scale-90 translate-y-1/4 -translate-x-1/4">
          <img 
            src="/blueprint-2.png"
            alt="TF2 Sentry Blueprint" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <h2 className="text-3xl font-bold mb-16 text-center text-white relative inline-block">
          Who Can Benefit from Our API
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#CF7336]"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 bg-[#CF7336] rounded-full flex items-center justify-center border-2 border-black transform hover:scale-105 transition-transform duration-300">
              <Key className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-[#CF7336] font-tf2build">TF2 Traders</h3>
            <div className="card-tf2 p-4 h-full border-2 border-[#444444] hover:border-[#CF7336] transition-duration-300">
              <p className="text-gray-300 text-sm leading-relaxed">
                Get real-time access to accurate item prices and market trends. Make informed trading decisions, identify profitable deals, and track your portfolio's value with powerful analytics.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 bg-[#B8383B] rounded-full flex items-center justify-center border-2 border-black transform hover:scale-105 transition-transform duration-300">
              <Monitor className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-[#CF7336] font-tf2build">Trading Site Operators</h3>
            <div className="card-tf2 p-4 h-full border-2 border-[#444444] hover:border-[#B8383B] transition-duration-300">
              <p className="text-gray-300 text-sm leading-relaxed">
                Power your trading platform with reliable pricing data. Provide users with accurate item valuations, detect suspicious trading patterns, and build trust with consistently fair pricing.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 bg-[#5885A2] rounded-full flex items-center justify-center border-2 border-black transform hover:scale-105 transition-transform duration-300">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-[#CF7336] font-tf2build">Bot Developers</h3>
            <div className="card-tf2 p-4 h-full border-2 border-[#444444] hover:border-[#5885A2] transition-duration-300">
              <p className="text-gray-300 text-sm leading-relaxed">
                Create sophisticated trading bots with our comprehensive API. Automate pricing decisions, implement advanced trading strategies, and scale your operations with reliable data.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 bg-[#B8383B] rounded-full flex items-center justify-center border-2 border-black transform hover:scale-105 transition-transform duration-300">
              <Video className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-[#CF7336] font-tf2build">Content Creators</h3>
            <div className="card-tf2 p-4 h-full border-2 border-[#444444] hover:border-[#B8383B] transition-duration-300">
              <p className="text-gray-300 text-sm leading-relaxed">
                Enhance your TF2 trading videos, guides, and market analysis with accurate data. Provide your audience with valuable insights and build credibility with data-backed content.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 bg-[#5885A2] rounded-full flex items-center justify-center border-2 border-black transform hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-[#CF7336] font-tf2build">Inventory Investors</h3>
            <div className="card-tf2 p-4 h-full border-2 border-[#444444] hover:border-[#5885A2] transition-duration-300">
              <p className="text-gray-300 text-sm leading-relaxed">
                Identify long-term investment opportunities in the TF2 market. Track limited items, monitor unusual effect trends, and maximize your return on investment with comprehensive market data.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#2A2A2A] px-6 py-3 rounded-md border-2 border-[#444444] max-w-lg">
            <p className="text-[#5885A2] italic font-tf2secondary">
              "Need some data? Erectin' an API!"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForWhom
