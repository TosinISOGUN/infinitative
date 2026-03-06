import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { products, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all");

  useEffect(() => {
    setSelectedCategory(categoryFilter || "all");
  }, [categoryFilter]);

  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.description?.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {searchQuery
            ? `Found ${filtered.length} products matching your search`
            : "Discover our curated collection of premium products"}
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl font-semibold mb-2">No products found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setSelectedCategory("all");
              window.history.pushState({}, "", "/products");
              window.location.reload(); // Simple way to clear search params for now
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
