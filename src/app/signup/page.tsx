
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !db) return;
    
    setLoading(true);
    setError("");
    
    try {
      // 1. Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Update the Auth profile (Display Name)
      await updateProfile(user, { displayName: name });
      
      // 3. Create the User Document in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userData = {
        uid: user.uid,
        displayName: name,
        email: email,
        createdAt: new Date().toISOString(),
        onboardingComplete: false
      };

      setDoc(userDocRef, userData)
        .catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'create',
            requestResourceData: userData,
          });
          errorEmitter.emit('permission-error', permissionError);
        });

      // 4. Show success state
      setIsSuccess(true);
      toast({
        title: "Account Created Successfully!",
        description: `Welcome to AIthlete, ${name}!`,
      });

      // 5. Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      // Do not use console.error() to avoid triggering dev overlays for expected auth errors
      let message = "An error occurred during sign up.";
      
      if (err.code === 'auth/email-already-in-use') {
        message = "This email is already registered. Please try logging in instead.";
      } else if (err.code === 'auth/weak-password') {
        message = "Password should be at least 6 characters.";
      } else if (err.code === 'auth/unauthorized-domain') {
        message = "This domain is not authorized. Please check your Firebase Console settings.";
      } else if (err.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      }
      
      setError(message);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!auth || !db) return;
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userData = {
        uid: user.uid,
        displayName: user.displayName || "Athlete",
        email: user.email,
        createdAt: new Date().toISOString(),
        onboardingComplete: false
      };

      setDoc(userDocRef, userData, { merge: true })
        .catch(async () => {
          const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'write',
            requestResourceData: userData,
          });
          errorEmitter.emit('permission-error', permissionError);
        });

      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Signed up with Google. Welcome to AIthlete!",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err: any) {
      let message = "Failed to sign up with Google.";
      if (err.code === 'auth/unauthorized-domain') {
        message = "This domain is not authorized for Google Sign-in.";
      }
      setError(message);
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl px-4 py-12">
        <Card className="w-full max-w-md glass-card rounded-3xl border-none shadow-2xl p-10 text-center space-y-6">
          <div className="flex justify-center">
             <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-14 h-14 text-emerald-600" />
             </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold text-emerald-600 uppercase tracking-tight">Account Created!</h2>
            <p className="text-muted-foreground font-medium italic">Redirecting to your performance lab...</p>
          </div>
          <div className="flex justify-center pt-4">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
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
            <CardTitle className="font-headline text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>Join 10,000+ athletes optimizing their human potential.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="rounded-xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="rounded-xl h-11"
              />
            </div>
            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full h-11 bg-primary hover:bg-primary/90 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </div>
              ) : "Sign Up"}
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

          <Button variant="outline" onClick={handleGoogleSignUp} disabled={loading} className="w-full h-11 rounded-xl font-bold border-2 hover:bg-muted/50 transition-colors">
             Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center border-t p-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
