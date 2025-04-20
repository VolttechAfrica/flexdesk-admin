"use client"
import Image from "next/image"
import styles from "@styles/Forbidden.module.css"
import BasicButton from "@components/auth/BasicButton"

const ForbiddenPageAccessDenied = () => {
  const goBack = () => {
    window.history.back()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/403.svg"
            alt="403 Forbidden Access"
            width={600}
            height={300}
            className={styles.image}
            priority
          />
        </div>

        <h1 className={styles.title}>We are Sorry...</h1>

        <div className={styles.message}>
          <p>The page you&apos;re trying to access has restricted access.</p>
          <p>Please refer to your system administrator</p>
        </div>

        <BasicButton
            label="Go Back"
            onClick={goBack}
            className={styles.button}
            />
      </div>
    </div>
  )
}

export default ForbiddenPageAccessDenied
