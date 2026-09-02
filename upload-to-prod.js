import fs from 'fs';

const PROD_URL = 'https://tanahkitchen.com';
const ADMIN_PASS = 'tanah@2025';

async function uploadToProd() {
  console.log('Logging in to production...');
  const loginRes = await fetch(`${PROD_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: ADMIN_PASS })
  });
  
  if (!loginRes.ok) {
    console.error('Failed to login. Status:', loginRes.status, await loginRes.text());
    process.exit(1);
  }
  
  const { token } = await loginRes.json();
  const authHeaders = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  console.log('✅ Successfully logged in! Uploading data...');
  
  // Upload Menu Items
  const menuData = JSON.parse(fs.readFileSync('./src/data/menu.json', 'utf8'));
  const menuRes = await fetch(`${PROD_URL}/api/menu`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({ items: menuData.items })
  });
  console.log('Menu Upload Response:', await menuRes.json());
  
  console.log('Uploading Bento Data...');
  const bentoData = JSON.parse(fs.readFileSync('./server/data/bento.json', 'utf8'));
  const bentoRes = await fetch(`${PROD_URL}/api/bento`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify(bentoData.items)
  });
  console.log('Bento Upload Response:', await bentoRes.json());
  
  console.log('Uploading Gallery Data...');
  const galleryData = JSON.parse(fs.readFileSync('./src/data/gallery.json', 'utf8'));
  const galleryRes = await fetch(`${PROD_URL}/api/gallery`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({ items: galleryData.items })
  });
  console.log('Gallery Upload Response:', await galleryRes.json());
  
  console.log('All data successfully uploaded to TanahKitchen.com!');
}

uploadToProd().catch(console.error);
