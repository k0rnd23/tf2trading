import Link from "next/link"
import Image from "next/image"

export default function DemoAccess() {
  return (
    <section className="py-16 metal-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Try Before You Buy</h2>
            <p className="text-lg mb-6">
              Get free API access with 1,000 calls.
              <br />
              See how our data can power your TF2 trading tools!
            </p>
            <Link href="#" className="btn-primary inline-block">
              Get API Key
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-end">
            <div className="relative card-tf2 p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-[#CF7336]">Example Endpoint</h3>
              <pre className="text-xs overflow-auto bg-[#1E2124] p-4 rounded text-gray-300 border border-[#444]">
{`GET /api/v1/prices/item
{
  "name": "Unusual Team Captain",
  "effect": "Burning Flames",
  "quality": "Unusual"
}

Response:
{
  "success": true,
  "item": {
    "name": "Unusual Team Captain",
    "effect": "Burning Flames",
    "quality": "Unusual",
    "price": {
      "value": 1850.75,
      "currency": "USD"
    },
    "trend": "rising",
    "last_updated": "2025-03-01T13:42:18Z"
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
