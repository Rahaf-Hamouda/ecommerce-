import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, Heart, Trash2, X } from 'lucide-react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  cart: ShoppingCart,
  wishlist: Heart,
  remove: Trash2,
  success: Check,
};

const colors = {
  cart: 'from-rose-500 to-blush-500',
  wishlist: 'from-blush-500 to-rose-400',
  remove: 'from-gray-400 to-gray-500',
  success: 'from-emerald-500 to-emerald-400',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => {
            const Icon = icons[toast.type] || Check;
            const color = colors[toast.type] || colors.success;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="bg-white rounded-2xl border border-rose-50 shadow-elevated p-4 flex items-center gap-3"
              >
                <div className={`p-2 bg-gradient-to-br ${color} rounded-xl`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm text-gray-700 font-medium flex-1">{toast.message}</p>
                <button onClick={() => removeToast(toast.id)} className="p-1 hover:bg-rose-50 rounded-full transition-colors">
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
