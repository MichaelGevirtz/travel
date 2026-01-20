"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface DestinationFiltersProps {
  currentType?: string;
  currentRegion?: string;
}

const typeFilters = [
  { value: "", label: "All Types" },
  { value: "city", label: "Cities" },
  { value: "beach", label: "Beaches" },
  { value: "mountain", label: "Mountains" },
  { value: "region", label: "Regions" },
];

const regionFilters = [
  { value: "", label: "All Regions" },
  { value: "north", label: "North" },
  { value: "central", label: "Central" },
  { value: "south", label: "South" },
];

export function DestinationFilters({
  currentType,
  currentRegion,
}: DestinationFiltersProps) {
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
    router.push(`/vietnam/destinations${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Type Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-1">Type:</span>
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => updateFilter("type", filter.value)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full transition-colors
              ${
                (currentType || "") === filter.value
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Region Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-1">Region:</span>
        {regionFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => updateFilter("region", filter.value)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full transition-colors
              ${
                (currentRegion || "") === filter.value
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {(currentType || currentRegion) && (
        <button
          onClick={() => router.push("/vietnam/destinations")}
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
