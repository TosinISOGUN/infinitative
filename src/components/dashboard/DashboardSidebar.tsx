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
} from "lucide-react";
import { useState } from "react";
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
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const basePath = role === "admin" ? "/admin" : "/vendor";

  const filteredItems = navItems.filter((item) => !item.adminOnly || role === "admin");

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">Infinitative</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
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
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
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
