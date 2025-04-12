
import { NextPage } from "next";
import Link from "next/link";
import styles from "@styles/NotFound.module.css";


const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorWrapper}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Oops! Page Not Found</h2>
        <p className={styles.description}>
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <Link href="/" passHref>
          <button className={styles.homeButton}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
