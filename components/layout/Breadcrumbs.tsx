"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD for breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://vietnaminsider.com",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href && {
          item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${item.href}`,
        }),
      })),
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm text-gray-600"
      >
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
