import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ROWS = [
  {
    slug: "cakes",
    name: "Speciality Cakes",
    desc: "Birthdays, weddings & every milestone",
    img: "https://images.pexels.com/photos/34833097/pexels-photo-34833097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
    speed: -60,
  },
  {
    slug: "brownies",
    name: "Brownies & Bakes",
    desc: "Fudgy, dense, impossible to resist",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    speed: 60,
  },
  {
    slug: "gifting",
    name: "Gifting & Hampers",
    desc: "Curated indulgence, beautifully boxed",
    img: "https://images.pexels.com/photos/28769885/pexels-photo-28769885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400",
    speed: -60,
  },
];

function ParallaxRow({ row }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [row.speed, -row.speed]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.3]);

  return (
    <Link
      to={`/shop/${row.slug}`}
      ref={ref}
      data-testid={`parallax-${row.slug}`}
      className="group relative flex h-[46vh] items-center justify-center overflow-hidden md:h-[58vh]"
    >
      <motion.img
        src={row.img}
        alt={row.name}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/45 transition-colors duration-500 group-hover:bg-ink/55" />
      <div className="relative z-10 px-6 text-center text-cream">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl tracking-tight sm:text-6xl lg:text-7xl"
        >
          {row.name}
        </motion.h3>
        <p className="mt-3 text-sm font-medium text-cream/85 md:text-base">{row.desc}</p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 group-hover:border-rose group-hover:bg-rose">
          Explore <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export default function ParallaxCategories() {
  return (
    <section data-testid="parallax-categories" className="bg-cream">
      <div className="px-6 py-16 text-center md:px-12 lg:px-24">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
          — Explore Our World of Flavour —
        </h2>
        <p className="gold-diamonds mt-3" aria-hidden="true">♦ ♦ ♦ ♦</p>
      </div>
      <div className="flex flex-col">
        {ROWS.map((row) => (
          <ParallaxRow key={row.slug} row={row} />
        ))}
      </div>
    </section>
  );
}
