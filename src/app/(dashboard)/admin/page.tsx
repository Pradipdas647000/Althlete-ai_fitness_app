
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  CreditCard, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  MoreHorizontal,
  ShieldCheck,
  Search,
  Filter
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const revenueData = [
  { month: "Jan", rev: 12000 },
  { month: "Feb", rev: 14500 },
  { month: "Mar", rev: 13800 },
  { month: "Apr", rev: 19000 },
  { month: "May", rev: 25000 },
  { month: "Jun", rev: 22000 },
  { month: "Jul", rev: 31000 },
];

const users = [
  { id: "1", name: "Sarah Johnson", status: "Active", plan: "Pro", joined: "Oct 12, 2023", activity: "High" },
  { id: "2", name: "Mike Thompson", status: "Inactive", plan: "Free", joined: "Nov 02, 2023", activity: "None" },
  { id: "3", name: "David Chen", status: "Active", plan: "Pro", joined: "Dec 15, 2023", activity: "Medium" },
  { id: "4", name: "Elena Rodriguez", status: "Active", plan: "Pro", joined: "Jan 05, 2024", activity: "High" },
  { id: "5", name: "Robert Wilson", status: "Active", plan: "Free", joined: "Feb 20, 2024", activity: "Medium" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Founder Admin Terminal</h1>
          <p className="text-muted-foreground">Monitor system-wide health and revenue metrics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2"><Filter className="w-4 h-4" /> Filters</Button>
          <Button className="rounded-xl bg-primary hover:bg-primary/90">Export Report</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <AdminStatsCard label="Total Users" value="12,450" trend="+15%" icon={<Users className="text-cobalt" />} />
        <AdminStatsCard label="Monthly Revenue" value="$31,200" trend="+24%" icon={<CreditCard className="text-sky" />} />
        <AdminStatsCard label="System Load" value="12.4%" trend="-2%" icon={<Activity className="text-emerald-500" />} />
        <AdminStatsCard label="Active Pro" value="4,820" trend="+8%" icon={<ShieldCheck className="text-primary" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-xl">MRR Growth</CardTitle>
              <CardDescription>Monthly Recurring Revenue trend for 2024</CardDescription>
            </div>
            <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100 font-bold uppercase tracking-widest text-[10px]">On Target</Badge>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Line type="monotone" dataKey="rev" stroke="#476BF4" strokeWidth={4} dot={{r: 6, fill: '#476BF4', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Recent Subscriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pearl border flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-bold">John Doe</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Pro Plan • $19.00</p>
                </div>
                <div className="text-[10px] text-muted-foreground">2m ago</div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-primary hover:text-primary/80 text-xs font-bold uppercase tracking-widest">View All Transactions</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card rounded-3xl border-none shadow-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50">
          <CardTitle className="font-headline text-xl">User Management</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-pearl border-none rounded-xl pl-10 pr-4 h-9 text-xs outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold text-xs uppercase tracking-widest pl-8">User</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest">Plan</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest">Joined</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest">Activity</TableHead>
              <TableHead className="text-right pr-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-pearl/50">
                <TableCell className="font-bold pl-8 py-4">{user.name}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "default" : "secondary"} className={`rounded-full px-3 text-[10px] ${user.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-bold ${user.plan === 'Pro' ? 'text-primary' : 'text-muted-foreground'}`}>{user.plan}</span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{user.joined}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.activity === 'High' ? 'bg-emerald-500' : user.activity === 'Medium' ? 'bg-orange-400' : 'bg-slate-300'}`} />
                    <span className="text-xs">{user.activity}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function AdminStatsCard({ label, value, trend, icon }: any) {
  return (
    <Card className="glass-card rounded-3xl border-none shadow-lg group hover:bg-white transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-pearl rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            {trend}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
