import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { resolveDriveFolderId } from '../server/driveConfig.js';

const env = loadEnv('development', process.cwd(), '');
const parentId = resolveDriveFolderId(env.GOOGLE_DRIVE_FOLDER_URL);
const miscId = resolveDriveFolderId(env.GOOGLE_DRIVE_MISC_FOLDER_URL);
const secret = env.DRIVE_UPLOAD_SECRET || '';
if (!parentId || !miscId || secret.length < 32) {
  throw new Error('Set GOOGLE_DRIVE_FOLDER_URL, GOOGLE_DRIVE_MISC_FOLDER_URL, and DRIVE_UPLOAD_SECRET (32+ characters) in .env first.');
}
const settings = { WEDDING_PARENT_ID: parentId, MISC_FOLDER_ID: miscId, UPLOAD_SECRET: secret };
let source = await readFile('google-apps-script/GuestUploads.gs', 'utf8');
source = source.replace('function setupUploads() {', 'function setupUploads() {\n  initializeUploadSettings_();');
source = source.replace('function doPost(e) {', 'function doPost(e) {\n  initializeUploadSettings_();');
source += `\n// Private bootstrap generated from .env.\nfunction initializeUploadSettings_() {\n  PropertiesService.getScriptProperties().setProperties(${JSON.stringify(settings)});\n}\n`;
await mkdir('tmp/drive-setup', { recursive: true });
await writeFile('tmp/drive-setup/GuestUploads.ready.gs', '// PRIVATE: generated from .env. Do not commit or share this file.\n' + source);
console.log('Prepared tmp/drive-setup/GuestUploads.ready.gs from .env. Configuration values were not printed.');
