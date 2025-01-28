// types/auth.ts
import type { User } from "firebase/auth";

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    signInWithEmailPassword: (email: string, password: string) => Promise<void>;
    signUpWithEmailPassword: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    sendPasswordResetEmail: (email: string) => Promise<void>;
    isAdmin: boolean;
}