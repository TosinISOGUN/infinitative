import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Infinitative</h3>
            <p className="text-sm text-primary-foreground/70">
              Your premium marketplace for quality products from trusted vendors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/products" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">Help Center / FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">Our Values</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Sell with Us</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/login" className="hover:text-accent transition-colors">Become a Vendor</Link></li>
              <li><Link to="/login" className="hover:text-accent transition-colors">Vendor Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          © 2026 Infinitative. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
