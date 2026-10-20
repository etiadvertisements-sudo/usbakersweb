import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "../Motion";

const CUSTOM_IMG =
  "https://images.unsplash.com/photo-1603532553059-3facb851d937?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

export default function CustomCTA() {
  return (
    <section data-testid="custom-cta" className="relative overflow-hidden bg-rose-soft/40">
      <div className="grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28 lg:px-24">
        <div className="text-center md:text-left">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">
              Made-to-order · Pathankot
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-gold sm:text-5xl lg:text-6xl">
              Dream it.<br />
              <span className="italic">We'll bake it.</span>
            </h2>
            <p className="gold-diamonds mt-4 hidden md:block" aria-hidden="true">♦ ♦ ♦ ♦</p>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-clay md:mx-0">
              Choose your flavour, size and design — add a reference photo and a message.
              Our bakers bring your vision to life for any celebration.
            </p>
            <Link
              to="/custom-order"
              data-testid="custom-cta-btn"
              className="mt-9 inline-flex rounded-full bg-rose px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-rose-deep hover:shadow-lg"
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
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <img src={CUSTOM_IMG} alt="Baker decorating a custom cake" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
