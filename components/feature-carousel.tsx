"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type FeatureCard = {
  title: string
  description: string
  icon: string
}

export default function FeatureCarousel() {
  const features: FeatureCard[] = [
    {
      title: "Анализ конкурентов",
      description: "Получите полную информацию о продажах конкурентов, их ассортименте и ценовой политике",
      icon: "📊",
    },
    {
      title: "Мониторинг трендов",
      description: "Отслеживайте тренды в категориях и нишах, чтобы быстро реагировать на изменения рынка",
      icon: "📈",
    },
    {
      title: "Ценовая аналитика",
      description: "Анализируйте ценообразование конкурентов и оптимизируйте свои цены для максимальной прибыли",
      icon: "💰",
    },
    {
      title: "Отчеты по продажам",
      description: "Детальные отчеты по продажам в разрезе категорий, брендов и конкретных товаров",
      icon: "📝",
    },
    {
      title: "Анализ отзывов",
      description: "Изучайте отзывы на товары конкурентов и используйте эту информацию для улучшения своих продуктов",
      icon: "💬",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? features.length - 1 : prevIndex - 1))
  }, [features.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === features.length - 1 ? 0 : prevIndex + 1))
  }, [features.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrev()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, handleNext, handlePrev])

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-12 text-center">Возможности платформы</h2>

        <div className="relative">
          <div
            className="overflow-hidden"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#f8faf9] rounded-lg p-8 h-64 flex flex-col">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-[#1e9d5a]" : "bg-gray-300"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}