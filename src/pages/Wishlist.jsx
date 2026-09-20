import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    addToast(`${item.name} moved to bag`, 'cart');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-7xl mb-6">&#10084;&#65039;</div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h1>
          <p className="text-gray-400 mb-10">Save pieces you love for later</p>
          <Link to="/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full shadow-glow inline-flex items-center gap-2">
              Discover Collection <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-400 text-sm mt-1">{items.length} {items.length === 1 ? 'piece' : 'pieces'} saved</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-rose-50 overflow-hidden shadow-soft group">
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-rose-50 to-blush-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.preventDefault(); removeFromWishlist(item.id); addToast(`${item.name} removed from wishlist`, 'remove'); }}
                    className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </motion.button>
                </div>
              </Link>
              <div className="p-5">
                <p className="text-[11px] text-rose-400 font-medium uppercase tracking-wider mb-1">{item.category}</p>
                <h3 className="font-display font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                <p className="font-bold text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleMoveToCart(item)}
                  className="w-full mt-4 bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-glow">
                  <ShoppingCart className="w-4 h-4" /> Move to Bag
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
