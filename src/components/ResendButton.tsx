import React from 'react';
import styles from '@styles/Verification.module.css';

interface ResendButtonProps {
  isResendDisabled: boolean;
  countdown: number;
  onClick: () => void;
}

const ResendButton: React.FC<ResendButtonProps> = ({ isResendDisabled, countdown, onClick }) => (
  <div className={styles.resend_container}>
    <span>Didn&apos;t receive the code? </span>
    <button
      className={styles.resend_button}
      onClick={onClick}
      disabled={isResendDisabled}
    >
      {isResendDisabled ? `Resend (${countdown}s)` : "Resend"}
    </button>
  </div>
);

export default ResendButton;
