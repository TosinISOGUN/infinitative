import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-card shadow-card transition-all duration-300 group-hover:shadow-card-hover">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            {discount && (
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
            {/* Hover actions */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <button className="h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
