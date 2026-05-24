export type Category = 'clothing' | 'shoes' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  collections: string[];
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  isNew: boolean;
  isSale: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique id for cart item (productId + size + color)
  productId: string;
  name: string;
  price: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  image: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  productCount: number;
}
