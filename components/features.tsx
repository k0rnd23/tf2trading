import Image from "next/image"
import { Package, RefreshCw, TrendingUp, Shield } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16 bg-[#36393F]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-2/3 pr-8">
            <h2 className="text-3xl font-bold mb-8">
              Power your TF2 trading tools with comprehensive market data
            </h2>

            <div className="space-y-8">
              <div className="flex">
                <TrendingUp className="text-[#CF7336] mr-4 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Price History Trends</h3>
                  <p className="text-gray-300">
                    Access historical price data for any item going back years. Track long-term market trends and make informed investment decisions.
                  </p>
                </div>
              </div>

              <div className="flex">
                <RefreshCw className="text-[#CF7336] mr-4 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                  <p className="text-gray-300">
                    Stay ahead of the market with price changes as they happen. Our API refreshes data every 5 minutes to ensure accuracy.
                  </p>
                </div>
              </div>

              <div className="flex">
                <Package className="text-[#CF7336] mr-4 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Inventory Management</h3>
                  <p className="text-gray-300">
                    Fetch user inventories, automatically price items, and calculate total portfolio value with item quality consideration.
                  </p>
                </div>
              </div>

              <div className="flex">
                <Shield className="text-[#CF7336] mr-4 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3">Trust Factor Analysis</h3>
                  <p className="text-gray-300">
                    Assess trading partners' reputation scores and historical trading patterns to avoid scammers and risky trades.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 mt-8 md:mt-0">
            <div className="card-tf2 p-6">
              <h3 className="text-xl font-bold mb-4 text-[#CF7336]">Sample Response</h3>
              <pre className="text-xs overflow-auto bg-[#1E2124] p-4 rounded text-gray-300 border border-[#444]">
{`{
  "item": "Mann Co. Supply Crate Key",
  "quality": "Unique",
  "prices": {
    "metal": 68.44,
    "usd": 1.79,
    "keys": 1
  },
  "trend": "stable",
  "last_update": "2025-03-01T14:22:18Z",
  "volume_24h": 1423,
  "suggested_price": {
    "low": 67.88,
    "median": 68.44,
    "high": 69.11
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
