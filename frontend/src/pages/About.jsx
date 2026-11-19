import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Award, Leaf, Users } from "lucide-react";
import { Reveal } from "../components/Motion";

const STATS = [
  { value: "15+", label: "Years of baking" },
  { value: "50k+", label: "Happy customers" },
  { value: "200+", label: "Cake designs" },
  { value: "100%", label: "Freshly baked" },
];

const VALUES = [
  { icon: Leaf, title: "Real Ingredients", desc: "Fresh cream, real butter, seasonal fruit and Belgian chocolate — never compromises." },
  { icon: Heart, title: "Handcrafted", desc: "Every cake is made to order by hand. No moulds, no shortcuts, just skill and love." },
  { icon: Award, title: "Pathankot's Favourite", desc: "A name families have trusted for celebrations, big and small, for over a decade." },
  { icon: Users, title: "Made for You", desc: "We design around your story, so each creation feels as personal as the moment." },
];

export default function About() {
  return (
    <main data-testid="about-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-mint-light px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">Our Story</p>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-gold sm:text-6xl lg:text-7xl">
              Baking joy in Pathankot since day one.
            </h1>
            <p className="gold-diamonds mt-5" aria-hidden="true">♦ ♦ ♦ ♦</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-clay">
              US Bakers began with a simple belief — that every celebration deserves a cake as
              special as the moment itself. What started as a small neighbourhood bakery has grown
              into Pathankot's most-loved destination for custom cakes, pastries and gifting.
            </p>
            <Link
              to="/custom-order"
              data-testid="about-cta"
              className="mt-8 inline-flex rounded-full bg-rose px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-rose-deep hover:shadow-lg"
            >
              Order a custom cake
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1711672284661-bd70e38f31b2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100"
                alt="Inside US Bakers"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-6 py-14 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-rose md:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-clay">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Craft */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100"
                alt="Baker kneading dough"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-gold sm:text-5xl">
              Where craft meets celebration.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-clay">
              Our bakers start before sunrise, kneading, piping and layering every creation by hand.
              From a child's first birthday to a golden anniversary, we pour the same care into each
              bake — because we're not just making cakes, we're making memories.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-clay">
              Walk into our Main Bazaar store and you'll smell it the moment you step in: fresh,
              honest baking, made with love, every single day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
            — What we stand for —
          </h2>
          <p className="gold-diamonds mt-3 text-center" aria-hidden="true">♦ ♦ ♦ ♦</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-7 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint-light text-mint-dark">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-clay">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rose-soft/40 px-6 py-20 text-center md:px-12 lg:px-24">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight tracking-tight text-gold sm:text-5xl">
            Let's make your next celebration unforgettable.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="rounded-full bg-rose px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-rose-deep">
              Explore the menu
            </Link>
            <Link to="/contact" className="rounded-full border border-ink/20 px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-rose hover:text-rose">
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
