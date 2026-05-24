import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { totalItems: cartTotal } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop All", path: "/shop" },
    { name: "New Arrivals", path: "/collections/new-arrivals" },
    { name: "Clothing", path: "/collections/clothing" },
    { name: "Shoes", path: "/collections/shoes" },
    { name: "Accessories", path: "/collections/accessories" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button
            className="md:hidden mr-4 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.slice(0, 4).map((link) => (
              <Link key={link.path} href={link.path} className={`text-xs uppercase tracking-widest hover:text-primary transition-colors ${location === link.path ? "text-primary" : "text-foreground"}`}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="font-serif text-3xl md:text-4xl font-semibold tracking-wide text-center" data-testid="link-home">
          KIRA
        </Link>

        <div className="flex items-center justify-end flex-1 gap-4 md:gap-6">
          <button className="hidden md:block text-foreground hover:text-primary transition-colors" data-testid="button-search">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/wishlist" className="relative text-foreground hover:text-primary transition-colors" data-testid="link-wishlist">
            <Heart className="w-5 h-5" />
            {wishlistTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistTotal}
              </span>
            )}
          </Link>
          
          <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors" data-testid="link-cart">
            <ShoppingBag className="w-5 h-5" />
            {cartTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartTotal}
              </span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-card border-r border-border p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-2xl font-semibold tracking-wide">KIRA</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2"
                  data-testid="button-close-menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-lg uppercase tracking-wider ${location === link.path ? "text-primary" : "text-foreground"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-8 border-t border-border flex flex-col gap-4">
                <Link href="/contact" className="text-sm text-muted-foreground uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
