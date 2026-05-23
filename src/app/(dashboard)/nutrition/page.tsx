"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Apple, 
  Droplet, 
  ChefHat, 
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
  Utensils,
  Camera,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Info
} from "lucide-react";
import { generateWeeklyMealPlan, GenerateWeeklyMealPlanOutput } from "@/ai/flows/generate-weekly-meal-plan";
import { analyzeFoodImage, AnalyzeFoodImageOutput } from "@/ai/flows/analyze-food-image";
import { useUser, useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";

export default function NutritionPage() {
  const [waterCups, setWaterCups] = useState(6);
  const targetWater = 10;
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [mealPlan, setMealPlan] = useState<GenerateWeeklyMealPlanOutput | null>(null);
  const [analysis, setAnalysis] = useState<AnalyzeFoodImageOutput | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();
  const db = useFirestore();
  const { data: profile } = useDoc(user && db ? doc(db, "users", user.uid) : null);

  const handleGenerateMealPlan = async () => {
    setLoading(true);
    try {
      const input = {
        dietaryPreferences: ["high protein", "low carb"],
        allergies: [],
        calorieTarget: 2400,
        goal: profile?.fitnessLevel === "advanced" ? "gain muscle" : "maintain weight",
        weightKg: profile?.weightKg || 75,
        heightCm: profile?.heightCm || 180,
        age: 28,
        gender: "male" as const,
        activityLevel: "moderately active" as const,
      };
      const result = await generateWeeklyMealPlan(input);
      setMealPlan(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      handleAnalyze(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (dataUri: string) => {
    setAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeFoodImage({
        photoDataUri: dataUri,
        userGoal: profile?.fitnessLevel || "fitness optimization",
      });
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Nutrition & Fuel</h1>
          <p className="text-muted-foreground">Precision meal planning and hydration metrics.</p>
        </div>
        {!mealPlan && (
          <Button 
            onClick={handleGenerateMealPlan} 
            disabled={loading}
            className="rounded-full bg-primary hover:bg-primary/90 gap-2 font-bold shadow-xl shadow-primary/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate AI Plan
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <NutritionMetric label="Protein" value="152" target="180" unit="g" color="bg-cobalt" />
        <NutritionMetric label="Carbs" value="210" target="250" unit="g" color="bg-sky" />
        <NutritionMetric label="Fats" value="55" target="70" unit="g" color="bg-emerald-500" />
        <Card className="glass-card rounded-3xl border-none shadow-lg">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold">1,850</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Kcal consumed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Food Scanner Section */}
          <Card className="glass-card rounded-3xl border-none shadow-xl overflow-hidden bg-gradient-to-br from-white/40 to-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                AI Vision Scanner
              </CardTitle>
              <CardDescription>Upload a photo of your meal for an instant nutritional breakdown.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 space-y-4">
                  <div 
                    onClick={triggerFileSelect}
                    className="aspect-square rounded-3xl border-2 border-dashed border-primary/20 bg-white/50 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-all group relative overflow-hidden"
                  >
                    {previewUrl ? (
                      <Image src={previewUrl} alt="Food preview" fill className="object-cover" />
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Utensils className="w-8 h-8 text-primary" />
                        </div>
                        <p className="mt-4 text-sm font-bold text-muted-foreground">Click to upload photo</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                  </div>
                  <Button 
                    onClick={triggerFileSelect} 
                    disabled={analyzing} 
                    className="w-full rounded-2xl h-12 gap-2"
                  >
                    {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                    {previewUrl ? "Scan Another" : "Select Food Image"}
                  </Button>
                </div>

                <div className="flex-1 space-y-6">
                  {analyzing ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="font-headline font-bold text-primary animate-pulse uppercase tracking-widest text-xs">Analyzing Molecular Content...</p>
                    </div>
                  ) : analysis ? (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{analysis.foodName}</h3>
                        <Badge variant={
                          analysis.assessment.rating === 'excellent' || analysis.assessment.rating === 'good' 
                            ? "default" 
                            : analysis.assessment.rating === 'neutral' ? "secondary" : "destructive"
                        } className="rounded-full px-4 capitalize">
                          {analysis.assessment.rating}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <MacroBadge label="Calories" value={`${analysis.nutrition.calories} kcal`} icon={<Zap className="w-3 h-3" />} />
                        <MacroBadge label="Protein" value={`${analysis.nutrition.proteinGrams}g`} icon={<CheckCircle2 className="w-3 h-3" />} />
                        <MacroBadge label="Carbs" value={`${analysis.nutrition.carbGrams}g`} icon={<Apple className="w-3 h-3" />} />
                        <MacroBadge label="Fats" value={`${analysis.nutrition.fatGrams}g`} icon={<Droplet className="w-3 h-3" />} />
                      </div>

                      <div className={`p-4 rounded-2xl border flex gap-3 ${
                        analysis.assessment.rating === 'excellent' || analysis.assessment.rating === 'good'
                        ? 'bg-emerald-50 border-emerald-100'
                        : analysis.assessment.rating === 'neutral'
                        ? 'bg-sky-50 border-sky-100'
                        : 'bg-rose-50 border-rose-100'
                      }`}>
                        <div className="shrink-0 mt-1">
                          {analysis.assessment.rating === 'excellent' || analysis.assessment.rating === 'good' 
                            ? <ThumbsUp className="w-5 h-5 text-emerald-600" /> 
                            : <AlertCircle className="w-5 h-5 text-rose-600" />
                          }
                        </div>
                        <div className="space-y-1">
                          <p className={`font-bold text-sm ${
                            analysis.assessment.rating === 'excellent' || analysis.assessment.rating === 'good' ? 'text-emerald-900' : 'text-rose-900'
                          }`}>{analysis.assessment.verdict}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed italic">"{analysis.assessment.reasoning}"</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 text-muted-foreground">
                      <div className="w-16 h-16 bg-pearl rounded-full flex items-center justify-center">
                        <Sparkles className="w-8 h-8 opacity-20" />
                      </div>
                      <p className="text-sm max-w-[200px]">Upload a photo to see if your meal aligns with your fitness goals.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="font-headline text-2xl font-bold flex items-center gap-2 mt-8">
            <ChefHat className="w-6 h-6 text-primary" />
            {mealPlan ? "Your Precision Meal Plan" : "Today's Schedule"}
          </h2>
          
          <div className="space-y-4">
            {mealPlan ? (
              mealPlan.mealPlan[0].meals.map((meal, i) => (
                <MealItem 
                  key={i}
                  time={i === 0 ? "08:00 AM" : i === 1 ? "12:30 PM" : i === 2 ? "04:30 PM" : "07:30 PM"}
                  type={meal.name}
                  name={meal.name}
                  description={meal.description}
                  macros={{ p: meal.proteinGrams, c: meal.carbGrams, f: meal.fatGrams, cal: meal.calories }}
                  completed={i < 2}
                />
              ))
            ) : (
              <>
                <MealItem 
                  time="07:30 AM"
                  type="Breakfast"
                  name="Quinoa & Berry Protein Bowl"
                  description="High protein bowl with greek yogurt, chia seeds, and wild blueberries."
                  macros={{ p: 25, c: 45, f: 12, cal: 420 }}
                  completed
                />
                <MealItem 
                  time="12:30 PM"
                  type="Lunch"
                  name="Grilled Salmon & Quinoa Salad"
                  description="Grilled wild-caught salmon with avocado, kale, and lemon vinaigrette."
                  macros={{ p: 35, c: 30, f: 22, cal: 550 }}
                  completed
                />
              </>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="glass-card rounded-3xl border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-sky/5">
              <CardTitle className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-sky" />
                Hydration Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40">
                  <circle className="text-muted/20" strokeWidth="10" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                  <circle
                    className="text-sky"
                    strokeWidth="10"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (waterCups / targetWater) * 440}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{waterCups}</span>
                  <span className="text-xs text-muted-foreground">of {targetWater} cups</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setWaterCups(Math.max(0, waterCups - 1))} className="flex-1 h-12 rounded-xl bg-pearl border hover:bg-white transition-colors">-1 Cup</button>
                <button onClick={() => setWaterCups(Math.min(targetWater + 5, waterCups + 1))} className="flex-1 h-12 rounded-xl bg-sky text-white hover:bg-sky/90 transition-colors font-bold">+1 Cup</button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-3xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">AI Nutrition Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 text-sm italic text-muted-foreground leading-relaxed">
                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                "Since you did a high-intensity session today, increase your carb intake slightly tomorrow morning to restock glycogen."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MacroBadge({ label, value, icon }: any) {
  return (
    <div className="bg-pearl/50 p-3 rounded-2xl flex items-center gap-3">
      <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold leading-none">{value}</p>
      </div>
    </div>
  );
}

function NutritionMetric({ label, value, target, unit, color }: any) {
  const percentage = (Number(value) / Number(target)) * 100;
  return (
    <Card className="glass-card rounded-3xl border-none shadow-lg">
      <CardContent className="p-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">{label}</span>
          <span className="text-xs font-bold text-primary">{value}/{target}{unit}</span>
        </div>
        <Progress value={percentage} className="h-2" indicatorClassName={color} />
      </CardContent>
    </Card>
  );
}

function MealItem({ time, type, name, description, macros, completed }: any) {
  return (
    <Card className={`rounded-3xl border-none shadow-md transition-all hover:translate-x-1 ${completed ? 'glass-card' : 'bg-white opacity-60'}`}>
      <CardContent className="p-6 flex gap-6">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-pearl flex flex-col items-center justify-center text-center">
          <Clock className="w-4 h-4 text-muted-foreground mb-1" />
          <span className="text-[10px] font-bold text-muted-foreground leading-none">{time.split(' ')[0]}</span>
          <span className="text-[10px] text-muted-foreground leading-none">{time.split(' ')[1]}</span>
        </div>
        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">{type}</span>
              <h4 className="font-bold text-lg">{name}</h4>
            </div>
            {completed && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-1"><span className="text-[10px] font-bold text-muted-foreground">P:</span><span className="text-xs font-bold">{macros.p}g</span></div>
            <div className="flex items-center gap-1"><span className="text-[10px] font-bold text-muted-foreground">C:</span><span className="text-xs font-bold">{macros.c}g</span></div>
            <div className="flex items-center gap-1"><span className="text-[10px] font-bold text-muted-foreground">F:</span><span className="text-xs font-bold">{macros.f}g</span></div>
            <div className="ml-auto text-xs font-bold text-muted-foreground">{macros.cal} kcal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
