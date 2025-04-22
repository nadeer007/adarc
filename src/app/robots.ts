import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login',
        '/signup',
        '/my-account',
        '/checkout',
        '/cartPage',
        '/reset-password',
      ]
    },
    sitemap: 'https://adarccomputers.com/sitemap.xml'
  }
} 