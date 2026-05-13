
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useDoc } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, User, Settings as SettingsIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { data: profile, loading: profileLoading } = useDoc(user ? doc(db!, "users", user.uid) : null);
  
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    fitnessLevel: "beginner",
    weightKg: 0,
    heightCm: 0,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || user?.displayName || "",
        bio: profile.bio || "",
        fitnessLevel: profile.fitnessLevel || "beginner",
        weightKg: profile.weightKg || 0,
        heightCm: profile.heightCm || 0,
      });
    }
  }, [profile, user]);

  const handleSave = async () => {
    if (!user || !db) return;
    try {
      // Update Firebase Auth Profile
      await updateProfile(user, { displayName: formData.displayName });
      
      // Update Firestore Profile
      await updateDoc(doc(db, "users", user.uid), {
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      toast({
        title: "Profile Updated",
        description: "Your biological parameters and profile settings have been saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
      });
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Manage your identity and biometric data.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 glass-card rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Profile
            </CardTitle>
            <CardDescription>Update your public identity and bio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b">
              <Avatar className="w-20 h-20 ring-4 ring-primary/10">
                <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/200/200`} />
                <AvatarFallback>{formData.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="rounded-xl">Change Photo</Button>
                <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-widest">JPG, PNG or GIF • Max 1MB</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  value={formData.displayName} 
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled className="rounded-xl bg-pearl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio / Motivation</Label>
              <textarea 
                value={formData.bio} 
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full min-h-[100px] bg-pearl border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="What drives your performance?"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl border-none shadow-xl h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Biometrics</CardTitle>
            <CardDescription>Crucial for AI plan accuracy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Fitness Level</Label>
              <Select 
                value={formData.fitnessLevel} 
                onValueChange={(val) => setFormData({...formData, fitnessLevel: val})}
              >
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
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
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="ghost" className="rounded-xl">Cancel</Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 rounded-xl gap-2 font-bold px-8 h-12 shadow-xl shadow-primary/20">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
