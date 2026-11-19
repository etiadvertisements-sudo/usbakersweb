import { Link } from "react-router-dom";
import { Heart, Award, Leaf, Users } from "lucide-react";
import { Reveal } from "../components/Motion";

const STATS = [
  { value: "2020", label: "Where it began" },
  { value: "1000s", label: "Cakes baked" },
  { value: "200+", label: "Cake designs" },
  { value: "100%", label: "Freshly baked" },
];

const VALUES = [
  { icon: Leaf, title: "Real Ingredients", desc: "Fresh cream, real butter, seasonal fruit and Belgian chocolate — never compromises." },
  { icon: Heart, title: "Handcrafted", desc: "Every cake is made to order by hand. No moulds, no shortcuts, just skill and love." },
  { icon: Award, title: "Homegrown & Loved", desc: "Born in a home kitchen, now a name families across Pathankot trust for their celebrations." },
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
              It all began in a home kitchen.
            </h1>
            <p className="gold-diamonds mt-5" aria-hidden="true">♦ ♦ ♦ ♦</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-clay">
              US Bakers isn't a story that started in a grand bakery — it started at home, with one
              woman, a whisk, and a lot of love.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-lg">
              <img
                src="/founder-illustration.webp"
                alt="Urvashi Sikka, founder of US Bakers, decorating a cake"
                className="aspect-square w-full rounded-2xl object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Story */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-gold sm:text-5xl">
              From a lockdown experiment to Pathankot's favourite.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-clay">
              <p>
                It was <span className="font-semibold text-ink">2020</span>. The world had come to a
                standstill, and like so many of us, <span className="font-semibold text-ink">Urvashi Sikka</span> found
                herself at home, looking for a way to turn the long, uncertain days into something sweet.
              </p>
              <p>
                Her kitchen became her studio. There were flops, fallen sponges and frostings that
                simply wouldn't set — <span className="italic">trial after trial after trial</span>. But she kept
                going, tweaking a recipe here, a technique there, chasing a taste she could feel but
                hadn't yet caught.
              </p>
              <p>
                And then, one evening, it happened. One bite. That one{" "}
                <span className="font-semibold text-rose">“mmm… yummmm”</span> moment — the kind that makes
                you close your eyes and smile. That single cake changed everything. Friends asked for
                more. Neighbours placed orders. Word travelled across Pathankot.
              </p>
              <p>
                What began as a way to pass lockdown days quietly grew into{" "}
                <span className="font-semibold text-ink">US Bakers</span> — a bakery built entirely on
                homemade love, honest ingredients and that relentless pursuit of the perfect bite. Today,
                every cake we make still begins the way the very first one did: by hand, with heart.
              </p>
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
