import { Database, Shield, Zap, Clock, Code } from "lucide-react"

export default function WhyUs() {
  return (
    <section className="py-16 metal-background">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-12 text-[#F2F3F5]">Why Choose Our TF2 Trading API?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start card-tf2 p-6 hover:border-[#CF7336] transition-colors">
            <div className="mr-4 text-[#CF7336]">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-[#CF7336] font-semibold mb-2">Comprehensive Data Access</h3>
              <p className="text-gray-300">
                Access our API through our developer portal, export data to your own analytics system, or use our webhooks for real-time updates.
              </p>
            </div>
          </div>

          <div className="flex items-start card-tf2 p-6 hover:border-[#B8383B] transition-colors">
            <div className="mr-4 text-[#B8383B]">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-[#CF7336] font-semibold mb-2">5-Minute Update Cycles</h3>
              <p className="text-gray-300">
                Our data refreshes every 5 minutes, ensuring you always have the most current prices. Automated invoicing and documentation available in your dashboard.
              </p>
            </div>
          </div>

          <div className="flex items-start card-tf2 p-6 hover:border-[#5885A2] transition-colors">
            <div className="mr-4 text-[#5885A2]">
              <Code size={24} />
            </div>
            <div>
              <h3 className="text-[#CF7336] font-semibold mb-2">Custom Endpoints</h3>
              <p className="text-gray-300">
                Can't find the exact data you need? We'll build custom endpoints tailored to your specific requirements - just tell us what you need.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-start card-tf2 p-6 hover:border-[#8650AC] transition-colors">
            <div className="mr-4 text-[#8650AC]">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-[#CF7336] font-semibold mb-2">Lightning-Fast Performance</h3>
              <p className="text-gray-300">
                Experience average response times of less than 200ms. Our infrastructure is built for speed and reliability, with 99.9% uptime guaranteed.
              </p>
            </div>
          </div>

          <div className="flex items-start card-tf2 p-6 hover:border-[#CF7336] transition-colors">
            <div className="mr-4 text-[#CF7336]">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-[#CF7336] font-semibold mb-2">Robust Security</h3>
              <p className="text-gray-300">
                Your API keys and data are protected with enterprise-grade encryption. We use OAuth 2.0 and rate limiting to prevent abuse.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 bg-[#2A2A2A] inline-block px-6 py-3 rounded border border-[#444444]">
            Our API is trusted by <span className="text-[#CF7336] font-bold">3,500+</span> traders, <span className="text-[#B8383B] font-bold">200+</span> trading bots, and <span className="text-[#5885A2] font-bold">50+</span> TF2 trading sites
          </p>
        </div>
      </div>
    </section>
  )
}
