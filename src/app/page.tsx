
"use client";

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
  Users
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-fitness");

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
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Reviews</Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full px-6">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <Badge variant="secondary" className="px-4 py-1 text-primary bg-primary/10 border-primary/20 rounded-full font-medium">
                  Next-Gen Fitness AI
                </Badge>
                <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                  Unlock Your <span className="text-primary">Peak Human</span> Potential.
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Experience precision-engineered fitness. AIthlete designs intelligent programs, tracks every metric, and optimizes your nutrition with scientific accuracy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg rounded-full px-10 h-14 group">
                      Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="text-lg rounded-full px-10 h-14 border-2">
                      Log In
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
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
                  <p className="text-sm text-muted-foreground font-medium">
                    Joined by <span className="text-foreground font-bold">10,000+</span> performance seekers
                  </p>
                </div>
              </div>
              <div className="relative lg:ml-auto">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                <div className="relative glass-card p-4 rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image 
                    src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/800/600"} 
                    alt="AIthlete Dashboard" 
                    width={800} 
                    height={600}
                    className="rounded-2xl shadow-2xl"
                    priority
                    data-ai-hint="fitness athlete"
                  />
                  <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl animate-bounce duration-[3000ms]">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <TrendingUp className="text-emerald-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Performance</p>
                        <p className="font-bold text-lg">+24% Increase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-pearl/50">
          <div className="container mx-auto px-4 text-center mb-16 space-y-4">
            <h2 className="font-headline text-4xl font-bold">Engineered for Results</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our holistic approach combines biological data with behavioral science to create the ultimate fitness companion.
            </p>
          </div>
          <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Intelligent Designer"
              description="AI-powered engine analyzes your history to build the perfect workout & recovery split."
              delay="100"
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6" />}
              title="Performance Suite"
              description="High-fidelity analytics dashboard tracking BMI, weight trends, and volume metrics."
              delay="200"
            />
            <FeatureCard 
              icon={<Apple className="w-6 h-6" />}
              title="Integrated Nutrition"
              description="Full-stack meal planner and macro tracker to ensure your fuel matches your ambition."
              delay="300"
            />
            <FeatureCard 
              icon={<Dumbbell className="w-6 h-6" />}
              title="Workout Engine"
              description="Built-in timer, exercise library, and streak tracking for every session."
              delay="400"
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Enterprise Auth"
              description="Secure profile management with state-of-the-art encryption and privacy controls."
              delay="500"
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6" />}
              title="Admin Terminal"
              description="Powerful insights for coaches and founders to manage communities and analytics."
              delay="600"
            />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4 text-center mb-16 space-y-4">
            <h2 className="font-headline text-4xl font-bold">Flexible Plans</h2>
            <p className="text-muted-foreground">Start for free and upgrade as you scale your performance.</p>
          </div>
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8">
            <PricingCard 
              name="Basics"
              price="$0"
              description="Perfect for starting your journey."
              features={[
                "Basic Workout Tracking",
                "Community Challenges",
                "Public Profile",
                "Weight Tracking"
              ]}
              buttonText="Join Free"
              variant="outline"
              href="/signup"
            />
            <PricingCard 
              name="Performance Pro"
              price="$19"
              description="Advanced features for serious athletes."
              features={[
                "AI Personalized Plans",
                "Nutrition Deep-Dive",
                "Advanced Performance Suite",
                "Custom Badges & Rewards",
                "Priority Support"
              ]}
              buttonText="Go Premium"
              variant="default"
              recommended
              href="/signup"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-cobalt/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <TestimonialCard 
                author="Marcus V."
                role="Elite Cyclist"
                content="The AI recommendations are scary accurate. It knew exactly when I needed a recovery day before I did."
              />
              <TestimonialCard 
                author="Sarah L."
                role="Crossfit Enthusiast"
                content="Finally a dashboard that makes sense. AIthlete replaced 4 other apps I was using."
              />
              <TestimonialCard 
                author="Dr. James K."
                role="Sports Scientist"
                content="The way it handles biometrics is impressive. It's the most sophisticated tool in the market today."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-pearl pt-20 pb-10 border-t">
        <div className="container mx-auto px-4 text-center">
           <div className="flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="text-white w-5 h-5" fill="currentColor" />
                </div>
                <span className="font-headline text-xl font-bold">AIthlete</span>
              </Link>
           </div>
           <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
              Empowering humans through intelligent data and precision fitness engineering.
           </p>
           <div className="flex justify-center gap-8 mb-12">
              <Link href="#features" className="text-sm hover:text-primary">Features</Link>
              <Link href="#pricing" className="text-sm hover:text-primary">Pricing</Link>
              <Link href="/login" className="text-sm hover:text-primary">Log In</Link>
              <Link href="/signup" className="text-sm hover:text-primary">Sign Up</Link>
           </div>
           <div className="text-xs text-muted-foreground pt-10 border-t">
            © {new Date().getFullYear()} AIthlete SaaS. Built for performance.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300 group">
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <h3 className="font-headline text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}

function PricingCard({ name, price, description, features, buttonText, variant, href, recommended = false }: any) {
  return (
    <div className={`glass-card p-10 rounded-3xl relative overflow-hidden flex flex-col h-full ${recommended ? 'ring-2 ring-primary scale-105 z-10' : ''}`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
          Recommended
        </div>
      )}
      <div className="mb-8">
        <h3 className="font-headline text-2xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground text-sm">/ month</span>
        </div>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href}>
        <Button variant={variant} className={`w-full h-12 rounded-full font-bold ${variant === 'default' ? 'bg-primary hover:bg-primary/90' : 'border-2'}`}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}

function TestimonialCard({ author, role, content }: any) {
  return (
    <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
      <div className="flex gap-1 text-primary">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-lg italic text-muted-foreground leading-relaxed">"{content}"</p>
      <div className="flex items-center gap-4 mt-auto pt-4 border-t">
        <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
          <Image 
            src={`https://picsum.photos/seed/${author}/100/100`} 
            alt={author} 
            width={48} 
            height={48}
            data-ai-hint="person face"
          />
        </div>
        <div>
          <h4 className="font-bold">{author}</h4>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{role}</p>
        </div>
      </div>
    </div>
  );
}
