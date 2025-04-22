import { MetadataRoute } from 'next'
import fetchApiData from '@/config/fetch-api-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get current date for lastModified
  const currentDate = new Date().toISOString()

  // Base URL from your existing sitemap
  const baseUrl = 'https://newadarc.vercel.app'

  // Static routes from your existing sitemap
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/adrcfr/?best-deals=true`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/adrcfr/?trending=true`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/adrcfr/?new_arrivals=true`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/adrcfr/?brands=true`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/payment-terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/warranty-&-repairs-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shopping-cart`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/customer-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/advanced-search`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Fetch dynamic product routes
  try {
    const response = await fetchApiData<any>('products/list-products/');
    
    if (response?.status_code === 6000 && response?.data) {
      const productRoutes = response.data.map((product: any) => ({
        url: `${baseUrl}/${product?.slug || product?.name?.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: product?.updated_at || currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.9, // Higher priority for product pages
        // Add additional SEO metadata for product pages
        alternates: {
          canonical: `${baseUrl}/${product.slug || product.name?.toLowerCase().replace(/\s+/g, '-')}`,
        },
        // Add product images if available
        images: product.images?.map((image: string) => `${baseUrl}${image}`) || [],
      }));

      return [...staticRoutes, ...productRoutes];
    }
  } catch (error) {
    console.error('Error fetching product routes:', error);
  }

  return staticRoutes;
} 