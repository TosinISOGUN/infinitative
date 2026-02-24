import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const steps = [
  { id: "shipping", title: "Shipping", icon: <MapPin className="h-5 w-5" /> },
  { id: "payment", title: "Payment", icon: <CreditCard className="h-5 w-5" /> },
  { id: "review", title: "Review", icon: <CheckCircle className="h-5 w-5" /> },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handlePlaceOrder();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/cart");
    }
  };

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/order-success");
  };

  if (cart.length === 0 && currentStep !== 2) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container py-6 sm:py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="flex-1">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 relative px-2">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -translate-y-1/2 z-0" />
            {steps.map((step, idx) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${idx <= currentStep
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border text-muted-foreground"
                    }`}
                >
                  {/* Scale icon for mobile */}
                  <div className="scale-75 sm:scale-100">
                    {step.icon}
                  </div>
                </div>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${idx <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card border rounded-2xl p-5 sm:p-10 shadow-sm"
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Luxury Ave" className="h-11" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" className="h-11" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                  <div className="grid gap-4">
                    <label className="flex items-center justify-between p-4 rounded-xl border cursor-pointer hover:border-accent group transition-colors bg-secondary/20">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full border-2 border-accent flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                        </div>
                        <span className="font-semibold">Credit Card / Debit Card</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-10 bg-muted rounded" />
                        <div className="h-6 w-10 bg-muted rounded" />
                      </div>
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-xl border cursor-not-allowed opacity-50 bg-secondary/10">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-4 rounded-full border-2" />
                        <span className="font-semibold">PayPal (Coming Soon)</span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="JOHN DOE" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="h-11" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="h-11" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center p-3 rounded-lg border bg-secondary/10">
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.quantity} x ${item.price}</p>
                        </div>
                        <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Shipping to:</span>
                      <span className="font-semibold">John Doe, New York, NY 10001</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-2"><CreditCard className="h-4 w-4" /> Paid via:</span>
                      <span className="font-semibold">Visa ending in 4242</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <ShieldCheck className="h-6 w-6 text-accent shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By clicking "Place Order", you agree to our terms of service and privacy policy.
                      Your payment information is processed securely.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-between mt-12 gap-4 pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="h-12 px-6 w-full sm:w-auto"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {currentStep === 0 ? "Back to Cart" : "Previous Step"}
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-bold w-full sm:w-auto"
                >
                  {currentStep === steps.length - 1 ? (
                    "Place Order"
                  ) : (
                    <>Next Step <ChevronRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:w-96">
          <div className="bg-card border rounded-2xl p-8 sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Package className="h-5 w-5" /> Order Summary
            </h3>
            <div className="space-y-4 text-sm mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original Price</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Savings</span>
                <span className="text-green-500">-$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Store Coupon</span>
                <span className="text-green-500">-$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-accent">${total.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-6">
              Tax calculated at next step if applicable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
