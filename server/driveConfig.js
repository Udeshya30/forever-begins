export function resolveDriveFolderId(value = '') {
  const trimmed = value.trim();
  if (/^[\w-]{10,200}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:' || url.hostname !== 'drive.google.com') return '';
    return url.pathname.match(/^\/drive\/(?:u\/\d+\/)?folders\/([\w-]{10,200})\/?$/)?.[1] || '';
  } catch { return ''; }
}
