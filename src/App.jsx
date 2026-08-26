import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  const location = useLocation();

  return (
    <WishlistProvider>
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream-50">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;
