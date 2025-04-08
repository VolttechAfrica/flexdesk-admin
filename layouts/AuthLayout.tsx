import styles from "@styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";

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

        <div className={styles.footer_links}>
          <Link href="#" className={styles.footer_link}>
            FAQ
          </Link>{" "}
          |
          <Link href="#" className={styles.footer_link}>
            Features
          </Link>{" "}
          |
          <Link href="#" className={styles.footer_link}>
            Support
          </Link>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className={styles.info_panel}>
        <div className={styles.info_content}>
          <h2 className={styles.info_heading}>About FlexTest</h2>
          <p className={styles.info_text}>
            FlexTest provides a secure, scalable, and AI-enhanced e-testing
            solution that runs on a local server, ensuring full control over
            data privacy. It enables institutions to conduct exams efficiently
            with real-time monitoring and secure test environments.
          </p>

          <h2 className={styles.info_heading}>Features</h2>
          <ul className={styles.feature_list}>
            <li className={styles.feature_item}>
              <div className={styles.bullet_point}>•</div>
              <p>
                Automated AI proctoring with real-time monitoring to prevent
                cheating
              </p>
            </li>
            <li className={styles.feature_item}>
              <div className={styles.bullet_point}>•</div>
              <p>
                Secure test environment with browser lockdown and screen
                recording
              </p>
            </li>
            <li className={styles.feature_item}>
              <div className={styles.bullet_point}>•</div>
              <p>
                Comprehensive analytics and reporting for performance assessment
              </p>
            </li>
          </ul>
        </div>

        {/* Farm Illustration */}
        <div className={styles.illustration_container}>
          <Image
            src="/images/farm_illustration.avif"
            alt="Farm Illustration"
            width={700}
            height={250}
            className={styles.illustration}
            style={{ filter: "blur(4px)" }}
          />
        </div>
      </div>
    </div>
  );
}
