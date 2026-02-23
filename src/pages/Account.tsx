import { motion } from "framer-motion";
import { User, Package, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { orders } from "@/data/mockData";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

        {/* Profile */}
        <div className="bg-card rounded-lg border p-6 mb-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
              <User className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
              <p className="text-muted-foreground text-sm">john@example.com</p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Package, label: "My Orders", count: orders.length },
            { icon: MapPin, label: "Addresses", count: 2 },
            { icon: CreditCard, label: "Payment Methods", count: 1 },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-lg border p-4 shadow-card flex items-center gap-3 hover:shadow-card-hover transition-shadow cursor-pointer">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.count} saved</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order history */}
        <h2 className="text-xl font-semibold text-foreground mb-4">Order History</h2>
        <div className="bg-card rounded-lg border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{order.id}</td>
                    <td className="py-3 px-4 text-foreground">{order.product}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4 font-medium text-foreground">${order.total}</td>
                    <td className="py-3 px-4"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/login">
            <Button variant="outline">Sign Out</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Account;
