import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
import styles from "@styles/FormInput.module.css";
import style from "@styles/Login.module.css";

export default function FormInput({
  type = "text",
  placeholder = "",
  label = "",
  value,
  onChange,
  required = true,
  ...rest
}) {
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState("");

  const handleBlur = () => {
    const trimmedValue = value.trim();

    const validators = {
      email: (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      text: (val) => val.length > 0,
      password: (val) => val.length >= 8,
      number: (val) => !isNaN(val),
      phone: (val) => /^\d{10}$/.test(val),
    };

    const validateFn = validators[type];

    if (validateFn) {
      setIsValid(validateFn(trimmedValue));
      if (!validateFn(trimmedValue)) {
        setError(
          type === "email"
            ? "Invalid email address"
            : type === "password"
            ? "Password must be at least 8 characters long"
            : type === "phone"
            ? "Phone number must be 10 digits long"
            : "This field is required"
        );
      } else {
        setError("");
      }
    } else {
      setIsValid(null);
    }
  };

  const handleFocus = () => {
    setIsValid(null);
  };

  const Icon =
    isValid === null ? null : isValid ? (
      <Check className={styles.check_icon} />
    ) : (
      <AlertCircle className={styles.error_icon} />
    );
  return (
    <div className={styles.form_group}>
      <label htmlFor={label} className={style.form_label}>
        {label}
      </label>
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
        <div className={styles.input_icon} title={error}>
          {Icon && <div className={styles.input_icon}>{Icon}</div>}
        </div>
      </div>
    </div>
  );
}
