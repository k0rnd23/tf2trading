"use client"

import React from "react"
import { Code, Database, Zap, Wrench } from "lucide-react"
import Image from "next/image"

export default function HowItWorks() {
  return (
    <section className="py-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a3c5a] z-0">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `linear-gradient(rgba(50, 130, 184, 0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(50, 130, 184, 0.15) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>

        <div className="absolute -bottom-0 -left-10 w-full h-full opacity-20 z-0 transform rotate-90 scale-125">
          <img
            src="/blueprint-scattergun.png"
            alt="TF2 Scattergun Blueprint"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute -top-40 -right-20 w-full h-full opacity-15 z-0 transform -rotate-12 scale-110">
          <img
            src="/tf2-sentry-blueprint-full.png"
            alt="TF2 Sentry Blueprint"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            How It Works
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#CF7336]"></div>
          </h2>

          <div className="bg-[#2A2A2A] p-2 rounded-full border-2 border-[#CF7336]">
            <Wrench className="h-6 w-6 text-[#CF7336]" />
          </div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start relative">
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] border-t-2 border-dashed border-[#CF7336] z-0"></div>

            <div className="flex flex-col items-center text-center mb-16 md:mb-0 md:w-1/3">
              <div className="w-28 h-28 rounded-full border-2 border-[#CF7336] flex items-center justify-center mb-8 bg-[#2A2A2A] z-10 transform hover:scale-105 transition-transform duration-300">
                <Database className="w-10 h-10 text-[#CF7336]" />
              </div>
              <div className="max-w-xs bg-[#2A2A2A] p-4 rounded-md border-2 border-[#444444]">
                <p className="text-lg mb-3 font-tf2build text-white">
                  We collect data from thousands of TF2 trades daily
                </p>
                <p className="mb-3">
                  From <span className="text-[#B8383B] font-bold">Steam Market</span> and{" "}
                  <span className="text-[#5885A2] font-bold relative">
                    Trading Sites
                  </span>
                </p>
                <div className="bg-[#1a3c5a] text-[#8cc4de] text-sm py-2 px-3 rounded-md mt-3 border border-[#5885A2]">
                  Updated every 5 minutes for maximum accuracy
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center mb-16 md:mb-0 md:w-1/3">
              <div className="w-28 h-28 rounded-full border-2 border-[#CF7336] flex items-center justify-center mb-8 bg-[#2A2A2A] z-10 transform hover:scale-105 transition-transform duration-300">
                <Zap className="w-10 h-10 text-[#CF7336]" />
              </div>
              <div className="max-w-xs bg-[#2A2A2A] p-4 rounded-md border-2 border-[#444444]">
                <p className="text-lg mb-3 font-tf2build text-white">
                  Our algorithms calculate fair market values
                </p>
                <p className="mb-2">
                  <span className="text-xl">📈</span> Trends and <span className="text-xl">📊</span> Analysis
                </p>
                <p>for every TF2 item in circulation</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center md:w-1/3">
              <div className="w-28 h-28 rounded-full border-2 border-[#CF7336] flex items-center justify-center mb-8 bg-[#2A2A2A] z-10 transform hover:scale-105 transition-transform duration-300">
                <Code className="w-10 h-10 text-[#CF7336]" />
              </div>
              <div className="max-w-xs bg-[#2A2A2A] p-4 rounded-md border-2 border-[#444444]">
                <p className="text-lg mb-3 font-tf2build text-white">
                  Access via simple REST API requests
                </p>
                <p>
                  Integrate our data into your applications with just a few lines of code
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-[#2A2A2A] px-6 py-3 rounded-md border-2 border-[#444444] max-w-xl">
            <p className="text-[#CF7336] italic font-tf2secondary">
              "I solve practical problems. Like how am I going to help you get the best TF2 trading data? The answer? Use an API."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
