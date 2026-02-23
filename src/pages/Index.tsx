import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { products, categories } from "@/data/mockData";
import heroBanner from "@/assets/hero-banner.jpg";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Premium products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
        <div className="relative container h-full flex items-center justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg text-center md:text-left"
          >
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded mb-4">
              NEW COLLECTION
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4">
              Discover Premium Products
            </h1>
            <p className="text-primary-foreground/80 mb-6 text-lg">
              Shop the latest trends from trusted vendors worldwide.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/products">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features bar */}
      <section className="border-b bg-card">
        <div className="container py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="block p-4 rounded-lg border bg-card text-center hover:border-accent hover:shadow-card-hover transition-all duration-300"
              >
                <span className="text-sm font-medium text-foreground">{cat}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-sm text-accent hover:underline font-medium flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Have Items to Sell?</h2>
            <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto">
              Join our marketplace and reach thousands of customers worldwide.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Get Started as a Vendor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
