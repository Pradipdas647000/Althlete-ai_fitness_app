
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

/**
 * Hydration-safe Client Provider that ensures the initial client render
 * matches the server render, then initializes Firebase.
 */
export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const firebase = useMemo(() => {
    if (typeof window !== 'undefined') {
      return initializeFirebase();
    }
    return null;
  }, []);

  // During SSR and the very first client render, 'mounted' is false.
  // This ensures the HTML matches exactly, preventing hydration errors.
  if (!mounted || !firebase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-headline font-bold text-primary animate-pulse tracking-widest uppercase">
            Initializing AIthlete...
          </p>
        </div>
      </div>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={firebase.firebaseApp}
      firestore={firebase.firestore}
      auth={firebase.auth}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
};
