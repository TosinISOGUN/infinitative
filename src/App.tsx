import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StorefrontLayout } from "@/components/storefront/StorefrontLayout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import ScrollToTop from "./components/ScrollToTop";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner position="top-center" offset={20} />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Storefront */}
                <Route element={<StorefrontLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Route>

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Admin Dashboard */}
                <Route element={<DashboardLayout role="admin" />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/purchases" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminDashboard />} />
                  <Route path="/admin/analytics" element={<AdminDashboard />} />
                  <Route path="/admin/vendors" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminDashboard />} />
                  <Route path="/admin/settings" element={<AdminDashboard />} />
                </Route>

                {/* Vendor Dashboard */}
                <Route element={<DashboardLayout role="vendor" />}>
                  <Route path="/vendor" element={<VendorDashboard />} />
                  <Route path="/vendor/purchases" element={<VendorDashboard />} />
                  <Route path="/vendor/products" element={<VendorDashboard />} />
                  <Route path="/vendor/analytics" element={<VendorDashboard />} />
                  <Route path="/vendor/settings" element={<VendorDashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
