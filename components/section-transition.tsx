import React from "react"
import { Wrench } from "lucide-react"

const SectionTransition: React.FC = () => {
  return (
    <div className="relative z-10 py-4 flex justify-center items-center overflow-hidden">
      <div className="w-1/2 max-w-md relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#CF7336] to-transparent"></div>
        
        <div className="relative flex justify-center">
          <div className="bg-[#2A2A2A] rounded-full p-4 border-2 border-[#CF7336] z-10 shadow-lg transform hover:rotate-45 transition-transform duration-500">
            <Wrench className="h-5 w-5 text-[#CF7336]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTransition