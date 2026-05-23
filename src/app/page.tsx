
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Activity, 
  Apple, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-fitness");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass-nav">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <Zap className="text-white w-5 h-5" fill="currentColor" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight">AIthlete</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-6">Get Started</Button>
            </Link>
          </nav>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] p-0">
                <div className="flex flex-col h-full p-6">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                      <Zap className="text-primary w-6 h-6 fill-current" />
                      <span className="font-headline text-xl font-bold">AIthlete</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-6">
                    <Link href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Features</Link>
                    <Link href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Pricing</Link>
                    <Link href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Reviews</Link>
                    <hr className="my-2" />
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-full h-12">Log In</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 rounded-full h-12">Get Started</Button>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 md:pt-48 md:pb-32 overflow-hidden px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 md:space-y-8 animate-fade-in-up">
                <Badge variant="secondary" className="px-4 py-1 text-primary bg-primary/10 border-primary/20 rounded-full font-medium">
                  Next-Gen Fitness AI
                </Badge>
                <h1 className="font-headline text-4xl md:text-7xl font-bold leading-tight tracking-tighter">
                  Unlock Your <span className="text-primary">Peak Human</span> Potential.
                </h1>
                <p className="text-base md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Experience precision-engineered fitness. AIthlete designs intelligent programs and optimizes your nutrition with scientific accuracy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg rounded-full px-10 h-14 group">
                      Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full text-lg rounded-full px-10 h-14 border-2">
                      Log In
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background overflow-hidden">
                        <Image 
                          src={`https://picsum.photos/seed/user-${i}/100/100`} 
                          alt="User" 
                          width={40} 
                          height={40}
                          data-ai-hint="person face"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Joined by <span className="text-foreground font-bold">10,000+</span> seekers
                  </p>
                </div>
              </div>
              <div className="relative lg:ml-auto hidden sm:block">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                <div className="relative glass-card p-3 md:p-4 rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image 
                    src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/800/600"} 
                    alt="AIthlete Dashboard" 
                    width={800} 
                    height={600}
                    className="rounded-2xl shadow-2xl"
                    priority
                    data-ai-hint="fitness athlete"
                  />
                  <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 glass-card p-3 md:p-4 rounded-2xl animate-bounce duration-[3000ms]">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <TrendingUp className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase">Performance</p>
                        <p className="font-bold text-base md:text-lg">+24%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-pearl/50">
          <div className="container mx-auto px-4 text-center mb-12 md:mb-16 space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Engineered for Results</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Our holistic approach combines biological data with behavioral science to create the ultimate fitness companion.
            </p>
          </div>
          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard icon={<Zap className="w-6 h-6" />} title="Intelligent Designer" description="AI-powered engine builds the perfect workout & recovery split." />
            <FeatureCard icon={<Activity className="w-6 h-6" />} title="Performance Suite" description="Dashboard tracking BMI, weight trends, and volume metrics." />
            <FeatureCard icon={<Apple className="w-6 h-6" />} title="Integrated Nutrition" description="Full-stack meal planner to ensure your fuel matches your ambition." />
            <FeatureCard icon={<Dumbbell className="w-6 h-6" />} title="Workout Engine" description="Exercise library and streak tracking for every session." />
            <FeatureCard icon={<ShieldCheck className="w-6 h-6" />} title="Secure Profiles" description="Enterprise-grade privacy controls for your data." />
            <FeatureCard icon={<Users className="w-6 h-6" />} title="Admin Insights" description="Powerful insights for coaches and community managers." />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center mb-12 md:mb-16 space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Flexible Plans</h2>
            <p className="text-muted-foreground">Start for free and upgrade as you scale.</p>
          </div>
          <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <PricingCard 
              name="Basics" price="$0" description="Perfect for starting out." buttonText="Join Free" variant="outline" href="/signup"
              features={["Basic Workout Tracking", "Community Challenges", "Public Profile", "Weight Tracking"]}
            />
            <PricingCard 
              name="Performance Pro" price="$19" description="Serious features for athletes." buttonText="Go Premium" variant="default" recommended href="/signup"
              features={["AI Personalized Plans", "Nutrition Deep-Dive", "Advanced Analytics", "Custom Badges", "Priority Support"]}
            />
          </div>
        </section>
      </main>

      <footer className="bg-pearl pt-16 md:pt-20 pb-10 border-t">
        <div className="container mx-auto px-4 text-center">
           <div className="flex justify-center mb-6 md:mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="text-white w-5 h-5" fill="currentColor" />
                </div>
                <span className="font-headline text-xl font-bold">AIthlete</span>
              </Link>
           </div>
           <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto mb-8">
              Empowering humans through intelligent data and precision fitness engineering.
           </p>
           <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
              <Link href="#features" className="text-xs md:text-sm hover:text-primary">Features</Link>
              <Link href="#pricing" className="text-xs md:text-sm hover:text-primary">Pricing</Link>
              <Link href="/login" className="text-xs md:text-sm hover:text-primary">Log In</Link>
              <Link href="/signup" className="text-xs md:text-sm hover:text-primary">Sign Up</Link>
           </div>
           <div className="text-[10px] md:text-xs text-muted-foreground pt-10 border-t">
            © {new Date().getFullYear()} AIthlete. Built for performance.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl hover:scale-105 transition-all duration-300 group">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <h3 className="font-headline text-lg md:text-xl font-bold mb-2 md:mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">
        {description}
      </p>
    </div>
  );
}

function PricingCard({ name, price, description, features, buttonText, variant, href, recommended = false }: any) {
  return (
    <div className={`glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col h-full ${recommended ? 'ring-2 ring-primary scale-100 md:scale-105 z-10' : ''}`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
          Recommended
        </div>
      )}
      <div className="mb-6 md:mb-8">
        <h3 className="font-headline text-xl md:text-2xl font-bold mb-1 md:mb-2">{name}</h3>
        <p className="text-muted-foreground text-xs md:text-sm">{description}</p>
      </div>
      <div className="mb-6 md:mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl md:text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground text-xs md:text-sm">/ month</span>
        </div>
      </div>
      <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href}>
        <Button variant={variant} className={`w-full h-11 md:h-12 rounded-full font-bold ${variant === 'default' ? 'bg-primary hover:bg-primary/90' : 'border-2'}`}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
