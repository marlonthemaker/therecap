"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
    children: React.ReactNode;
}
const AuthModal: React.FC<AuthModalProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {user ? "Sign Out?" : "Sign In Required"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {user ? "Are you sure you want to sign out?" : "You must sign in to view this content"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>
            Cancel
        </AlertDialogCancel>
          <AlertDialogAction>
            {user ? (
              <form action="/api/auth" method="POST">
                <Button type="submit" variant="destructive">
                Sign out
              </Button>
              </form>
            ) : (
              <Button onClick={() => window.location.href='/login'}>
                Go to login
              </Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthModal;