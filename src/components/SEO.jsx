import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function SEO({
  title = 'Tanah Kitchen & Bar — Rooftop Dining & Corporate Sanctuary',
  description = 'Experience Tanah Kitchen & Bar in Gachibowli, Hyderabad. Rooftop dining, organic farm-to-table cuisine, wood-fired hearths, Liquid Library signature cocktails, and corporate gathering spaces.',
  canonical,
  ogImage = 'https://tanahkitchen.in/assets/logo.png',
  schema
}) {
  const location = useLocation()
  const siteUrl = 'https://tanahkitchen.in'
  const currentUrl = canonical || `${siteUrl}${location.pathname}`

  useEffect(() => {
    // 1. Update Title
    document.title = title

    // 2. Helper to set or create meta tags
    const setMetaTag = (selector, attribute, attrValue, content) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 3. Update Standard & Social Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl)
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    // 4. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', currentUrl)

    // 5. Update JSON-LD Structured Data Schema if provided
    let scriptTag = document.getElementById('route-jsonld')
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'route-jsonld'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(schema)
    } else if (scriptTag) {
      scriptTag.remove()
    }
  }, [title, description, currentUrl, ogImage, schema])

  return null
}
