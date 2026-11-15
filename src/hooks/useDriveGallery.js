import { useEffect, useState } from 'react';

let cached = null;
let checkedAt = 0;
let pending = null;

async function loadGallery() {
  if (cached && Date.now() - checkedAt < 30000) return cached;
  if (!pending) {
    pending = fetch('/api/gallery', { signal: AbortSignal.timeout(25000) })
      .then(async (response) => {
        if (!response.ok) throw new Error('Album unavailable');
        const data = await response.json();
        if (!Array.isArray(data.images) || !data.portraits) throw new Error('Invalid album');
        cached = data;
        checkedAt = Date.now();
        return data;
      }).finally(() => { pending = null; });
  }
  return pending;
}

export function useDriveGallery() {
  const [data, setData] = useState(cached);
  const [status, setStatus] = useState(cached ? 'ready' : 'loading');
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const next = await loadGallery();
        if (active) { setData(next); setStatus('ready'); }
      } catch {
        if (active) setStatus('error');
      }
    };
    refresh();
    const interval = setInterval(() => { if (!document.hidden) refresh(); }, 60000);
    const onVisibility = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { active = false; clearInterval(interval); document.removeEventListener('visibilitychange', onVisibility); };
  }, [retryCount]);
  return {
    images: data?.images || [], portraits: data?.portraits || {}, status,
    retry: () => { checkedAt = 0; setStatus('loading'); setRetryCount((count) => count + 1); },
  };
}
