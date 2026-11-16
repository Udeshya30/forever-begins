export function sendPhoto(payload, { onProgress = () => {}, onTransferred = () => {}, createRequest = () => new XMLHttpRequest() } = {}) {
  return new Promise((resolve, reject) => {
    const request = createRequest();
    request.open('POST', '/api/upload');
    request.setRequestHeader('Content-Type', 'application/json');
    request.timeout = 60000;
    request.upload.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        onProgress(Math.min(100, Math.round(event.loaded / event.total * 100)));
      }
    };
    // Transfer completion is separate from the server confirming its Drive write.
    request.upload.onload = () => { onProgress(100); onTransferred(); };
    request.onload = () => {
      let result;
      try { result = JSON.parse(request.responseText); }
      catch { reject(new Error('We couldn’t confirm receipt. Please retry this photo.')); return; }
      if (request.status >= 200 && request.status < 300 && result?.ok === true) resolve(result);
      else reject(new Error(typeof result?.error === 'string' ? result.error : 'This photo couldn’t be sent. Please retry.'));
    };
    const unconfirmed = () => reject(new Error('We couldn’t confirm receipt. Please retry this photo.'));
    request.onerror = unconfirmed;
    request.ontimeout = unconfirmed;
    request.onabort = unconfirmed;
    request.send(JSON.stringify(payload));
  });
}
