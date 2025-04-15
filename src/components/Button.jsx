import styles from "@styles/FormInput.module.css";

export default function SubmitButton({ isLoading, text = "Sign in", loadingText = "Signing in...", ...rest }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={styles.login_button}
      {...rest}
    >
      {isLoading ? loadingText : text}
    </button>
  );
}
