"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

interface AuthFormProps {
  type: 'login' | 'signup' | 'reset-password';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signInWithEmailPassword, signUpWithEmailPassword, loading, sendPasswordResetEmail } = useAuth();
    const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

    if (type === 'login') {
      await signInWithEmailPassword(email, password);
    } else if (type === 'signup') {
      await signUpWithEmailPassword(email, password);
    }  else if (type === 'reset-password') {
      await sendPasswordResetEmail(email)
    }
      router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
         disabled={loading}
      />
        {type !== 'reset-password' && (
            <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             disabled={loading}
        />
        )}

      <Button type="submit" disabled={loading}>
        {type === 'login' ? 'Login' : type === 'signup' ? 'Sign Up' : 'Reset Password'}
      </Button>
        {type !== 'reset-password' && (
              <p className="text-center">
                {type === 'login' ? (
                  <>
                    Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                  </>
                ) : (
                  <>
                   Already have an account? <a href="/login" className="text-blue-500">Login</a>
                 </>
               )}
             </p>
        )}
        {type === 'login' &&
         <p className="text-center">
            <a href="/reset-password" className="text-blue-500">Forgot Password?</a>
          </p>
        }
    </form>
  );
};

export default AuthForm;