/* eslint-disable react/no-children-prop */
"use client"

import { useState, useEffect } from "react"
import { useExamSession } from "@hooks/useDashboard"
import styles from "@styles/upcoming_exam.module.css"
import { Calendar, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Button from "@components/ui/button"


export default function UpcomingExams({
  sessions,
  isSessionLoading,
  sessionError,
}) {
  const [upcomingExams, setUpcomingExams] = useState([])


  const router = useRouter()

  const handleExamClick = (examId) => {
    router.push(`/exam/session/${examId}`)
  }
  
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      const filteredExams = sessions
        .filter((s) => s.status !== "UPLOADED")
        .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
        .slice(0, 5)

      setUpcomingExams(filteredExams)
    }
  }, [sessions])

  const getStatusClass = (status) => {
    switch (status) {
      case "SCHEDULED":
        return styles.status_scheduled
      case "IN_PROGRESS":
        return styles.status_in_progress
      case "COMPLETED":
        return styles.status_completed
      case "CANCELLED":
        return styles.status_cancelled
      case "UPLOADED":
        return styles.status_uploaded
      case "PENDING":
        return styles.status_pending
      case "APPROVED":
        return styles.status_approved
      default:
        return ""
    }
  }

  return (
    <div className={styles.content_card}>
      <div className={styles.exams_header}>
        <h3 className={styles.content_title}>Upcoming Exams</h3>
        <div className={styles.dropdown_container}>
          <button className={styles.dropdown_trigger} aria-label="Menu">
            <svg className={styles.dropdown_icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                fill="currentColor"
              />
              <path
                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                fill="currentColor"
              />
              <path
                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.exams_table_container}>
        {isSessionLoading ? (
          <div className={styles.loading}>Loading upcoming exams...</div>
        ) : sessionError ? (
          <div className={styles.error}>Failed to load exams</div>
        ) : upcomingExams && upcomingExams.length > 0 ? (
          <table className={styles.exams_table}>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingExams.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td><Link href="#" onClick={() => handleExamClick(exam.id)}>{exam.name}</Link></td>
                  <td>{new Date(exam.scheduled).toLocaleDateString()}</td>
                  <td><b>{exam.duration} mins</b></td>
                  <td>
                    <span className={`${styles.status_badge} ${getStatusClass(exam.status)}`}>{exam.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.no_exams_container}>
            <Calendar className={styles.no_exams_icon} />
            <p className={styles.no_exams_text}>No exam session available</p>
            <Button
              variant="outline"
              className={styles.create_exam_button}
              onClick={() => router.push("/exam/create")}
              children={<> <PlusCircle size={16} /> Create Exam Session</>}
            />
          </div>
        )}
      </div>
    </div>
  )
}
