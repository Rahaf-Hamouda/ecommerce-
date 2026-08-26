import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (product) => {
    setItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return items.some(item => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, isInWishlist, removeFromWishlist, clearWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
