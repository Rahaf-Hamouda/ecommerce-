import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      <div className="bg-gradient-to-b from-rose-50/50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display text-2xl font-bold text-gradient">Elegance</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Thoughtfully curated essentials for the modern, refined lifestyle.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="p-2 rounded-full bg-white border border-rose-100 text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:shadow-sm">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white border border-rose-100 text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:shadow-sm">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white border border-rose-100 text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:shadow-sm">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white border border-rose-100 text-gray-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:shadow-sm">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="text-gray-500 hover:text-rose-500 transition-colors">Home</Link></li>
                <li><Link to="/products" className="text-gray-500 hover:text-rose-500 transition-colors">Collection</Link></li>
                <li><Link to="/cart" className="text-gray-500 hover:text-rose-500 transition-colors">Bag</Link></li>
                <li><Link to="/wishlist" className="text-gray-500 hover:text-rose-500 transition-colors">Wishlist</Link></li>
                <li><Link to="/checkout" className="text-gray-500 hover:text-rose-500 transition-colors">Checkout</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-display font-semibold text-gray-800 mb-4">Stay Connected</h3>
              <p className="text-sm text-gray-500 mb-4">
                Subscribe for exclusive offers, early access, and new arrivals.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="Enter your email"
                    className="flex-1 bg-white border border-rose-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-rose-500 to-blush-500 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-glow-blush hover:shadow-glow transition-shadow"
                  >
                    Subscribe
                  </motion.button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-500 pl-4"
                  >
                    {error}
                  </motion.p>
                )}
                <AnimatePresence>
                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-emerald-600 pl-4"
                    >
                      Thanks for subscribing! Check your inbox.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-rose-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Elegance. All rights reserved.</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> for you</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
