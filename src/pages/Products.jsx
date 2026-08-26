import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <span className="text-rose-400 text-sm font-semibold tracking-widest uppercase">Explore</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-3">
          The Collection
        </h1>
        <p className="text-gray-400">Discover pieces you'll treasure</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-10"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search our collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-rose-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-rose-500 to-blush-500 text-white shadow-glow'
                  : 'bg-white text-gray-500 hover:text-rose-500 border border-rose-100 hover:border-rose-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">&#128269;</p>
          <p className="text-lg font-display text-gray-400">No pieces match your search.</p>
        </div>
      )}
    </div>
  );
}
