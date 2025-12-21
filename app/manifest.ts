import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://atech.com';

  return {
    name: 'ATECH - Premium Software Development Agency',
    short_name: 'ATECH',
    description: 'Premium software development agency specializing in modern web applications, mobile apps, and digital solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#00f0ff',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['business', 'productivity', 'technology'],
    lang: 'en',
    dir: 'ltr',
  };
}

