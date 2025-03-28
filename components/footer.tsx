import Link from "next/link"
import { Mail, Twitter, ExternalLink, FileText, Code, Users } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1E2124] text-white pt-12 pb-24 relative z-30">
      <div 
        className="absolute inset-0 opacity-20 z-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(50, 130, 184, 0.3) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(50, 130, 184, 0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#2A2A2A] p-6 rounded-md border-2 border-[#444444] hover:border-[#CF7336] transition-colors">
            <div className="flex items-center mb-4">
              <Mail className="mr-2 text-[#CF7336]" size={20} />
              <h3 className="text-lg font-medium">Contact Us</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Questions about our API or need help with integration? Reach out:
            </p>
            <p className="mb-2 text-[#CF7336]">api@tf2trading.example</p>
            <p className="text-gray-300">tf2tradingapi.example</p>
          </div>

          <div className="bg-[#2A2A2A] p-6 rounded-md border-2 border-[#444444] hover:border-[#5885A2] transition-colors">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <FileText className="mr-2 text-[#5885A2]" size={20} />
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#5885A2] transition-colors flex items-center">
                  <Code className="mr-2" size={16} />
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#5885A2] transition-colors flex items-center">
                  <FileText className="mr-2" size={16} />
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#5885A2] transition-colors flex items-center">
                  <Code className="mr-2" size={16} />
                  Code Examples
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#5885A2] transition-colors flex items-center">
                  <Users className="mr-2" size={16} />
                  Status Page
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-[#2A2A2A] p-6 rounded-md border-2 border-[#444444] hover:border-[#B8383B] transition-colors">
            <div className="flex items-center mb-4">
              <Twitter className="mr-2 text-[#B8383B]" size={20} />
              <h3 className="text-lg font-medium">Follow Us</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest TF2 market trends and API features
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#B8383B] transition-colors bg-[#36393F] p-3 rounded-full">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#B8383B] transition-colors bg-[#36393F] p-3 rounded-full">
                <ExternalLink size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#36393F] pt-8 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-between">
            <p>© 2025 TF2 Trading API. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-[#CF7336] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[#CF7336] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs">
            This site is not affiliated with Valve Corporation. All Team Fortress 2 assets are property of Valve Corporation.
          </div>
        </div>
      </div>
    </footer>
  )
}