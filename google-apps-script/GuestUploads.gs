// Deploy this as an Apps Script web app executing as the Drive folder owner.
// Configure UPLOAD_SECRET (32+ characters) in Project Settings > Script properties.
// This script only writes to the existing Misc child of the wedding folder.
var MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
var MAX_UPLOADS_PER_DAY = 300;

function uploadJson_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function miscFolder_() {
  var properties = PropertiesService.getScriptProperties();
  var parentId = properties.getProperty('WEDDING_PARENT_ID');
  var miscId = properties.getProperty('MISC_FOLDER_ID');
  if (!parentId || !miscId) throw new Error('Configure the wedding parent and Misc folder IDs in Script properties.');
  var folder = DriveApp.getFolderById(miscId);
  var parents = folder.getParents();
  while (parents.hasNext()) {
    if (parents.next().getId() === parentId) return folder;
  }
  throw new Error('The upload destination must remain inside the wedding parent folder.');
}

function checkSetup() {
  var secret = PropertiesService.getScriptProperties().getProperty('UPLOAD_SECRET');
  if (!secret || secret.length < 32) throw new Error('Set UPLOAD_SECRET to a random value of at least 32 characters in Script properties.');
  var folder = miscFolder_();
  console.log('Ready to receive guest photos in: ' + folder.getName());
}

function setupUploads() {
  miscFolder_();
  var properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('UPLOAD_SECRET')) properties.setProperty('UPLOAD_SECRET', Utilities.getUuid() + Utilities.getUuid());
  checkSetup();
  console.log('Copy UPLOAD_SECRET from Project Settings > Script properties into DRIVE_UPLOAD_SECRET on your website server. Keep it private.');
}

function doPost(e) {
  var lock;
  try {
    var properties = PropertiesService.getScriptProperties();
    var secret = properties.getProperty('UPLOAD_SECRET');
    if (!secret || secret.length < 32) throw new Error('Upload connection is not configured.');
    if (!e || !e.postData || e.postData.contents.length > 4200000) throw new Error('Invalid request.');
    var data = JSON.parse(e.postData.contents);
    if (data.secret !== secret) throw new Error('Not authorized.');
    if (!/^[a-f\d-]{36}$/i.test(data.uploadId || '') || data.mimeType !== 'image/jpeg') throw new Error('Invalid photo.');
    if (typeof data.data !== 'string' || data.data.length > Math.ceil(MAX_UPLOAD_BYTES / 3) * 4 || !/^[A-Za-z\d+/]+={0,2}$/.test(data.data)) throw new Error('Invalid photo.');
    var bytes = Utilities.base64Decode(data.data);
    if (bytes.length < 4 || bytes.length > MAX_UPLOAD_BYTES || (bytes[0] & 255) !== 255 || (bytes[1] & 255) !== 216 || (bytes[2] & 255) !== 255) throw new Error('Invalid photo.');
    var guest = typeof data.guestName === 'string' ? data.guestName.trim().slice(0, 80) : '';
    var note = typeof data.note === 'string' ? data.note.trim().slice(0, 500) : '';
    var filename = 'guest-' + data.uploadId.toLowerCase() + '.jpg';
    lock = LockService.getScriptLock();
    lock.waitLock(15000);
    var folder = miscFolder_();
    // Retry safely even if an earlier response was lost. Moving the file for review
    // does not lose the receipt retained in Script properties.
    var receiptKey = 'receipt:' + data.uploadId.toLowerCase();
    var receipt = properties.getProperty(receiptKey);
    if (receipt) return uploadJson_({ ok: true, fileId: JSON.parse(receipt).fileId });
    var existing = folder.getFilesByName(filename);
    if (existing.hasNext()) return uploadJson_({ ok: true, fileId: existing.next().getId() });
    var today = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd');
    var counter = JSON.parse(properties.getProperty('uploadCounter') || '{}');
    var count = counter.day === today ? counter.count : 0;
    if (count >= MAX_UPLOADS_PER_DAY) throw new Error('Today’s upload limit has been reached.');
    var file = folder.createFile(Utilities.newBlob(bytes, 'image/jpeg', filename));
    file.setDescription('Guest: ' + (guest || 'Anonymous guest') + '\nMessage: ' + note + '\nReceived through Forever Begins for review.');
    properties.setProperty(receiptKey, JSON.stringify({ fileId: file.getId(), at: Date.now() }));
    properties.setProperty('uploadCounter', JSON.stringify({ day: today, count: count + 1 }));
    // Retain retry receipts for seven days to keep script-property storage bounded.
    var stored = properties.getProperties();
    Object.keys(stored).forEach(function(key) {
      if (key.indexOf('receipt:') === 0 && JSON.parse(stored[key]).at < Date.now() - 7 * 86400000) properties.deleteProperty(key);
    });
    return uploadJson_({ ok: true, fileId: file.getId() });
  } catch (error) {
    return uploadJson_({ ok: false, error: 'The photo could not be received. Please try again later.' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
