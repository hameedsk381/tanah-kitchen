import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const inputImagePath = 'C:/Users/hamee/.gemini/antigravity/brain/c6167f26-d8a7-40b9-8ee7-49d64d74d943/.user_uploaded/media_1788256747147.png';
const outputDir = path.join(__dirname, '../public/assets/logos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateSuperResLogos() {
  const metadata = await sharp(inputImagePath).metadata();
  const imgWidth = metadata.width;
  const imgHeight = metadata.height;

  const colWidth = Math.floor(imgWidth / 3);
  const rowHeight = Math.floor(imgHeight / 2);

  const logoBoxes = [
    {
      id: 'logo-primary-vertical',
      name: 'Primary vertical Logo',
      extract: {
        left: Math.round(colWidth * 0.05),
        top: Math.round(rowHeight * 0.10),
        width: Math.round(colWidth * 0.90),
        height: Math.round(rowHeight * 0.72)
      }
    },
    {
      id: 'logo-siren',
      name: 'Siren',
      extract: {
        left: Math.round(colWidth * 1.05),
        top: Math.round(rowHeight * 0.12),
        width: Math.round(colWidth * 0.90),
        height: Math.round(rowHeight * 0.70)
      }
    },
    {
      id: 'logo-wordmark',
      name: 'Word Mark',
      extract: {
        left: Math.round(colWidth * 2.05),
        top: Math.round(rowHeight * 0.20),
        width: Math.round(colWidth * 0.90),
        height: Math.round(rowHeight * 0.58)
      }
    },
    {
      id: 'logo-primary-horizontal',
      name: 'Primary horizontal Logo',
      extract: {
        left: Math.round(colWidth * 0.03),
        top: Math.round(rowHeight * 1.08),
        width: Math.round(colWidth * 0.94),
        height: Math.round(rowHeight * 0.74)
      }
    },
    {
      id: 'logo-telugu',
      name: 'Telugu Logo',
      extract: {
        left: Math.round(colWidth * 1.05),
        top: Math.round(rowHeight * 1.08),
        width: Math.round(colWidth * 0.90),
        height: Math.round(rowHeight * 0.74)
      }
    },
    {
      id: 'logo-telugu-horizontal',
      name: 'Telugu horizontal Logo',
      extract: {
        left: Math.round(colWidth * 2.03),
        top: Math.round(rowHeight * 1.08),
        width: Math.round(colWidth * 0.94),
        height: Math.round(rowHeight * 0.74)
      }
    }
  ];

  for (const box of logoBoxes) {
    console.log(`Generating Super-Resolution for ${box.name}...`);
    // 1. Crop region from original image
    const cropped = await sharp(inputImagePath)
      .extract(box.extract)
      .toBuffer();

    // 2. Upscale 4x with Lanczos3 to create super high density
    const upscaled = await sharp(cropped)
      .resize({
        width: box.extract.width * 4,
        kernel: sharp.kernel.lanczos3
      })
      .toBuffer();

    // 3. Extract raw pixel data
    const { data, info } = await sharp(upscaled)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const w = info.width;
    const h = info.height;

    // Corner samples for background
    const cornerSamples = [
      0, 1, 2, 3, w - 1, w - 2,
      (h - 1) * w, (h - 1) * w + 1, (h * w) - 1
    ];
    let bgR = 0, bgG = 0, bgB = 0;
    cornerSamples.forEach(idx => {
      bgR += data[idx * 4];
      bgG += data[idx * 4 + 1];
      bgB += data[idx * 4 + 2];
    });
    bgR /= cornerSamples.length;
    bgG /= cornerSamples.length;
    bgB /= cornerSamples.length;

    const darkBuffer = Buffer.alloc(w * h * 4);
    const lightBuffer = Buffer.alloc(w * h * 4);

    let minX = w, maxX = 0, minY = h, maxY = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );

        // Smooth anti-aliased alpha curve
        let alpha = 0;
        if (dist > 22) {
          alpha = Math.min(255, Math.round(Math.pow((dist - 22) / 45, 1.2) * 255));
        }

        if (alpha > 25) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }

        // Dark Logo: Pantone Cherry Mahogany #5E332E
        darkBuffer[i] = 94;
        darkBuffer[i + 1] = 51;
        darkBuffer[i + 2] = 46;
        darkBuffer[i + 3] = alpha;

        // Light Logo: Pantone Silver Birch #FAF8F5 / #FFFFFF
        lightBuffer[i] = 250;
        lightBuffer[i + 1] = 248;
        lightBuffer[i + 2] = 245;
        lightBuffer[i + 3] = alpha;
      }
    }

    const pad = 24; // 24px padding on 4x scale
    const cropLeft = Math.max(0, minX - pad);
    const cropTop = Math.max(0, minY - pad);
    const cropWidth = Math.min(w - cropLeft, (maxX - minX) + pad * 2);
    const cropHeight = Math.min(h - cropTop, (maxY - minY) + pad * 2);

    const darkPath = path.join(outputDir, `${box.id}-dark.png`);
    const lightPath = path.join(outputDir, `${box.id}-light.png`);

    // Save 4x Super-Res Dark
    await sharp(darkBuffer, { raw: { width: w, height: h, channels: 4 } })
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(darkPath);

    // Save 4x Super-Res Light
    await sharp(lightBuffer, { raw: { width: w, height: h, channels: 4 } })
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(lightPath);

    console.log(`✓ 4x Super-Res Saved: ${box.id}-dark.png & ${box.id}-light.png (${cropWidth}x${cropHeight}px)`);
  }

  console.log('\nUploading all 4x Super-Res logos to GCS...');
  await uploadToGcs();
}

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

  const files = fs.readdirSync(outputDir);
  for (const f of files) {
    if (f.endsWith('.png') || f.endsWith('.svg')) {
      const filePath = path.join(outputDir, f);
      const destPath = `assets/logos/${f}`;
      const contentType = f.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
      await bucket.upload(filePath, {
        destination: destPath,
        metadata: {
          contentType,
          cacheControl: 'public, max-age=31536000, immutable'
        }
      });
      console.log(`✓ Uploaded Super-Res to GCS: https://storage.googleapis.com/${gcsBucketName}/${destPath}`);
    }
  }
}

generateSuperResLogos().catch(err => console.error('Error:', err));
