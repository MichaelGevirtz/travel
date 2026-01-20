import Link from "next/link";
import { Compass, Wifi, Heart, Mountain } from "lucide-react";

const intents = [
  {
    icon: Compass,
    title: "First Time in Vietnam",
    description: "Start here for the essential guide to your first visit",
    href: "/vietnam/guides/first-time",
    color: "bg-blue-50 hover:bg-blue-100 text-blue-600",
  },
  {
    icon: Wifi,
    title: "Digital Nomad",
    description: "Best cities for remote work, cafes, and long-term stays",
    href: "/vietnam/guides/digital-nomad",
    color: "bg-purple-50 hover:bg-purple-100 text-purple-600",
  },
  {
    icon: Heart,
    title: "Couples & Romance",
    description: "Romantic destinations and experiences for two",
    href: "/vietnam/destinations?theme=couples",
    color: "bg-rose-50 hover:bg-rose-100 text-rose-600",
  },
  {
    icon: Mountain,
    title: "Adventure Travel",
    description: "Trekking, diving, motorbike loops, and outdoor activities",
    href: "/vietnam/destinations?theme=adventure",
    color: "bg-amber-50 hover:bg-amber-100 text-amber-600",
  },
];

export function IntentTiles() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Brings You to Vietnam?
          </h2>
          <p className="text-lg text-gray-600">
            Find the perfect guide for your travel style
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {intents.map((intent, index) => (
            <Link
              key={index}
              href={intent.href}
              className={`
                group p-6 rounded-xl transition-all duration-300
                ${intent.color}
              `}
            >
              <intent.icon className="h-10 w-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-900">
                {intent.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {intent.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
