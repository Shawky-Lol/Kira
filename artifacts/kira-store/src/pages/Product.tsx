import { PageLayout } from "@/components/layout/PageLayout";
import { useRoute, Link } from "wouter";
import { products } from "@/data/products";
import NotFound from "./not-found";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, ShoppingBag, ChevronRight, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/shared/ProductCard";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const { addItem } = useCart();
  const { hasItem, toggleItem } = useWishlist();
  
  if (!match) return <NotFound />;
  
  const product = products.find(p => p.id === params.id);
  
  if (!product) return <NotFound />;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isWishlisted = hasItem(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.isSale && product.originalPrice ? product.originalPrice : product.price,
      selectedSize,
      selectedColor,
      quantity: 1,
      image: product.images[0]
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <PageLayout>
      <div className="pt-24 pb-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 mb-8">
          <div className="flex items-center text-xs uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-foreground truncate">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-28 lg:self-start lg:h-[calc(100vh-8rem)]">
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 scrollbar-hide shrink-0">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    className={`relative aspect-[3/4] w-20 md:w-full shrink-0 border ${activeImageIndex === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'} transition-all`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              <div className="flex-1 bg-muted relative aspect-[3/4] overflow-hidden cursor-zoom-in">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-background text-foreground text-[10px] uppercase tracking-wider font-semibold py-1 px-2">New</span>
                  )}
                  {product.isSale && (
                    <span className="bg-destructive text-destructive-foreground text-[10px] uppercase tracking-wider font-semibold py-1 px-2">Sale</span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col py-4 lg:py-10">
              <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-5xl mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                  {product.isSale && product.originalPrice ? (
                    <>
                      <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                      <span className="text-2xl text-destructive font-medium">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-2xl">${product.price}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-primary' : 'opacity-30'}`} />
                    ))}
                  </div>
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="w-full h-px bg-border my-8"></div>

              {/* Selectors */}
              <div className="flex flex-col gap-8 mb-10">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold uppercase tracking-widest">Color</span>
                    <span className="text-sm text-muted-foreground">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border text-sm transition-colors ${
                          selectedColor === color 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-border text-foreground hover:border-foreground'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold uppercase tracking-widest">Size</span>
                    <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 flex items-center justify-center border text-sm transition-colors ${
                          selectedSize === size 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-border text-foreground hover:border-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-foreground text-background py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors flex justify-center items-center gap-2"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleItem(product.id)}
                  className="w-14 h-14 shrink-0 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                  data-testid="button-wishlist-detail"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-primary text-primary' : 'text-foreground'}`} />
                </button>
              </div>

              {/* Accordions */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-border">
                  <AccordionTrigger className="text-sm uppercase tracking-widest hover:no-underline">Product Details</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Designed in our Parisian atelier and crafted from premium materials. This piece represents our commitment to uncompromising quality and enduring style. Dry clean only.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-border">
                  <AccordionTrigger className="text-sm uppercase tracking-widest hover:no-underline">Shipping & Returns</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Complimentary express shipping on all orders over $500. Returns accepted within 14 days of delivery in original condition with tags attached.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 border-t border-border bg-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-serif text-3xl mb-12 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
