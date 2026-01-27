"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ItineraryFiltersProps {
  currentDuration?: string;
  currentSeason?: string;
}

const durationFilters = [
  { value: "", label: "Any Length" },
  { value: "1-week", label: "1 Week" },
  { value: "2-week", label: "2 Weeks" },
  { value: "3-week", label: "3 Weeks" },
];

const seasonFilters = [
  { value: "", label: "Any Season" },
  { value: "spring", label: "Spring (Mar-Apr)" },
  { value: "summer", label: "Summer (May-Aug)" },
  { value: "autumn", label: "Autumn (Sep-Nov)" },
  { value: "winter", label: "Winter (Dec-Feb)" },
];

export function ItineraryFilters({
  currentDuration,
  currentSeason,
}: ItineraryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();
    router.push(`/vietnam/itineraries${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Duration Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-1">Duration:</span>
        {durationFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => updateFilter("duration", filter.value)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full transition-colors
              ${
                (currentDuration || "") === filter.value
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Season Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-1">Season:</span>
        {seasonFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => updateFilter("season", filter.value)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full transition-colors
              ${
                (currentSeason || "") === filter.value
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Clear Filters */}
      {(currentDuration || currentSeason) && (
        <button
          onClick={() => router.push("/vietnam/itineraries")}
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
