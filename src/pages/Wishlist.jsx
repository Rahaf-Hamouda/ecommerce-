import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-7xl mb-6">💝</div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h1>
          <p className="text-gray-400 mb-10">Save your favorite pieces for later ✨</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2"
            >
              Explore Collection <ArrowRight className="w-5 h-5" />
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
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} saved with 💕</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearWishlist}
          className="text-sm text-rose-400 hover:text-rose-600 font-medium bg-rose-50 px-4 py-2 rounded-full"
        >
          Clear All
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden shadow-soft border border-rose-50 group"
            >
              <div className="relative">
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-[4/5] bg-gradient-to-br from-rose-50 to-blush-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </Link>

                {/* Remove from wishlist */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2.5 glass rounded-full shadow-md"
                >
                  <Trash2 className="w-4 h-4 text-rose-500" />
                </motion.button>

                {/* Category */}
                <span className="absolute top-4 left-4 glass text-rose-600 text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-display font-semibold text-gray-800 mb-1.5 line-clamp-1 group-hover:text-rose-600 transition-colors text-[15px]">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  ${item.price.toFixed(2)}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item.id);
                  }}
                  className="w-full bg-gradient-to-r from-rose-500 to-blush-500 hover:from-rose-600 hover:to-blush-600 text-white text-sm font-semibold py-3 rounded-full transition-all shadow-glow flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Move to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
