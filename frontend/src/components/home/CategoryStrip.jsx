import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../lib/api";
import { Reveal } from "../Motion";

export default function CategoryStrip() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  return (
    <section data-testid="category-strip" className="bg-mint-light px-6 py-16 md:px-12 lg:px-24">
      <Reveal>
        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
          — What are you craving? —
        </h2>
        <p className="gold-diamonds mt-3 text-center" aria-hidden="true">♦ ♦ ♦ ♦</p>
      </Reveal>
      <div className="mt-10 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-8 md:overflow-visible">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link to={`/shop/${c.slug}`} data-testid={`cat-circle-${c.slug}`} className="group flex w-24 shrink-0 flex-col items-center gap-3 md:w-auto">
              <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-rose group-hover:scale-105">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <span className="text-center text-xs font-semibold leading-tight text-ink group-hover:text-rose transition-colors">{c.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
