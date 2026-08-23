# US Bakers — Product Requirements Document

## Original Problem Statement
Build a "next-level", fully functional e-commerce website for **US Bakers**, a renowned bakery in Pathankot specializing in customized cakes (birthday, wedding, anniversary) and gift hampers. Brand color is pink; award-worthy, editorial design required. Start with the homepage.

## Architecture
- **Frontend**: React 19 + React Router 7, Tailwind, framer-motion (scroll reveals, masked hero, parallax), Lenis (smooth scroll), react-fast-marquee, sonner toasts. Cart in localStorage via CartContext.
- **Backend**: FastAPI + Motor (MongoDB). Public REST API under `/api`. Products auto-seeded (16 items, 4 categories) on startup.
- **Design**: Cormorant Garamond (serif display) + Manrope (body). Palette: rose #C65D7B, cream #FDFBF7, sand, ink. Grain overlay, glass nav.

## User Personas
- Customer browsing/ordering cakes & hampers for celebrations.
- Customer requesting a bespoke custom cake.

## Core Requirements (static)
- Beautiful editorial homepage (kinetic hero, marquee, manifesto, collections, bestsellers, custom CTA, testimonials, footer).
- Product browsing by category + product detail.
- Cart + checkout (Cash on Delivery working; Razorpay deferred pending keys).
- Custom cake order form with flavor/size/message/photo upload.

## Implemented (2026-06)
- [x] Full homepage with premium motion (framer-motion + Lenis)
- [x] Catalog API + 16 seeded products across birthday/wedding/anniversary/hampers
- [x] Shop page with category filters, product detail with qty + add-to-cart
- [x] Cart (localStorage) + checkout + order creation + confirmation page
- [x] Custom cake order form with base64 image upload → /api/custom-orders
- [x] COD payment path (functional); Razorpay option shows "activating soon"
- [x] End-to-end tested: backend 100%, frontend 100%

## Backlog / Remaining
- **P0**: Wire Razorpay online payments (needs RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET from client).
- **P1**: Replace placeholder wordmark with real pink logo (awaiting upload); real product photos & prices.
- **P1**: Admin dashboard to view/manage orders & custom requests.
- **P2**: Order status tracking, delivery slot/date picker, promo codes, reviews.

## Next Tasks
1. Collect Razorpay keys and complete online checkout.
2. Swap in real logo + product photography/pricing.
3. Admin panel for orders and custom requests.
