import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Check, ArrowLeft, Lock, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-sage-400 to-sage-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">Order Placed!</h1>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">
            Thank you for your purchase. A confirmation email is on its way 💌
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Link to="/products" className="text-rose-500 hover:text-rose-600 transition-colors">
          ← Continue Shopping
        </Link>
      </div>
    );
  }

  const inputClass = "w-full border border-rose-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white transition-all placeholder:text-gray-300";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-rose-500 mb-10 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Bag
        </Link>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-10"
      >
        Checkout
      </motion.h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft"
          >
            <h2 className="font-display text-lg font-bold text-gray-900 mb-6">Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Rahaf" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Hamouda" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Address</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="123 Rose Street" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">City</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="Amman" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">ZIP Code</label>
                <input type="text" name="zip" value={form.zip} onChange={handleChange} required placeholder="12345" className={inputClass} />
              </div>
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-rose-400 to-blush-400 rounded-xl">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-display text-lg font-bold text-gray-900">Payment</h2>
              <Lock className="w-3.5 h-3.5 text-gray-300 ml-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Card Number</label>
                <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">Expiry</label>
                <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" required className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 ml-1">CVV</label>
                <input type="text" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" required className={inputClass} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft sticky top-28"
          >
            <h2 className="font-display text-lg font-bold text-gray-900 mb-6">Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-rose-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-700">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="font-medium text-sage-600">Free 🎀</span>
              </div>
              <div className="flex justify-between border-t border-rose-100 pt-3">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900 text-xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold py-4 rounded-full transition-colors mt-7 shadow-glow"
            >
              Place Order 🛍️
            </motion.button>
            <p className="text-[10px] text-gray-300 text-center mt-3 flex items-center justify-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Mockup — no real payment processed
            </p>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
