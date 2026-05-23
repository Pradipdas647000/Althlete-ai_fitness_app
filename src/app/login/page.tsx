
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(true);
      toast({
        title: "Welcome Back!",
        description: "Signed in successfully. Redirecting...",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err: any) {
      console.error(err);
      let message = "Invalid email or password.";
      if (err.code === 'auth/user-not-found') message = "No account found with this email.";
      if (err.code === 'auth/wrong-password') message = "Incorrect password.";
      if (err.code === 'auth/unauthorized-domain') message = "Domain unauthorized. Please whitelist this domain in Firebase Console.";
      if (err.code === 'auth/configuration-not-found') message = "Auth configuration missing. Please enable it in Firebase Console.";
      
      setError(message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Logged in with Google.",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err: any) {
      console.error(err);
      let message = "Failed to sign in with Google.";
      if (err.code === 'auth/unauthorized-domain') message = "Domain unauthorized. Please whitelist this domain in Firebase Console.";
      setError(message);
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl px-4 py-12">
        <Card className="w-full max-w-md glass-card rounded-3xl border-none shadow-2xl p-8 text-center space-y-6">
          <div className="flex justify-center">
             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
             </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold text-primary uppercase tracking-tight">Authenticated</h2>
            <p className="text-muted-foreground font-medium italic">Synchronizing your performance data...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl px-4 py-12">
      <Card className="w-full max-w-md glass-card rounded-3xl border-none shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-12">
                <Zap className="text-white w-6 h-6" fill="currentColor" />
              </div>
              <span className="font-headline text-3xl font-bold tracking-tight">AIthlete</span>
            </Link>
          </div>
          <div>
            <CardTitle className="font-headline text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your lab.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" size="sm" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl h-11"
              />
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full h-11 bg-primary hover:bg-primary/90 rounded-xl font-bold">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </div>
              ) : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground font-bold">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" onClick={handleGoogleLogin} disabled={loading} className="w-full h-11 rounded-xl font-bold border-2">
             Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-bold">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
