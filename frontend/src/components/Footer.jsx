import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-ink text-cream">
      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-10">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-rose-soft font-semibold mb-6">
              Crafted in Pathankot
            </p>
            <h3 className="font-serif text-5xl md:text-7xl leading-none">
              Let's bake<br />something<br />
              <span className="italic text-rose-soft">unforgettable.</span>
            </h3>
            <Link
              to="/custom-order"
              data-testid="footer-custom-cta"
              className="mt-10 inline-flex items-center rounded-full border border-cream/30 px-8 py-3 text-sm font-semibold hover:bg-rose hover:border-rose transition-colors"
            >
              Start your custom order
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-xs tracking-[0.2em] uppercase text-rose-soft font-semibold mb-6">Explore</p>
            <Link to="/shop/cakes" className="block text-cream/70 hover:text-cream transition-colors">Cakes</Link>
            <Link to="/shop/pastries" className="block text-cream/70 hover:text-cream transition-colors">Pastries</Link>
            <Link to="/shop/brownies" className="block text-cream/70 hover:text-cream transition-colors">Brownies</Link>
            <Link to="/shop/cookies" className="block text-cream/70 hover:text-cream transition-colors">Cookies</Link>
            <Link to="/shop/savouries" className="block text-cream/70 hover:text-cream transition-colors">Savouries</Link>
            <Link to="/shop/gifting" className="block text-cream/70 hover:text-cream transition-colors">Gifting & Hampers</Link>
            <Link to="/shop/wedding" className="block text-cream/70 hover:text-cream transition-colors">Wedding Cakes</Link>
            <Link to="/custom-order" className="block text-cream/70 hover:text-cream transition-colors">Custom Cakes</Link>
          </div>

          <div className="space-y-4 text-sm">
            <p className="text-xs tracking-[0.2em] uppercase text-rose-soft font-semibold mb-6">Visit & Order</p>
            <p className="flex items-start gap-3 text-cream/70"><MapPin size={16} className="mt-0.5 shrink-0" /> Main Bazaar, Pathankot, Punjab 145001</p>
            <p className="flex items-center gap-3 text-cream/70"><Phone size={16} /> +91 98765 43210</p>
            <p className="flex items-center gap-3 text-cream/70"><Mail size={16} /> hello@usbakers.in</p>
            <div className="flex gap-4 pt-3">
              <a href="#" aria-label="Instagram" className="text-cream/70 hover:text-rose-soft transition-colors"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook" className="text-cream/70 hover:text-rose-soft transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} US Bakers. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-cream/50">
            <span>Cash on Delivery</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span>Razorpay Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
