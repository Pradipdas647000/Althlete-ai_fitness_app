
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl animate-pulse">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="font-headline font-bold text-xl text-primary/80">Syncing AIthlete Core...</h2>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-pearl">
      <Sidebar />
      <main className="flex-1 md:ml-64 relative">
        <header className="sticky top-0 z-40 h-20 bg-pearl/70 backdrop-blur-lg border-b px-8 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search metrics, workouts, meals..." 
                className="w-full bg-white/50 border-none rounded-2xl pl-10 h-11 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:scale-110 transition-transform">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] text-white rounded-full flex items-center justify-center font-bold">2</span>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.displayName || "Athlete"}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Member</p>
              </div>
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-pearl border shadow-sm">
                <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} />
                <AvatarFallback>{(user.displayName || "A").charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
