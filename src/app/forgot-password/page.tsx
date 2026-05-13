
"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Loader2, ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError("Failed to send reset email. Please check the address.");
    } finally {
      setLoading(false);
    }
  };

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
            <CardTitle className="font-headline text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>We'll send you a link to get back into your account.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              {error && <p className="text-xs text-destructive font-medium">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full h-11 bg-primary hover:bg-primary/90 rounded-xl font-bold">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <MailCheck className="text-emerald-600 w-8 h-8" />
              </div>
              <p className="text-sm font-medium">Check your email for a link to reset your password.</p>
              <Button variant="outline" onClick={() => setSuccess(false)} className="rounded-xl">
                Try a different email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
