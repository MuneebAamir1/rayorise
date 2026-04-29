import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FlagshipProduct from "@/components/FlagshipProduct";
import ManufacturingProof from "@/components/ManufacturingProof";
import ProductShowcase from "@/components/ProductShowcase";
import Process from "@/components/Process";
import About from "@/components/About";
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
        <FlagshipProduct />
        <ManufacturingProof />
        <ProductShowcase />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
