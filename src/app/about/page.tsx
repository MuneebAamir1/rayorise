import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AboutPageClient from "@/components/about/AboutPageClient";
import UtilityStrip from "@/components/about/UtilityStrip";
import AboutHero from "@/components/about/AboutHero";
import AntiGeneralist from "@/components/about/AntiGeneralist";
import PanelAnatomy from "@/components/about/PanelAnatomy";
import BrandFactory from "@/components/about/BrandFactory";
import ProofMetrics from "@/components/about/ProofMetrics";
import ProductionTimeline from "@/components/about/ProductionTimeline";
import Philosophy from "@/components/about/Philosophy";
import ClosingCTA from "@/components/about/ClosingCTA";
import SEOContentBlock from "@/components/SEOContentBlock";

export const metadata: Metadata = {
  title: "About RayoRise | UK B2B Custom Tracksuit Manufacturer",
  description:
    "RayoRise is a specialist UK B2B tracksuit manufacturer for streetwear brands and football-culture labels. Custom panels, low MOQ from 50 units, sampling in 7–10 working days, production in 3–5 weeks.",
  keywords:
    "about RayoRise, UK tracksuit manufacturer, B2B custom tracksuits, streetwear manufacturer, football culture tracksuits, custom panel tracksuits",
  openGraph: {
    title: "About RayoRise | UK B2B Custom Tracksuit Manufacturer",
    description:
      "Specialist B2B tracksuit manufacturer. We make one thing. We make it well.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <UtilityStrip />
      <main>
        <AboutPageClient>
          <AboutHero />
          <AntiGeneralist />
          <PanelAnatomy />
          <BrandFactory />
          <ProofMetrics />
          <ProductionTimeline />
          <Philosophy />
          <SEOContentBlock />
          <ClosingCTA />
        </AboutPageClient>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
