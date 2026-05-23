
"use client";

import { useState } from "react";
import { useUser, useFirestore, useCollection } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit } from "firebase/firestore";
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
  Loader2,
  X,
  PlusCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function WorkoutsPage() {
  const { user } = useUser();
  const db = useFirestore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    name: "",
    focus: "",
    duration: "45 min",
    intensity: "Medium",
    exercises: 5
  });

  // Fetch Routines
  const workoutsQuery = user && db ? query(collection(db, "users", user.uid, "workouts"), orderBy("createdAt", "desc")) : null;
  const { data: workouts, loading: workoutsLoading } = useCollection(workoutsQuery);

  // Fetch History
  const historyQuery = user && db ? query(collection(db, "users", user.uid, "history"), orderBy("date", "desc"), limit(5)) : null;
  const { data: workoutHistory, loading: historyLoading } = useCollection(historyQuery);

  const handleAddWorkout = async () => {
    if (!user || !db || !newRoutine.name) return;

    const workoutData = {
      ...newRoutine,
      createdAt: serverTimestamp(),
      lastDone: "Never",
      progress: 0
    };

    const docRef = collection(db, "users", user.uid, "workouts");
    
    addDoc(docRef, workoutData)
      .then(() => {
        setIsAdding(false);
        setNewRoutine({ name: "", focus: "", duration: "45 min", intensity: "Medium", exercises: 5 });
        toast({ title: "Routine Added", description: `${newRoutine.name} is now in your Training Lab.` });
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/workouts`,
          operation: 'create',
          requestResourceData: workoutData
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const handleStartWorkout = (workout: any) => {
    if (!user || !db) return;

    const historyData = {
      name: workout.name,
      date: new Date().toISOString(),
      duration: workout.duration,
      calories: Math.floor(Math.random() * 200) + 300 // Simulated for demo
    };

    const historyRef = collection(db, "users", user.uid, "history");

    addDoc(historyRef, historyData)
      .then(() => {
        toast({
          title: "Workout Started!",
          description: `You are now performing ${workout.name}. Stay focused!`,
        });
      })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/history`,
          operation: 'create',
          requestResourceData: historyData
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Training Lab</h1>
          <p className="text-muted-foreground">Execute your routines and track every rep.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4" /> New Routine
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-none rounded-3xl max-w-md">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Create New Routine</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Routine Name</Label>
                  <Input 
                    placeholder="e.g. Upper Body Power" 
                    value={newRoutine.name}
                    onChange={(e) => setNewRoutine({...newRoutine, name: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Focus Area</Label>
                  <Input 
                    placeholder="e.g. Chest, Back, Shoulders" 
                    value={newRoutine.focus}
                    onChange={(e) => setNewRoutine({...newRoutine, focus: e.target.value})}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Intensity</Label>
                    <Select value={newRoutine.intensity} onValueChange={(val) => setNewRoutine({...newRoutine, intensity: val})}>
                      <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Time</Label>
                    <Input 
                      value={newRoutine.duration}
                      onChange={(e) => setNewRoutine({...newRoutine, duration: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsAdding(false)} className="rounded-xl">Cancel</Button>
                <Button onClick={handleAddWorkout} className="rounded-xl bg-primary hover:bg-primary/90">Save Routine</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              Active Routines
            </h2>
            <Badge variant="secondary" className="bg-primary/5 text-primary">
              {workoutsLoading ? "..." : workouts.length} Active
            </Badge>
          </div>

          <div className="grid gap-4">
            {workoutsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
              </div>
            ) : workouts.length === 0 ? (
              <Card className="glass-card rounded-3xl border-none shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-pearl rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusCircle className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <h3 className="font-bold text-lg mb-2">No Routines Yet</h3>
                <p className="text-sm text-muted-foreground mb-6">Create your first workout routine to start training.</p>
                <Button variant="outline" onClick={() => setIsAdding(true)} className="rounded-xl">Create Routine</Button>
              </Card>
            ) : (
              workouts.map((workout) => (
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
                        <Button onClick={() => handleStartWorkout(workout)} className="rounded-xl w-full gap-2 font-bold shadow-lg shadow-primary/20">
                          <Play className="w-3 h-3 fill-current" /> Start
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground italic">Last: {workout.lastDone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="glass-card rounded-3xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Momentum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pearl p-4 rounded-2xl space-y-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <p className="text-xl font-bold">{workoutHistory.length}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Sessions</p>
                </div>
                <div className="bg-pearl p-4 rounded-2xl space-y-1">
                  <Clock className="w-4 h-4 text-sky" />
                  <p className="text-xl font-bold">{(workoutHistory.length * 0.8).toFixed(1)}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Hours</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Weekly Goal</span>
                  <span>{workoutHistory.length} / 5</span>
                </div>
                <Progress value={(workoutHistory.length / 5) * 100} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-3xl border-none shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                Recent History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {historyLoading ? (
                <div className="p-8 flex justify-center"><Loader2 className="w-4 h-4 animate-spin opacity-20" /></div>
              ) : workoutHistory.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground italic">No training history yet.</div>
              ) : (
                workoutHistory.map((item, i) => {
                  const date = new Date(item.date);
                  return (
                    <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-pearl transition-colors border-b last:border-none">
                      <div className="w-10 h-10 bg-pearl rounded-lg flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold text-primary leading-none">
                          {date.getDate()}
                        </span>
                        <span className="text-[8px] uppercase font-bold text-muted-foreground">
                          {date.toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs font-bold">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.duration} • {item.calories} kcal</p>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
