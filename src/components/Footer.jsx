import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      <div className="bg-gradient-to-b from-rose-50/50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌹</span>
                <span className="font-display text-2xl font-bold text-gradient">Elegance</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{t('footer.tagline')}</p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-gray-800 mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="text-gray-500 hover:text-rose-500 transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/products" className="text-gray-500 hover:text-rose-500 transition-colors">{t('nav.collection')}</Link></li>
                <li><Link to="/cart" className="text-gray-500 hover:text-rose-500 transition-colors">{t('nav.cart')}</Link></li>
                <li><Link to="/checkout" className="text-gray-500 hover:text-rose-500 transition-colors">{t('checkout.title')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-gray-800 mb-4">{t('footer.stayInTouch')}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('footer.subscribeDesc')}</p>
              <div className="flex gap-2">
                <input type="email" placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 bg-white border border-rose-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent" />
                <button className="bg-gradient-to-r from-rose-500 to-blush-500 text-white text-sm font-medium px-5 py-2.5 rounded-full">{t('footer.join')}</button>
              </div>
            </div>
          </div>
          <div className="border-t border-rose-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Elegance. All rights reserved.</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">{t('footer.madeWith')} <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> {t('footer.forYou')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
