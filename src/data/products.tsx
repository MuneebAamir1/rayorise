import * as React from "react";
import { Ruler, Tag, Paintbrush, Scissors, Layout } from "lucide-react";
import { ProductDetailProps } from "@/components/ui/product-detail-page";

// Map our basic showcase products to the detailed version
export const productsData: Record<string, ProductDetailProps> = {
  "tracksuits": {
    id: "tracksuits",
    category: "Full Set",
    title: "The Signature Tracksuit",
    tagline: "The complete set. Full panel, full spec.",
    description: "Our flagship two-piece retro panel tracksuit featuring a matching jacket and pants. Built with full colour-block customisation, woven labels, and branded packaging options. Designed specifically for UK streetwear brands demanding a premium, heavy-weight feel.",
    images: [
      { src: "/images/hero-tracksuit-1.png", alt: "Signature Tracksuit Front" },
      { src: "/images/product-tracksuits.png", alt: "Signature Tracksuit Details" }
    ],
    specs: [
      { label: "Material", value: "280gsm - 350gsm French Terry / Cotton Blend", icon: <Tag className="h-4 w-4" /> },
      { label: "Fit", value: "Relaxed Retro / Custom Spec", icon: <Ruler className="h-4 w-4" /> },
      { label: "Construction", value: "7-panel cut & sew", icon: <Scissors className="h-4 w-4" /> },
      { label: "Customisation", value: "Pantone-matched colourway, custom zips", icon: <Paintbrush className="h-4 w-4" /> }
    ],
    features: ["7-panel construction", "Heavyweight fabric", "Custom colourway", "Woven labels", "Engraved hardware"],
    moq: "50 Units",
    sampling: "7-10 Days",
    reviews: [
      { name: "James T.", initials: "JT", rating: 5, text: "The quality of these tracksuits blew our previous supplier out of the water. The panel stitching is flawless.", date: "Oct 2023" },
      { name: "Marcus W.", initials: "MW", rating: 5, text: "Incredible attention to detail on the custom hardware. Our customers immediately noticed the upgrade in quality.", date: "Sep 2023" }
    ],
    relatedProducts: [
      { id: "track-jackets", title: "Standalone Track Jacket", category: "Outerwear", image: "/images/product-jacket.png" },
      { id: "track-pants", title: "Standalone Track Pants", category: "Bottoms", image: "/images/product-pants.png" }
    ]
  },
  "track-jackets": {
    id: "track-jackets",
    category: "Outerwear",
    title: "Retro Track Jacket",
    tagline: "Standalone jacket. Retro panel construction.",
    description: "The signature jacket from our tracksuit range, available as a standalone piece. It features the same meticulous cut and sew construction, premium hardware, and full customisation options. Perfect as a hero piece for your upcoming drop.",
    images: [
      { src: "/images/product-jacket.png", alt: "Retro Track Jacket" },
      { src: "/images/hero-tracksuit-1.png", alt: "Jacket Fit" }
    ],
    specs: [
      { label: "Material", value: "280gsm - 350gsm French Terry", icon: <Tag className="h-4 w-4" /> },
      { label: "Hardware", value: "YKK or Custom Engraved Zips / Snap Buttons", icon: <Layout className="h-4 w-4" /> },
      { label: "Construction", value: "Contrast panel stripe", icon: <Scissors className="h-4 w-4" /> }
    ],
    features: ["Zip-through or snap button", "Contrast panel stripe", "Woven label ready", "Elasticated cuffs"],
    moq: "50 Units",
    sampling: "7-10 Days",
    reviews: [
      { name: "Sarah L.", initials: "SL", rating: 5, text: "The fit on these jackets is perfect. Boxy but not oversized. The custom zip pulls were a great touch.", date: "Nov 2023" }
    ],
    relatedProducts: [
      { id: "tracksuits", title: "Full Tracksuit Set", category: "Full Set", image: "/images/product-tracksuits.png" },
      { id: "track-pants", title: "Standalone Track Pants", category: "Bottoms", image: "/images/product-pants.png" }
    ]
  },
  "track-pants": {
    id: "track-pants",
    category: "Bottoms",
    title: "Panel Track Pants",
    tagline: "Matching or standalone. Custom waistband.",
    description: "Retro panel track pants featuring a custom waistband and signature side leg panels. Designed to complement our jacket range or stand strong as a standalone piece. Includes deep side pockets and premium draw cords.",
    images: [
      { src: "/images/product-pants.png", alt: "Panel Track Pants" },
      { src: "/images/product-tracksuits.png", alt: "Pants Details" }
    ],
    specs: [
      { label: "Material", value: "280gsm - 350gsm French Terry", icon: <Tag className="h-4 w-4" /> },
      { label: "Waistband", value: "Elasticated with custom draw cord", icon: <Ruler className="h-4 w-4" /> },
      { label: "Pockets", value: "Deep side pockets, optional zip closures", icon: <Layout className="h-4 w-4" /> }
    ],
    features: ["Elasticated waistband", "Side stripe panel", "Draw cord", "Side pockets", "Tapered or straight leg"],
    moq: "50 Units",
    sampling: "7-10 Days",
    reviews: [
      { name: "David K.", initials: "DK", rating: 4, text: "Great quality pants. The side panel stitching is very clean.", date: "Dec 2023" }
    ],
    relatedProducts: [
      { id: "tracksuits", title: "Full Tracksuit Set", category: "Full Set", image: "/images/product-tracksuits.png" },
      { id: "track-jackets", title: "Standalone Track Jacket", category: "Outerwear", image: "/images/product-jacket.png" }
    ]
  }
};

export const getAllProducts = () => Object.values(productsData);
export const getProductById = (id: string) => productsData[id] || null;
