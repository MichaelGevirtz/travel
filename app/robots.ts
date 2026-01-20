import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vietnaminsider.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/search?*",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
