import Link from "next/link";
import {
  FileText,
  Calendar,
  Train,
  Wallet,
  Smartphone,
  Shield,
  ArrowRight,
} from "lucide-react";

const guides = [
  {
    slug: "visa",
    title: "Visa Requirements",
    description: "E-visa, visa on arrival, and exemptions explained",
    icon: FileText,
  },
  {
    slug: "best-time-to-visit",
    title: "Best Time to Visit",
    description: "Weather patterns and regional climate guide",
    icon: Calendar,
  },
  {
    slug: "transport",
    title: "Getting Around",
    description: "Trains, buses, flights, and motorbike rentals",
    icon: Train,
  },
  {
    slug: "costs-budget",
    title: "Budget & Costs",
    description: "Daily budgets from backpacker to luxury",
    icon: Wallet,
  },
  {
    slug: "sim-esim",
    title: "SIM Cards & Data",
    description: "Best mobile plans and eSIM options",
    icon: Smartphone,
  },
  {
    slug: "safety-scams",
    title: "Safety & Scams",
    description: "Common scams and how to stay safe",
    icon: Shield,
  },
];

export function GuidesSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Essential Travel Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Everything you need to know before and during your Vietnam trip
            </p>
          </div>
          <Link
            href="/vietnam/guides"
            className="hidden md:inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mt-4 md:mt-0"
          >
            View all guides
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/vietnam/guides/${guide.slug}`}
              className="group flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <guide.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/vietnam/guides"
            className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            View all guides
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
