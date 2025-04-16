'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '@styles/Login.module.css';
import { useAuth } from '@hooks/useAuth';
import FormInput from '@components/FormInput';
import SubmitButton from '@components/Button';
import AuthLayout from '@layouts/AuthLayout';
import { useRouter } from 'next/navigation';
import AuthHeader from '@components/AuthHeader';


const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

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
        <AuthHeader
          title="Welcome back!"
          subtitle="Please enter your details to login."
        />

        {/* Form */}
        <form className={styles.login_form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          
            <FormInput
              type="email"
              placeholder="Enter your email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          
            <FormInput
              type="password"
              placeholder="Enter your password"
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
              <Link href="/forgotpassword" className={styles.forgot_password}>
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
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;

