"use client"

import { useState, useEffect } from "react"
import styles from "@styles/recent-activity.module.css"
import { useActivities } from "@hooks/useDashboard"
import { formatDistanceToNowStrict } from "date-fns"




export default function RecentActivity() {
  const { activities, isActivityLoading, activityError } = useActivities()
  const [activityHistory, setActivityHistory] = useState([])


  useEffect(() => {
    if (activities && activities.length > 0) {
      // Sort activities by date (newest first) and take the first 5
      const sortedActivities = [...activities]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)

      setActivityHistory(sortedActivities)
    }
  }, [activities])


  

  // Format date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Format time to display only the time part
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

 

  return (
    <div className={styles.content_card}>
      <div className={styles.activity_header}>
        <h3 className={styles.content_title}>Recent Activity</h3>
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

      <div className={styles.activity_table_container}>
        {isActivityLoading ? (
          <div className={styles.loading}>Loading recent activity...</div>
        ) : activityError ? (
          <div className={styles.error}>Failed to load activities</div>
        ) : activityHistory && activityHistory.length > 0 ? (
          <table className={styles.activity_table}>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {activityHistory.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.activity} <br/><p>-{formatDistanceToNowStrict(item.date)}</p></td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatTime(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.no_data}>No recent activities</div>
        )}
      </div>
    </div>
  )
}
