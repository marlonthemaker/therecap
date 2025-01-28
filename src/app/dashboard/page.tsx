"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';
import TodoList from '@/components/todo/TodoList';

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  if(loading) {
    return <p>Loading...</p>
  }

  if(!user) {
    router.replace('/login')
    return null;
  }

    return (
      <div className="flex items-center justify-center min-h-screen p-4 flex-col">
            <h1>My Todo List</h1>
            <TodoList />
            <AuthModal>
              <button>Sign Out</button>
             </AuthModal>
      </div>
  )
}

export default DashboardPage;