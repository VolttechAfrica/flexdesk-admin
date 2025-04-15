'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCountdown } from '@hooks/useCountdown';
import { useVerificationTimer } from '@hooks/useVerificationTimer';
import { useVerificationCode } from '@hooks/useVerificationCode';
import CodeInput from '@components/CodeInput';
import ResendButton from '@components/ResendButton';
import SubmitButton from '@components/Button';
import BackButton from '@components/BackButton';
import AuthLayout from '@layouts/AuthLayout';
import styles from '@styles/Verification.module.css';
import style from '@styles/Login.module.css';
import { useAuth } from '@hooks/useAuth';
import Cookie from 'js-cookie';


export default function VerificationCode() {
    const router = useRouter();
    
    const {isLoading, otyVerification, message, userData, error, forgotPassword, clearError } = useAuth();
  
    const { countdown, isResendDisabled, setCountdown, setIsResendDisabled } = useCountdown(30);
    const { expiryTime } = useVerificationTimer(900); // 15 minutes expiration
    const { code, handleChange, handleKeyDown } = useVerificationCode();

    const [user, setUser] = useState(userData);
    


    const handleResend = async() => {
      setCountdown();
      setIsResendDisabled(true);
      await forgotPassword(user?.email || '');
    }; 
  
    const handleVerify = async() => {
      const verificationCode = code.join('');
      await otyVerification(user.id || '', verificationCode);
    };

  const handleBack = () => router.back();
  

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('userData'));
    if (!userData) setUser(users); 
    const token = Cookie.get('resetToken');
    if (!token || !users) {
      router.replace('/login');
    }
  }, [router, userData]);

  return (
    <AuthLayout>
      <div className={styles.verification_container}>
        <div className={styles.welcome_heading}>
          <h1 className={styles.verification_title}>Verification Code</h1>
          <p className={styles.subtitle}>Enter the verification code sent to your email.</p>
        </div>

        {error && <div className={style.error} onClick={clearError}>{error}</div>}
          {message && <div className={style.success}>{message}</div>}

        <p className={styles.verification_subtitle}>We&apos;ve sent a code to <span className={styles.resend_button}>{user?.email || ''}</span></p>

        <CodeInput code={code} handleChange={handleChange} handleKeyDown={handleKeyDown} />

        <p className={styles.expiry_text}>Your link expires in {expiryTime}</p>

        <SubmitButton text="Verify" onClick={handleVerify} isLoading={isLoading} loadingText="Verifying..." />

        <ResendButton
          isResendDisabled={isResendDisabled}
          countdown={countdown}
          onClick={handleResend}
        />

        <BackButton onClick={handleBack} />
      </div>
    </AuthLayout>
  );
}
