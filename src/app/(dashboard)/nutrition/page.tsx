
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Apple, 
  Droplet, 
  Utensils, 
  Calendar, 
  ChefHat, 
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function NutritionPage() {
  const [waterCups, setWaterCups] = useState(6);
  const targetWater = 10;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Nutrition & Fuel</h1>
          <p className="text-muted-foreground">Precision meal planning and hydration metrics.</p>
        </div>
        <Badge variant="outline" className="bg-white h-10 px-4 rounded-full gap-2 border-primary/20">
          <Calendar className="w-4 h-4 text-primary" />
          Today's Plan
        </Badge>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <NutritionMetric 
          label="Protein" 
          value="152" 
          target="180" 
          unit="g" 
          color="bg-cobalt" 
        />
        <NutritionMetric 
          label="Carbs" 
          value="210" 
          target="250" 
          unit="g" 
          color="bg-sky" 
        />
        <NutritionMetric 
          label="Fats" 
          value="55" 
          target="70" 
          unit="g" 
          color="bg-emerald-500" 
        />
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
          <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-primary" />
            Today's AI Meal Plan
          </h2>
          
          <div className="space-y-4">
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
            <MealItem 
              time="04:00 PM"
              type="Snack"
              name="Almonds & Green Apple"
              description="Simple raw almonds with a crisp green apple for fiber."
              macros={{ p: 6, c: 15, f: 14, cal: 210 }}
              completed
            />
            <MealItem 
              time="07:00 PM"
              type="Dinner"
              name="Lean Turkey Meatballs & Zucchini Noodles"
              description="Ground turkey breast with herb marinara over zoodles."
              macros={{ p: 40, c: 12, f: 15, cal: 480 }}
            />
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
                  <circle
                    className="text-muted/20"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                  />
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
                <button 
                  onClick={() => setWaterCups(Math.max(0, waterCups - 1))}
                  className="flex-1 h-12 rounded-xl bg-pearl border hover:bg-white transition-colors"
                >
                  -1 Cup
                </button>
                <button 
                  onClick={() => setWaterCups(Math.min(targetWater + 5, waterCups + 1))}
                  className="flex-1 h-12 rounded-xl bg-sky text-white hover:bg-sky/90 transition-colors font-bold"
                >
                  +1 Cup
                </button>
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
              <div className="flex gap-3 text-sm italic text-muted-foreground leading-relaxed">
                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                "Try adding turmeric to your dinner tonight to help with the mild inflammation detected from your volume data."
              </div>
            </CardContent>
          </Card>
        </div>
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
            <MacroBadge label="P" value={macros.p} />
            <MacroBadge label="C" value={macros.c} />
            <MacroBadge label="F" value={macros.f} />
            <div className="ml-auto text-xs font-bold text-muted-foreground">{macros.cal} kcal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MacroBadge({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] font-bold text-muted-foreground">{label}:</span>
      <span className="text-xs font-bold">{value}g</span>
    </div>
  );
}
