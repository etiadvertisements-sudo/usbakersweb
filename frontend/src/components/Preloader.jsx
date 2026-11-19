import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
        >
          <motion.img
            src="/chef-doodle.jpeg"
            alt="Chef baking a cake"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-44 w-44 rounded-2xl object-contain md:h-56 md:w-56"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 font-serif text-3xl font-semibold tracking-tight text-rose md:text-4xl"
          >
            US Bakers
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-mint-dark"
          >
            For Your Sweet Cravings
          </motion.p>

          <div className="mt-7 h-1 w-40 overflow-hidden rounded-full bg-mint-light">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full rounded-full bg-rose"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
