"use client";
import type { User } from 'firebase/auth';
import type { AuthContextProps } from '@/types/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const router = useRouter();

  const db = getFirestore(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
        if (user) {
            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userDocRef)
            if(userDoc.exists()) {
                const userData = userDoc.data()
                 setIsAdmin(userData.isAdmin || false);
            } else {
              setIsAdmin(false)
            }
        } else {
            setIsAdmin(false)
        }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const signInWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed In Successfully")
    } catch (error: any) {
       toast.error("Authentication Error", { description: error.message })
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
        await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signed Up Successfully")
    } catch (error: any) {
        toast.error("Authentication Error", {description: error.message})
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error: any) {
      toast.error("Authentication Error", {description: error.message})
    } finally {
      setLoading(false);
    }
  };

    const sendPasswordResetEmail = async (email: string) => {
        setLoading(true);
        try {
             await sendPasswordResetEmail(email);
             toast.success("Password reset email sent");
        } catch(error: any) {
            toast.error("Error sending password reset", { description: error.message})
        } finally {
            setLoading(false)
        }
    }


    const signOut = async () => {
     setLoading(true)
      try {
          await fetch('/api/auth', { method: "POST" })
          router.push('/')
      } catch(error: any) {
         toast.error("Error signing out", { description: error.message})
      } finally {
          setLoading(false)
      }
    };

  const authContextValue = {
    user,
    loading,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signInWithGoogle,
    signOut,
      sendPasswordResetEmail,
      isAdmin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthProvider;

// import { auth } from '@/lib/firebase'
// import type { User } from 'firebase/auth'
// import type { ReactNode } from 'react'
// import { createContext, useContext, useEffect, useState } from 'react'

// type UserContextType = {
//   user: User | null
// }

// const UserContext = createContext<UserContextType>({ user: null })

// export const useUser = () => {
//   return useContext(UserContext)
// }

// type Props = {
//   children: ReactNode
// }

// export const UserProvider = ({ children }: Props) => {
//   const [user, setUser] = useState<User | null>(null)

//   useEffect(() => {
//     const unsub = auth.onAuthStateChanged((user) => {
//       setUser(user)
//     })

//     return unsub
//   }, [])

//   return (
//     <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
//   )
// }
