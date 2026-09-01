import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const inputImagePath = 'C:/Users/hamee/Downloads/tanah.png';
const outputDir = path.join(__dirname, '../public/assets/logos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processTanahLogo() {
  if (!fs.existsSync(inputImagePath)) {
    console.error('File does not exist:', inputImagePath);
    return;
  }
  const metadata = await sharp(inputImagePath).metadata();
  console.log('tanah.png Metadata:', metadata.width, 'x', metadata.height, 'format:', metadata.format, 'hasAlpha:', metadata.hasAlpha);

  // Read raw pixels
  const { data, info } = await sharp(inputImagePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // Detect background color or transparency
  // Check corners
  const cornerIndices = [0, w - 1, (h - 1) * w, h * w - 1];
  let bgR = 0, bgG = 0, bgB = 0, bgA = 0;
  cornerIndices.forEach(idx => {
    bgR += data[idx * 4];
    bgG += data[idx * 4 + 1];
    bgB += data[idx * 4 + 2];
    bgA += data[idx * 4 + 3];
  });
  bgR /= cornerIndices.length;
  bgG /= cornerIndices.length;
  bgB /= cornerIndices.length;
  bgA /= cornerIndices.length;

  console.log('Corner sample RGBA:', bgR, bgG, bgB, bgA);

  const darkBuffer = Buffer.alloc(w * h * 4);
  const lightBuffer = Buffer.alloc(w * h * 4);

  let minX = w, maxX = 0, minY = h, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      let alpha = a;

      // If background is opaque solid (not already transparent)
      if (bgA > 200) {
        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );
        if (dist <= 20) {
          alpha = 0;
        } else {
          alpha = Math.min(255, Math.round(Math.pow((dist - 20) / 45, 1.2) * 255));
        }
      }

      if (alpha > 25) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      // Dark Logo (#5E332E)
      darkBuffer[i] = 94;     // R
      darkBuffer[i + 1] = 51; // G
      darkBuffer[i + 2] = 46; // B
      darkBuffer[i + 3] = alpha;

      // Light Logo (#FAF8F5)
      lightBuffer[i] = 250;     // R
      lightBuffer[i + 1] = 248; // G
      lightBuffer[i + 2] = 245; // B
      lightBuffer[i + 3] = alpha;
    }
  }

  const pad = 16;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(w - cropLeft, (maxX - minX) + pad * 2);
  const cropHeight = Math.min(h - cropTop, (maxY - minY) + pad * 2);

  console.log(`Cropping logo to: ${cropWidth}x${cropHeight} (from ${cropLeft}, ${cropTop})`);

  // Save as main brand logo (both dark & light variants)
  const lightPath = path.join(outputDir, 'logo-primary-horizontal-light.png');
  const darkPath = path.join(outputDir, 'logo-primary-horizontal-dark.png');
  const mainTanahLightPath = path.join(outputDir, 'tanah-logo-light.png');
  const mainTanahDarkPath = path.join(outputDir, 'tanah-logo-dark.png');

  await sharp(lightBuffer, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(lightPath);

  await sharp(darkBuffer, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(darkPath);

  // Copy to specific names
  fs.copyFileSync(lightPath, mainTanahLightPath);
  fs.copyFileSync(darkPath, mainTanahDarkPath);

  // Also save raw original trimmed PNG
  await sharp(inputImagePath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, 'tanah-raw.png'));

  console.log('✓ Saved processed tanah logo variants locally in public/assets/logos/');

  // Upload to GCS
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

  const uploadFiles = [
    'logo-primary-horizontal-light.png',
    'logo-primary-horizontal-dark.png',
    'tanah-logo-light.png',
    'tanah-logo-dark.png',
    'tanah-raw.png'
  ];

  for (const f of uploadFiles) {
    const filePath = path.join(outputDir, f);
    if (fs.existsSync(filePath)) {
      const destPath = `assets/logos/${f}`;
      await bucket.upload(filePath, {
        destination: destPath,
        metadata: {
          contentType: 'image/png',
          cacheControl: 'public, max-age=31536000, immutable'
        }
      });
      console.log(`✓ Uploaded to GCS: https://storage.googleapis.com/${gcsBucketName}/${destPath}`);
    }
  }
}

processTanahLogo().catch(err => console.error('Error:', err));
