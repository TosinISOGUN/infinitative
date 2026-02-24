import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Store,
  Plus,
  Trash2,
  X,
  Search,
  Filter,
  ShieldCheck,
  UserPlus,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMetrics, purchases, vendors, allUsers, revenueHistory } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AdminDashboard = () => {
  const [showAddVendor, setShowAddVendor] = useState(false);
  const m = dashboardMetrics.admin;

  const COLORS = ['#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

  const categoryData = [
    { name: 'Electronics', value: 45 },
    { name: 'Fashion', value: 25 },
    { name: 'Gadgets', value: 20 },
    { name: 'Home', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Control Center</h1>
          <p className="text-sm text-muted-foreground">Global overview and management for Infinitative.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><BarChart3 className="h-4 w-4 mr-2" /> Reports</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <UserPlus className="h-4 w-4 mr-2" /> Invite Admin
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 outline-none">
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Users" value={m.totalUsers.toLocaleString()} change={`${m.growth}%`} icon={Users} index={0} />
            <MetricCard title="Total Purchases" value={m.totalPurchases.toLocaleString()} icon={ShoppingCart} index={1} />
            <MetricCard title="Total Revenue" value={`$${(m.totalRevenue / 1000).toFixed(0)}K`} change="15.2%" icon={DollarSign} index={2} />
            <MetricCard title="Total Vendors" value={m.totalVendors} icon={Store} index={3} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Growth Bar Chart */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Monthly Order Growth</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <RechartsTooltip
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #F3F4F6',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="total" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Pie Chart */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Sales by Category</h3>
              <div className="h-[300px] w-full flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-1/3 space-y-2">
                  {categoryData.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Purchases Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
            <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-secondary/30">
                      <th className="text-left py-4 px-6 font-semibold text-muted-foreground">User</th>
                      <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Product</th>
                      <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Amount</th>
                      <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/10 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-foreground">{p.userName}</div>
                          <div className="text-xs text-muted-foreground">{p.userId}</div>
                        </td>
                        <td className="py-4 px-6 text-foreground">{p.product}</td>
                        <td className="py-4 px-6 text-muted-foreground">{p.date}</td>
                        <td className="py-4 px-6 font-bold text-foreground">${p.amount}</td>
                        <td className="py-4 px-6"><StatusBadge status={p.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="vendors" className="outline-none">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Active Vendors</h2>
            <Button size="sm" onClick={() => setShowAddVendor(true)} className="bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent">
              <Plus className="h-4 w-4 mr-1" /> Add Vendor
            </Button>
          </div>
          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Products</th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Revenue</th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-4 px-6 font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v) => (
                    <tr key={v.id} className="border-b last:border-0 hover:bg-secondary/10 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-bold text-foreground">{v.name}</div>
                        <div className="text-xs text-muted-foreground">{v.id}</div>
                      </td>
                      <td className="py-4 px-6 text-foreground font-medium">{v.products} items</td>
                      <td className="py-4 px-6 font-bold text-foreground">${v.revenue.toLocaleString()}</td>
                      <td className="py-4 px-6"><StatusBadge status={v.status} /></td>
                      <td className="py-4 px-6 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="outline-none">
          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 h-10" placeholder="Search users by name or id..." />
              </div>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">User</th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">Role</th>
                    <th className="text-right py-4 px-6 font-semibold text-muted-foreground">Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-secondary/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.id}</div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-6 lowercase">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent font-bold">
                          <ShieldCheck className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Vendor Modal */}
      {showAddVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border shadow-xl w-full max-w-md p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Onboard New Vendor</h3>
              <button onClick={() => setShowAddVendor(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddVendor(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Business Name</label>
                <input className="w-full h-11 px-4 rounded-xl border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Enter business name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-1">Professional Email</label>
                <input type="email" className="w-full h-11 px-4 rounded-xl border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="vendor@business.com" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowAddVendor(false)} className="flex-1 rounded-xl h-11">Cancel</Button>
                <Button type="submit" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-11 font-bold shadow-lg shadow-accent/20">Send Invite</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

