import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RayoRise | UK B2B Custom Tracksuit Manufacturer",
  description:
    "RayoRise is a specialist UK B2B tracksuit manufacturer serving streetwear brands and 90s football culture clubs. Low MOQ, fast sampling, full panel customisation.",
  keywords:
    "B2B tracksuit manufacturer UK, custom tracksuits streetwear, 90s football tracksuits, low MOQ tracksuit, panel tracksuit manufacturer",
  openGraph: {
    title: "RayoRise | UK B2B Custom Tracksuit Manufacturer",
    description:
      "Specialist B2B tracksuit manufacturer. Low MOQ · Fast Sampling · Full Panel Customisation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-[#1A1612] text-[#F0E8D8] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
