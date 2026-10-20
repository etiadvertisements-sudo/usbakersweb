import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, getCategories } from "../../lib/api";
import ProductCard from "../ProductCard";
import { Reveal } from "../Motion";

export default function BestSellers() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tab, setTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getProducts({ bestseller: true }).then(setItems).catch(() => {});
  }, []);

  const visible = tab === "all" ? items : items.filter((p) => p.category === tab);

  if (!items.length) return null;

  return (
    <section data-testid="bestsellers" className="px-6 py-20 md:px-12 lg:px-24">
      <Reveal>
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.3em] text-rose">Most Loved</p>
        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
          — Bestsellers —
        </h2>
        <p className="gold-diamonds mt-3 text-center" aria-hidden="true">♦ ♦ ♦ ♦</p>

        <div className="mt-8 flex flex-wrap justify-center gap-2" data-testid="bestseller-tabs">
          <button
            onClick={() => setTab("all")}
            data-testid="tab-all"
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              tab === "all" ? "border-rose bg-rose text-white" : "border-border text-ink hover:border-rose"
            }`}
          >
            All
          </button>
          {categories.map((c) =>
            items.some((p) => p.category === c.slug) ? (
              <button
                key={c.slug}
                onClick={() => setTab(c.slug)}
                data-testid={`tab-${c.slug}`}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  tab === c.slug ? "border-rose bg-rose text-white" : "border-border text-ink hover:border-rose"
                }`}
              >
                {c.name}
              </button>
            ) : null
          )}
        </div>
      </Reveal>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/shop" data-testid="bestsellers-view-all" className="inline-flex rounded-full bg-rose px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-deep">
          View All Products
        </Link>
      </div>
    </section>
  );
}
