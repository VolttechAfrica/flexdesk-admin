"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@layouts/AuthLayout";
import styles from "@styles/Login.module.css";
import SubmitButton from "@components/auth/SubmitButton";
import FormInput from "@components/auth/FormInput";
import BackButton from "@components/auth/BackButton";
import { useAuth } from "@hooks/useAuth";
import Cookie from "js-cookie";
import AuthHeader from "@components/auth/AuthHeader";
import toast, {Toaster} from "react-hot-toast";
import ForbiddenPageAccessDenied from "@components/page/403-Forbidden-Page-Access-Denied";

const ChangePassword = () => {
  const router = useRouter();
  const { isLoading, resetPassword, error, message, clearError, userData } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(userData);


  const token = Cookie.get('resetToken');


  useEffect(() => {
      const users = JSON.parse(localStorage.getItem('userData'));
      if (!userData) setUser(users); 
    }, [router, userData]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    if (!user?.id) return toast.error("User information is missing. Please try again.");

    await resetPassword(user.id, newPassword);
  };

  const handleBack = () => router.replace("/login");

  return (
    <>
    {token ? (
        <AuthLayout>
        <Toaster />
        <AuthHeader
          title="Change Password"
          subtitle="Set your new password below."
        />

        <form
          className={styles.login_form}
          onSubmit={handleChangePassword}
          style={{ paddingBottom: "15px" }}
        >
          {error && (
            <div className={styles.error} onClick={clearError}>
              {error}
            </div>
          )}
          {message && <div className={styles.success}>{message}</div>}
          <FormInput
            type="password"
            placeholder="Enter your password"
            value={newPassword}
            label="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton
            isLoading={isLoading}
            text="Change Password"
            loadingText="Updating..."
          />
        </form>

        <BackButton onClick={handleBack} />
    </AuthLayout>
    ): (
        <ForbiddenPageAccessDenied />
      )}
    </>
  );
};

export default ChangePassword;
