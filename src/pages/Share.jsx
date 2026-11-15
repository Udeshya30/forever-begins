import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Check, Heart, ImagePlus, Upload, X } from 'lucide-react';
import { preparePhoto } from '../utils/preparePhoto';
import { MAX_ORIGINAL_BYTES, MAX_PHOTOS_PER_BATCH } from '../utils/uploadLimits';
import './Share.scss';

export const Share = () => {
  const [queue, setQueue] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [note, setNote] = useState('');
  const [connection, setConnection] = useState('checking');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const objectUrls = useRef(new Map());

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/upload', { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then((result) => setConnection(result.ready ? 'ready' : 'closed'))
      .catch(() => { if (!controller.signal.aborted) setConnection('closed'); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const urls = objectUrls.current;
    return () => { urls.forEach((url) => URL.revokeObjectURL(url)); urls.clear(); };
  }, []);

  const addPhotos = (files) => {
    if (busy) return;
    setMessage('');
    const additions = [];
    for (const file of files) {
      if (queue.length + additions.length >= MAX_PHOTOS_PER_BATCH) {
        setMessage('You can share up to 10 photos at a time. Send these, then choose more.');
        break;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > MAX_ORIGINAL_BYTES) {
        setMessage('Please choose JPG, PNG, or WebP photos smaller than 25 MB each.');
        continue;
      }
      const fingerprint = `${file.name}:${file.size}:${file.lastModified}`;
      if (queue.some((item) => item.fingerprint === fingerprint) || additions.some((item) => item.fingerprint === fingerprint)) continue;
      const id = crypto.randomUUID();
      const preview = URL.createObjectURL(file);
      objectUrls.current.set(id, preview);
      additions.push({ id, fingerprint, file, preview, status: 'ready', error: '' });
    }
    setQueue((previous) => [...previous, ...additions]);
  };

  const removePhoto = (id) => {
    if (busy) return;
    URL.revokeObjectURL(objectUrls.current.get(id));
    objectUrls.current.delete(id);
    setQueue((previous) => previous.filter((item) => item.id !== id));
  };
  const updatePhoto = (id, changes) => setQueue((previous) => previous.map((item) => item.id === id ? { ...item, ...changes } : item));
  const pendingCount = queue.filter((item) => item.status !== 'sent').length;
  const sentCount = queue.length - pendingCount;

  const submitPhotos = async (event) => {
    event.preventDefault();
    if (busy || connection !== 'ready' || !pendingCount) return;
    setBusy(true);
    setMessage('');
    try {
      for (const item of queue.filter((photo) => photo.status !== 'sent')) {
        try {
          updatePhoto(item.id, { status: 'preparing', error: '' });
          const photo = await preparePhoto(item.file);
          updatePhoto(item.id, { status: 'sending' });
          let response;
          try {
            response = await fetch('/api/upload', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...photo, uploadId: item.id, guestName, note }),
              signal: AbortSignal.timeout(60000),
            });
          } catch { throw new Error('We couldn’t confirm receipt. Please retry this photo.'); }
          const result = await response.json().catch(() => ({}));
          if (!response.ok || result.ok !== true) throw new Error(result.error || 'This photo couldn’t be sent. Please retry.');
          updatePhoto(item.id, { status: 'sent' });
        } catch (error) { updatePhoto(item.id, { status: 'error', error: error.message }); }
      }
    } finally { setBusy(false); }
  };

  return (
    <main className="share-page">
      <header className="share-intro container">
        <Heart size={26} strokeWidth={1.2} aria-hidden="true" />
        <p className="eyebrow">A little of the day, through your eyes</p>
        <h1>Some memories<br /><em>only you can capture.</em></h1>
        <p>A candid smile, a family moment, a little joy between the celebrations.<br />We’d love to see the photos you took.</p>
      </header>
      <section className="share-content">
        <div className="container share-grid">
          <form className="share-form" onSubmit={submitPhotos} aria-label="Share your photos">
            <h2>Share a memory</h2>
            {connection === 'checking' && <p className="share-notice" role="status">Getting ready to receive your photos…</p>}
            {connection === 'closed' && <p className="share-notice" role="status">Photo sharing is opening soon. Please come back a little later.</p>}
            <fieldset disabled={busy}>
              <label className="share-field">Your name <span>(optional)</span><input autoComplete="name" maxLength={80} value={guestName} onChange={(event) => setGuestName(event.target.value)} placeholder="So we know who to thank" /></label>
              <label className="share-field">A little note <span>(optional)</span><textarea maxLength={500} rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Anything you’d like to tell us about these photos?" /></label>
              <div className={`share-dropzone ${busy ? 'is-busy' : ''}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addPhotos(Array.from(event.dataTransfer.files)); }}>
                <ImagePlus size={32} strokeWidth={1.2} aria-hidden="true" />
                <label htmlFor="guest-photos" className="share-picker">Choose your photos<input id="guest-photos" className="share-file-input" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => { addPhotos(Array.from(event.target.files)); event.target.value = ''; }} /></label>
                <p>or drop them here</p><small>JPG, PNG or WebP · up to 10 photos at a time</small>
              </div>
              {message && <p className="share-form-message" role="alert">{message}</p>}
              {queue.length > 0 && <ul className="share-photo-list" aria-label="Selected photos">
                {queue.map((item) => <li key={item.id}>
                  <img src={item.preview} alt="Selected photo preview" width="64" height="64" />
                  <div><span className="share-photo-name">{item.file.name}</span><span className={`share-photo-status status-${item.status}`}>{({ ready: 'Ready to share', preparing: 'Preparing photo…', sending: 'Sending…', sent: 'Received with thanks', error: item.error })[item.status]}</span></div>
                  {item.status === 'sent' ? <Check size={20} aria-label="Sent" /> : <button type="button" onClick={() => removePhoto(item.id)} aria-label={`Remove ${item.file.name} from selection`}><X size={18} /></button>}
                </li>)}
              </ul>}
              <button className="btn btn-primary share-submit" type="submit" disabled={busy || connection !== 'ready' || !pendingCount}><Upload size={17} aria-hidden="true" />{busy ? 'Sharing your memories…' : queue.some((item) => item.status === 'error') ? 'Retry remaining photos' : 'Send our way'}</button>
            </fieldset>
            <div className="share-result" aria-live="polite" aria-atomic="true">
              {sentCount > 0 && <p>{sentCount} {sentCount === 1 ? 'photo received' : 'photos received'}—thank you! We’ll take a look before adding them to our albums.</p>}
            </div>
            {sentCount > 0 && !pendingCount && !busy && <button type="button" className="share-more" onClick={() => { queue.forEach((item) => removePhoto(item.id)); setMessage(''); }}>Choose more photos</button>}
          </form>
          <aside className="share-aside">
            <Camera size={28} strokeWidth={1.2} aria-hidden="true" />
            <h2>From your camera<br /><em>to our keepsakes.</em></h2>
            <ol><li><span>01</span><div><h3>Pick your favourites</h3><p>A few photos or a whole little collection. Every perspective is welcome.</p></div></li><li><span>02</span><div><h3>Send them to us</h3><p>Your photos go to Udeshya and Bhanu first.</p></div></li><li><span>03</span><div><h3>Find them in our albums</h3><p>Once we’ve had a look, we’ll choose the memories to share in the gallery.</p></div></li></ol>
            <Link to="/gallery">Back to our photo album →</Link>
          </aside>
        </div>
      </section>
    </main>
  );
};
export default Share;
