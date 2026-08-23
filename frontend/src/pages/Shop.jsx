import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProducts, getCategories } from "../lib/api";
import ProductCard from "../components/ProductCard";
import { Reveal } from "../components/Motion";

export default function Shop() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(category ? { category } : {})
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category]);

  const active = categories.find((c) => c.slug === category);

  return (
    <main data-testid="shop-page" className="pt-32">
      <section className="px-6 pb-10 md:px-12 lg:px-24">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose">
            {active ? active.name : "Full Collection"}
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {active ? active.tagline : "Every cake, every celebration."}
          </h1>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3" data-testid="category-filters">
          <button
            onClick={() => navigate("/shop")}
            data-testid="filter-all"
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              !category ? "border-rose bg-rose text-white" : "border-border text-ink hover:border-rose"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate(`/shop/${c.slug}`)}
              data-testid={`filter-${c.slug}`}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                category === c.slug ? "border-rose bg-rose text-white" : "border-border text-ink hover:border-rose"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-32 md:px-12 lg:px-24">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-sm bg-sand" />
            ))}
          </div>
        ) : products.length ? (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-clay">No cakes found in this collection yet.</p>
        )}
      </section>
    </main>
  );
}
