import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Star
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { dashboardMetrics, purchases, products, revenueHistory } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const VendorDashboard = () => {
  const m = dashboardMetrics.vendor;
  const vendorProducts = products.filter(p => p.vendor === "AudioTech"); // Mocking for AudioTech

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Vendor Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, AudioTech! Managing your store is easy.</p>
        </div>
        <Button className="w-full lg:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 h-11 lg:h-10 font-bold">
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 w-full sm:w-auto overflow-x-auto no-scrollbar scroll-smooth flex sm:inline-flex">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
          <TabsTrigger value="products" className="flex-1 sm:flex-none">My Products</TabsTrigger>
          <TabsTrigger value="orders" className="flex-1 sm:flex-none">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 outline-none">
          {/* Metrics */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="My Products" value={m.totalProducts} icon={Package} index={0} />
            <MetricCard title="Total Orders" value={m.totalOrders} change={`${m.totalOrdersChange}%`} icon={ShoppingCart} index={1} />
            <MetricCard title="Revenue" value={`$${m.totalRevenue.toLocaleString()}`} change={`${m.totalRevenueChange}%`} icon={DollarSign} index={2} />
            <MetricCard title="Pending" value={m.pendingOrders} icon={Clock} index={3} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-card border rounded-2xl p-4 sm:p-6 shadow-sm min-w-0">
              <h3 className="text-lg font-bold mb-6">Revenue Growth</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueHistory}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #F3F4F6',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Products Small List */}
            <div className="bg-card border rounded-2xl p-4 sm:p-6 shadow-sm min-w-0">
              <h3 className="text-lg font-bold mb-6">Top Selling</h3>
              <div className="space-y-4">
                {vendorProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-secondary">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.reviews} sales</p>
                    </div>
                    <div className="text-sm font-bold">${product.price}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">View All Analytics</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="outline-none">
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 h-10" placeholder="Search my products..." />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Filter</Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Export</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="text-left py-4 px-4 sm:px-6 font-semibold text-muted-foreground min-w-[160px]">Product</th>
                    <th className="hidden lg:table-cell text-left py-4 px-6 font-semibold text-muted-foreground">Category</th>
                    <th className="text-left py-4 px-4 sm:px-6 font-semibold text-muted-foreground">Price</th>
                    <th className="hidden md:table-cell text-left py-4 px-6 font-semibold text-muted-foreground">Rating</th>
                    <th className="hidden sm:table-cell text-left py-4 px-6 font-semibold text-muted-foreground">Sales</th>
                    <th className="text-right py-4 px-4 sm:px-6 font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorProducts.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/10 transition-colors group">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden bg-secondary shadow-sm flex-shrink-0">
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-foreground truncate block text-sm sm:text-base">{p.name}</span>
                            <span className="lg:hidden text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{p.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell py-4 px-6 text-muted-foreground">{p.category}</td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-accent text-sm sm:text-base">${p.price}</td>
                      <td className="hidden md:table-cell py-4 px-6">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{p.rating}</span>
                          <Star className="h-3 w-3 fill-accent text-accent" />
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-4 px-6 text-muted-foreground">{p.reviews}</td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex justify-end gap-1.5 sm:gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 bg-secondary/50 lg:bg-transparent"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 text-destructive bg-destructive/10 lg:bg-transparent"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="outline-none">
          <div className="bg-card border rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Orders Management</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8">
              Track and fulfill your customer orders efficiently from this dedicated space.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Refresh Orders List</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDashboard;

