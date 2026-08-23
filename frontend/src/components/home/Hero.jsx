import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLine } from "../Motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1609357871650-96ae6d79503b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} data-testid="hero" className="relative min-h-screen overflow-hidden pt-20">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-24">
        <div className="z-10 pt-10 lg:pt-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-rose"
          >
            Renowned Bakery · Pathankot
          </motion.p>

          <h1 className="font-serif text-6xl leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-[7.5rem]">
            <MaskLine delay={0.1}>Artisan</MaskLine>
            <MaskLine delay={0.22} className="italic text-rose">Elegance,</MaskLine>
            <MaskLine delay={0.34}>Baked to</MaskLine>
            <MaskLine delay={0.46} className="italic">Celebrate.</MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="mt-8 max-w-md text-base leading-relaxed text-clay"
          >
            Customized cakes for birthdays, weddings, anniversaries and every moment worth
            savouring — handcrafted with love in the heart of Pathankot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              data-testid="hero-shop-btn"
              className="rounded-full bg-rose px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep"
            >
              Explore the Collection
            </Link>
            <Link
              to="/custom-order"
              data-testid="hero-custom-btn"
              className="link-underline text-sm font-semibold text-ink"
            >
              Design your custom cake →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[55vh] overflow-hidden rounded-sm lg:h-[78vh]"
        >
          <motion.img
            src={HERO_IMG}
            alt="Signature pink floral celebration cake"
            style={{ y, scale }}
            className="h-[120%] w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 rounded-full bg-cream/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink backdrop-blur">
            Signature · Rose Cascade
          </div>
        </motion.div>
      </div>
    </section>
  );
}
