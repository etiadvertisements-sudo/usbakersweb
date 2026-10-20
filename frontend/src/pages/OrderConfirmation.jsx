import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { api, formatINR } from "../lib/api";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${orderId}`).then((r) => setOrder(r.data)).catch(() => {});
  }, [orderId]);

  return (
    <main data-testid="order-confirmation-page" className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-rose text-white"
      >
        <Check size={36} />
      </motion.div>
      <h1 className="mt-8 font-serif text-5xl tracking-tight text-gold lg:text-6xl">Thank you!</h1>
      <p className="mt-4 max-w-md text-clay">
        Your order has been placed. Our team will call you shortly to confirm the details.
      </p>

      {order && (
        <div data-testid="order-summary" className="mt-10 w-full max-w-md rounded-sm bg-sand p-8 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-clay">Order ID</span>
            <span className="font-mono text-ink">{order.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-clay">Payment</span>
            <span className="font-medium text-ink">{order.payment_method === "cod" ? "Cash on Delivery" : "Razorpay"}</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-clay">Total</span>
            <span className="font-semibold text-ink">{formatINR(order.total)}</span>
          </div>
        </div>
      )}

      <Link to="/shop" data-testid="continue-shopping-btn" className="mt-10 rounded-full bg-rose px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep">
        Continue Shopping
      </Link>
    </main>
  );
}
