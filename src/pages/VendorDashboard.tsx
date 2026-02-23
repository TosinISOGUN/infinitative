import { motion } from "framer-motion";
import { Package, ShoppingCart, DollarSign, Clock } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { dashboardMetrics, purchases } from "@/data/mockData";

const VendorDashboard = () => {
  const m = dashboardMetrics.vendor;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's a summary of your store.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="My Products" value={m.totalProducts} icon={Package} index={0} />
        <MetricCard title="Total Orders" value={m.totalOrders} change={`${m.growth}%`} icon={ShoppingCart} index={1} />
        <MetricCard title="Revenue" value={`$${m.totalRevenue.toLocaleString()}`} change="12.3%" icon={DollarSign} index={2} />
        <MetricCard title="Pending Orders" value={m.pendingOrders} icon={Clock} index={3} />
      </div>

      {/* Recent orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
        <div className="bg-card rounded-lg border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.slice(0, 5).map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{p.userName}</td>
                    <td className="py-3 px-4 text-foreground">{p.product}</td>
                    <td className="py-3 px-4 text-muted-foreground">{p.date}</td>
                    <td className="py-3 px-4 font-medium text-foreground">${p.amount}</td>
                    <td className="py-3 px-4"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorDashboard;
