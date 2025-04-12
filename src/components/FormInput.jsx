import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
import styles from "@styles/FormInput.module.css"; 

export default function FormInput({
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = true,
  ...rest
}) {
  const [isValid, setIsValid] = useState(null);

  const handleBlur = () => {
    const trimmedValue = value.trim();

    const validators = {
      email: (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      text: (val) => val.length > 0,
      password: (val) => val.length >= 6,
      number: (val) => !isNaN(val),
      phone: (val) => /^\d{10}$/.test(val),
    };

    const validateFn = validators[type];

    if (validateFn) {
      setIsValid(validateFn(trimmedValue));
    } else {
      setIsValid(null);
    }
  };

  const handleFocus = () => {
    setIsValid(null);
  }

  const Icon =
    isValid === null ? null : isValid ? (
      <Check className={styles.check_icon} />
    ) : (
      <AlertCircle className={styles.error_icon} />
    );
  return (
    <div className={styles.input_container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
        className={styles.form_input}
        {...rest}
      />
        <div className={styles.input_icon}>
          {Icon && <div className={styles.input_icon}>{Icon}</div>}
        </div>
    </div>
  );
}

