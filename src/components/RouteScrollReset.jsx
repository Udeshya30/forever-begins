import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const RouteScrollReset = () => {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, key]);

  return null;
};
