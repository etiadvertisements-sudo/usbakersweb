import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatINR } from "../lib/api";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`product-card-${product.slug}`}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden bg-sand aspect-[4/5] rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          {product.bestseller && (
            <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-rose">
              Bestseller
            </span>
          )}
          <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose text-white opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl leading-tight text-ink">{product.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-clay/60">{product.category}</p>
          </div>
          <p className="font-medium text-ink whitespace-nowrap">{formatINR(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
