# US Bakers — Product Requirements Document

## Original Problem Statement
Build a "next-level", fully functional e-commerce website for **US Bakers**, a renowned bakery in Pathankot specializing in customized cakes (birthday, wedding, anniversary) and gift hampers. Brand color is pink; award-worthy design required. Start with the homepage.
**Update (2026-06-23):** User referenced theobroma.in — wants a Theobroma-style experience: category-rich bakery catalog (pastries, brownies, cupcakes, cookies, savouries, gifting), prominent promo offers, easy ordering, warm approachable premium retail feel — keeping the pink brand identity.

## Architecture
- **Frontend**: React 19 + React Router 7, Tailwind, framer-motion, Lenis smooth scroll, sonner toasts. Cart in localStorage via CartContext.
- **Backend**: FastAPI + Motor (MongoDB). Public REST API under `/api`. Products seeded on startup (upsert by slug).
- **Design**: Cormorant Garamond (display) + Manrope (body). Rose #C65D7B, cream #FDFBF7, sand, ink.

## User Personas
- Customer browsing/ordering cakes, pastries, brownies, cookies, hampers for celebrations & daily treats.
- Customer requesting a bespoke custom cake.

## Core Requirements (static)
- Theobroma-style category-rich e-commerce homepage (offer bar, category strip, promo banners, bestsellers, value props, testimonials, store info, footer).
- Product browsing by category + product detail.
- Cart + checkout (COD working; Razorpay pending keys).
- Custom cake order form with flavor/size/message/photo upload.

## Assets
- Real brand logo at `/app/frontend/public/us-bakers-logo.png` (pink circular badge) — used in header, footer and favicon.
- Preloader chef-baking doodle at `/app/frontend/public/chef-doodle.jpeg` (minimal pink line-art on cream).

## Implemented
- **2026-06-23 (v1)**: Editorial luxury homepage, catalog API (16 products / 4 categories), shop + detail + cart + COD checkout + confirmation, custom order form with photo upload.
- **2026-06-23 (v2)**: Theobroma-style e-commerce structure — hero promo carousel (3 auto-rotating slides), 8 categories, 38 products, coupon codes (USB500/800/1000/1500, COMBO15) with /api/coupons/validate, coupon applied in checkout (verified ₹850→₹800), fixed empty-cart redirect bug.
- **2026-06-23 (v3)**: Theobroma look-and-feel restyle (user shared theobroma.in screenshots, wanted "premium, minimal"): mint header (#8FC3B4) with pink logo badge, pill search bar (live product search), black cart button, top offer strip ("Upto ₹200 OFF · USB1500" + Pathankot store + phone), secondary category nav row. Gold serif (#B8860B) centered section headings with ♦♦♦♦ ornaments. Circular category strip on mint-light, ivory product cards with pink prices, centered value props (mint icon circles), star-rating testimonial cards, 4-card store info grid, mint footer (Useful Links / Payment Methods / Contact & Connect). Custom CTA now soft-pink section. All pages re-padded for sticky header. Verified: search (6 results for "brownie"), mobile layout, no JS errors.

## Backlog / Remaining
- **P0**: Wire Razorpay online payments (needs RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET from client).
- **P1**: Replace placeholder wordmark with real pink logo (awaiting upload); real product photos & prices.
- **P1**: Admin dashboard to view/manage orders & custom requests.
- **P2**: Order tracking, delivery slots, promo code validation server-side, reviews.

## Next Tasks
1. Complete Theobroma-style homepage redesign + expanded catalog.
2. Collect Razorpay keys and complete online checkout.
3. Swap in real logo + product photography/pricing.
4. Admin panel for orders and custom requests.
