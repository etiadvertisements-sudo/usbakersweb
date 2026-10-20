import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MaskLine } from "../Motion";

const SLIDES = [
  {
    kicker: "Signature Collection",
    title: "Freshly Baked,\nEvery Single Day.",
    desc: "Customized cakes, fudgy brownies and buttery savouries — handcrafted with love in Pathankot.",
    cta: "Order Online",
    to: "/shop",
    img: "https://images.unsplash.com/photo-1609357871650-96ae6d79503b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
  {
    kicker: "Bestseller",
    title: "Fudgy Brownies\nYou'll Never Forget.",
    desc: "Dense, rich and loaded with chocolate. Our most loved bake, now in assorted boxes.",
    cta: "Shop Brownies",
    to: "/shop/brownies",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
  {
    kicker: "Gifting Season",
    title: "Beautiful Hampers\nfor Every Occasion.",
    desc: "Curated indulgence, beautifully boxed. Get 15% off all gifting with COMBO15.",
    cta: "Shop Gifting",
    to: "/shop/gifting",
    img: "https://images.pexels.com/photos/28769885/pexels-photo-28769885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <section data-testid="hero" className="relative min-h-[88vh] overflow-hidden pt-9">
      <AnimatePresence mode="wait">
        <motion.img
          key={slide.img}
          src={slide.img}
          alt={slide.title}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-xl">
          <motion.p
            key={`k-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-rose-soft"
          >
            {slide.kicker} · Pathankot
          </motion.p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={`t-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block whitespace-pre-line"
              >
                {slide.title}
              </motion.span>
            </AnimatePresence>
          </h1>
          <motion.p
            key={`d-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 text-base leading-relaxed text-cream/85"
          >
            {slide.desc}
          </motion.p>
          <motion.div
            key={`c-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to={slide.to}
              data-testid="hero-cta-btn"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep"
            >
              {slide.cta} <ArrowRight size={16} />
            </Link>
            <Link to="/custom-order" data-testid="hero-custom-btn" className="link-underline text-sm font-semibold text-cream">
              Order a custom cake →
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-3 md:left-12 lg:left-24">
        <button
          onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
          data-testid="hero-prev"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-rose-soft hover:text-rose-soft"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
          data-testid="hero-next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-rose-soft hover:text-rose-soft"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
        <div className="ml-2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              data-testid={`hero-dot-${i}`}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${i === index ? "w-8 bg-rose-soft" : "w-2 bg-cream/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
