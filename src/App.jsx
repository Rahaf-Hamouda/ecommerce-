import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
import { ToastProvider } from './context/ToastContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-7xl mb-6">404</p>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-10">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <ToastProvider>
    <WishlistProvider>
    <CartProvider>
      <ScrollToTop />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CartProvider>
    </WishlistProvider>
    </ToastProvider>
  );
}

export default App;
