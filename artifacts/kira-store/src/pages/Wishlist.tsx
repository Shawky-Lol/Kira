import { PageLayout } from "@/components/layout/PageLayout";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";

export default function Wishlist() {
  const { itemIds, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  
  const wishlistedProducts = products.filter(p => itemIds.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(product => {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.isSale && product.originalPrice ? product.originalPrice : product.price,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
        quantity: 1,
        image: product.images[0]
      });
    });
  };

  if (wishlistedProducts.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center min-h-[60vh] justify-center">
          <h1 className="font-serif text-4xl mb-6">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-10 max-w-md">Save the pieces you love and come back to them anytime.</p>
          <Link 
            href="/shop" 
            className="bg-foreground text-background px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Explore Collection
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Wishlist</h1>
            <p className="text-muted-foreground">{wishlistedProducts.length} items saved</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={clearWishlist}
              className="px-6 py-3 border border-border text-sm font-bold uppercase tracking-widest hover:bg-muted transition-colors"
            >
              Clear All
            </button>
            <button 
              onClick={handleAddAllToCart}
              className="bg-foreground text-background px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add All to Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {wishlistedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
