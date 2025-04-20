import styles from "@styles/Login.module.css";
import Image from "next/image";
import AuthRightColumn from "@components/auth/AuthRightColumn";
import AuthSupportLink from "@components/auth/AuthSupportLink";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.login_form_content}>
            {/* Logo */}
            <div className={styles.logo_container}>
                <Image
                src="/images/logo.png"
                alt="FlexTest Logo"
                width={150}
                height={28}
                priority
                />
            </div>
            {children}
        </div>

        <AuthSupportLink />
      </div>

      {/* Right Side - Info Panel */}
      <AuthRightColumn />
      
    </div>
  );
}
