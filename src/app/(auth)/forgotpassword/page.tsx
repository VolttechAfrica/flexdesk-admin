"use client"

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@styles/Login.module.css";

import { useAuth } from "@hooks/useAuth";
import FormInput from "@components/auth/FormInput";
import SubmitButton from "@components/auth/SubmitButton";
import AuthLayout from "@layouts/AuthLayout";
import AuthHeader from "@components/auth/AuthHeader";


const ForgotPassword: NextPage = () => {
  
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading, error, message, clearError } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  
  return (
    <>
      <Head>
        <title>Forgot Password - FlexTest</title>
        <meta name="description" content="Reset your FlexTest password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthLayout>
        <>
       
        <AuthHeader
          title="Forgot Password"
          subtitle="Enter your email and we’ll send you a reset link."
        />
        <form className={styles.login_form} onSubmit={handleSubmit}>
          {error && <div className={styles.error} onClick={clearError}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

            <FormInput
              type="email"
              placeholder="Enter your email"
              value={email}
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

          <SubmitButton
            isLoading={isLoading}
            text="Send Reset Link"
            loadingText="Sending..."
          />
        </form>

        <div className={styles.signup_link}>
          Remember your password?{" "}
          <Link href="/login" className={styles.link}>
            Back to login
          </Link>
        </div>
        </>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
