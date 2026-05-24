import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-3xl font-semibold tracking-wide inline-block mb-6">
              KIRA
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Defining modern luxury with uncompromising quality and unapologetic style. The silence before a runway show.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/collections/new-arrivals" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/collections/clothing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Clothing</Link></li>
              <li><Link href="/collections/shoes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shoes</Link></li>
              <li><Link href="/collections/accessories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About KIRA</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/stores" className="text-sm text-muted-foreground hover:text-primary transition-colors">Boutiques</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex border-b border-border pb-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 placeholder:text-muted-foreground"
                data-testid="input-newsletter"
              />
              <button 
                type="submit" 
                className="text-sm font-medium uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                data-testid="button-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KIRA. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
