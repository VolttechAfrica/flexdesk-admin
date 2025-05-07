"use client"

import { AppLayout } from "@components/dashboard/dashboard-layout"
import styles from "@styles/Dashboard-content.module.css"
import { useEffect, useState } from "react"
import Cookie from "js-cookie"
import type { UserData } from "@type/user"
import DashboardCard from "@components/ui/card"
import { User, ArrowUp, Clipboard, Folder, Upload, Check } from "lucide-react"
import card_icon from "@styles/card.module.css"
import { useCandidate, useExamSession, useModules } from "@hooks/useDashboard"
import InternalError from "@components/dashboard/internalerror"
import { getCurrentUserFromCookie } from "@utilities/auth"
import { useRouter } from "next/navigation"
import loader from "@styles/Loader.module.css"
import UpcomingExams from "@components/dashboard/upcoming-exams"
import  RecentActivity  from "@components/dashboard/recent-activity"
import QuickActionsButton from "@components/dashboard/quick-action"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [hasError, setHasError] = useState(false)

  const {
    totalImported,
    newUnimportedCount,
    lastImportedAgo,
    isLoading: isCandidateLoading,
    error: candidateError,
  } = useCandidate()

  const { totalSessions, sessionError, isSessionLoading, totalUploadedSessions, sessions } = useExamSession()

  const { totalModules, moduleError, isModuleLoading, module } = useModules()

  const router = useRouter()

  const isLoading = isCandidateLoading || isSessionLoading || isModuleLoading
  const error = candidateError || sessionError || moduleError

  const retry = () => {
    setHasError(false)
  }

  const handleReport = async (error: Error) => {
    router.push(
      `/support?error=${encodeURIComponent(error?.message || "Unable to load dashboard resources")}&referer=dashboard`,
    )
  }

  // Load user data only once on component mount
  useEffect(() => {
    const token = Cookie.get("loginToken")
    const user = getCurrentUserFromCookie()

    if (token && user) {
      setCurrentUser(user)
    } else {
      setHasError(true)
    }
  }, [])

  // Handle errors from data fetching hooks
  useEffect(() => {
    if (error && !hasError) {
      setHasError(true)
    }
  }, [error, hasError])

  if (isLoading) {
    return (
      <AppLayout>
        <div className={loader.loading_container}>
          <span className={loader.spinner}></span>
          <h1 className={loader.loading_title}>Loading...</h1>
        </div>
      </AppLayout>
    )
  }

  if (hasError) {
    return (
      <AppLayout>
        <InternalError error={new Error("Failed to load user resources")} reset={retry} onReport={handleReport} />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className={styles.dashboard_container}>
        <h1 className={styles.dashboard_title}>{currentUser ? `Welcome, ${currentUser.name} 👋` : ""}</h1>

        <div className={styles.stats_grid}>
          <DashboardCard
            count={totalImported}
            text={`Changes ${lastImportedAgo}`}
            cardLabel="Total Imported Candidates"
            change={newUnimportedCount.toString()}
            cardIcon={User}
            iconBg={card_icon.userIcon}
            subIcon={newUnimportedCount > 0 ? ArrowUp : Check}
          />

          <DashboardCard
            count={totalSessions}
            text="Without changes"
            cardLabel="Total number of Session"
            cardIcon={Clipboard}
            iconBg={card_icon.examIcon}
            subIcon={Check}
          />

          <DashboardCard
            count={totalModules}
            text="Without changes"
            cardLabel="Total number of Modules"
            cardIcon={Folder}
            iconBg={card_icon.moduleIcon}
            subIcon={Check}
          />

          <DashboardCard
            count={totalUploadedSessions}
            text="Without changes"
            cardLabel="Total uploaded sessions"
            cardIcon={Upload}
            iconBg={card_icon.uploadIcon}
            subIcon={Check}
          />          
        </div>

        <div className={styles.component_container}>
            <div className={styles.grid}>
              <UpcomingExams sessions={sessions} isSessionLoading={isSessionLoading} sessionError={sessionError}/>
              <RecentActivity />
            </div>
        </div>
        <QuickActionsButton 
        Sessions={sessions}
        Subjects={module}
        />
      </div>
    </AppLayout>
  )
}
