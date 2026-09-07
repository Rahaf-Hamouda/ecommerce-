import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6"
      >
        <AlertTriangle className="w-8 h-8 text-rose-400" />
      </motion.div>
      <h3 className="font-display text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-sm text-center">{message}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-blush-500 text-white font-medium px-6 py-3 rounded-full shadow-glow text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </motion.button>
      )}
    </div>
  );
}
