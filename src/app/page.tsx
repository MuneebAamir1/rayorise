import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import ProductShowcase from "@/components/ProductShowcase";
import CustomizationCapabilities from "@/components/CustomizationCapabilities";
import Process from "@/components/Process";
import ManufacturingProof from "@/components/ManufacturingProof";
import FlagshipProduct from "@/components/FlagshipProduct";
import BuyerPainPoints from "@/components/BuyerPainPoints";
import TrustIndicators from "@/components/TrustIndicators";

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
        <About />
        <ProductShowcase />
        <CustomizationCapabilities />
        <Process />
        <ManufacturingProof />
        <FlagshipProduct />
        <BuyerPainPoints />
        <TrustIndicators />

        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
