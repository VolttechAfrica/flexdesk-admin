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
import AuthHeader from '@components/AuthHeader';
import ForbiddenPageAccessDenied from '@components/page/403-Forbidden-Page-Access-Denied';


export default function VerificationCode() {
    const router = useRouter();
    
    const {isLoading, otpVerification, message, userData, error, forgotPassword, clearError } = useAuth();
  
    const { countdown, isResendDisabled, setCountdown, setIsResendDisabled } = useCountdown(30);
    const { expiryTime } = useVerificationTimer(900); // 15 minutes expiration
    const { code, handleChange, handleKeyDown } = useVerificationCode();

    const [user, setUser] = useState(userData);

    const token = Cookie.get('resetToken');
    


    const handleResend = async() => {
      setCountdown();
      setIsResendDisabled(true);
      await forgotPassword(user?.email || '');
    }; 
  
    const handleVerify = async() => {
      const verificationCode = code.join('');
      await otpVerification(user.id || '', verificationCode);
    };

  const handleBack = () => router.back();
  

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('userData'));
    if (!userData) setUser(users); 
  }, [router, userData]);

  return (
    <>    { token ? (
      <AuthLayout>
      <div className={styles.verification_container}>
        <AuthHeader
          title="Verification Code"
          subtitle="Enter the verification code sent to your email."
        />

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
    ) : (
      
      <ForbiddenPageAccessDenied />
    )

    }
    </>
  );
}
