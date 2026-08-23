import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Motion";

const COLLECTIONS = [
  {
    slug: "birthday",
    name: "Birthday Cakes",
    img: "https://images.pexels.com/photos/29192489/pexels-photo-29192489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "wedding",
    name: "Wedding Cakes",
    img: "https://images.unsplash.com/photo-1565987164841-7132b384293b?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
  },
  {
    slug: "anniversary",
    name: "Anniversary Cakes",
    img: "https://images.unsplash.com/photo-1761671613315-53157f91d0f8?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
  },
  {
    slug: "hampers",
    name: "Gift Hampers",
    img: "https://images.unsplash.com/photo-1773450970981-793e2d72d820?crop=entropy&cs=srgb&fm=jpg&q=85&w=940",
  },
];

export default function Collections() {
  return (
    <section data-testid="collections" className="bg-sand px-6 py-24 md:px-12 md:py-40 lg:px-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose">Shop by Occasion</p>
            <h2 className="font-serif text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Collections
            </h2>
          </div>
          <Link to="/shop" data-testid="collections-view-all" className="link-underline text-sm font-semibold text-ink">
            View everything →
          </Link>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              to={`/shop/${c.slug}`}
              data-testid={`collection-${c.slug}`}
              className="group relative block overflow-hidden rounded-sm"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
                <span className="font-serif text-2xl text-cream">{c.name}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink transition-colors group-hover:bg-rose group-hover:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
