import Image from "next/image"
import Link from "next/link"
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "@styles/Login.module.css";
import { useAuth } from "@hooks/useAuth";
import FormInput from "@components/FormInput";
import SubmitButton from "@components/Button";

const Login: NextPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useAuth();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login(email, password);
    };

  return (
    <div className={styles.login_container}>
    <Head>
        <title>Sign In - FlexTest</title>
        <meta name="description" content="Sign in to your flexTest account" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
      {/* Left Side - Login Form */}
      <div className={styles.login_form_container}>
        <div className={styles.login_form_content}>
          {/* Logo */}
          <div className={styles.logo_container}>
            <Image
              src="/images/logo.png"
              alt="FlexTest Logo"
              width={150}
              height={28}
              priority
            />
          </div>

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
                <input id="remember_me" name="remember_me" type="checkbox" className={styles.checkbox} />
                <label htmlFor="remember_me" className={styles.checkbox_label}>
                  Remember me
                </label>
              </div>
              <div>
                <Link href="#" className={styles.forgot_password}>
                  Forgot Password?
                </Link>
              </div>
            </div>

            <SubmitButton isLoading={isLoading} text="Log In" loadingText="Logging in..." />
          </form>

          <div className={styles.signup_link}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{" "}
            <Link href="#" className={styles.link}>
              Sign up
            </Link>
          </div>
        </div>

        <div className={styles.footer_links}>
          <Link href="#" className={styles.footer_link}>
            FAQ
          </Link>{" "}
          |
          <Link href="#" className={styles.footer_link}>
            Features
          </Link>{" "}
          |
          <Link href="#" className={styles.footer_link}>
            Support
          </Link>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className={styles.info_panel}>
        <div className={styles.info_content}>
          <h2 className={styles.info_heading}>About FlexTest</h2>
          <p className={styles.info_text}>
            FlexTest provides a secure, scalable, and AI-enhanced e-testing solution that runs on a local server,
            ensuring full control over data privacy. It enables institutions to conduct exams efficiently with real-time
            monitoring and secure test environments.
          </p>

          <h2 className={styles.info_heading}>Features</h2>
          <ul className={styles.feature_list}>
            <li className={styles.feature_item}>
              <div className={styles.bullet_point}>•</div>
              <p>Automated AI proctoring with real-time monitoring to prevent cheating</p>
            </li>
            <li className={styles.feature_item}>
              <div className={styles.bullet_point}>•</div>
              <p>Secure test environment with browser lockdown and screen recording</p>
            </li>
            <li className={styles.feature_item}>
              <div className={styles.bullet_point}>•</div>
              <p>Comprehensive analytics and reporting for performance assessment</p>
            </li>
          </ul>
        </div>

        {/* Farm Illustration */}
        <div className={styles.illustration_container}>
          <Image
            src="/images/farm_illustration.avif"
            alt="Farm Illustration"
            width={700} 
            height={250}
            className={styles.illustration}
            style={{ filter: "blur(4px)" }}
          />
        </div>
      </div>
    </div>
  )
}

export default Login;
