import type { Metadata } from "next";
import CustomizerPage from "@/components/customizer/CustomizerPage";

export const metadata: Metadata = {
  title: "Design Your Tracksuit | RayoRise Customizer",
  description:
    "Build your custom 90s vintage tracksuit with our premium configurator. Choose colors, panels, fabric, upload your logo — all with real-time preview.",
  openGraph: {
    title: "Design Your Tracksuit | RayoRise Customizer",
    description: "Premium tracksuit configurator with real-time preview.",
    type: "website",
  },
};

export default function CustomizePage() {
  return <CustomizerPage />;
}
