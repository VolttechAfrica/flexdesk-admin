"use client"

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@styles/Login.module.css";

import { useAuth } from "@hooks/useAuth";
import FormInput from "@components/FormInput";
import SubmitButton from "@components/Button";
import AuthLayout from "@layouts/AuthLayout";

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
        <div className={styles.welcome_heading}>
          <h1>Forgot Password</h1>
          <p className={styles.subtitle}>
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form className={styles.login_form} onSubmit={handleSubmit}>
          {error && <div className={styles.error} onClick={clearError}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <div className={styles.form_group}>
            <label htmlFor="email" className={styles.form_label}>
              Email Address
            </label>
            <FormInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

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
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
