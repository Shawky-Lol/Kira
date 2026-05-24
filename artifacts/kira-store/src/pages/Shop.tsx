import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCard } from "@/components/shared/ProductCard";
import { products } from "@/data/products";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Category } from "@/data/types";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    switch(sortOption) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'newest':
        return result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
      default:
        return result;
    }
  }, [selectedCategory, sortOption]);

  return (
    <PageLayout>
      <div className="pt-32 pb-24 container mx-auto px-4 md:px-6">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Shop All</h1>
          <p className="text-muted-foreground">The complete Kira collection. Elevated essentials and statement pieces designed for impact.</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-y border-border mb-12 gap-4">
          <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button 
              className={`text-sm uppercase tracking-wider whitespace-nowrap ${selectedCategory === 'all' ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            <button 
              className={`text-sm uppercase tracking-wider whitespace-nowrap ${selectedCategory === 'clothing' ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setSelectedCategory('clothing')}
            >
              Clothing
            </button>
            <button 
              className={`text-sm uppercase tracking-wider whitespace-nowrap ${selectedCategory === 'shoes' ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setSelectedCategory('shoes')}
            >
              Shoes
            </button>
            <button 
              className={`text-sm uppercase tracking-wider whitespace-nowrap ${selectedCategory === 'accessories' ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setSelectedCategory('accessories')}
            >
              Accessories
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="text-sm text-muted-foreground hidden md:block">
              {filteredProducts.length} Products
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border border-border pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-primary cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured" className="bg-card">Featured</option>
                <option value="newest" className="bg-card">Newest</option>
                <option value="price-low" className="bg-card">Price: Low to High</option>
                <option value="price-high" className="bg-card">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
