import React from 'react';
import styles from '@styles/Verification.module.css';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <div className={styles.back_button_container}>
    <button onClick={onClick} className={styles.back_button}>
      Back to Previous Page
    </button>
  </div>
);

export default BackButton;
