"use client"

import type React from "react"
import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
    alert("Thanks for subscribing!")
  }

  return (
    <section className="py-12 bg-[#CF7336] text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-medium">
              Subscribe for TF2 market insights and API updates
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="px-4 py-2 rounded-l w-full md:w-64 text-gray-800 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#2A2A2A] text-white px-6 py-2 rounded-r font-medium hover:bg-[#1E2124] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
