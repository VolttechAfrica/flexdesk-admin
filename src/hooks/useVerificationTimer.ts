import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


const VERIFICATION_START_KEY = "verificationStartTime"
const RESEND_START_KEY = "resendStartTime"

export const useVerificationTimer = () => {
  const router = useRouter()
  const [expirySeconds, setExpirySeconds] = useState(900)
  const [expiryTime, setExpiryTime] = useState("14:59")
  const [countdown, setCountdown] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  useEffect(() => {
    const now = Date.now()

    const startTime = parseInt(localStorage.getItem(VERIFICATION_START_KEY) || "") || now
    const expiryEndTime = startTime + 900000

    if (!localStorage.getItem(VERIFICATION_START_KEY)) {
      localStorage.setItem(VERIFICATION_START_KEY, startTime.toString())
    }

    const resendStart = parseInt(localStorage.getItem(RESEND_START_KEY) || "") || now
    const resendEnd = resendStart + 30000

    if (!localStorage.getItem(RESEND_START_KEY)) {
      localStorage.setItem(RESEND_START_KEY, resendStart.toString())
    }

    const interval = setInterval(() => {
      const current = Date.now()

      const secondsLeft = Math.max(0, Math.floor((expiryEndTime - current) / 1000))
      setExpirySeconds(secondsLeft)
      const minutes = Math.floor(secondsLeft / 60)
      const seconds = secondsLeft % 60
      setExpiryTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`)

      if (secondsLeft === 0) {
        localStorage.removeItem(VERIFICATION_START_KEY)
        clearInterval(interval)
        router.push("/login")
      }

      const resendLeft = Math.max(0, Math.floor((resendEnd - current) / 1000))
      setCountdown(resendLeft)
      setIsResendDisabled(resendLeft > 0)

      if (resendLeft === 0) {
        localStorage.removeItem(RESEND_START_KEY)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  const resetResendTimer = () => {
    const now = Date.now()
    localStorage.setItem(RESEND_START_KEY, now.toString())
    setCountdown(30)
    setIsResendDisabled(true)
  }

  return {
    expiryTime,
    countdown,
    isResendDisabled,
    resetResendTimer,
  }
}
