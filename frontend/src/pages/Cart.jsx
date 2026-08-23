import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/api";

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <main data-testid="cart-page" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={48} className="text-rose-soft" />
        <h1 className="mt-6 font-serif text-4xl text-ink">Your basket is empty</h1>
        <p className="mt-3 text-clay">Discover our handcrafted cakes and hampers.</p>
        <Link to="/shop" data-testid="empty-cart-shop-btn" className="mt-8 rounded-full bg-rose px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep">
          Explore the Collection
        </Link>
      </main>
    );
  }

  return (
    <main data-testid="cart-page" className="pt-32 px-6 pb-32 md:px-12 lg:px-24">
      <h1 className="font-serif text-5xl tracking-tight text-ink lg:text-6xl">Your Basket</h1>

      <div className="mt-12 grid gap-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.product_id} data-testid={`cart-item-${item.product_id}`} className="flex gap-5 py-6">
              <img src={item.image} alt={item.name} className="h-28 w-24 shrink-0 rounded-sm object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl text-ink">{item.name}</h3>
                  <button onClick={() => removeItem(item.product_id)} data-testid={`remove-${item.product_id}`} className="text-clay hover:text-rose transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button onClick={() => updateQty(item.product_id, item.quantity - 1)} data-testid={`decrease-${item.product_id}`} className="p-2.5 hover:text-rose transition-colors"><Minus size={14} /></button>
                    <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product_id, item.quantity + 1)} data-testid={`increase-${item.product_id}`} className="p-2.5 hover:text-rose transition-colors"><Plus size={14} /></button>
                  </div>
                  <p className="font-medium text-ink">{formatINR(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-sm bg-sand p-8">
          <h2 className="font-serif text-2xl text-ink">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-clay"><span>Subtotal</span><span className="font-medium text-ink" data-testid="cart-subtotal">{formatINR(total)}</span></div>
            <div className="flex justify-between text-clay"><span>Delivery</span><span>Calculated at checkout</span></div>
          </div>
          <div className="mt-6 flex justify-between border-t border-border pt-6">
            <span className="font-serif text-2xl text-ink">Total</span>
            <span className="font-serif text-2xl text-ink" data-testid="cart-total">{formatINR(total)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            data-testid="checkout-button"
            className="mt-8 w-full rounded-full bg-rose py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep"
          >
            Proceed to Checkout
          </button>
          <Link to="/shop" className="mt-4 block text-center text-sm font-medium text-clay hover:text-rose transition-colors">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
