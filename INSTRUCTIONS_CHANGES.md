Summary of changes made to implement instructions from PDFs

Overview
- Implemented the requested homepage improvements while preserving the existing dark/gold design language, spacing and flow.
- Reworked the new sections into a more premium, motion-driven style so they feel aligned with the rest of the site and no longer look flat or broken.

Files added
- src/components/WhoWeBuildFor.tsx
  - Premium 8-card B2B audience grid with stronger hierarchy, hover motion and contact CTAs.

- src/components/KnowledgeCentre.tsx
  - Premium knowledge hub with a featured article card and supporting article cards.

- src/components/FAQ.tsx
  - Accessible two-column FAQ accordion with animated open/close states and FAQPage JSON-LD.

Files modified
- src/app/page.tsx
  - Inserted WhoWeBuildFor, KnowledgeCentre and FAQ into the homepage flow.

- src/components/ProductShowcase.tsx
  - Added a responsive semantic comparison table below the product cards.

- src/components/Process.tsx
  - Rebuilt the timeline as a premium accordion with clearer hierarchy and motion.

Why these changes
- Who We Build For: gives B2B visitors a fast scan path and improves qualification.
- Knowledge Centre & FAQ: adds educational content, reduces pre-sales friction and supports SEO.
- Product comparison table: helps buyers compare products without contacting sales.
- Process accordion: makes the workflow easier to understand while keeping the original structure.

Placeholder usage
- src/components/KnowledgeCentre.tsx
  - The featured editorial visual and each article image panel are placeholders until real photography is supplied.
  - The labels "Editorial image placeholder" and "Image placeholder" mark those areas clearly.

- src/components/WhoWeBuildFor.tsx
  - Uses abstract icon markers instead of final industry-specific illustrations.

- src/components/Process.tsx
  - Uses abstract symbols for step icons rather than photography.

Files changed/created (quick list)
- Created: src/components/WhoWeBuildFor.tsx
- Created: src/components/KnowledgeCentre.tsx
- Created: src/components/FAQ.tsx
- Modified: src/app/page.tsx
- Modified: src/components/ProductShowcase.tsx
- Modified: src/components/Process.tsx
