import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2000);
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
            src="/us-bakers-logo.png"
            alt="US Bakers"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [0.8, 1.04, 1] }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-36 w-36 rounded-full object-cover shadow-lg md:h-44 md:w-44"
          />

          <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-mint-light">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
              className="h-full rounded-full bg-rose"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
