import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "../Motion";

const CUSTOM_IMG =
  "https://images.unsplash.com/photo-1603532553059-3facb851d937?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

export default function CustomCTA() {
  return (
    <section data-testid="custom-cta" className="relative overflow-hidden bg-ink text-cream">
      <div className="grid items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12 md:py-40 lg:px-24">
        <div>
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-rose-soft">
              Made-to-order
            </p>
            <h2 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Dream it.<br />
              <span className="italic text-rose-soft">We'll bake it.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-cream/70">
              Choose your flavour, size and design — add a reference photo and a message.
              Our bakers bring your vision to life for any celebration.
            </p>
            <Link
              to="/custom-order"
              data-testid="custom-cta-btn"
              className="mt-10 inline-flex rounded-full bg-rose px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep"
            >
              Start your custom order
            </Link>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-sm"
        >
          <img src={CUSTOM_IMG} alt="Baker decorating a custom cake" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
