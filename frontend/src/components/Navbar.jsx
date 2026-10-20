import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/shop/cakes", label: "Cakes" },
  { to: "/shop/pastries", label: "Pastries" },
  { to: "/shop/brownies", label: "Brownies" },
  { to: "/shop/gifting", label: "Gifting" },
];

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-9 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-cream/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex items-center justify-between px-6 md:px-12 lg:px-24 h-20">
        <Link to="/" data-testid="logo-link" className="flex flex-col leading-none">
          <span className="font-serif text-2xl md:text-3xl tracking-tight text-ink">US Bakers</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-rose font-semibold">Pathankot · Est. Craft</span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="link-underline text-sm font-medium text-ink/80 hover:text-rose transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/custom-order"
            data-testid="nav-custom-order"
            className="hidden md:inline-flex items-center rounded-full bg-rose px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-deep transition-colors"
          >
            Order Custom Cake
          </Link>
          <button
            onClick={() => navigate("/cart")}
            data-testid="cart-button"
            className="relative text-ink hover:text-rose transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span
                data-testid="cart-count"
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose text-[10px] font-bold text-white"
              >
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-ink"
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-cream/95 backdrop-blur-xl border-t border-border px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-lg font-serif text-ink"
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/custom-order"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-rose px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Order Custom Cake
          </Link>
        </div>
      )}
    </header>
  );
}
