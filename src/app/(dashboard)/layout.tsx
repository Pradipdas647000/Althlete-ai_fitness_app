
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Menu, Zap, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Streamlined loading state to feel faster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
          <h2 className="font-headline font-bold text-lg text-primary/80">Verifying Identity...</h2>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-pearl">
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen fixed left-0 top-0 hidden md:flex flex-col border-r bg-white/50 backdrop-blur-md">
        <Sidebar />
      </aside>

      <main className="flex-1 md:ml-64 relative">
        <header className="sticky top-0 z-40 h-16 md:h-20 bg-pearl/70 backdrop-blur-lg border-b px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>

            {/* Mobile Logo */}
            <Link href="/" className="md:hidden flex items-center gap-2">
               <Zap className="text-primary w-6 h-6 fill-current" />
            </Link>

            <div className="hidden sm:block flex-1 max-w-md ml-2 md:ml-0">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search lab..." 
                  className="w-full bg-white/50 border-none rounded-2xl pl-10 h-10 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative cursor-pointer hover:scale-110 transition-transform">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] text-white rounded-full flex items-center justify-center font-bold">2</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 md:pl-6 md:border-l">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold">{user.displayName || "Athlete"}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Member</p>
              </div>
              <Avatar className="w-8 h-8 md:w-10 md:h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-pearl border shadow-sm">
                <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} />
                <AvatarFallback>{(user.displayName || "A").charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
