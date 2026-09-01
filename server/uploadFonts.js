import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const srcDir = 'C:/Users/hamee/Downloads/OnlineWebFonts_COM_9d0416db183be76f281a39608a232746/Neuzon W00 Regular';
const destDir = path.join(__dirname, '../public/fonts');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy TTF
fs.copyFileSync(path.join(srcDir, 'Neuzon W00 Regular.ttf'), path.join(destDir, 'Neuzon-Regular.ttf'));

// Copy WOFF2, WOFF, TTF from Web Fonts
const webFontsDir = path.join(srcDir, 'Web Fonts');
if (fs.existsSync(webFontsDir)) {
  const files = fs.readdirSync(webFontsDir);
  for (const file of files) {
    if (file.endsWith('.woff2')) {
      fs.copyFileSync(path.join(webFontsDir, file), path.join(destDir, 'Neuzon-Regular.woff2'));
    } else if (file.endsWith('.woff')) {
      fs.copyFileSync(path.join(webFontsDir, file), path.join(destDir, 'Neuzon-Regular.woff'));
    }
  }
}

console.log('✓ Local font files copied to public/fonts/');

// Upload to GCS
async function uploadToGcs() {
  const gcsBucketName = process.env.GCS_BUCKET_NAME || 'yesj';
  const gcsOptions = {};
  if (process.env.GCS_PROJECT_ID) gcsOptions.projectId = process.env.GCS_PROJECT_ID;
  if (process.env.GCS_CLIENT_EMAIL && process.env.GCS_PRIVATE_KEY) {
    gcsOptions.credentials = {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n')
    };
  }

  const storage = new Storage(gcsOptions);
  const bucket = storage.bucket(gcsBucketName);

  const fontFiles = ['Neuzon-Regular.woff2', 'Neuzon-Regular.woff', 'Neuzon-Regular.ttf'];
  for (const f of fontFiles) {
    const filePath = path.join(destDir, f);
    if (fs.existsSync(filePath)) {
      const destPath = `assets/fonts/${f}`;
      let contentType = 'font/woff2';
      if (f.endsWith('.woff')) contentType = 'font/woff';
      if (f.endsWith('.ttf')) contentType = 'font/ttf';

      await bucket.upload(filePath, {
        destination: destPath,
        metadata: {
          contentType,
          cacheControl: 'public, max-age=31536000, immutable'
        }
      });
      console.log(`✓ Uploaded to GCS: https://storage.googleapis.com/${gcsBucketName}/${destPath}`);
    }
  }
}

uploadToGcs().catch(err => console.error('GCS Upload error:', err.message));
