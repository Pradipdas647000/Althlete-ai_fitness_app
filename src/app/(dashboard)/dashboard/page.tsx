
"use client";

import { useMemo } from "react";
import { useUser, useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Weight, 
  Trophy, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Activity,
  Heart,
  BrainCircuit,
  Info
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const performanceData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 59 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 56 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 72 },
];

const activityData = [
  { name: "Strength", value: 45, color: "#476BF4" },
  { name: "Cardio", value: 30, color: "#3099D1" },
  { name: "Yoga", value: 15, color: "#10b981" },
  { name: "Rest", value: 10, color: "#64748b" },
];

export default function DashboardPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { data: profile, loading: profileLoading } = useDoc(user && db ? doc(db, "users", user.uid) : null);

  const bmiData = useMemo(() => {
    if (!profile?.weightKg || !profile?.heightCm) return null;
    const heightInMeters = profile.heightCm / 100;
    const bmi = (profile.weightKg / (heightInMeters * heightInMeters)).toFixed(1);
    
    let category = "Healthy";
    let color = "text-emerald-500";
    const bmiVal = parseFloat(bmi);
    if (bmiVal < 18.5) { category = "Underweight"; color = "text-sky"; }
    else if (bmiVal >= 25 && bmiVal < 30) { category = "Overweight"; color = "text-orange-500"; }
    else if (bmiVal >= 30) { category = "Obese"; color = "text-rose-500"; }
    
    return { value: bmi, category, color };
  }, [profile]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
            Welcome Back, {user?.displayName?.split(' ')[0] || "Athlete"}
          </h1>
          <p className="text-muted-foreground">Your performance is up 12% compared to last week. Keep it up!</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-white px-3 py-1 text-xs font-bold gap-2">
            <Calendar className="w-3 h-3 text-primary" />
            Active Period: Oct 20 - Oct 27
          </Badge>
          <Badge className="bg-primary text-white px-3 py-1 text-xs font-bold gap-2">
            <Trophy className="w-3 h-3" />
            Day 14 Streak
          </Badge>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          icon={<Flame className="text-orange-500" />}
          label="Calories Burned"
          value="12,450"
          unit="kcal"
          trend="+8.2%"
          positive={true}
        />
        <StatsCard 
          icon={<Weight className="text-cobalt" />}
          label="Current Weight"
          value={profile?.weightKg ? String(profile.weightKg) : "--"}
          unit="kg"
          trend={profile?.weightKg ? "-0.4kg" : "No Data"}
          positive={true}
        />
        <StatsCard 
          icon={<Activity className="text-sky" />}
          label="Avg. Heart Rate"
          value="68"
          unit="bpm"
          trend="-2%"
          positive={true}
        />
        <StatsCard 
          icon={<Heart className="text-rose-500" />}
          label="Daily Progress"
          value="85"
          unit="%"
          trend="+15%"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <Card className="lg:col-span-2 glass-card rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-xl">Activity Intensity</CardTitle>
              <CardDescription>Daily performance volume overview</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">Weekly</Badge>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#476BF4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#476BF4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  labelStyle={{fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="value" stroke="#476BF4" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Performance Summary */}
        <Card className="glass-card rounded-3xl border-none shadow-xl flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              AI Performance Recap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow">
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 italic text-sm text-muted-foreground leading-relaxed">
              "You've shown exceptional consistency in strength training this week. Your explosive power in squats increased by 5%. Focus on mobility tomorrow to optimize recovery for your upcoming long run."
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Goals Completion</h4>
              <GoalItem label="Strength Training" progress={90} />
              <GoalItem label="Protein Intake" progress={75} />
              <GoalItem label="Sleep Quality" progress={60} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl">BMI & Body Composition</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-8 py-4">
            {bmiData ? (
              <>
                <div className="w-32 h-32 rounded-full border-8 border-primary flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{bmiData.value}</span>
                  <span className={`text-[10px] font-bold uppercase ${bmiData.color}`}>{bmiData.category}</span>
                </div>
                <div className="flex-1 w-full space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Biometric Goal</span>
                    <span className="font-bold">21.5 target</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex items-center gap-2 p-3 bg-pearl rounded-xl text-xs text-muted-foreground">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    <span>Based on your height of {profile?.heightCm}cm and weight of {profile?.weightKg}kg.</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full py-6 text-center space-y-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Biometrics Incomplete</p>
                  <p className="text-sm text-muted-foreground max-w-[250px]">Please update your height and weight in settings to calculate your current BMI.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Activity Mix</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ icon, label, value, unit, trend, positive }: any) {
  return (
    <Card className="glass-card rounded-3xl border-none shadow-lg overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
      <CardContent className="p-6 relative">
        <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className={`absolute top-6 right-6 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${positive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

function GoalItem({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span>{label}</span>
        <span className="text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}
