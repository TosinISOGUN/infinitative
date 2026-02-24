import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mockData";
import ReviewSection from "@/components/storefront/ReviewSection";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-accent hover:underline mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square rounded-lg overflow-hidden bg-secondary"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <span className="text-xs text-accent font-semibold uppercase tracking-wider">{product.category}</span>
          <h1 className="text-3xl font-bold text-foreground mt-2 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          <p className="text-sm text-muted-foreground mb-6">
            Sold by <span className="text-foreground font-medium">{product.vendor}</span>
          </p>

          <div className="flex gap-3 mb-8">
            <Button
              size="lg"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={() => product && addToCart(product)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => product && toggleWishlist(product)}
              className={cn("transition-colors", isFavorited && "bg-accent/10 border-accent text-accent")}
            >
              <Heart className={cn("h-4 w-4 transition-all", isFavorited && "fill-accent")} />
            </Button>
          </div>

          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-accent" />
              Free shipping on orders over $100
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <RotateCcw className="h-4 w-4 text-accent" />
              30-day return policy
            </div>
          </div>
        </motion.div>
      </div>

      {/* Review Section */}
      <ReviewSection
        rating={product.rating}
        totalReviews={product.reviews}
        reviews={product.recentReviews || []}
      />
    </div>
  );
};

export default ProductDetail;
