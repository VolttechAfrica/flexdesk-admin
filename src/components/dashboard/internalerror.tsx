"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import styles from "@styles/internal.module.css"
import Button from "@components/ui/button"

interface InternalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
  onReport?: (error: Error) => Promise<void>
}

export default function InternalError({ error, reset, onReport }: InternalErrorProps) {
  const [isReporting, setIsReporting] = useState(false)
  const [reportSuccess, setReportSuccess] = useState(false)
  const [reportError, setReportError] = useState<string | null>(null)

  const handleReport = async () => {
    setIsReporting(true)
    setReportSuccess(false)
    setReportError(null)

    try {
      if (onReport) {
        await onReport(error)
        setReportSuccess(true)
      } else {
        console.warn("No onReport function provided.")
      }
    } catch (reportError) {
      console.error("Failed to report error:", reportError)
      setReportError("Failed to report the error. Please try again later.")
    } finally {
      setIsReporting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iconContainer}>
          <AlertTriangle className={styles.icon} />
        </div>

        <div className={styles.alert}>
          <h2 className={styles.alertTitle}>500 - Internal Server Error</h2>
          <p className={styles.alertDescription}>We&apos;re sorry, something went wrong on our server.</p>
        </div>

        {error.message && (
          <div className={styles.errorDetails}>
            <p className={styles.errorMessage}>{error.message}</p>
            {error.digest && <p className={styles.errorDigest}>Error ID: {error.digest}</p>}
          </div>
        )}

        <div className={styles.buttonContainer}>
        
          <Button
            onClick={reset}
            className={`${styles.button} ${styles.primaryButton}`}
            // eslint-disable-next-line react/no-children-prop
            children="Retry"
            />

          <Button
            onClick={handleReport}
            className={`${styles.button} ${styles.secondaryButton}`}
            disabled={isReporting || reportSuccess}
            // eslint-disable-next-line react/no-children-prop
            children={isReporting ? "Reporting..." : reportSuccess ? "Reported" : "Report Error"}
          />
        </div>

        {reportError && <p className={styles.reportError}>{reportError}</p>}
        {reportSuccess && <p className={styles.reportSuccess}>Error reported successfully. Thank you!</p>}
      </div>
    </div>
  )
}
