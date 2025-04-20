import React from 'react';
import styles from '@styles/Verification.module.css';

interface CodeInputProps {
  code: string[];
  handleChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, handleChange, handleKeyDown }) => {
  return (
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
  );
};

export default CodeInput;
