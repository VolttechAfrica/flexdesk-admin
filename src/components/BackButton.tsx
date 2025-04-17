import React from 'react';
import { ArrowLeft } from 'lucide-react'; // Importing the back arrow icon
import styles from '@styles/Verification.module.css';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = "Back to Previous Page", style }) => (
  <div className={styles.back_button_container}>
    <button onClick={onClick} className={styles.back_button} style={style}>
      <ArrowLeft className={styles.back_arrow_icon}/><span>{label}</span>
    </button>
  </div>
);

export default BackButton;
