import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  itemIds: string[];
  toggleItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('kira_wishlist');
    if (savedWishlist) {
      try {
        setItemIds(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kira_wishlist', JSON.stringify(itemIds));
    }
  }, [itemIds, isLoaded]);

  const toggleItem = (id: string) => {
    setItemIds(prev => {
      if (prev.includes(id)) {
        toast({
          title: 'Removed from wishlist',
          description: 'Item has been removed from your wishlist.',
        });
        return prev.filter(itemId => itemId !== id);
      } else {
        toast({
          title: 'Added to wishlist',
          description: 'Item has been added to your wishlist.',
        });
        return [...prev, id];
      }
    });
  };

  const hasItem = (id: string) => itemIds.includes(id);

  const clearWishlist = () => {
    setItemIds([]);
  };

  return (
    <WishlistContext.Provider value={{ itemIds, toggleItem, hasItem, clearWishlist, totalItems: itemIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
