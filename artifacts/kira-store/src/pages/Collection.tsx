import { PageLayout } from "@/components/layout/PageLayout";
import { useRoute } from "wouter";
import { useEffect } from "react";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import NotFound from "./not-found";

export default function Collection() {
  const [match, params] = useRoute("/collections/:slug");
  
  if (!match) return <NotFound />;

  const collection = collections.find(c => c.slug === params.slug);
  
  if (!collection) return <NotFound />;

  const collectionProducts = products.filter(p => p.collections.includes(collection.slug));

  return (
    <PageLayout>
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={collection.heroImage} 
            alt={collection.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-3xl">
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Collection</span>
          <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight mb-6">
            {collection.name}
          </h1>
          <p className="text-lg text-foreground/80 tracking-wide font-light">
            {collection.description}
          </p>
        </div>
      </div>

      <div className="py-24 container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-10">
          <p className="text-muted-foreground text-sm uppercase tracking-wider">{collectionProducts.length} Items</p>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {collectionProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border">
            <h3 className="text-xl font-serif mb-2">No products found</h3>
            <p className="text-muted-foreground">Check back soon for updates to this collection.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
