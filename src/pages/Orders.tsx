import { motion } from "framer-motion";
import { Package, Search, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { orders } from "@/data/mockData";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Link } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  return (
    <div className="container py-8 max-w-5xl overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Orders</h1>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-lg border shadow-card overflow-hidden">
                <div className="bg-secondary/30 px-4 sm:px-6 py-4 border-b">
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-8">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Order Placed</p>
                      <p className="text-sm font-medium text-foreground">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Total</p>
                      <p className="text-sm font-medium text-foreground">${order.total}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Status</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="col-span-2 sm:col-span-1 sm:ml-auto">
                      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Order #</p>
                      <p className="text-sm font-medium text-foreground font-mono">{order.id}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded bg-accent/5 flex items-center justify-center border shrink-0">
                      <Package className="h-8 w-8 sm:h-10 sm:w-10 text-accent/20" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{order.product}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Track Order</Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none" asChild>
                      <Link to="/products">Re-order</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-8">You haven't placed any orders yet.</p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
