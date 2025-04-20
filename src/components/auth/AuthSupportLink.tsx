import Link from "next/link"
import styles from "@styles/Login.module.css"

const AuthSupportLink = () => {
    return (
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
    )
}

export default AuthSupportLink;
