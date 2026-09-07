import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShoppingBag, Heart, Trash2 } from 'lucide-react';

const ToastContext = createContext();

const icons = {
  cart: ShoppingBag,
  wishlist: Heart,
  remove: Trash2,
  success: Check,
};

const colors = {
  cart: 'from-rose-500 to-blush-500',
  wishlist: 'from-blush-400 to-rose-400',
  remove: 'from-gray-500 to-gray-600',
  success: 'from-sage-400 to-sage-500',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'cart') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => {
            const Icon = icons[toast.type] || icons.success;
            const gradient = colors[toast.type] || colors.success;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="pointer-events-auto flex items-center gap-3 bg-white rounded-2xl border border-rose-100 shadow-elevated px-5 py-3.5 min-w-[260px]"
              >
                <div className={`p-2 bg-gradient-to-br ${gradient} rounded-xl shadow-sm flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800 flex-1">{toast.message}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
