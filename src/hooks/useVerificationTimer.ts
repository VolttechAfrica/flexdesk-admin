import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';


const EXPIRY_KEY = 'verification_expiry_start';

export const useVerificationTimer = (initialSeconds: number) => {
  const [expiryTime, setExpiryTime] = useState('');
  const { clearError } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(EXPIRY_KEY);
    const now = Date.now();

    let start = stored ? parseInt(stored, 10) : now;

    if (!stored) {
      localStorage.setItem(EXPIRY_KEY, start.toString());
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(initialSeconds - elapsed, 0);

      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      setExpiryTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(EXPIRY_KEY);
        clearError();
        router.replace('/login');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds, router, clearError]);

  return { expiryTime };
};
