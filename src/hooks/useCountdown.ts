import { useState, useEffect } from 'react';

const COUNTDOWN_KEY = 'countdown_start_time';

export const useCountdown = (initialSeconds: number) => {
  const [countdown, setCountdown] = useState(initialSeconds);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const resetCountdown = () => {
    const now = Date.now();
    localStorage.setItem(COUNTDOWN_KEY, now.toString());
    setCountdown(initialSeconds);
    setIsResendDisabled(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem(COUNTDOWN_KEY);
    const now = Date.now();

    if (stored) {
      const elapsed = Math.floor((now - parseInt(stored, 10)) / 1000);
      const remaining = Math.max(initialSeconds - elapsed, 0);
      setCountdown(remaining);
      setIsResendDisabled(remaining > 0);
    } else {
      localStorage.setItem(COUNTDOWN_KEY, now.toString());
    }

    const interval = setInterval(() => {

      setCountdown((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds, countdown]);

  
 

  return {
    countdown,
    isResendDisabled,
    setCountdown: resetCountdown,
    setIsResendDisabled,
  };
};
