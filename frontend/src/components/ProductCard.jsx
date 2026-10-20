import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatINR } from "../lib/api";
import { useCart } from "../context/CartContext";

export function EggBadge({ eggless = true }) {
  return (
    <span
      title={eggless ? "Eggless" : "Contains egg"}
      className={`flex h-4 w-4 items-center justify-center rounded-[3px] border-2 ${
        eggless ? "border-green-700" : "border-red-700"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${eggless ? "bg-green-700" : "bg-red-700"}`} />
    </span>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    toast.success(`${product.name} added to basket`);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`product-card-${product.slug}`}
      className="group overflow-hidden rounded-xl border border-rose/10 bg-sand shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3] bg-sand">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.bestseller && (
            <span className="absolute left-3 top-3 rounded-full bg-rose px-2.5 py-0.5 text-[10px] font-bold text-white">
              Bestseller
            </span>
          )}
          <span className="absolute right-3 top-3 rounded-md bg-white/95 p-1.5 shadow-sm">
            <EggBadge eggless={product.eggless} />
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg leading-snug text-ink line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-xs text-clay">{product.weight}</p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-base font-bold text-rose">{formatINR(product.price)}</p>
            <button
              onClick={handleAdd}
              data-testid={`add-to-cart-${product.slug}`}
              className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                added ? "bg-green-700 text-white" : "bg-rose text-white hover:bg-rose-deep"
              }`}
            >
              {added ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add</>}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
