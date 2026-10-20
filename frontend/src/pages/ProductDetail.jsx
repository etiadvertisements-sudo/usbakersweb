import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { getProduct, getProducts, formatINR } from "../lib/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
    getProduct(slug)
      .then((p) => {
        setProduct(p);
        getProducts({ category: p.category }).then((all) =>
          setRelated(all.filter((x) => x.slug !== p.slug).slice(0, 4))
        );
      })
      .catch(() => navigate("/shop"));
  }, [slug, navigate]);

  if (!product) return <div className="min-h-screen" />;

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${product.name} added to your basket`);
  };

  return (
    <main data-testid="product-detail-page" className="pt-8">
      <div className="px-6 md:px-12 lg:px-24">
        <button
          onClick={() => navigate(-1)}
          data-testid="back-button"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-rose transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-sm bg-sand"
          >
            <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose">{product.category}</p>
            <h1 className="mt-3 font-serif text-5xl leading-none tracking-tight text-gold lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-medium text-ink">{formatINR(product.price)}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-clay">{product.description}</p>

            <ul className="mt-8 space-y-3 text-sm text-clay">
              {["Freshly baked to order", "Serves 8–12 (customisable)", "Eggless option available on request"].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check size={16} className="text-rose" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <div className="flex items-center rounded-full border border-border" data-testid="qty-selector">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} data-testid="qty-decrease" className="p-3 text-ink hover:text-rose transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold" data-testid="qty-value">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} data-testid="qty-increase" className="p-3 text-ink hover:text-rose transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                data-testid="add-to-cart-button"
                className="rounded-full bg-rose px-10 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep"
              >
                Add to Basket · {formatINR(product.price * qty)}
              </button>
            </div>

            <Link to="/custom-order" className="mt-6 link-underline text-sm font-medium text-ink">
              Want it personalised? Order a custom cake →
            </Link>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-32 pb-32">
            <h2 className="mb-12 font-serif text-3xl text-ink md:text-4xl">You may also love</h2>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
