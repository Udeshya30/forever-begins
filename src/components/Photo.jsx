import { useState } from 'react';

export function Photo({ src, alt, className = '', ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={`photo-unavailable ${className}`} role="img" aria-label={alt}>Photo temporarily unavailable</span>;
  return <img src={src} alt={alt} className={className} decoding="async" {...props} onError={() => setFailed(true)} />;
}
