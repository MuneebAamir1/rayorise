/* ─── Expanded content data for product detail pages ─── */

export interface ExpandedOption {
  title: string;
  items: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ProductExpandedData {
  designOptions: ExpandedOption;
  fabricOptions: ExpandedOption;
  brandingMethods: ExpandedOption;
  privateLabel: { title: string; description: string; features: string[] };
  packaging: ExpandedOption;
  moqDetails: { title: string; tiers: { range: string; note: string }[] };
  leadTime: { stages: { stage: string; duration: string; detail: string }[] };
  sampleProcess: { title: string; steps: string[]; note: string };
  faq: FAQItem[];
}

const shared = {
  brandingMethods: {
    title: "Branding Methods",
    items: [
      "Direct embroidery — up to 12 colours, positioned to your specification",
      "Woven labels — main label, size label, and care labels to your design",
      "Screen printing — up to 6 colours, plastisol or water-based ink",
      "Heat transfer — photographic quality, full-colour logos",
      "Sublimation — all-over panel prints for maximum visual impact",
      "Custom hardware — engraved zip pulls, branded snap buttons, custom drawcords",
      "Rubber patches — raised 3D logo patches, any shape and colour",
    ],
  },
  privateLabel: {
    title: "Private Label Production",
    description:
      "Every garment we produce ships under your brand. There is no RayoRise branding on any finished product — your brand is the only identity your customers see.",
    features: [
      "Custom main label — woven or printed to your design",
      "Custom size labels — your branding, your sizing system",
      "Custom care labels — compliant with UK / EU / US requirements",
      "Custom hang tags and swing tags",
      "Neck label replacement — no blank branding visible",
      "Custom polybag printing with your logo",
      "Branded tissue paper and box inserts available",
    ],
  },
  moqDetails: {
    title: "Minimum Order Quantities",
    tiers: [
      { range: "50–99 units", note: "Ideal for market testing and first drops. Full customisation available." },
      { range: "100–249 units", note: "Most popular tier. Better per-unit pricing with full spec flexibility." },
      { range: "250–499 units", note: "Volume pricing unlocked. Priority production scheduling." },
      { range: "500+ units", note: "Maximum value. Dedicated production line allocation and fastest turnaround." },
    ],
  },
  leadTime: {
    stages: [
      { stage: "Brief & Specification", duration: "24–48 hours", detail: "We review your brief and return a production-ready spec sheet." },
      { stage: "Sample Development", duration: "7–10 working days", detail: "Physical sample produced to your exact specification and shipped to you." },
      { stage: "Sample Approval", duration: "At your pace", detail: "You review, request revisions if needed, and formally approve before bulk." },
      { stage: "Bulk Production", duration: "3–5 weeks", detail: "Full production run with in-line quality control at every stage." },
      { stage: "Quality Control & Packing", duration: "Included", detail: "Final inspection, branded packaging, and preparation for dispatch." },
      { stage: "Dispatch & Delivery", duration: "5–10 working days", detail: "Tracked international shipping to your specified address." },
    ],
  },
  sampleProcess: {
    title: "Sample Process",
    steps: [
      "Submit your design brief — artwork, references, or a written description",
      "We produce a production-ready specification sheet within 48 hours",
      "Physical sample is manufactured to your exact brief",
      "Sample shipped to you within 7–10 working days",
      "You review the sample — request revisions or approve for bulk",
      "No bulk production begins until you formally sign off",
    ],
    note: "Sample costs are credited against your first bulk order of 100+ units.",
  },
};

export const expandedData: Record<string, ProductExpandedData> = {
  tracksuits: {
    designOptions: {
      title: "Design Options",
      items: [
        "7-panel cut-and-sew construction with fully custom panel geometry",
        "Contrast colour blocking — any combination of Pantone-matched colours",
        "Side stripe configuration — single, double, or split panel stripe",
        "Collar options — zip-through stand collar, fold-down collar, or hoodie",
        "Cuff and hem finish — elasticated rib, open hem, or tapered zip",
        "Fit options — slim, regular, relaxed, or oversized silhouette",
        "Pocket configuration — side seam, patch, or zip pockets on jacket and pants",
        "Waistband — elasticated with custom drawcord, or flat front",
      ],
    },
    fabricOptions: {
      title: "Fabric Options",
      items: [
        "280gsm French Terry — soft hand-feel, ideal for spring/autumn collections",
        "320gsm French Terry — mid-weight, all-season wear",
        "350gsm French Terry — heavyweight premium feel, winter-ready",
        "Polyester Tricot — classic retro sheen, lightweight, durable",
        "Cotton-Poly Blend (80/20) — comfort with shape retention",
        "Brushed-Back Fleece — warm interior, smooth exterior",
        "Custom fabric sourcing available on request (MOQ 200+ units)",
      ],
    },
    brandingMethods: shared.brandingMethods,
    privateLabel: shared.privateLabel,
    packaging: {
      title: "Packaging Options",
      items: [
        "Individual polybag — clear or custom printed with your branding",
        "Custom swing tags — your design, any shape or material",
        "Branded tissue paper wrap",
        "Cardboard box packaging — plain or custom branded",
        "Sticker seals with your logo",
        "Size and barcode labels — ready for retail or wholesale",
        "Gift-ready packaging available for DTC brands",
      ],
    },
    moqDetails: shared.moqDetails,
    leadTime: shared.leadTime,
    sampleProcess: shared.sampleProcess,
    faq: [
      { q: "Can I order the jacket and pants in different colourways?", a: "Yes. Each piece can have its own colourway within the same order. The MOQ of 50 units applies per colourway, per piece." },
      { q: "Do you supply the fabric or do I need to source it?", a: "We source all fabric from our trusted mill partners. You specify the weight, type, and colour — we handle the rest." },
      { q: "Can I get a sample before committing to bulk?", a: "Absolutely. We produce a physical sample to your specification within 7–10 working days. No bulk production starts until you approve." },
      { q: "What file format do you need for logos and artwork?", a: "We accept AI, EPS, SVG, or high-resolution PNG (300dpi minimum). We can also work from reference images if vector files aren't available." },
      { q: "Can I mix sizes within the MOQ?", a: "Yes. The 50-unit MOQ is per colourway, not per size. You can distribute across S–3XL as needed." },
      { q: "Do you handle grading and size specs?", a: "Yes. We grade to standard UK sizing or to your custom size chart. If you have specific measurements, we build the grading from your spec." },
      { q: "What if I need changes after the sample?", a: "We offer revisions. Adjust fit, fabric, colour, or branding — we produce a revised sample before production." },
      { q: "Do you ship internationally?", a: "Yes. We ship worldwide with tracked delivery. DDP and EXW terms are both available depending on your preference." },
    ],
  },
  "track-jackets": {
    designOptions: {
      title: "Design Options",
      items: [
        "7-panel cut-and-sew construction for the jacket body",
        "Contrast colour blocking — any Pantone-matched colour combination",
        "Side stripe — single, double, or split panel configuration",
        "Closure — zip-through (YKK or custom engraved) or snap button",
        "Collar — stand collar, fold-down, or band collar",
        "Cuff finish — elasticated rib knit or open hem",
        "Pocket options — side seam pockets, chest pocket, or internal pocket",
        "Fit — slim, regular, or oversized drop-shoulder silhouette",
      ],
    },
    fabricOptions: {
      title: "Fabric Options",
      items: [
        "280gsm French Terry — lightweight, breathable",
        "320gsm French Terry — mid-weight, versatile",
        "350gsm French Terry — heavyweight premium",
        "Polyester Tricot — retro sheen, structured drape",
        "Nylon Shell — windproof option for outerwear styles",
        "Custom fabric sourcing available on request",
      ],
    },
    brandingMethods: shared.brandingMethods,
    privateLabel: shared.privateLabel,
    packaging: {
      title: "Packaging Options",
      items: [
        "Individual polybag — clear or custom branded",
        "Custom swing tags and hang tags",
        "Branded tissue paper wrap",
        "Cardboard mailer boxes — plain or printed",
        "Garment bags for premium presentation",
        "Retail-ready barcode and size labels",
      ],
    },
    moqDetails: shared.moqDetails,
    leadTime: shared.leadTime,
    sampleProcess: shared.sampleProcess,
    faq: [
      { q: "Can I order the jacket without matching pants?", a: "Yes. The track jacket is available as a standalone piece with its own MOQ." },
      { q: "What zip options are available?", a: "We offer standard YKK zips, custom-engraved metal zip pulls, or snap button closure. All hardware is customisable." },
      { q: "Can I have different branding on the front and back?", a: "Yes. Embroidery, print, or patches can be placed on any panel — front, back, sleeves, collar, or cuffs." },
      { q: "Is the jacket lined?", a: "Lining is optional. We can add a mesh lining, taffeta lining, or leave it unlined depending on your design." },
      { q: "Can I add a hood to the jacket?", a: "Yes. We offer zip-through hooded jacket variations with adjustable drawcord hoods." },
      { q: "Do you offer reversible jackets?", a: "Reversible construction is available for certain fabric combinations. Discuss with your account manager for feasibility." },
    ],
  },
  "track-pants": {
    designOptions: {
      title: "Design Options",
      items: [
        "Side panel stripe — single, double, or split panel",
        "Leg shape — tapered, straight, wide-leg, or jogger",
        "Waistband — elasticated with custom drawcord or flat front",
        "Cuff finish — elasticated rib, open hem, or zip ankle",
        "Pocket configuration — side seam, cargo, or zip pockets",
        "Rise — regular or mid-rise",
        "Contrast colour blocking on panels and waistband",
        "Fit — slim, regular, or relaxed",
      ],
    },
    fabricOptions: {
      title: "Fabric Options",
      items: [
        "280gsm French Terry — lightweight comfort",
        "320gsm French Terry — all-season mid-weight",
        "350gsm French Terry — heavyweight warmth",
        "Polyester Tricot — classic retro feel, lightweight",
        "Cotton-Poly Blend — comfort with durability",
        "Custom fabric sourcing available on request",
      ],
    },
    brandingMethods: shared.brandingMethods,
    privateLabel: shared.privateLabel,
    packaging: {
      title: "Packaging Options",
      items: [
        "Individual polybag — clear or custom branded",
        "Custom swing tags and hang tags",
        "Branded tissue paper",
        "Cardboard mailer or box packaging",
        "Retail-ready barcode labels",
        "Size labels to your specification",
      ],
    },
    moqDetails: shared.moqDetails,
    leadTime: shared.leadTime,
    sampleProcess: shared.sampleProcess,
    faq: [
      { q: "Can I order pants without a matching jacket?", a: "Yes. Track pants are available as standalone items with the same MOQ and customisation options." },
      { q: "What drawcord options are available?", a: "Flat woven drawcords, round cord, or custom-tipped drawcords in your brand colours." },
      { q: "Can the pants have zip pockets?", a: "Yes. We offer concealed zip pockets on side seams, back, or cargo positions." },
      { q: "Are different leg shapes available?", a: "Yes — tapered, straight, wide-leg, or jogger-style with elasticated cuffs." },
      { q: "Can I add zips to the ankle?", a: "Yes. Ankle zips are available for easy on/off and a contemporary silhouette." },
      { q: "Is there a size range available?", a: "Standard UK sizing from S to 3XL. Custom size charts and extended sizing are available on request." },
    ],
  },
};
