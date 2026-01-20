import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/shop`, lastModified: now },
    { url: `${baseUrl}/blog`, lastModified: now },
    { url: `${baseUrl}/contact`, lastModified: now },
    { url: `${baseUrl}/search`, lastModified: now },
    { url: `${baseUrl}/cart`, lastModified: now },
    { url: `${baseUrl}/wishlist`, lastModified: now },
    { url: `${baseUrl}/checkout`, lastModified: now },
    { url: `${baseUrl}/auth`, lastModified: now },
  ];
}
