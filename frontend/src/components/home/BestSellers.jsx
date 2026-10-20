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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose">Most Loved</p>
            <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">Bestsellers</h2>
          </div>
          <Link to="/shop" data-testid="bestsellers-view-all" className="link-underline text-sm font-semibold text-ink">
            View all →
          </Link>
        </div>

        <div className="mt-7 flex flex-wrap gap-2" data-testid="bestseller-tabs">
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

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.slice(0, 8).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
