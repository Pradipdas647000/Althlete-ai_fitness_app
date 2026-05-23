
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Play, 
  History, 
  Plus, 
  Clock, 
  Flame, 
  CheckCircle2,
  MoreVertical,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const currentWorkouts = [
  {
    id: "w1",
    name: "Hypertrophy Upper A",
    focus: "Chest, Shoulders, Triceps",
    duration: "65 min",
    intensity: "High",
    progress: 100,
    lastDone: "2 days ago",
    exercises: 8
  },
  {
    id: "w2",
    name: "Posterior Chain focus",
    focus: "Back, Glutes, Hamstrings",
    duration: "55 min",
    intensity: "Medium",
    progress: 40,
    lastDone: "Yesterday",
    exercises: 6
  },
  {
    id: "w3",
    name: "Metabolic Conditioning",
    focus: "Full Body Cardio",
    duration: "30 min",
    intensity: "Ultra",
    progress: 0,
    lastDone: "Never",
    exercises: 12
  }
];

const history = [
  { date: "Oct 24", name: "Hypertrophy Upper A", duration: "62m", calories: "420" },
  { date: "Oct 22", name: "Posterior Chain Focus", duration: "58m", calories: "380" },
  { date: "Oct 20", name: "Metabolic Conditioning", duration: "32m", calories: "510" },
];

export default function WorkoutsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Training Lab</h1>
          <p className="text-muted-foreground">Execute your routines and track every rep.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2"><History className="w-4 h-4" /> History</Button>
          <Button className="rounded-xl bg-primary hover:bg-primary/90 gap-2"><Plus className="w-4 h-4" /> New Routine</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              Active Routines
            </h2>
            <Badge variant="secondary" className="bg-primary/5 text-primary">3 Active</Badge>
          </div>

          <div className="grid gap-4">
            {currentWorkouts.map((workout) => (
              <Card key={workout.id} className="glass-card rounded-3xl border-none shadow-lg group hover:translate-x-1 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="w-16 h-16 bg-pearl rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Dumbbell className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{workout.name}</h3>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{workout.intensity}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{workout.focus}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {workout.duration}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {workout.exercises} Exercises
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-32">
                      <Button className="rounded-xl w-full gap-2 font-bold shadow-lg shadow-primary/20">
                        <Play className="w-3 h-3 fill-current" /> Start
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground italic">Last: {workout.lastDone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="glass-card rounded-3xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pearl p-4 rounded-2xl space-y-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <p className="text-xl font-bold">12</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Sessions</p>
                </div>
                <div className="bg-pearl p-4 rounded-2xl space-y-1">
                  <Clock className="w-4 h-4 text-sky" />
                  <p className="text-xl font-bold">18.4</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Hours</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Weekly Goal</span>
                  <span>4 / 5</span>
                </div>
                <Progress value={80} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-3xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {history.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-pearl transition-colors border-b last:border-none">
                  <div className="w-10 h-10 bg-pearl rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-primary leading-none">{item.date.split(' ')[1]}</span>
                    <span className="text-[8px] uppercase font-bold text-muted-foreground">{item.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-bold">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.duration} • {item.calories} kcal</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary h-12">View Full History</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
