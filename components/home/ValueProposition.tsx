import { Map, Calendar, Shield } from "lucide-react";

const values = [
  {
    icon: Map,
    title: "Know Where to Stay",
    description:
      "Neighborhood-by-neighborhood hotel recommendations so you book the right area, not just the right hotel.",
  },
  {
    icon: Calendar,
    title: "Build a Realistic Itinerary",
    description:
      "Sample itineraries that actually work, with travel times, local tips, and flexibility built in.",
  },
  {
    icon: Shield,
    title: "Avoid Tourist Traps",
    description:
      "Honest advice on safety, scams, money, and getting around - from someone who's been there.",
  },
];

export function ValueProposition() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Vietnam Trip
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know, from a traveler who&apos;s spent years
            exploring every corner of Vietnam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 md:p-8 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-5">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
