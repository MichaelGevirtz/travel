"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function AnalyticsEvents() {
  const pathname = usePathname();

  // Scroll depth tracking refs
  const scroll25FiredRef = useRef(false);
  const scroll50FiredRef = useRef(false);
  const scroll75FiredRef = useRef(false);

  const trackEvent = useCallback(
    (eventName: string, params: Record<string, string>) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, params);
      }
    },
    []
  );

  // Scroll depth events: fires once at 25%, 50%, 75%
  useEffect(() => {
    // Reset on route change
    scroll25FiredRef.current = false;
    scroll50FiredRef.current = false;
    scroll75FiredRef.current = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return; // Page too short to scroll

      const scrollPercent = window.scrollY / scrollHeight;
      const pagePath = window.location.pathname;

      if (!scroll25FiredRef.current && scrollPercent >= 0.25) {
        scroll25FiredRef.current = true;
        trackEvent("scroll_25", { page_path: pagePath });
      }

      if (!scroll50FiredRef.current && scrollPercent >= 0.5) {
        scroll50FiredRef.current = true;
        trackEvent("scroll_50", { page_path: pagePath });
      }

      if (!scroll75FiredRef.current && scrollPercent >= 0.75) {
        scroll75FiredRef.current = true;
        trackEvent("scroll_75", { page_path: pagePath });
      }

      // Remove listener once all thresholds fired
      if (scroll25FiredRef.current && scroll50FiredRef.current && scroll75FiredRef.current) {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, trackEvent]);

  // cta_click: fires on data-cta="primary" clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const cta = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cta='primary']"
      );
      if (cta && (cta.tagName === "A" || cta.tagName === "BUTTON")) {
        trackEvent("cta_click", {
          cta_text: cta.innerText.trim(),
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, trackEvent]);

  // internal_link_click: fires on same-domain link clicks (excludes anchors)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Skip anchor-only links
      if (href.startsWith("#")) return;

      // Skip mailto/tel
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      try {
        const url = new URL(href, window.location.origin);

        // Only track internal links (same hostname)
        if (url.hostname === window.location.hostname) {
          // Skip if it's just an anchor on the same page
          if (url.pathname === window.location.pathname && url.hash) return;

          trackEvent("internal_link_click", {
            link_url: url.pathname,
            page_path: window.location.pathname,
          });
        }
      } catch {
        // Relative URL - treat as internal
        if (!href.startsWith("http")) {
          trackEvent("internal_link_click", {
            link_url: href,
            page_path: window.location.pathname,
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, trackEvent]);

  // outbound_affiliate_click: fires on external link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.href;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.hostname !== window.location.hostname) {
          trackEvent("outbound_affiliate_click", {
            link_url: href,
            page_path: window.location.pathname,
          });
        }
      } catch {
        // Invalid URL, ignore
      }
    };

    // Capture phase ensures event fires before navigation
    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, trackEvent]);

  return null;
}
