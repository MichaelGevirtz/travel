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
  const scroll75FiredRef = useRef(false);

  const trackEvent = useCallback(
    (eventName: string, params: Record<string, string>) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, params);
      }
    },
    []
  );

  // scroll_75: fires once at 75% scroll depth
  useEffect(() => {
    scroll75FiredRef.current = false;

    const handleScroll = () => {
      if (scroll75FiredRef.current) return;
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.75) {
        scroll75FiredRef.current = true;
        trackEvent("scroll_75", { page_path: window.location.pathname });
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

  // outbound_click: fires on external link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href]"
      );
      if (!link) return;
      const href = link.href;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      try {
        const url = new URL(href, window.location.origin);
        if (url.hostname !== window.location.hostname) {
          trackEvent("outbound_click", {
            link_url: href,
            page_path: window.location.pathname,
          });
        }
      } catch {
        // Invalid URL, ignore
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, trackEvent]);

  return null;
}
