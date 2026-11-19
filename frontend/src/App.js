import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CustomOrder from "./pages/CustomOrder";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  useEffect(() => {
    document.title = "US Bakers · Artisan Custom Cakes, Pathankot";
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }} ref={(l) => { window.lenis = l?.lenis || l; }}>
      <div className="App grain min-h-screen bg-cream">
        <Preloader />
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/custom-order" element={<CustomOrder />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:orderId" element={<OrderConfirmation />} />
            </Routes>
            <Footer />
          </BrowserRouter>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </div>
    </ReactLenis>
  );
}

export default App;
