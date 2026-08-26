import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Truck, RotateCcw, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const features = [
    { icon: Truck, title: t('features.shipping'), desc: t('features.shippingDesc'), color: 'from-rose-400 to-blush-400' },
    { icon: Shield, title: t('features.secure'), desc: t('features.secureDesc'), color: 'from-blush-400 to-rose-400' },
    { icon: RotateCcw, title: t('features.returns'), desc: t('features.returnsDesc'), color: 'from-rose-400 to-cream-400' },
    { icon: Heart, title: t('features.love'), desc: t('features.loveDesc'), color: 'from-blush-400 to-cream-400' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-cream-50 to-blush-50" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl float" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-blush-200/30 rounded-full blur-3xl float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cream-200/20 rounded-full blur-3xl pulse-soft" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className={isRtl ? 'lg:order-2' : ''}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-rose-500 text-xs font-semibold px-4 py-2 rounded-full border border-rose-100 shadow-sm mb-8 ${isRtl ? 'text-sm' : ''}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('hero.badge')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`font-display font-bold text-gray-900 mb-6 ${
                  isRtl
                    ? 'text-4xl md:text-5xl leading-[1.6]'
                    : 'text-5xl md:text-7xl leading-[1.05] tracking-elegant'
                }`}
              >
                {t('hero.title1')}
                <span className="block text-gradient italic">{t('hero.title2')}</span>
                <span className="block text-gray-900">{t('hero.title3')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`text-gray-500 mb-10 max-w-md ${
                  isRtl ? 'text-base leading-[2]' : 'text-lg leading-[1.8]'
                }`}
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-rose-500 to-blush-500 text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-glow"
                  >
                    {t('hero.shopNow')} <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                  </motion.button>
                </Link>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border-2 border-rose-100 text-gray-700 font-semibold px-8 py-4 rounded-full hover:border-rose-300 transition-colors"
                  >
                    {t('hero.viewAll')}
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Hero Image Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: isRtl ? -60 : 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative hidden lg:block ${isRtl ? 'lg:order-1' : ''}`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 to-blush-200 rounded-3xl blur-2xl opacity-40" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className={isRtl ? 'space-y-4 mt-10' : 'space-y-4'}>
                    <div className="rounded-3xl overflow-hidden shadow-elevated aspect-[3/4]">
                      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=550&fit=crop" alt="Headphones" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-elevated aspect-square">
                      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop" alt="Coffee" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className={isRtl ? 'space-y-4' : 'space-y-4 mt-10'}>
                    <div className="rounded-3xl overflow-hidden shadow-elevated aspect-square">
                      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" alt="Watch" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-elevated aspect-[3/4]">
                      <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=550&fit=crop" alt="Backpack" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-rose-300 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2.5 bg-rose-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="relative bg-white border-y border-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`p-3 bg-gradient-to-br ${f.color} rounded-2xl shadow-sm`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-semibold text-gray-800 ${isRtl ? 'text-[13px]' : 'text-sm'}`}>{f.title}</p>
                  <p className={`text-gray-400 ${isRtl ? 'text-[11px]' : 'text-[11px]'}`}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-rose-400 text-xs font-semibold tracking-wide-elegant uppercase">{t('home.ourPicks')}</span>
          <h2 className={`font-display font-bold text-gray-900 mt-3 mb-4 ${
            isRtl
              ? 'text-3xl md:text-4xl leading-[1.5]'
              : 'text-4xl md:text-5xl tracking-elegant'
          }`}>
            {t('home.featuredCollection')}
          </h2>
          <p className={`text-gray-400 max-w-lg mx-auto ${isRtl ? 'text-base leading-[2]' : 'text-base leading-relaxed'}`}>
            {t('home.featuredDesc')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-rose-500 to-blush-500 text-white shadow-glow'
                  : 'bg-white text-gray-500 hover:text-rose-500 border border-rose-100 hover:border-rose-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-300">
            <p className={`font-display ${isRtl ? 'text-base' : 'text-lg'}`}>{t('products.noResults')}</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-blush-500 to-rose-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={`font-display font-bold text-white mb-4 ${
              isRtl
                ? 'text-3xl md:text-4xl leading-[1.5]'
                : 'text-4xl md:text-5xl tracking-elegant'
            }`}>
              {t('home.elevateTitle')}
            </h2>
            <p className="text-rose-100 mb-10 max-w-md mx-auto">
              {t('home.elevateDesc')}
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rose-600 font-bold px-10 py-4 rounded-full shadow-lg inline-flex items-center gap-2"
              >
                {t('home.exploreNow')} <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
