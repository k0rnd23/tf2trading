"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
}

export default function Faq() {
  const faqItems: FaqItem[] = [
    {
      question: "How accurate is your pricing data?",
      answer:
        "Our pricing data is extremely accurate, with updates every 5 minutes that pull from thousands of trades across Steam, backpack.tf, marketplace.tf, and other trading platforms. We use sophisticated algorithms to filter out price manipulation attempts and outliers.",
    },
    {
      question: "What data does the API provide?",
      answer:
        "Our API provides access to current and historical price data, unusual effect pricing, trading volume statistics, inventory valuation, user reputation scores, and market trend analysis for all TF2 items.",
    },
    {
      question: "How often is pricing data updated?",
      answer:
        "All pricing data is updated every 5 minutes to ensure you have the most current information available for making trading decisions.",
    },
    {
      question: "Can I get pricing history for unusual effects?",
      answer:
        "Yes, our API provides comprehensive unusual effect pricing for all hats and items, including historical data to track value changes over time.",
    },
    {
      question: "How do rate limits work?",
      answer:
        "Rate limits vary by plan. The Scout plan includes 100,000 API calls per month, Soldier includes 500,000, and Heavy provides unlimited calls. We also offer custom enterprise solutions for high-volume needs.",
    },
    {
      question: "Can I access data for private inventories?",
      answer:
        "We can only access inventory data for public Steam profiles. If a user has set their inventory to private, we cannot retrieve their items through the API.",
    },
    {
      question: "Do you provide pricing in currencies other than USD?",
      answer:
        "Yes, we support pricing in multiple currencies including USD, EUR, GBP, keys, and refined metal. You can specify your preferred currency in the API request.",
    },
    {
      question: "How do I get a trial of the API?",
      answer:
        "All new users receive a 7-day trial with 1,000 API calls to test the service. Simply sign up on our website and you'll receive your API key immediately.",
    },
    {
      question: "Can the API help detect potential scammers?",
      answer:
        "Yes, our User Reputation endpoint provides trust scores based on trading history and community reports. This can help identify potential scammers before completing trades.",
    },
    {
      question: "Do you offer a self-hosted solution?",
      answer: "For enterprise clients, we do offer self-hosted solutions. Please contact our sales team to discuss your specific requirements.",
    },
    {
      question: "How do I integrate the API with my trading bot?",
      answer:
        "We provide comprehensive documentation and code examples for various programming languages to make integration straightforward. Our RESTful API is designed to be easy to implement in any application.",
    },
    {
      question: "Can I use your data on my website?",
      answer:
        "Yes, you can display our pricing data on your website as long as you attribute the source. For commercial applications, you'll need an appropriate API plan based on your expected usage volume.",
    },
  ]

  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index))
    } else {
      setOpenItems([...openItems, index])
    }
  }

  return (
    <section className="py-16 bg-[#36393F]">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-[#444444] pb-4">
              <button
                className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-medium text-[#CF7336]">{item.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-[#CF7336]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#CF7336]" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="mt-2 text-gray-300">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="flex items-center bg-[#2A2A2A] border border-[#444444] rounded px-6 py-3 text-gray-300 hover:bg-[#36393F] transition-colors"
          >
            <img
              src="/discord.png"
              alt="Discord"
              className="w-10 h-6 mr-2"
            />
            More questions? Join our Discord community ›
          </a>
        </div>
      </div>
    </section>
  )
}
