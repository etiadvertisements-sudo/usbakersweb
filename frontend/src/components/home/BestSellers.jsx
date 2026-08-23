import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../lib/api";
import ProductCard from "../ProductCard";
import { Reveal } from "../Motion";

export default function BestSellers() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProducts({ bestseller: true }).then(setItems).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <section data-testid="bestsellers" className="px-6 py-24 md:px-12 md:py-40 lg:px-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose">Loved by Pathankot</p>
            <h2 className="font-serif text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Signature Bestsellers
            </h2>
          </div>
          <Link to="/shop" data-testid="bestsellers-view-all" className="link-underline text-sm font-semibold text-ink">
            Shop all →
          </Link>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
