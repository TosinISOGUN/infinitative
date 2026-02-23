import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  role: "admin" | "vendor";
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground capitalize">{role} Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 pl-10 pr-4 rounded-md border bg-secondary/50 text-sm w-64 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold">
              {role === "admin" ? "A" : "V"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
