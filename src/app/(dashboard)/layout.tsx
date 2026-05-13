
import { Sidebar } from "@/components/dashboard/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                <p className="text-sm font-bold">Alex Rivers</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Premium Member</p>
              </div>
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-pearl border shadow-sm">
                <AvatarImage src="https://picsum.photos/seed/alex/100/100" />
                <AvatarFallback>AR</AvatarFallback>
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
