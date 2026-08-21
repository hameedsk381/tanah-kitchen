import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const DEFAULT_KEYWORDS =
  'Tanah Kitchen & Bar, rooftop restaurant Hyderabad, Gachibowli restaurant, wood fired pizza, South India Kodi Chips, Liquid Library bar, corporate dining Hyderabad, private dining Hyderabad'

export default function SEO({
  title = 'Tanah Kitchen & Bar — Rooftop Dining & Corporate Sanctuary',
  description = 'Experience Tanah Kitchen & Bar in Gachibowli, Hyderabad. Rooftop dining, organic farm-to-table cuisine, wood-fired hearths, Liquid Library signature cocktails, and corporate gathering spaces.',
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = 'https://tanahkitchen.in/assets/logo.png',
  type = 'restaurant',
  schema
}) {
  const location = useLocation()
  const siteUrl = 'https://tanahkitchen.in'

  // Map known alias routes to their canonical master URL
  const aliasMap = {
    '/privacy': '/privacy-policy',
    '/terms': '/terms-and-conditions'
  }

  // Canonical normalization: strip query params, normalize slashes
  let cleanPath = location.pathname.toLowerCase()
  if (aliasMap[cleanPath]) {
    cleanPath = aliasMap[cleanPath]
  }

  // Ensure root is '/' and subpaths have no trailing slash
  let normalizedPath = cleanPath
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }

  const currentUrl = canonical || (normalizedPath === '/' ? `${siteUrl}/` : `${siteUrl}${normalizedPath}`)

  const normalizedSchema = schema
    ? {
        ...schema,
        url: schema.url || currentUrl
      }
    : null

  return (
    <Helmet>
      {/* 1. Standard HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Shambhavi Hospitality" />
      <meta name="copyright" content="Shambhavi Hospitality" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={currentUrl} />

      {/* 2. Geo & Location Metadata for Hyderabad Local SEO */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Gachibowli, Hyderabad" />
      <meta name="geo.position" content="17.443677;78.367766" />
      <meta name="ICBM" content="17.443677, 78.367766" />

      {/* 3. OpenGraph Social Graph Tags */}
      <meta property="og:site_name" content="Tanah Kitchen & Bar" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* 4. Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 5. JSON-LD Structured Data Schema */}
      {normalizedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(normalizedSchema)}
        </script>
      )}
    </Helmet>
  )
}
