import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Store,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, path: "" },
  { label: "Purchases", icon: ShoppingCart, path: "/purchases" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Vendors", icon: Store, path: "/vendors", adminOnly: true },
  { label: "Users", icon: Users, path: "/users", adminOnly: true },
  { label: "Settings", icon: Settings, path: "/settings" },
];

interface DashboardSidebarProps {
  role: "admin" | "vendor";
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ role, isMobileOpen, onClose }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobileOpen && onClose) {
      onClose();
    }
  }, [location.pathname]);
  const basePath = role === "admin" ? "/admin" : "/vendor";

  const filteredItems = navItems.filter((item) => !item.adminOnly || role === "admin");

  return (
    <aside
      className={cn(
        // General
        "h-screen sticky top-0 bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border z-[60]",
        // Desktop behavior
        collapsed ? "lg:w-16" : "lg:w-64",
        // Mobile behavior (Overlay)
        "fixed lg:sticky inset-y-0 left-0",
        isMobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {(isMobileOpen || !collapsed) && (
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
            Infinitative
          </span>
        )}
        <div className="flex items-center gap-1">
          {/* Mobile close button */}
          {isMobileOpen && (
            <button
              onClick={onClose}
              className="lg:hidden h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 rounded-md items-center justify-center hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <span className="text-xs font-medium px-2 py-1 rounded bg-sidebar-primary text-sidebar-primary-foreground capitalize">
            {role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const fullPath = basePath + item.path;
          const isActive = location.pathname === fullPath || (item.path === "" && location.pathname === basePath);
          return (
            <Link
              key={item.label}
              to={fullPath}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200",
                isActive
                  ? "bg-accent/10 text-accent font-bold"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0 transition-transform", isActive && "scale-110")} />
              {(isMobileOpen || !collapsed) && <span className="tracking-wide">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
}
