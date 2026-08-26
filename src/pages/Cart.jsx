import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-7xl mb-6">&#128717;&#65039;</div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Your Bag is Empty</h1>
          <p className="text-gray-400 mb-10">Time to discover something you'll love</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Your Bag</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} {items.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearCart}
          className="text-sm text-rose-400 hover:text-rose-600 font-medium bg-rose-50 px-4 py-2 rounded-full"
        >
          Clear All
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-rose-50 p-5 sm:p-6 flex gap-5 items-center shadow-soft"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-blush-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-display font-semibold text-gray-800 hover:text-rose-500 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                  <div className="flex items-center gap-0 bg-rose-50 rounded-full overflow-hidden">
                    <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2.5 hover:bg-rose-100 transition-colors" disabled={item.quantity <= 1}>
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </motion.button>
                    <span className="w-8 text-center font-semibold text-sm text-gray-800">{item.quantity}</span>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2.5 hover:bg-rose-100 transition-colors">
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-rose-50 p-7 shadow-soft sticky top-28"
          >
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal ({items.length})</span>
                <span className="font-medium text-gray-700">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="font-medium text-sage-600">Complimentary</span>
              </div>
              <div className="flex justify-between border-t border-rose-100 pt-4">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900 text-xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <motion.button whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.4)' }} whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold py-4 rounded-full transition-colors flex items-center justify-center gap-2 mt-7 shadow-glow"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/products" className="block text-center text-rose-400 hover:text-rose-500 font-medium py-3 rounded-full transition-colors mt-3 text-sm">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
