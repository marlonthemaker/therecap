import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <AuthForm type="signup" />
      <div className="mt-4">
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default SignupPage;