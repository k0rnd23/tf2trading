"use client"

import { useState } from "react"
import Link from "next/link"
import { Info, Check, X } from "lucide-react"

export default function Pricing() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleTooltipHover = (id: string) => {
    setActiveTooltip(id);
  }

  const handleTooltipLeave = () => {
    setActiveTooltip(null);
  }

  const tooltipContent: Record<string, string> = {
    "item-price": "Access to current and historical item prices",
    "inventory": "Fetch and value player inventories",
    "price-history": "Historical price data going back years",
    "unusual-effects": "Full unusual effect pricing data",
    "market-volume": "Trading volume statistics",
    "suggestions": "Price suggestions based on market activity",
    "alerts": "Real-time price change alerts",
    "currency": "Support for multiple currencies (USD, EUR, keys, metal)",
    "user-reputation": "Access to user reputation and trading history data",
    "custom-endpoints": "Custom endpoints for specific application needs",
    "dedicated-support": "Priority support with 24-hour response time",
    "rate-limits": "Higher rate limits for more frequent API calls",
    "bulk-requests": "Support for bulk item requests",
    "advanced-analytics": "Advanced market analytics and trend predictions"
  };

  return (
    <section className="py-16 bg-[#2A2A2A]">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">API Plans</h2>

          <div className="flex border rounded overflow-hidden">
            <button
              className={`py-2 px-4 text-sm ${selectedPeriod === "month" ? "bg-[#CF7336] text-white" : "text-gray-300 hover:bg-[#36393F]"}`}
              onClick={() => setSelectedPeriod("month")}
            >
              Monthly
            </button>
            <button
              className={`py-2 px-4 text-sm ${selectedPeriod === "year" ? "bg-[#CF7336] text-white" : "text-gray-300 hover:bg-[#36393F]"}`}
              onClick={() => setSelectedPeriod("year")}
            >
              Yearly <span className="text-xs bg-[#B8383B] text-white px-1 py-0.5 rounded ml-1">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans notice */}
        <div className="bg-[#36393F] rounded border border-[#444444] p-4 mb-8 flex items-center">
          <div className="w-8 h-8 rounded-full border border-[#CF7336] flex items-center justify-center mr-3">
            <span className="text-[#CF7336] text-sm">🔔</span>
          </div>
          <p className="text-gray-300">New users receive a 7-day trial with 1000 API calls to test the service</p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="border border-[#444444] rounded bg-[#36393F] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Scout</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#CF7336]">$19.99</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
              </div>

              <div className="relative mb-4">
                <div
                  className="flex items-center text-sm"
                >
                  <span>100,000 API calls per month</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <div
                    className="flex items-center justify-between"
                    onMouseEnter={() => handleTooltipHover("item-price")}
                    onMouseLeave={handleTooltipLeave}
                  >
                    <div className="flex items-center">
                      <span>Item Pricing</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                    </div>
                    <Check className="w-5 h-5 text-[#CF7336]" />
                  </div>

                  {activeTooltip === "item-price" && (
                    <div className="absolute right-0 top-full mt-1 z-10 bg-black text-white text-xs p-2 rounded shadow-lg max-w-xs">
                      {tooltipContent["item-price"]}
                    </div>
                  )}
                </div>

                {[
                  { name: "Inventory Access", id: "inventory", enabled: true },
                  { name: "Price History (30 days)", id: "price-history", enabled: true },
                  { name: "Unusual Effects", id: "unusual-effects", enabled: true },
                  { name: "Market Volume", id: "market-volume", enabled: false },
                  { name: "Price Suggestions", id: "suggestions", enabled: false },
                  { name: "Price Alerts", id: "alerts", enabled: false },
                  { name: "Multiple Currencies", id: "currency", enabled: true },
                  { name: "User Reputation", id: "user-reputation", enabled: false },
                  { name: "Custom Endpoints", id: "custom-endpoints", enabled: false },
                  { name: "Dedicated Support", id: "dedicated-support", enabled: false },
                  { name: "Higher Rate Limits", id: "rate-limits", enabled: false },
                ].map((feature) => (
                  <div key={feature.id} className="relative">
                    <div
                      className="flex items-center justify-between"
                      onMouseEnter={() => handleTooltipHover(feature.id)}
                      onMouseLeave={handleTooltipLeave}
                    >
                      <div className="flex items-center">
                        <span className={!feature.enabled ? "text-gray-400" : ""}>
                          {feature.name}
                        </span>
                        <Info className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                      </div>
                      {feature.enabled ? (
                        <Check className="w-5 h-5 text-[#CF7336]" />
                      ) : (
                        <X className="w-5 h-5 text-[#B8383B]" />
                      )}
                    </div>

                    {activeTooltip === feature.id && (
                      <div className="absolute right-0 top-full mt-1 z-10 bg-black text-white text-xs p-2 rounded shadow-lg max-w-xs">
                        {tooltipContent[feature.id]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-[#444444]">
              <Link href="#" className="block w-full py-2 px-4 bg-[#36393F] border border-[#CF7336] text-[#CF7336] rounded text-center hover:bg-[#3A332E] transition-colors">
                Get Started
              </Link>
            </div>
          </div>

          {/* Pro Plan - With orange background */}
          <div className="border border-[#CF7336] rounded overflow-hidden bg-[#3A332E]">
            <div className="bg-[#CF7336] p-2 text-center text-white text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Soldier</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#CF7336]">$49.99</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
              </div>

              <div className="relative mb-4">
                <div
                  className="flex items-center text-sm"
                >
                  <span>500,000 API calls per month</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <div
                    className="flex items-center justify-between"
                    onMouseEnter={() => handleTooltipHover("item-price-pro")}
                    onMouseLeave={handleTooltipLeave}
                  >
                    <div className="flex items-center">
                      <span>Item Pricing</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                    </div>
                    <Check className="w-5 h-5 text-[#CF7336]" />
                  </div>

                  {activeTooltip === "item-price-pro" && (
                    <div className="absolute right-0 top-full mt-1 z-10 bg-black text-white text-xs p-2 rounded shadow-lg max-w-xs">
                      {tooltipContent["item-price"]}
                    </div>
                  )}
                </div>

                {[
                  { name: "Inventory Access", id: "inventory-pro", enabled: true },
                  { name: "Price History (Full)", id: "price-history-pro", enabled: true },
                  { name: "Unusual Effects", id: "unusual-effects-pro", enabled: true },
                  { name: "Market Volume", id: "market-volume-pro", enabled: true },
                  { name: "Price Suggestions", id: "suggestions-pro", enabled: true },
                  { name: "Price Alerts", id: "alerts-pro", enabled: false },
                  { name: "Multiple Currencies", id: "currency-pro", enabled: true },
                  { name: "User Reputation", id: "user-reputation-pro", enabled: true },
                  { name: "Custom Endpoints", id: "custom-endpoints-pro", enabled: false },
                  { name: "Dedicated Support", id: "dedicated-support-pro", enabled: false },
                  { name: "Higher Rate Limits", id: "rate-limits-pro", enabled: true },
                ].map((feature) => (
                  <div key={feature.id} className="relative">
                    <div
                      className="flex items-center justify-between"
                      onMouseEnter={() => handleTooltipHover(feature.id)}
                      onMouseLeave={handleTooltipLeave}
                    >
                      <div className="flex items-center">
                        <span className={!feature.enabled ? "text-gray-400" : ""}>
                          {feature.name}
                        </span>
                        <Info className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                      </div>
                      {feature.enabled ? (
                        <Check className="w-5 h-5 text-[#CF7336]" />
                      ) : (
                        <X className="w-5 h-5 text-[#B8383B]" />
                      )}
                    </div>

                    {activeTooltip === feature.id && (
                      <div className="absolute right-0 top-full mt-1 z-10 bg-black text-white text-xs p-2 rounded shadow-lg max-w-xs">
                        {tooltipContent[feature.id.split('-')[0]]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-[#444444]">
              <Link href="#" className="block w-full py-2 px-4 bg-[#CF7336] text-white rounded text-center hover:bg-[#B86529] transition-colors">
                Get Started
              </Link>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="border border-[#444444] rounded bg-[#36393F] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Heavy</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#CF7336]">$199.99</div>
                  <div className="text-xs text-gray-400">per month</div>
                </div>
              </div>

              <div className="relative mb-4">
                <div
                  className="flex items-center text-sm"
                >
                  <span>Unlimited API calls</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* All features with checkmarks */}
                {[
                  { name: "Item Pricing", id: "item-price-ent", enabled: true },
                  { name: "Inventory Access", id: "inventory-ent", enabled: true },
                  { name: "Price History (Full)", id: "price-history-ent", enabled: true },
                  { name: "Unusual Effects", id: "unusual-effects-ent", enabled: true },
                  { name: "Market Volume", id: "market-volume-ent", enabled: true },
                  { name: "Price Suggestions", id: "suggestions-ent", enabled: true },
                  { name: "Price Alerts", id: "alerts-ent", enabled: true },
                  { name: "Multiple Currencies", id: "currency-ent", enabled: true },
                  { name: "User Reputation", id: "user-reputation-ent", enabled: true },
                  { name: "Custom Endpoints", id: "custom-endpoints-ent", enabled: true },
                  { name: "Dedicated Support", id: "dedicated-support-ent", enabled: true },
                  { name: "Higher Rate Limits", id: "rate-limits-ent", enabled: true },
                  { name: "Bulk Requests", id: "bulk-requests", enabled: true },
                  { name: "Advanced Analytics", id: "advanced-analytics", enabled: true },
                ].map((feature) => (
                  <div key={feature.id} className="relative">
                    <div
                      className="flex items-center justify-between"
                      onMouseEnter={() => handleTooltipHover(feature.id)}
                      onMouseLeave={handleTooltipLeave}
                    >
                      <div className="flex items-center">
                        <span>{feature.name}</span>
                        <Info className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                      </div>
                      <Check className="w-5 h-5 text-[#CF7336]" />
                    </div>

                    {activeTooltip === feature.id && (
                      <div className="absolute right-0 top-full mt-1 z-10 bg-black text-white text-xs p-2 rounded shadow-lg max-w-xs">
                        {tooltipContent[feature.id.includes("-") ? feature.id.split('-')[0] : feature.id]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-[#444444]">
              <Link href="#" className="block w-full py-2 px-4 bg-[#36393F] border border-[#CF7336] text-[#CF7336] rounded text-center hover:bg-[#3A332E] transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Need a custom plan?{" "}
            <Link href="#" className="text-[#CF7336] hover:underline">
              Contact our team
            </Link>{" "}
            for enterprise solutions and custom integrations
          </p>
        </div>
      </div>
    </section>
  )
}
