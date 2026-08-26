import { Store } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Store className="w-6 h-6" />
              FreeBuff
            </div>
            <p className="text-sm text-gray-400">
              Modern e-commerce experience. Quality products, delivered with care.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
              <li><a href="/checkout" className="hover:text-white transition-colors">Checkout</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>support@freebuff.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Commerce St, Web City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FreeBuff. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
