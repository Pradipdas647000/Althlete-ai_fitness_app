
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Dumbbell, 
  Apple, 
  Settings, 
  Crown, 
  LogOut, 
  Zap,
  TrendingUp,
  BrainCircuit,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: BrainCircuit, label: "AI Coach", href: "/ai-coach" },
  { icon: Dumbbell, label: "Workouts", href: "/workouts" },
  { icon: Apple, label: "Nutrition", href: "/nutrition" },
  { icon: TrendingUp, label: "Performance", href: "/performance" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: ShieldAlert, label: "Admin Panel", href: "/admin", adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 hidden md:flex flex-col border-r bg-pearl/30 backdrop-blur-sm">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform transition-transform group-hover:rotate-12">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight">AIthlete</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold" 
                    : "text-muted-foreground hover:bg-white hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "" : "group-hover:text-primary")} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        {/* Premium Upgrade Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 relative overflow-hidden group hover:border-primary/40 transition-colors">
          <Crown className="w-10 h-10 text-primary/10 absolute -right-2 -bottom-2 transform rotate-12 group-hover:scale-110 transition-transform" />
          <div className="relative">
            <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Level Up</p>
            <p className="text-sm font-medium mb-3">Upgrade to unlock full AI capabilities</p>
            <Link href="/premium">
              <Badge className="bg-primary text-white hover:bg-primary/90 cursor-pointer">Explore Pro</Badge>
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:bg-white hover:text-foreground transition-all text-sm font-medium group"
            >
              <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-destructive hover:bg-destructive/10 transition-all text-sm font-medium group">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
