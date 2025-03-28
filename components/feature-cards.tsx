"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Activity, Search, Tag, Users, Clock, Zap, BarChart3 } from "lucide-react"

const featureCards = [
  {
    title: "Real-time Item Pricing",
    description: "Track price changes for all TF2 items as they happen. Get accurate values for keys, refined metal, unusuals, and more.",
    link: "Learn More",
    icon: <Activity className="h-6 w-6 mb-3" />,
    color: "card-red"
  },
  {
    title: "New Items & Sold Out Tracking",
    description: "Monitor newly released items and track when popular items sell out on trading sites and the Steam Community Market.",
    link: "Learn More",
    icon: <Search className="h-6 w-6 mb-3" />,
    color: "border-unusual"
  },
  {
    title: "Trader Analysis",
    description: "Get detailed analytics on specific traders, including reputation scores, trading patterns, and item specializations.",
    link: "Learn More",
    icon: <Users className="h-6 w-6 mb-3" />,
    color: "card-blu"
  },
  {
    title: "Trading Volume Insights",
    description: "See which items are trading in high volume and which sellers are most active. Perfect for spotting market manipulation attempts.",
    link: "Learn More",
    icon: <Activity className="h-6 w-6 mb-3" />,
    color: "border-strange"
  },
  {
    title: "Price Alert System",
    description: "Set custom alerts for price changes on specific items. Get notified when items reach your target buy or sell price.",
    link: "Learn More",
    icon: <Tag className="h-6 w-6 mb-3" />,
    color: "card-red"
  },
  {
    title: "Item Category Analytics",
    description: "Research popular TF2 item categories, identify profitable niches, and analyze the competitive landscape.",
    link: "Learn More",
    icon: <BarChart3 className="h-6 w-6 mb-3" />,
    color: "border-genuine"
  },
  {
    title: "Trading History Reports",
    description: "Comprehensive reports on market trading history, unusual effect trends, and seasonal price fluctuations.",
    link: "Learn More",
    icon: <Clock className="h-6 w-6 mb-3" />,
    color: "card-blu"
  }
]

export default function FeatureCardsNew() {
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardsPerView = 4
  const containerRef = useRef<HTMLDivElement>(null)

  const displayCards = [...featureCards, ...featureCards, ...featureCards, ...featureCards]

  const cardWidth = 100 / cardsPerView

  const getScrollOffset = (position: number) => {
    const normalizedPosition = position % featureCards.length
    return normalizedPosition * cardWidth
  }

  const scrollTo = (position: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentPosition(position)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const scrollNext = () => {
    scrollTo(currentPosition + 1)
  }

  const scrollPrev = () => {
    scrollTo(currentPosition - 1)
  }

  const jumpToSlide = (index: number) => {
    scrollTo(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentPosition])

  const currentPage = currentPosition % featureCards.length

  return (
    <section className="py-16 bg-[#36393F] w-full">
      <div className="relative max-w-[1920px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold">Advanced TF2 Trading Analytics</h2>
          <div className="flex space-x-2">
            <button
              onClick={scrollPrev}
              disabled={isAnimating}
              className="p-2 rounded bg-[#2A2A2A] border border-[#444444] hover:bg-[#444444]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-[#CF7336]" />
            </button>
            <button
              onClick={scrollNext}
              disabled={isAnimating}
              className="p-2 rounded bg-[#2A2A2A] border border-[#444444] hover:bg-[#444444]"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-[#CF7336]" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${getScrollOffset(currentPosition)}%)`,
              width: `${displayCards.length * cardWidth}%`,
            }}
          >
            {displayCards.map((card, idx) => (
              <div
                key={idx}
                style={{ width: `${cardWidth}%` }}
                className="px-2"
              >
                <div className={`${card.color === 'card-red' ? 'card-red' :
                                    card.color === 'card-blu' ? 'card-blu' :
                                    'bg-[#2A2A2A]'}
                                  ${card.color === 'border-unusual' ? 'border-unusual' :
                                    card.color === 'border-strange' ? 'border-strange' :
                                    card.color === 'border-genuine' ? 'border-genuine' :
                                    'border border-[#444444]'}
                                  rounded-md p-5 h-80 flex flex-col shadow-md`}>
                  <div className="text-[#CF7336]">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-300 text-sm flex-grow">{card.description}</p>
                  <div className="mt-3">
                    <button className="text-[#CF7336] hover:text-[#B86529] flex items-center text-sm">
                      {card.link}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: featureCards.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => jumpToSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentPage === index ? 'bg-[#CF7336]' : 'bg-[#444444]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
