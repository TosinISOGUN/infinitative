import { useState } from "react";
import { motion } from "framer-motion";
import { Users, ShoppingCart, DollarSign, Store, Plus, Trash2, X } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { dashboardMetrics, purchases, vendors } from "@/data/mockData";

const AdminDashboard = () => {
  const [showAddVendor, setShowAddVendor] = useState(false);
  const m = dashboardMetrics.admin;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Overview</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Users" value={m.totalUsers.toLocaleString()} change={`${m.growth}%`} icon={Users} index={0} />
        <MetricCard title="Total Purchases" value={m.totalPurchases.toLocaleString()} icon={ShoppingCart} index={1} />
        <MetricCard title="Total Revenue" value={`$${(m.totalRevenue / 1000).toFixed(0)}K`} change="15.2%" icon={DollarSign} index={2} />
        <MetricCard title="Total Vendors" value={m.totalVendors} icon={Store} index={3} />
      </div>

      {/* Purchases Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Purchases</h2>
        <div className="bg-card rounded-lg border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{p.userName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{p.userId}</td>
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

      {/* Vendors Management */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Vendor Management</h2>
          <Button size="sm" onClick={() => setShowAddVendor(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-1" /> Add Vendor
          </Button>
        </div>
        <div className="bg-card rounded-lg border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Products</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{v.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{v.id}</td>
                    <td className="py-3 px-4 text-foreground">{v.products}</td>
                    <td className="py-3 px-4 font-medium text-foreground">${v.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4"><StatusBadge status={v.status} /></td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Vendor Modal */}
      {showAddVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg border shadow-xl w-full max-w-md p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add New Vendor</h3>
              <button onClick={() => setShowAddVendor(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddVendor(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Vendor Name</label>
                <input className="w-full h-10 px-4 rounded-md border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Enter vendor name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input type="email" className="w-full h-10 px-4 rounded-md border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="vendor@example.com" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddVendor(false)} className="flex-1">Cancel</Button>
                <Button type="submit" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">Add Vendor</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
