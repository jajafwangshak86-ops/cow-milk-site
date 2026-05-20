import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://cowcare.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://cowcare.app/tracker", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];
}
