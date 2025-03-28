import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import FeatureCards from "@/components/feature-cards"
import HowItWorks from "@/components/how-it-works"
import ForWhom from "@/components/for-whom"
import Pricing from "@/components/pricing"
import WhyUs from "@/components/why-us"
import Faq from "@/components/faq"
import DemoAccess from "@/components/demo-access"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import KeyboardTrigger from "@/components/KeyboardTrigger"
import TF2Crate from "@/components/TF2Crate"
import AnimatedSection from "@/components/AnimatedSection"

export default function Home() {
  return (
    <main>
      <KeyboardTrigger 
        triggerKey="k" 
        keyCount={150} 
        duration={10000} 
        keySize={[70, 100]} 
      />
      <Header />
      
      <AnimatedSection animationType="fade-up">
        <Hero />
      </AnimatedSection>
      
      <AnimatedSection animationType="fade-in" delay={200}>
        <Features />
      </AnimatedSection>
      
      <AnimatedSection animationType="slide-in-right" delay={300}>
        <FeatureCards />
      </AnimatedSection>
      
      <AnimatedSection animationType="scale-up">
        <HowItWorks />
      </AnimatedSection>
      
      <AnimatedSection animationType="slide-in-left">
        <ForWhom />
      </AnimatedSection>
      
      <AnimatedSection animationType="fade-up">
        <Pricing />
      </AnimatedSection>
      
      <AnimatedSection animationType="fade-in">
        <WhyUs />
      </AnimatedSection>
      
      <AnimatedSection animationType="fade-up">
        <Faq />
      </AnimatedSection>
      
      <AnimatedSection animationType="slide-in-right">
        <DemoAccess />
      </AnimatedSection>
      
      <AnimatedSection animationType="fade-up">
        <Newsletter />
      </AnimatedSection>
      
      <Footer />
      
      <TF2Crate position="bottom-left" />
    </main>
  )
}