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

async function extractAndProcess() {
  const metadata = await sharp(inputImagePath).metadata();
  const imgWidth = metadata.width;
  const imgHeight = metadata.height;
  console.log(`Original image size: ${imgWidth}x${imgHeight}`);

  // The 6 logo regions based on 2 rows x 3 columns layout:
  // Top Row:
  // 1. Primary vertical Logo (top-left)
  // 2. Siren (top-middle)
  // 3. Word Mark (top-right)
  // Bottom Row:
  // 4. Primary horizontal Logo (bottom-left)
  // 5. Telugu Logo (bottom-middle)
  // 6. Telugu horizontal Logo (bottom-right)

  // Sub-box definitions (excluding text labels at the bottom of each cell)
  // Total width: imgWidth, height: imgHeight
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

  // Colors:
  // Dark Logo Color: Pantone Cherry Mahogany #5E332E (RGB: 94, 51, 46)
  // Light Logo Color: Pantone Silver Birch #FAF8F5 (RGB: 250, 248, 245) or White #FFFFFF

  for (const box of logoBoxes) {
    console.log(`\nProcessing ${box.name}...`);
    // 1. Crop region
    const croppedBuffer = await sharp(inputImagePath)
      .extract(box.extract)
      .toBuffer();

    // 2. Get raw pixels to calculate background color and alpha mask
    const { data, info } = await sharp(croppedBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const w = info.width;
    const h = info.height;
    const channels = info.channels; // 4 (RGBA)

    // Find background color from corners
    const cornerSamples = [
      0, 1, 2, w - 1, w - 2,
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

    // Create dark version buffer (Cherry Mahogany #5E332E)
    const darkBuffer = Buffer.alloc(w * h * 4);
    // Create light version buffer (Silver Birch #FAF8F5 / White)
    const lightBuffer = Buffer.alloc(w * h * 4);

    let minX = w, maxX = 0, minY = h, maxY = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Color distance from background
        const dist = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );

        // Alpha calculation: threshold around 25 with smooth anti-aliased edge
        let alpha = 0;
        if (dist > 25) {
          alpha = Math.min(255, Math.round(((dist - 25) / 50) * 255));
        }

        if (alpha > 30) {
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

    // Add small padding to tight bounding box
    const pad = 12;
    const cropLeft = Math.max(0, minX - pad);
    const cropTop = Math.max(0, minY - pad);
    const cropWidth = Math.min(w - cropLeft, (maxX - minX) + pad * 2);
    const cropHeight = Math.min(h - cropTop, (maxY - minY) + pad * 2);

    const darkPath = path.join(outputDir, `${box.id}-dark.png`);
    const lightPath = path.join(outputDir, `${box.id}-light.png`);

    // Save dark version trimmed
    await sharp(darkBuffer, { raw: { width: w, height: h, channels: 4 } })
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(darkPath);

    // Save light version trimmed
    await sharp(lightBuffer, { raw: { width: w, height: h, channels: 4 } })
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(lightPath);

    console.log(`✓ Saved ${box.id}-dark.png & ${box.id}-light.png (${cropWidth}x${cropHeight})`);
  }

  console.log('\nUploading all extracted logos to GCS (gs://yesj/assets/logos/)...');
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
    if (f.endsWith('.png')) {
      const filePath = path.join(outputDir, f);
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

extractAndProcess().catch(err => console.error('Error:', err));
