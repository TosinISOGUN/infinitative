import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const Cart = () => {
  const { cart: cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="container py-8 max-w-full overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
            Shopping Cart
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-card rounded-lg border p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:items-center overflow-hidden">
                  <div className="flex gap-4 items-center flex-1 min-w-0">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-2 break-words text-sm sm:text-base leading-tight mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">{item.vendor}</p>
                      <p className="font-bold text-accent">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 font-medium">
                    <div className="flex items-center border rounded-md h-9 bg-background shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-24 shadow-card">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold mb-4"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  Secure Checkout Guaranteed
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg border">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add something to make us happy!</p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => navigate("/products")}>
              Shop Featured Products
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
