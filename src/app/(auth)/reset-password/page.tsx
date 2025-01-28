import React from "react";
import AuthForm from "@/components/auth/AuthForm";
const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
          <AuthForm type="reset-password"/>
      </div>
  )
}

export default ResetPasswordPage;