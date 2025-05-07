import useSWR from "swr"
import { apiService } from "@services/api/apiService"
import { API_URL, REMOTE_URL } from "@config/constants"
import { formatDistanceToNowStrict } from "date-fns"
import {getCurrentUserFromCookie} from "@utilities/auth"


const fetchImportedCandidates = () => apiService.get(API_URL, "/candidates")
const fetchOnlineCandidates = () => apiService.get(REMOTE_URL, "/candidates")
const fetchSessions = () => apiService.get(API_URL, "/exam/sessions")
const fetchModules = () => apiService.get(API_URL, "/modules")
const fetchActivities = () => apiService.get(API_URL, `/user/activities/${getCurrentUserFromCookie()?.id}`)

export const useCandidate = () => {
  const {
    data: imported,
    error: importedError,
    isLoading: isImportedLoading,
  } = useSWR("imported-candidates", fetchImportedCandidates)

  const {
    data: online,
    error: onlineError,
    isLoading: isOnlineLoading,
  } = useSWR("online-candidates", fetchOnlineCandidates, {
    refreshInterval: 0, // Sets auto-refresh interval in ms. Set to 0 to disable.
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnReconnect: true,
    dedupingInterval: 120000, // only re-fetch once per minute max
  })

  const importedCandidates = imported?.data ?? []
  const onlineCandidates = online?.data ?? []

  const totalImported = importedCandidates.length

  // Find latest createdAt in imported candidates
  const latestImportedDate =
    importedCandidates.length > 0
      ? new Date(Math.max(...importedCandidates.map((c: any) => new Date(c.createdAt).getTime())))
      : null

  const newUnimportedCount = onlineCandidates.length - importedCandidates.length

  const lastImportedAgo = latestImportedDate
    ? formatDistanceToNowStrict(latestImportedDate, { addSuffix: true })
    : "No imports yet"

  return {
    importedCandidates,
    totalImported,
    newUnimportedCount,
    lastImportedAt: latestImportedDate,
    lastImportedAgo,
    isLoading: isImportedLoading || isOnlineLoading,
    error: importedError || onlineError,
  }
}

export const useExamSession = () => {
  const {
    data,
    error: sessionError,
    isLoading: isSessionLoading,
  } = useSWR("sessions", fetchSessions, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnReconnect: true,
    dedupingInterval: 120000,
  })
  const sessions = data?.data ?? []

  return {
    sessions,
    totalSessions: sessions.length,
    totalActiveSessions: sessions.filter((s: any) => s.status === "SCHEDULED").length,
    totalProgressSessions: sessions.filter((s: any) => s.status === "IN_PROGRESS").length,
    totalCompletedSessions: sessions.filter((s: any) => s.status === "COMPLETED").length,
    totalCancelledSessions: sessions.filter((s: any) => s.status === "CANCELLED").length,
    totalUploadedSessions: sessions.filter((s: any) => s.status === "UPLOADED").length,
    isSessionLoading,
    sessionError,
  }
}

export const useModules = () => {
  const {
    data: module,
    error: moduleError,
    isLoading: isModuleLoading,
  } = useSWR("modules", fetchModules, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnReconnect: true,
    dedupingInterval: 120000,
  })
  return {
    module: module?.data,
    totalModules: module?.data?.length ?? 0,
    isModuleLoading,
    moduleError,
  }
}

export const useActivities = () => {
  const {
    data,
    error: activityError,
    isLoading: isActivityLoading,
  } = useSWR("activities", fetchActivities, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnReconnect: true,
    dedupingInterval: 120000,
  })
  return {
    activities: data?.data ?? [],
    isActivityLoading,
    activityError
  }
}
