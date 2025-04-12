"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@styles/Verification.module.css";
import SubmitButton from "@components/Button";
import AuthLayout from "@layouts/AuthLayout";

const EXPIRY_DURATION = 900; // 15 minutes
const RESEND_DELAY = 30; // seconds

const getStoredTimestamp = (key: string) => {
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) : null;
};

const storeTimestamp = (key: string) => {
  localStorage.setItem(key, Date.now().toString());
};

export default function VerificationCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [countdown, setCountdown] = useState(RESEND_DELAY);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [expirySeconds, setExpirySeconds] = useState(EXPIRY_DURATION);
  const [expiryTime, setExpiryTime] = useState("15:00");

  // Resend countdown
  useEffect(() => {
    const storedResendTime = getStoredTimestamp("resendStart");
    if (storedResendTime) {
      const secondsPassed = Math.floor((Date.now() - storedResendTime) / 1000);
      const remaining = RESEND_DELAY - secondsPassed;
      if (remaining > 0) {
        setCountdown(remaining);
        setIsResendDisabled(true);
      } else {
        setIsResendDisabled(false);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  // Expiry countdown
  useEffect(() => {
    const storedExpiryTime = getStoredTimestamp("expiryStart");
    if (storedExpiryTime) {
      const secondsPassed = Math.floor((Date.now() - storedExpiryTime) / 1000);
      const remaining = EXPIRY_DURATION - secondsPassed;
      if (remaining > 0) {
        setExpirySeconds(remaining);
      } else {
        router.push("/login");
      }
    } else {
      storeTimestamp("expiryStart");
    }
  }, [router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (expirySeconds > 0) {
      timer = setTimeout(() => {
        setExpirySeconds((prev) => prev - 1);
        const minutes = Math.floor(expirySeconds / 60);
        const seconds = expirySeconds % 60;
        setExpiryTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      }, 1000);
    } else {
      router.push("/login");
    }
    return () => clearTimeout(timer);
  }, [expirySeconds, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 4) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(RESEND_DELAY);
    setIsResendDisabled(true);
    storeTimestamp("resendStart");
    // Optionally trigger resend logic here
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    console.log("Verifying code:", verificationCode);
    // Call verify endpoint
  };

  const handleBack = () => router.back();

  return (
    <AuthLayout>
      <div className={styles.verification_container}>
        <div className={styles.welcome_heading}>
          <h1 className={styles.verification_title}>Verification Code</h1>
          <p className={styles.subtitle}>Enter the verification code sent to your email.</p>
        </div>

        <p className={styles.verification_subtitle}>
          We&apos;ve sent a code to <span className={styles.resend_button}>john@example.com</span>
        </p>

        <div className={styles.code_input_container}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={styles.code_input}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        <p className={styles.expiry_text}>Your link expires in {expiryTime}</p>

        <div className={styles.button_container}>
          <SubmitButton
            text="Verify"
            onClick={handleVerify}
            isLoading={false}
            loadingText="Verifying..."
          />
        </div>

        <div className={styles.resend_container}>
          <span>Didn’t receive the code? </span>
          <button className={styles.resend_button} onClick={handleResend} disabled={isResendDisabled}>
            {isResendDisabled ? `Resend (${countdown}s)` : "Resend"}
          </button>
        </div>

        <div className={styles.back_button_container}>
          <button onClick={handleBack} className={styles.back_button}>
            Back to Previous Page
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
