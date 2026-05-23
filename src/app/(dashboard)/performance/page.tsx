
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  BrainCircuit, 
  Sparkles, 
  Loader2, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Calendar,
  BarChart3
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { provideWeeklyPerformanceSummary, ProvideWeeklyPerformanceSummaryOutput } from "@/ai/flows/provide-weekly-performance-summary";

const volumeData = [
  { week: "Sep 1", vol: 12400 },
  { week: "Sep 8", vol: 13500 },
  { week: "Sep 15", vol: 14200 },
  { week: "Sep 22", vol: 13800 },
  { week: "Oct 1", vol: 15600 },
  { week: "Oct 8", vol: 17200 },
  { week: "Oct 15", vol: 18400 },
];

const mockWorkouts = [
  { date: "2024-10-24", workoutName: "Leg Day", durationMinutes: 65, exercises: ["Squats: 3 sets of 8 @ 100kg", "Leg Press: 3 sets of 12 @ 200kg"], caloriesBurned: 450 },
  { date: "2024-10-22", workoutName: "Upper Body", durationMinutes: 60, exercises: ["Bench Press: 3 sets of 10 @ 80kg"], caloriesBurned: 380 },
];

export default function PerformancePage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const result = await provideWeeklyPerformanceSummary({
        userId: "demo-user",
        weeklyWorkoutData: mockWorkouts,
        userGoals: "Increase leg strength and overall volume consistency."
      });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">High-fidelity bio-feedback and training volume trends.</p>
        </div>
        <Button 
          onClick={handleGenerateSummary} 
          disabled={loading}
          className="rounded-xl bg-primary hover:bg-primary/90 gap-2 font-bold"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate AI Recap
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <PerformanceCard label="Avg. Weekly Volume" value="18,400" unit="kg" trend="+12.4%" positive={true} />
        <PerformanceCard label="Recovery Score" value="84" unit="%" trend="-2%" positive={false} />
        <PerformanceCard label="Intensity Index" value="7.8" unit="/10" trend="+0.5" positive={true} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-xl">Training Volume Trend</CardTitle>
              <CardDescription>Total weight moved per week over the last 2 months</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary font-bold">Volume (kg)</Badge>
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#476BF4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#476BF4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="vol" stroke="#476BF4" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl border-none shadow-xl flex flex-col overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              AI Performance Recap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-grow space-y-6">
            {summary ? (
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap italic">
                {summary}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-pearl rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <p className="text-sm text-muted-foreground max-w-[200px]">Generate a summary to get deep AI insights into your training patterns.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pb-8">
        <Card className="glass-card rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Consistency Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-md transition-all hover:scale-110 cursor-help ${
                    i % 3 === 0 ? 'bg-primary' : i % 5 === 0 ? 'bg-primary/40' : 'bg-pearl'
                  }`}
                  title={`Activity Level: ${i % 3 === 0 ? 'High' : 'Low'}`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded bg-pearl" />
                <div className="w-2 h-2 rounded bg-primary/40" />
                <div className="w-2 h-2 rounded bg-primary" />
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Power Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Power", val: 85 },
                { name: "Endurance", val: 62 },
                { name: "Flex", val: 45 },
                { name: "Speed", val: 78 }
              ]}>
                <XAxis dataKey="name" hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={40}>
                   <Cell fill="#476BF4" />
                   <Cell fill="#3099D1" />
                   <Cell fill="#10b981" />
                   <Cell fill="#476BF4" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PerformanceCard({ label, value, unit, trend, positive }: any) {
  return (
    <Card className="glass-card rounded-3xl border-none shadow-lg overflow-hidden group hover:translate-y-[-4px] transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{label}</p>
          <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${positive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
