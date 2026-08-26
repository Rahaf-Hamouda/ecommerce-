import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const liked = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-rose-50">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-rose-50 to-blush-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category pill */}
            <span className={`absolute top-4 glass text-rose-600 text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md ${
              isRtl ? 'left-4' : 'left-4'
            }`}>
              {product.category}
            </span>

            {/* Heart button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className={`absolute top-4 p-2.5 glass rounded-full shadow-md z-10 ${
                isRtl ? 'left-14' : 'right-4'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  liked ? 'text-rose-500 fill-rose-500 scale-110' : 'text-gray-400'
                }`}
              />
            </motion.button>

            {/* Quick add button on hover */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-rose-600 text-sm font-semibold py-3 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Quick Add ✨
            </motion.button>
          </div>
        </Link>

        <div className="p-5">
          <Link to={`/product/${product.id}`}>
            <h3 className={`font-display font-semibold text-gray-800 mb-1.5 line-clamp-1 group-hover:text-rose-600 transition-colors ${
              isRtl ? 'text-[14px]' : 'text-[15px]'
            }`}>
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-cream-400 text-cream-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
            <span className="text-[11px] text-gray-400 ml-1">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`font-bold text-gray-900 ${isRtl ? 'text-lg' : 'text-xl'}`}>
              ${product.price.toFixed(2)}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product)}
              className="bg-gradient-to-r from-rose-500 to-blush-500 hover:from-rose-600 hover:to-blush-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-glow hover:shadow-glow-blush"
            >
              {t('product.addToCart').replace('أضيفي للسلة', '+')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
