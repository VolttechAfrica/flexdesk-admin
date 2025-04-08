import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "@styles/Login.module.css";

import { useAuth } from "@hooks/useAuth";
import FormInput from "@components/FormInput";
import SubmitButton from "@components/Button";
import AuthLayout from "@layouts/AuthLayout";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <Head>
        <title>Sign In - FlexTest</title>
        <meta name="description" content="Sign in to your flexTest account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthLayout>
        {/* Heading */}
        <div className={styles.welcome_heading}>
          <h1>Login</h1>
          <p className={styles.subtitle}>
            Welcome back! Please enter your details
          </p>
        </div>

        {/* Form */}
        <form className={styles.login_form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.form_group}>
            <label htmlFor="username" className={styles.form_label}>
              Email Address
            </label>
            <FormInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password" className={styles.form_label}>
              Password
            </label>
            <FormInput
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.form_options}>
            <div className={styles.remember_me}>
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember_me" className={styles.checkbox_label}>
                Remember me
              </label>
            </div>
            <div>
              <Link href="/forgot-password" className={styles.forgot_password}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <SubmitButton
            isLoading={isLoading}
            text="Log In"
            loadingText="Logging in..."
          />
        </form>

        <div className={styles.signup_link}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?{" "}
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;

