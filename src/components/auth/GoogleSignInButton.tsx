"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const GoogleSignInButton: React.FC = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <Button
      onClick={signInWithGoogle}
        disabled={loading}
      variant="outline"
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;