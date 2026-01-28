import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { allDestinations } from "@/lib/constants/destinations";

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[85vh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/homepage.jpg"
        alt="Sapa rice terraces - Vietnam's stunning mountain landscape"
        fill
        priority
        quality={85}
        className="object-cover"
        sizes="100vw"
      />

      {/* Base Overlay - light vignette to keep image feeling open and scenic */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 via-transparent to-gray-900/30" />

      {/* Headline Readability Overlay - subtle top-to-center gradient behind text */}
      <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-gray-900/30 via-gray-900/20 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline - Refactoring UI: Size + weight for hierarchy */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
          Your Complete Guide to{" "}
          <span className="text-[#52c9a0]">Vietnam Travel</span>
        </h1>

        {/* Subheading - Don't Make Me Think: Clear value proposition */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Insider tips, detailed itineraries, and honest hotel recommendations
          from 7+ years exploring Vietnam
        </p>

        {/* Call-to-Action Buttons - Fitts's Law: Large, thumb-friendly targets */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
          {/* Primary CTA - Von Restorff Effect: Stands out with color */}
          <Link
            href="/vietnam/destinations"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-[#52c9a0] rounded-lg hover:bg-[#45b892] transition-colors shadow-lg hover:shadow-xl group"
          >
            Explore Destinations
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA - Visual hierarchy: Outline style for less importance */}
          <Link
            href="/vietnam/itineraries"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors"
          >
            View Sample Itineraries
          </Link>
        </div>

        {/* Trust Signals - Conversion Optimization: Reciprocity principle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#52c9a0]" />
            <span>Updated for 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#52c9a0]" />
            <span>{allDestinations.length}+ Destinations Covered</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#52c9a0]" />
            <span>Used by 120K+ Travelers</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Subtle UX enhancement (desktop only) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
