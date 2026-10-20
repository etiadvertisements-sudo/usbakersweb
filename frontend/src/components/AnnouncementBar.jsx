import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, BadgePercent } from "lucide-react";
import { toast } from "sonner";
import { getOffers } from "../lib/api";

export default function AnnouncementBar() {
  const [offers, setOffers] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getOffers().then(setOffers).catch(() => {});
  }, []);

  useEffect(() => {
    if (!offers.length) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % offers.length), 3500);
    return () => clearInterval(t);
  }, [offers]);

  if (!offers.length) return null;
  const current = offers[index];

  const copyCode = () => {
    navigator.clipboard?.writeText(current.code);
    toast.success(`Code ${current.code} copied!`);
  };

  return (
    <div data-testid="announcement-bar" className="fixed top-0 left-0 right-0 z-[60] bg-ink text-cream">
      <div className="flex h-9 items-center justify-center gap-3 px-4">
        <BadgePercent size={14} className="text-rose-soft shrink-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={current.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-[11px] md:text-xs font-medium tracking-wide"
          >
            {current.label} · <span className="font-bold text-rose-soft">{current.code}</span>
          </motion.p>
        </AnimatePresence>
        <button
          onClick={copyCode}
          data-testid="copy-coupon-btn"
          className="hidden sm:inline-flex items-center gap-1 rounded-full border border-cream/20 px-2.5 py-0.5 text-[10px] font-semibold hover:border-rose-soft hover:text-rose-soft transition-colors"
        >
          <Copy size={10} /> Copy
        </button>
      </div>
    </div>
  );
}
