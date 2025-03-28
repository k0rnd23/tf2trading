import React from "react"

const CombinedBlueprintBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#1a3c5a] z-0 pointer-events-none">
      {/* Blueprint Grid */}
      <div className="absolute inset-0" 
          style={{
              backgroundImage: `linear-gradient(rgba(50, 130, 184, 0.15) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(50, 130, 184, 0.15) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
          }}>
      </div>
      
      {/* TF2 Sentry Blueprint - Angled in background */}
      <div className="absolute top-1/4 -right-10 w-full h-full opacity-20 z-0 transform -rotate-12 scale-110">
        <img 
          src="/tf2-sentry-blueprint-full.jpg" 
          alt="TF2 Sentry Blueprint" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Another copy at different angle */}
      <div className="absolute bottom-0 -left-20 w-full h-full opacity-15 z-0 transform rotate-8 scale-100">
        <img 
          src="/tf2-sentry-blueprint-full.jpg" 
          alt="TF2 Sentry Blueprint" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Blueprint folder edge at the top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#14304a] z-10"></div>
      
      {/* Blueprint folder edge at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#14304a] z-10"></div>
      
      {/* Blueprint labels on the sides */}
      <div className="absolute top-1/4 left-4 transform -rotate-90 origin-left">
        <div className="text-[#8cc4de] opacity-50 font-mono text-sm tracking-widest">
          TF2 TRADING API SPECIFICATION
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-4 transform rotate-90 origin-right">
        <div className="text-[#8cc4de] opacity-50 font-mono text-sm tracking-widest">
          MANN CO. CERTIFIED
        </div>
      </div>
    </div>
  )
}

export default CombinedBlueprintBackground