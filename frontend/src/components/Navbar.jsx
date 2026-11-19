import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, MapPin, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Products" },
  { to: "/shop/cakes", label: "Speciality Cakes" },
  { to: "/shop/brownies", label: "Brownies" },
  { to: "/shop/gifting", label: "Gifting" },
  { to: "/custom-order", label: "Custom Cakes" },
];

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header data-testid="navbar" className="sticky top-0 z-50">
      {/* Top offer strip */}
      <div className="bg-mint-dark text-white">
        <div className="mx-auto flex h-8 items-center justify-between px-4 text-[11px] md:px-8 md:text-xs" data-testid="top-strip">
          <p className="font-medium tracking-wide">
            Upto ₹200 OFF on your First Order · Code <span className="font-bold">USB1500</span>
          </p>
          <div className="hidden items-center gap-5 sm:flex">
            <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> Pathankot</span>
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 hover:underline"><Phone size={12} /> +91 98765 43210</a>
          </div>
        </div>
      </div>

      {/* Main mint header */}
      <div className="bg-mint shadow-sm border-b border-mint-dark/30">
        <div className="mx-auto flex h-16 items-center gap-4 px-4 md:h-[72px] md:px-8">
          <Link to="/" data-testid="logo-link" className="shrink-0">
            <img
              src="/us-bakers-logo.png"
              alt="US Bakers — For Your Sweet Cravings"
              className="h-12 w-12 rounded-full object-cover shadow-md transition-transform duration-300 hover:scale-105 md:h-14 md:w-14"
            />
          </Link>

          <form onSubmit={submitSearch} className="mx-auto hidden w-full max-w-md md:block">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-clay" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="search-input"
                placeholder="Search for cakes, brownies, hampers…"
                className="w-full rounded-full bg-white/95 py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-clay/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <button
              onClick={() => navigate("/cart")}
              data-testid="cart-button"
              className="relative inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-black"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span
                  data-testid="cart-count"
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-bold text-white"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              className="text-ink md:hidden"
              onClick={() => setOpen((o) => !o)}
              data-testid="mobile-menu-toggle"
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={submitSearch} className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-clay" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="search-input-mobile"
              placeholder="Search for cakes, brownies…"
              className="w-full rounded-full bg-white/95 py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-clay/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose"
            />
          </div>
        </form>
      </div>

      {/* Secondary nav */}
      <nav className="hidden border-b border-border bg-sand md:block" data-testid="secondary-nav">
        <div className="mx-auto flex items-center justify-center gap-8 px-8 py-2.5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:text-rose"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-sand px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to + l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1.5 font-serif text-lg text-ink hover:text-rose"
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
