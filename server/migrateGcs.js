import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.GCS_PROJECT_ID || process.env.GCP_PROJECT_ID;
const clientEmail = process.env.GCS_CLIENT_EMAIL || process.env.GCP_CLIENT_EMAIL;
let privateKey = process.env.GCS_PRIVATE_KEY || process.env.GCP_PRIVATE_KEY;
if (privateKey) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}
const bucketName = process.env.GCS_BUCKET_NAME || process.env.GCP_BUCKET_NAME || 'yesj';

console.log('Connecting to GCS...');
console.log('Project ID:', projectId);
console.log('Client Email:', clientEmail);
console.log('Bucket Name:', bucketName);

const storage = new Storage({
  projectId,
  credentials: {
    client_email: clientEmail,
    private_key: privateKey
  }
});

const bucket = storage.bucket(bucketName);

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.webp': return 'image/webp';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.gif': return 'image/gif';
    case '.pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
}

function getAllFiles(dir, remotePrefix = 'assets') {
  let fileList = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const localPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fileList = fileList.concat(getAllFiles(localPath, `${remotePrefix}/${entry.name}`));
    } else if (entry.isFile()) {
      fileList.push({
        localPath,
        remotePath: `${remotePrefix}/${entry.name}`,
        contentType: getMimeType(localPath)
      });
    }
  }
  return fileList;
}

async function uploadFileWithRetry(fileItem) {
  const { localPath, remotePath, contentType } = fileItem;
  try {
    await bucket.upload(localPath, {
      destination: remotePath,
      metadata: {
        contentType,
        cacheControl: 'public, max-age=31536000, immutable'
      }
    });
    console.log(`✓ Uploaded: ${remotePath}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed: ${remotePath} - ${err.message}`);
    return false;
  }
}

// Parallel pool runner
async function pool(items, concurrency, fn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = await fn(items[currentIndex]);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function run() {
  const assetsDir = path.resolve(process.cwd(), 'public/assets');
  console.log('Collecting files from:', assetsDir);
  const files = getAllFiles(assetsDir, 'assets');
  console.log(`Total files to upload: ${files.length}. Starting parallel upload (concurrency: 12)...`);

  const startTime = Date.now();
  const results = await pool(files, 12, uploadFileWithRetry);
  const successful = results.filter(Boolean).length;
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n🎉 BATCH UPLOAD COMPLETE in ${elapsed}s!`);
  console.log(`Successfully uploaded ${successful} / ${files.length} assets to Google Cloud Storage (gs://${bucketName}/assets/)!`);
}

run().catch(console.error);
