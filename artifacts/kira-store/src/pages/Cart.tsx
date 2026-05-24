import { PageLayout } from "@/components/layout/PageLayout";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = items.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center min-h-[60vh] justify-center">
          <h1 className="font-serif text-4xl mb-6">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-10 max-w-md">Looks like you haven't added anything to your cart yet. Discover our latest collection.</p>
          <Link 
            href="/shop" 
            className="bg-foreground text-background px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-32">
        <h1 className="font-serif text-4xl md:text-5xl mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-border/50 group">
                {/* Mobile Layout */}
                <div className="md:hidden flex gap-4 w-full">
                  <div className="w-24 aspect-[3/4] bg-muted shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/product/${item.productId}`} className="font-medium hover:text-primary truncate pr-4">{item.name}</Link>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Color: {item.selectedColor} | Size: {item.selectedSize}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-medium">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex col-span-6 gap-6 items-center">
                  <div className="w-24 aspect-[3/4] bg-muted shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/product/${item.productId}`} className="font-medium hover:text-primary mb-1 text-lg">{item.name}</Link>
                    <p className="text-sm text-muted-foreground mb-3">Color: {item.selectedColor} | Size: {item.selectedSize}</p>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive flex items-center gap-1 w-fit"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex col-span-2 justify-center">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-muted transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-muted transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>

                <div className="hidden md:block col-span-2 text-right text-muted-foreground">
                  ${item.price}
                </div>

                <div className="hidden md:block col-span-2 text-right font-medium text-lg">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="w-full h-px bg-border my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-semibold uppercase tracking-widest">Total</span>
                  <span className="font-serif text-2xl">${total}</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Promo Code</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 bg-transparent border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                  <button className="px-4 py-2 border border-border text-sm hover:bg-muted transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <button 
                className="w-full bg-foreground text-background py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors flex justify-center items-center gap-2"
                onClick={() => alert("Checkout flow would begin here")}
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
