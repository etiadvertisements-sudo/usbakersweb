import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-mint text-ink">
      <div className="px-6 pt-16 pb-8 md:px-12 lg:px-24">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <img
              src="/us-bakers-logo.png"
              alt="US Bakers — For Your Sweet Cravings"
              className="h-20 w-20 rounded-full object-cover shadow-md"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/75">
              Artisan custom cakes, pastries, brownies & gift hampers — freshly baked daily in Pathankot.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink transition-colors hover:bg-rose hover:text-white"><Instagram size={16} /></a>
              <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink transition-colors hover:bg-rose hover:text-white"><Facebook size={16} /></a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider">Useful Links</p>
            <div className="space-y-2.5 text-sm">
              <Link to="/shop/cakes" className="block text-ink/75 transition-colors hover:text-rose">Speciality Cakes</Link>
              <Link to="/shop/pastries" className="block text-ink/75 transition-colors hover:text-rose">Pastries</Link>
              <Link to="/shop/brownies" className="block text-ink/75 transition-colors hover:text-rose">Brownies</Link>
              <Link to="/shop/cookies" className="block text-ink/75 transition-colors hover:text-rose">Cookies</Link>
              <Link to="/shop/gifting" className="block text-ink/75 transition-colors hover:text-rose">Gift Hampers</Link>
              <Link to="/custom-order" className="block text-ink/75 transition-colors hover:text-rose">Custom Cake Order</Link>
              <Link to="/about" className="block text-ink/75 transition-colors hover:text-rose">About Us</Link>
              <Link to="/contact" className="block text-ink/75 transition-colors hover:text-rose">Contact</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider">Payment Methods</p>
            <div className="flex flex-wrap gap-2">
              {["UPI", "Cards", "NetBanking", "Cash on Delivery"].map((m) => (
                <span key={m} className="rounded-md bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink/60">100% secure payments. Razorpay protected.</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider">Contact & Connect</p>
            <div className="space-y-3 text-sm text-ink/75">
              <p className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0" /> Main Bazaar, Pathankot, Punjab 145001</p>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 hover:text-rose"><Phone size={15} /> +91 98765 43210</a>
              <a href="mailto:hello@usbakers.in" className="flex items-center gap-2.5 hover:text-rose"><Mail size={15} /> hello@usbakers.in</a>
              <p className="text-xs text-ink/60">Open daily · 8 AM – 10 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 md:flex-row">
          <p className="text-xs text-ink/60">© {new Date().getFullYear()} US Bakers, Pathankot. All rights reserved.</p>
          <p className="font-serif text-sm italic text-ink/70">Baked with love, every single day.</p>
        </div>
      </div>
    </footer>
  );
}
