import { Link } from "wouter";
import { Product } from "@/data/types";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { hasItem, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const isWishlisted = hasItem(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.isSale && product.originalPrice ? product.originalPrice : product.price,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
      image: product.images[0]
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col gap-4 relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link href={`/product/${product.id}`} className="absolute inset-0 block z-10" data-testid={`link-product-${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-background text-foreground text-[10px] uppercase tracking-wider font-semibold py-1 px-2">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-destructive text-destructive-foreground text-[10px] uppercase tracking-wider font-semibold py-1 px-2">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-background/90 backdrop-blur-md text-foreground text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            data-testid={`button-quick-add-${product.id}`}
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="text-sm font-medium tracking-wide truncate">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {product.isSale && product.originalPrice ? (
            <>
              <span className="text-muted-foreground line-through">${product.originalPrice}</span>
              <span className="text-destructive font-medium">${product.price}</span>
            </>
          ) : (
            <span className="text-muted-foreground">${product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
