import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact | RayoRise B2B Tracksuits",
  description: "Get in touch with RayoRise — specialist B2B tracksuit manufacturer serving UK streetwear brands.",
};

export default function Page() {
  return <ContactPage />;
}
