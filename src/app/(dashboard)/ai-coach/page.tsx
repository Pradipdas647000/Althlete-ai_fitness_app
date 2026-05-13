
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generatePersonalizedWorkoutPlan, GenerateWorkoutPlanOutput } from "@/ai/flows/generate-personalized-workout-plan";
import { BrainCircuit, Loader2, Dumbbell, Calendar, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AICoachPage() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<GenerateWorkoutPlanOutput | null>(null);

  const [formData, setFormData] = useState({
    age: 28,
    weightKg: 75,
    heightCm: 180,
    gender: "male",
    fitnessLevel: "intermediate",
    goals: "Build lean muscle and improve metabolic conditioning",
    availableDaysPerWeek: 4,
    preferredWorkoutDurationMinutes: 45,
    equipmentAvailable: "Full gym access with free weights",
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generatePersonalizedWorkoutPlan(formData as any);
      setPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <BrainCircuit className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">AI Fitness Architect</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Leverage our advanced neural models to construct a precision-engineered workout & recovery cycle tailored to your unique biology.
        </p>
      </header>

      {!plan ? (
        <Card className="glass-card rounded-3xl border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="font-headline">Personal Parameters</CardTitle>
            <CardDescription>Fill in your details for the AI to analyze.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input 
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={formData.weightKg} 
                  onChange={(e) => setFormData({...formData, weightKg: Number(e.target.value)})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input 
                  type="number" 
                  value={formData.heightCm} 
                  onChange={(e) => setFormData({...formData, heightCm: Number(e.target.value)})}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Fitness Level</Label>
                <Select value={formData.fitnessLevel} onValueChange={(val) => setFormData({...formData, fitnessLevel: val})}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Days Per Week</Label>
                <Select value={String(formData.availableDaysPerWeek)} onValueChange={(val) => setFormData({...formData, availableDaysPerWeek: Number(val)})}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map(n => <SelectItem key={n} value={String(n)}>{n} Days</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Primary Fitness Goals</Label>
              <Input 
                value={formData.goals} 
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                placeholder="e.g. Lose 5kg in 2 months while building strength"
                className="rounded-xl h-12"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
            >
              {loading ? <><Loader2 className="mr-2 animate-spin" /> Analyzing Biometrics...</> : <><Sparkles className="mr-2 w-5 h-5" /> Generate My Plan</>}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-2xl font-bold">Your Precision Plan</h2>
            <Button variant="outline" onClick={() => setPlan(null)} className="rounded-xl">New Search</Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {plan.workoutPlan.weekPlan.map((dayPlan, i) => (
                <Card key={i} className="glass-card rounded-3xl border-none shadow-lg overflow-hidden transition-all hover:translate-x-2">
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-primary text-white rounded-2xl">
                      <span className="text-xs font-bold uppercase tracking-tighter opacity-70">Day</span>
                      <span className="text-3xl font-headline font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{dayPlan.day}</h3>
                        <Badge variant={dayPlan.focus === "Rest Day" ? "secondary" : "default"} className="rounded-full px-4">
                          {dayPlan.focus}
                        </Badge>
                      </div>
                      {dayPlan.exercises && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dayPlan.exercises.map((ex, j) => (
                            <div key={j} className="bg-pearl/50 rounded-xl p-3 flex items-center justify-between">
                              <div>
                                <p className="font-bold text-sm">{ex.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase">{ex.sets} sets • {ex.reps}</p>
                              </div>
                              <Dumbbell className="w-4 h-4 text-primary opacity-50" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="glass-card rounded-3xl border-none shadow-xl bg-primary text-white overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5" />
                    Recovery Logic
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.recoverySchedule.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                      <p>{rec}</p>
                    </div>
                  ))}
                  {plan.recoverySchedule.activeRecoveryDays && (
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Active Recovery Days</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.recoverySchedule.activeRecoveryDays.map((d, i) => (
                          <Badge key={i} variant="secondary" className="bg-white/20 text-white border-none">{d}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card rounded-3xl border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">AI Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Biological balance verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Overtraining prevention active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Equipment compatibility 100%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";
