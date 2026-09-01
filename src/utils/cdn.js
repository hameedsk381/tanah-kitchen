export const CDN_BASE = import.meta.env.VITE_CDN_BASE || 'https://storage.googleapis.com/yesj';
export const getCdnUrl = (path) => {
  if (!path) return path;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : /;
  return ${CDN_BASE};
}