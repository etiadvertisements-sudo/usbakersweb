import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Truck, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder, validateCoupon, formatINR } from "../lib/api";

const field =
  "w-full border-0 border-b border-border bg-transparent py-3 text-ink placeholder:text-clay/50 focus:border-rose focus:outline-none focus:ring-0 transition-colors";

function EmptyCartRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/checkout") navigate("/cart");
  }, [navigate]);
  return null;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    city: "Pathankot",
    notes: "",
  });

  if (!items.length) {
    return <EmptyCartRedirect />;
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, total - discount);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError("");
    try {
      const res = await validateCoupon({ code: couponCode.trim(), subtotal: total });
      setAppliedCoupon(res);
      toast.success(`Coupon ${res.code} applied — you saved ${formatINR(res.discount)}!`);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponError(err.response?.data?.detail || "Invalid coupon code");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.phone || !form.address) {
      toast.error("Please fill in your name, phone and address.");
      return;
    }
    if (payment === "razorpay") {
      toast.info("Online payment is being activated. Please choose Cash on Delivery for now.");
      return;
    }
    setSubmitting(true);
    try {
      const order = await createOrder({
        ...form, items, total: grandTotal,
        payment_method: payment,
        coupon_code: appliedCoupon ? appliedCoupon.code : "",
      });
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order/${order.id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main data-testid="checkout-page" className="pt-32 px-6 pb-32 md:px-12 lg:px-24">
      <h1 className="font-serif text-5xl tracking-tight text-ink lg:text-6xl">Checkout</h1>

      <form onSubmit={submit} className="mt-12 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          <div>
            <h2 className="mb-6 font-serif text-2xl text-ink">Delivery Details</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <input data-testid="input-name" className={field} placeholder="Full name" value={form.customer_name} onChange={set("customer_name")} />
              <input data-testid="input-phone" className={field} placeholder="Phone number" value={form.phone} onChange={set("phone")} />
              <input data-testid="input-email" className={field} placeholder="Email (optional)" value={form.email} onChange={set("email")} />
              <input data-testid="input-city" className={field} placeholder="City" value={form.city} onChange={set("city")} />
              <div className="sm:col-span-2">
                <input data-testid="input-address" className={field} placeholder="Delivery address" value={form.address} onChange={set("address")} />
              </div>
              <div className="sm:col-span-2">
                <input data-testid="input-notes" className={field} placeholder="Order notes (optional)" value={form.notes} onChange={set("notes")} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-serif text-2xl text-ink">Payment Method</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setPayment("cod")}
                data-testid="payment-cod"
                className={`flex w-full items-center gap-4 rounded-sm border p-5 text-left transition-colors ${
                  payment === "cod" ? "border-rose bg-rose/5" : "border-border hover:border-rose/50"
                }`}
              >
                <Truck className="text-rose" size={22} />
                <div>
                  <p className="font-semibold text-ink">Cash on Delivery / Pickup</p>
                  <p className="text-sm text-clay">Pay when your order arrives or at our Pathankot store.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPayment("razorpay")}
                data-testid="payment-razorpay"
                className={`flex w-full items-center gap-4 rounded-sm border p-5 text-left transition-colors ${
                  payment === "razorpay" ? "border-rose bg-rose/5" : "border-border hover:border-rose/50"
                }`}
              >
                <CreditCard className="text-rose" size={22} />
                <div>
                  <p className="font-semibold text-ink">Pay Online (Razorpay)</p>
                  <p className="text-sm text-clay">UPI, cards & netbanking — activating soon.</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="h-fit rounded-sm bg-sand p-8">
          <h2 className="font-serif text-2xl text-ink">Your Order</h2>
          <div className="mt-6 space-y-4">
            {items.map((i) => (
              <div key={i.product_id} className="flex items-center gap-3 text-sm">
                <img src={i.image} alt={i.name} className="h-12 w-12 rounded-sm object-cover" />
                <span className="flex-1 text-ink">{i.name} × {i.quantity}</span>
                <span className="font-medium text-ink">{formatINR(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm border-t border-border pt-6">
            <div className="flex justify-between text-clay"><span>Subtotal</span><span className="font-medium text-ink">{formatINR(total)}</span></div>
            {appliedCoupon && (
              <div className="flex justify-between text-green-700">
                <span>Discount ({appliedCoupon.code})
                  <button onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} data-testid="remove-coupon-btn" className="ml-2 text-xs underline">remove</button>
                </span>
                <span>− {formatINR(appliedCoupon.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-clay"><span>Delivery</span><span>Free in Pathankot</span></div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-[0.15em] text-clay/70">Coupon code</label>
            <div className="mt-2 flex gap-2">
              <input
                data-testid="coupon-input"
                className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm uppercase placeholder:normal-case placeholder:text-clay/50 focus:border-rose focus:outline-none"
                placeholder="e.g. USB800"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="button"
                onClick={applyCoupon}
                data-testid="apply-coupon-btn"
                className="rounded-lg bg-ink px-5 text-xs font-bold text-cream transition-colors hover:bg-rose"
              >
                Apply
              </button>
            </div>
            {couponError && <p data-testid="coupon-error" className="mt-2 text-xs text-red-600">{couponError}</p>}
            {appliedCoupon && <p data-testid="coupon-success" className="mt-2 text-xs text-green-700">{appliedCoupon.label} applied.</p>}
          </div>

          <div className="mt-6 flex justify-between border-t border-border pt-6">
            <span className="font-serif text-2xl text-ink">Total</span>
            <span className="font-serif text-2xl text-ink" data-testid="checkout-total">{formatINR(grandTotal)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            data-testid="place-order-button"
            className="mt-8 w-full rounded-full bg-rose py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
          <Link to="/cart" className="mt-4 block text-center text-sm font-medium text-clay hover:text-rose transition-colors">
            Back to basket
          </Link>
        </div>
      </form>
    </main>
  );
}
