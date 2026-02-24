import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const isSaved = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="group block h-full">
        <div className="relative overflow-hidden rounded-lg bg-card shadow-card transition-all duration-300 group-hover:shadow-card-hover h-full flex flex-col">
          {/* Image */}
          <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-secondary block">
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={cn(
                    "h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center transition-colors",
                    isSaved ? "text-accent fill-accent hover:bg-accent hover:text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className={cn(
                    "h-10 w-10 rounded-full bg-card shadow-md flex items-center justify-center transition-colors",
                    inCart ? "text-accent fill-accent hover:bg-accent hover:text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <ShoppingCart className={cn("h-4 w-4", inCart && "fill-current")} />
                </button>
              </div>
            </div>
          </Link>

          {/* Info */}
          <Link to={`/product/${product.id}`} className="p-4 flex-1 flex flex-col">
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2 mt-auto">
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
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
