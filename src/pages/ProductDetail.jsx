import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart, Check, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <p className="text-6xl mb-4">🥀</p>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link to="/products" className="text-rose-500 hover:text-rose-600 transition-colors">
          ← Back to Collection
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-rose-500 mb-10 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-200/40 to-blush-200/40 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-rose-50 to-blush-50 rounded-3xl overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(!liked)}
            className="absolute top-6 right-6 p-3 glass rounded-full shadow-lg"
          >
            <Heart className={`w-5 h-5 transition-colors ${liked ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
          </motion.button>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-rose-400 text-sm font-semibold tracking-widest uppercase">{product.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-cream-400 text-cream-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-gray-500 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-10">
            <h3 className="font-display font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="grid grid-cols-2 gap-3">
              {product.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2.5 text-sm text-gray-600"
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-sage-400 to-sage-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="border-t border-rose-100 pt-8">
            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.inStock && (
                <span className="text-sm text-sage-600 font-medium bg-sage-50 px-3 py-1 rounded-full mb-1">
                  ✓ In Stock
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={added}
                whileHover={!added ? { scale: 1.03, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.4)' } : {}}
                whileTap={!added ? { scale: 0.97 } : {}}
                className={`flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 ${
                  added
                    ? 'bg-sage-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-rose-500 to-blush-500 text-white shadow-glow'
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Added ✨
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-10">You May Also Love</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {relatedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
