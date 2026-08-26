import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RotateCcw, Headphones } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
    { icon: RotateCcw, title: 'Easy Returns', desc: '30-day returns' },
    { icon: Headphones, title: '24/7 Support', desc: 'We\'re here to help' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ✨ New Collection 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Modern
              <span className="block text-accent-200">Essentials</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-lg">
              Curated products for the modern lifestyle. Quality meets design in every piece.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-3 bg-primary-50 rounded-xl">
                  <f.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Hand-picked products that combine style, quality, and functionality
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No products found in this category.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Upgrade Your Style?
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Join thousands of satisfied customers who've found their perfect products.
          </p>
          <Link
            to="/products"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            Browse All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
