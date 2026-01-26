# Geo SEO Optimization Guide

> Best practices for geographic SEO optimization for travel websites.

## Why Geo SEO Matters for Travel Sites

Geographic signals help search engines:
- Understand the location relevance of your content
- Show your pages in location-based searches
- Display rich results with maps and location data
- Connect content to Google's Knowledge Graph entities
- Improve visibility in "near me" and destination searches

## Core Geo SEO Elements

### 1. Geographic Hierarchy

Structure content around a clear geographic hierarchy:

```
Country (Vietnam)
├── Region (North, Central, South)
│   ├── Province/State
│   │   ├── City/District
│   │   │   ├── Neighborhood/Area
│   │   │   │   └── Specific Location/Attraction
```

**For Vietnam:**
```
Vietnam
├── North Vietnam
│   ├── Hanoi (city)
│   │   ├── Old Quarter
│   │   ├── French Quarter
│   │   └── West Lake
│   ├── Ha Long Bay (natural area)
│   ├── Sapa (mountain town)
│   └── Ninh Binh (province)
├── Central Vietnam
│   ├── Da Nang (city)
│   ├── Hoi An (ancient town)
│   ├── Hue (city)
│   └── Phong Nha (national park)
└── South Vietnam
    ├── Ho Chi Minh City (city)
    │   ├── District 1
    │   ├── District 3
    │   └── Binh Thanh
    ├── Mekong Delta (region)
    ├── Phu Quoc (island)
    └── Mui Ne (beach town)
```

### 2. Coordinates Data

Every destination MUST include:

| Field | Format | Example |
|-------|--------|---------|
| Latitude | Decimal degrees | 21.0285 |
| Longitude | Decimal degrees | 105.8542 |
| Bounding Box | [SW lat, SW lng, NE lat, NE lng] | [20.95, 105.75, 21.10, 105.95] |

**Vietnam Destination Coordinates:**

```typescript
const VIETNAM_DESTINATIONS = {
  // North Vietnam
  hanoi: { lat: 21.0285, lng: 105.8542, region: "north" },
  haLongBay: { lat: 20.9101, lng: 107.1839, region: "north" },
  sapa: { lat: 22.3363, lng: 103.8438, region: "north" },
  ninhBinh: { lat: 20.2506, lng: 105.9745, region: "north" },

  // Central Vietnam
  danang: { lat: 16.0544, lng: 108.2022, region: "central" },
  hoiAn: { lat: 15.8801, lng: 108.3380, region: "central" },
  hue: { lat: 16.4637, lng: 107.5909, region: "central" },
  phongNha: { lat: 17.5914, lng: 106.2834, region: "central" },

  // South Vietnam
  hoChiMinh: { lat: 10.8231, lng: 106.6297, region: "south" },
  phuQuoc: { lat: 10.2899, lng: 103.9840, region: "south" },
  muiNe: { lat: 10.9330, lng: 108.2872, region: "south" },
  mekongDelta: { lat: 10.0452, lng: 105.7469, region: "south" },
  canTho: { lat: 10.0452, lng: 105.7469, region: "south" },
  dalat: { lat: 11.9404, lng: 108.4583, region: "central" },
};
```

### 3. Geographic Entity Types

Use appropriate entity types for different locations:

| Location Type | Schema Type | Example |
|---------------|-------------|---------|
| Country | Country | Vietnam |
| Region | AdministrativeArea | Northern Vietnam |
| City | City | Hanoi |
| District | AdministrativeArea | District 1 |
| Neighborhood | Neighborhood | Old Quarter |
| Beach | Beach | An Bang Beach |
| Mountain | Mountain | Fansipan |
| National Park | Park | Phong Nha-Ke Bang |
| Island | LandmarksOrHistoricalBuildings | Phu Quoc |
| Temple | TouristAttraction | Temple of Literature |
| Natural Feature | NaturalFeature | Ha Long Bay |

### 4. Geo-Modified Keywords

Always include location in keywords:

**Patterns:**
- `[activity] in [location]` - "things to do in Hanoi"
- `[location] [topic]` - "Hanoi travel guide"
- `best [thing] in [location]` - "best restaurants in Hoi An"
- `[location] to [location]` - "Hanoi to Ha Long Bay"
- `[adjective] [location]` - "northern Vietnam itinerary"

**Keyword Hierarchy:**
```
Primary: hanoi travel guide
Geo-Secondary:
- things to do in hanoi
- hanoi old quarter
- hanoi vietnam
- northern vietnam
- vietnam capital city
```

---

## Content Requirements

### Geographic Context in Articles

Every article MUST include:

1. **Location Introduction** (first 100 words)
   - Name the specific location
   - Place it within geographic context (region, country)
   - Mention nearby notable locations

2. **Geographic Quick Facts**
   ```markdown
   - **Location:** Northern Vietnam, 170km from Hanoi
   - **Coordinates:** 20.9101°N, 107.1839°E
   - **Region:** North Vietnam
   - **Nearest Airport:** Cat Bi International (HPH)
   - **Nearest Major City:** Hanoi (3.5 hours by car)
   ```

3. **"Getting There" Section**
   - Distance from major cities/airports
   - Transport options with travel times
   - Route descriptions

4. **Nearby Destinations**
   - Link to 3-5 nearby destinations
   - Include distances and travel times
   - Create a geographic content cluster

### Map Recommendations

Suggest maps in articles:

```typescript
{
  "mapSuggestions": [
    {
      "type": "destination_overview",
      "center": { "lat": 21.0285, "lng": 105.8542 },
      "zoom": 12,
      "markers": ["old_quarter", "temple_of_literature", "hoan_kiem_lake"]
    },
    {
      "type": "area_attractions",
      "bounds": { "sw": [20.95, 105.75], "ne": [21.10, 105.95] },
      "markers": ["attraction1", "attraction2", "attraction3"]
    }
  ]
}
```

---

## URL Structure for Geo SEO

### Recommended Structure

```
/vietnam/                           # Country hub
/vietnam/north/                     # Region hub (NEW)
/vietnam/central/                   # Region hub (NEW)
/vietnam/south/                     # Region hub (NEW)
/vietnam/destinations/hanoi/        # City destination
/vietnam/destinations/ha-long-bay/  # Natural destination
/vietnam/blog/hanoi-food-guide/     # City-specific blog
/vietnam/guides/northern-vietnam/   # Region guide (NEW)
```

### URL Best Practices

- Include location in URL slug
- Use hyphens for multi-word locations
- Keep URLs under 75 characters
- Follow geographic hierarchy in path

---

## Internal Linking Strategy

### Geographic Clusters

Create internal link networks based on geography:

**Regional Cluster (North Vietnam):**
```
Hanoi ←→ Ha Long Bay ←→ Sapa ←→ Ninh Binh
   ↓         ↓           ↓         ↓
  All link to /vietnam/north/ hub page
```

**Proximity Linking:**
- Link to destinations within 100km
- Link to logical travel routes
- Link to same-region destinations

**Cross-Region Linking:**
- Link to similar destination types in other regions
- Example: "If you love Hoi An's beaches, check out [Phu Quoc](/vietnam/destinations/phu-quoc) in the south"

---

## Schema Markup for Geo SEO

### Required Schemas

1. **Place Schema** - Every destination page
2. **TouristDestination** - Destination guide pages
3. **TouristAttraction** - Individual attractions
4. **GeoCoordinates** - Within Place schema
5. **AdministrativeArea** - Region/city context

### GeoCoordinates Format

```json
{
  "@type": "Place",
  "name": "Hanoi",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0285,
    "longitude": 105.8542
  },
  "containedInPlace": {
    "@type": "Country",
    "name": "Vietnam"
  }
}
```

See `seo-schema-markup.md` for complete schema templates.

---

## Content Geo Signals Checklist

### Required in Every Article

- [ ] Location name in title
- [ ] Location in meta description
- [ ] Coordinates in structured data
- [ ] Region identified (north/central/south)
- [ ] Distance from major airports/cities
- [ ] "Getting There" section with transport options
- [ ] Links to 3+ nearby destinations
- [ ] Geographic context in first paragraph
- [ ] Map suggestion with center coordinates

### Geographic Quick Facts Template

```markdown
## Quick Facts

- **Location:** [City/Area], [Region], Vietnam
- **Coordinates:** [XX.XXXX°N, XXX.XXXX°E]
- **Region:** [North/Central/South] Vietnam
- **Best Time to Visit:** [Months]
- **Nearest Airport:** [Airport Name] ([Code]) - [Distance/Time]
- **From Hanoi:** [Distance] / [Travel Time]
- **From Ho Chi Minh City:** [Distance] / [Travel Time]
```

---

## Nearby Destinations Data

### Required Fields

```typescript
interface NearbyDestination {
  slug: string;
  name: string;
  distance: number;        // in kilometers
  travelTime: string;      // e.g., "3.5 hours by car"
  direction: string;       // e.g., "east", "northeast"
  transportOptions: string[]; // ["bus", "car", "train"]
}
```

### Example

```json
{
  "nearbyDestinations": [
    {
      "slug": "ha-long-bay",
      "name": "Ha Long Bay",
      "distance": 170,
      "travelTime": "3.5 hours by car",
      "direction": "east",
      "transportOptions": ["bus", "car", "tour"]
    },
    {
      "slug": "ninh-binh",
      "name": "Ninh Binh",
      "distance": 95,
      "travelTime": "2 hours by car",
      "direction": "south",
      "transportOptions": ["bus", "car", "motorbike"]
    }
  ]
}
```

---

## Google Business Profile (If Applicable)

If you have a physical presence (office, tour desk):

- Create Google Business Profile
- Add to LocalBusiness schema
- Include in site footer
- Link from destination pages

---

## Geo Sitemap

Consider adding geo-specific sitemap entries:

```xml
<url>
  <loc>https://vietnaminsider.com/vietnam/destinations/hanoi</loc>
  <geo:geo>
    <geo:format>kml</geo:format>
  </geo:geo>
</url>
```

Or use KML files for complex geographic data.

---

## Validation Checklist

For SEO Validator agent, check:

| Check | Requirement | Priority |
|-------|-------------|----------|
| Coordinates present | lat/lng in geo data | High |
| Region specified | north/central/south | High |
| Location in title | Destination name in title | High |
| Geographic context | Location mentioned in intro | Medium |
| Nearby destinations | 3+ linked nearby places | Medium |
| Distance data | From major cities/airports | Medium |
| Transport info | Getting there section | Medium |
| Map data | Center coordinates provided | Low |

---

## Sources

- [Google Structured Data for Local Business](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Schema.org Place](https://schema.org/Place)
- [Schema.org TouristDestination](https://schema.org/TouristDestination)
- [Google Maps Platform](https://developers.google.com/maps/documentation)
