import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    addToast(`${product.name} added to bag`, 'cart');
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wasInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    addToast(
      wasInWishlist ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`,
      wasInWishlist ? 'remove' : 'wishlist'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative bg-white rounded-3xl border border-rose-50 overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-rose-50 to-blush-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-rose-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
            {/* Wishlist heart */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
            >
              <Heart className={`w-4 h-4 transition-all duration-300 ${isInWishlist(product.id) ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
            </motion.button>
            {/* Quick add */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`absolute bottom-4 left-4 right-4 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? 'bg-sage-500 text-white shadow-lg'
                  : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
              }`}
            >
              {added ? (
                <><Check className="w-4 h-4" /> Added</>
              ) : (
                <><ShoppingCart className="w-4 h-4" /> Add to Bag</>
              )}
            </motion.button>
          </div>
          {/* Info */}
          <div className="p-5">
            <p className="text-[11px] text-rose-400 font-medium uppercase tracking-wider mb-1.5">{product.category}</p>
            <h3 className="font-display font-semibold text-gray-800 text-sm line-clamp-1 group-hover:text-rose-500 transition-colors">{product.name}</h3>
            <div className="flex items-center justify-between mt-3">
              <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1">
                <div className="w-0.5 h-0.5 rounded-full bg-amber-400" />
                <span className="text-[11px] text-gray-400">{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
