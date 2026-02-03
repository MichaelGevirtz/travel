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
        {/* Main Headline - Explicit value proposition */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight">
          Plan a smart Vietnam trip —{" "}
          <span className="text-[#52c9a0]">itineraries, destinations, real costs.</span>
        </h1>

        {/* Single Primary CTA */}
        <div className="mb-8 md:mb-12">
          <Link
            href="/vietnam/itineraries"
            data-cta="primary"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-[#52c9a0] rounded-lg hover:bg-[#45b892] transition-colors shadow-lg hover:shadow-xl group"
          >
            Start with a Vietnam itinerary
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
