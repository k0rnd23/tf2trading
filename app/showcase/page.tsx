import Header from "@/components/header"
import Footer from "@/components/footer"
import SoldierOfficerShowcase from "@/components/SoldierOfficerShowcase"
import AnimatedSection from "@/components/AnimatedSection"

export default function ShowcasePage() {
  return (
    <main>
      <Header />
      
      <AnimatedSection animationType="fade-up">
        <div className="py-16 metal-background">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
              Unusual Team Captain Cap
              <span className="text-[#CF7336]">.</span>
            </h1>
            
            <p className="text-center text-xl mb-12 max-w-2xl mx-auto">
              Interact with the legendary Team Fortress 2 hat in glorious 3D. Rotate, zoom, and examine this prized cosmetic from every angle.
            </p>
            
            <div className="flex justify-center">
              <div className="card-tf2 p-6 w-full max-w-4xl border-2 border-[#8650AC] shadow-purple">
                <SoldierOfficerShowcase modelPath="/models/team-captain/" />
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-[#CF7336] italic font-tf2secondary text-xl">
                "That is one fancy hat, pardner!"
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection animationType="fade-in" delay={300}>
        <section className="py-12 bg-[#36393F]">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">About the Team Captain Cap</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-tf2 p-6">
                <h3 className="text-xl font-bold mb-4 text-[#CF7336]">Item Stats</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Quality:</span>
                    <span className="tf2-unusual">Unusual</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Effect:</span>
                    <span className="tf2-unusual">Burning Flames</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Equippable By:</span>
                    <span>Soldier</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Released:</span>
                    <span>June 23, 2011</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Value:</span>
                    <span className="tf2-australium">~$20,000 USD</span>
                  </li>
                </ul>
              </div>
              
              <div className="card-tf2 p-6">
                <h3 className="text-xl font-bold mb-4 text-[#CF7336]">Description</h3>
                <p className="mb-4">
                  The Team Captain Cap is a military-style hat for the Soldier class in Team Fortress 2. It features a distinctive red top with a black visor and a gold emblem on the front.
                </p>
                <p>
                  This item is a popular cosmetic among Soldier mains, with the Unusual Burning Flames variant being particularly sought after in the TF2 trading community due to its rarity and visual appeal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      <Footer />
    </main>
  )
}