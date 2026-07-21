import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import WhoWeBuildFor from "@/components/WhoWeBuildFor";
import About from "@/components/About";
import ProductShowcase from "@/components/ProductShowcase";
import MaterialLibrary from "@/components/MaterialLibrary";
import CustomizationCapabilities from "@/components/CustomizationCapabilities";
import Process from "@/components/Process";
import ManufacturingProof from "@/components/ManufacturingProof";
import FlagshipProduct from "@/components/FlagshipProduct";
import BuyerPainPoints from "@/components/BuyerPainPoints";
import TrustIndicators from "@/components/TrustIndicators";
import KnowledgeCentre from "@/components/KnowledgeCentre";
import FAQ from "@/components/FAQ";

import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <WhoWeBuildFor />
        <About />
        <ProductShowcase />
        <MaterialLibrary />
        <CustomizationCapabilities />
        <Process />
        <ManufacturingProof />
        <FlagshipProduct />
        <BuyerPainPoints />
        <TrustIndicators />

        <KnowledgeCentre />
        <FAQ />

        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
