import { PageLayout } from "@/components/layout/PageLayout";
import { Marquee } from "@/components/shared/Marquee";
import { ProductCard } from "@/components/shared/ProductCard";
import { products } from "@/data/products";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/kira-hero-1/1920/1080" 
            alt="Kira Editorial Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 max-w-4xl"
          >
            The New Definition <br/> <span className="text-primary italic">of Luxury</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/80 max-w-lg mb-10 tracking-wide font-light"
          >
            Uncompromising quality. Unapologetic style.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link 
              href="/shop" 
              className="bg-foreground text-background px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              data-testid="link-hero-shop"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* Featured Products Grid */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Latest Arrivals</h2>
            <p className="text-muted-foreground max-w-md">Discover the pieces defining this season. Crafted with meticulous attention to detail.</p>
          </div>
          <Link 
            href="/collections/new-arrivals" 
            className="text-sm font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Editorial Split Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[700px] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/kira-campaign-1/800/1200" 
                alt="Campaign Image" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-12 md:p-24 bg-[#0a0a0a]">
              <span className="text-primary text-xs font-bold uppercase tracking-widest mb-6">The Atelier</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Mastery in <br/><span className="italic">Motion</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
                Every stitch is intentional. Every fabric carefully sourced from the finest mills in Italy and Japan. We don't make clothes; we craft armor for the modern woman.
              </p>
              <div>
                <Link 
                  href="/about" 
                  className="inline-block text-sm font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  Discover Our Craft
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
