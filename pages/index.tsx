import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { useAuth } from "../hooks/useAuth";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In - Flexdesk</title>
        <meta name="description" content="Sign in to your flexdesk account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="FlexDesk Logo"
              width={150}
              height={25}
            />
          </div>
          <div className={styles.loginForm}>
            <h1>Sign In</h1>
            <p className={styles.subtitle}>
              Welcome back! Please enter your details
            </p>

            <form onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.options}>
                <label className={styles.checkbox}>
                  <input type="checkbox" />
                  <span>Remember for 30 Days</span>
                </label>
                <a href="#" className={styles.forgotPassword}>
                  Forgot password
                </a>
              </div>

              <button
                type="submit"
                className={styles.signInButton}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <div className={styles.socialButtons}>
                <button className={styles.googleButton}>
                  <Image
                    src="/icons/icons-google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Sign up with Google
                </button>
              </div>

              <p className={styles.signup}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account? <a href="#">Sign up</a>
              </p>
            </form>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.welcomeContent}>
            <h1>Welcome back!</h1>
            <h2>
              Please sign in to your <span>Flexdesk</span> account
            </h2>
            <p>
              Empower your educational journey with our AI-powered platform,
              designed for teachers, students, and school owners alike.
            </p>
            <div className={styles.statsImage}>
              <Image
                src="/images/Infographics.jpg"
                alt="Statistics"
                width={450}
                height={250}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
