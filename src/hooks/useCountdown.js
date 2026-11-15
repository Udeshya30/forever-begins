import { useState, useEffect } from 'react';
import { calculateCountdown } from '../utils/helpers';

export const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState(() => calculateCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
};

export default useCountdown;
