# Geodata & Travel API Research Guide
## Free/Open Sources for Next.js 14 Travel Application

---

## 1. Russian City Coordinates (CITY_COORDINATES)

### 1.1 epogrebnyak/ru-cities (RECOMMENDED for bulk data)
| Field | Value |
|-------|-------|
| URL | https://github.com/epogrebnyak/ru-cities |
| License | CC-BY-SA 4.0 |
| Cost | Free |
| Auth | None (static CSV) |

**Free Tier Limits**: Unlimited — static data download.

**Data Volume**: 1,117 Russian cities with population estimates (Rosstat 2020).

**Columns**: `city`, `population` (thousands), `lat`, `lon`, `region_name`

**Example Request**:
```bash
curl -L https://raw.githubusercontent.com/epogrebnyak/ru-cities/main/assets/towns.csv -o towns.csv
```

**Sample Response (CSV)**:
```csv
city,population,lat,lon,region_name
Москва,12615.5,55.7558,37.6173,Московская область
Санкт-Петербург,5384.3,59.9343,30.3351,Санкт-Петербург
Новосибирск,1625.6,55.0084,82.9357,Новосибирская область
```

**Integration Approach**:
1. Download `towns.csv` and `regions.csv` at build time
2. Convert to TypeScript module or JSON in `src/shared/data/`
3. Replace static `CITY_COORDINATES` object with generated data
4. Build script example (`scripts/update-cities.ts`):
```typescript
import fs from 'fs';
const csv = fs.readFileSync('towns.csv', 'utf-8');
const lines = csv.split('\n').slice(1);
const cities: Record<string, any> = {};
for (const line of lines) {
  const [city, pop, lat, lon, region] = line.split(',');
  const key = city.toLowerCase().trim();
  cities[key] = { latitude: +lat, longitude: +lon, region };
}
fs.writeFileSync('src/shared/data/generatedCities.ts', `export const GENERATED_CITIES = ${JSON.stringify(cities, null, 2)};`);
```

**Caveats**:
- Population data is from 2020; some cities may have grown/shrunk
- CC-BY-SA requires attribution if you publish derived data
- Does not include every village/settlement (only 1,117 entries)

---

### 1.2 Simplemaps Russia Cities
| Field | Value |
|-------|-------|
| URL | https://simplemaps.com/data/ru-cities |
| License | MIT |
| Cost | Free (276 cities) / Paid (184,541 cities) |
| Auth | None |

**Free Tier Limits**: 276 prominent cities in CSV/JSON/XLSX.

**Example**:
```bash
curl -L https://simplemaps.com/static/data/country-cities/ru/ru.csv -o ru-cities.csv
```

**Integration**: Same approach as ru-cities. Good supplement for tourist-relevant cities not in the 1,117 dataset.

**Caveats**: Free tier is limited to 276 cities. Paid tier is $40-$99 for full dataset.

---

### 1.3 GeoNames
| Field | Value |
|-------|-------|
| URL | https://www.geonames.org |
| License | CC-BY 4.0 |
| Cost | Free |
| Auth | Free account (username) |

**Free Tier Limits**: 10,000 credits/day, 1,000 credits/hour. One credit = one API call.

**Endpoints**:
```
GET https://api.geonames.org/searchJSON?q=Moscow&country=RU&maxRows=10&username=YOUR_USER
GET https://api.geonames.org/getJSON?geonameId=524901&username=YOUR_USER
```

**Example Response**:
```json
{
  "totalResultsCount": 1,
  "geonames": [{
    "geonameId": 524901,
    "name": "Moscow",
    "lat": 55.75222,
    "lng": 37.61556,
    "countryCode": "RU",
    "adminCode1": "48",
    "population": 10452000
  }]
}
```

**Integration**:
- Use for geocoding user input at runtime
- Download bulk `RU.txt` from https://download.geonames.org/export/dump/ for static data

**Caveats**:
- Requires free registration
- Rate limited (10k/day)
- CC-BY attribution required

---

### 1.4 OpenStreetMap via Overpass API (VK Maps instance)
| Field | Value |
|-------|-------|
| URL | https://maps.mail.ru/osm/tools/overpass/ |
| License | ODbL |
| Cost | Free |
| Auth | None |

**Free Tier Limits**: No hard rate limits (stated by operator).

**Example Query** (find all cities in Russia with population > 100,000):
```bash
curl -X POST "https://maps.mail.ru/osm/tools/overpass/api/interpreter" \
  -d "data=[out:json];area['admin_level'='2']['name'='Россия'];(node[place='city'](area););out;"
```

**Integration**:
- Best for one-time data extraction
- Run query in Overpass Turbo, export as JSON, convert to TS
- Not suitable for real-time lookups in production (slow for large queries)

**Caveats**: Public instances can be slow. For production, self-host or use Geofabrik extracts.

---

### 1.5 DataCrafter ru-cities-db (API wrapper)
| Field | Value |
|-------|-------|
| URL | https://data.apicrafter.ru/packages/ru-cities-db |
| License | CC-BY-SA |
| Cost | Free (read API) |
| Auth | API key |

Provides ready-to-use API over the ru-cities dataset with JSON/CSV/Parquet export.

---

## 2. Russian Airport Data (RUSSIAN_AIRPORTS)

### 2.1 OurAirports (RECOMMENDED for completeness)
| Field | Value |
|-------|-------|
| URL | https://ourairports.com/data |
| License | Public Domain (Unlicense) |
| Cost | Free |
| Auth | None |

**Free Tier Limits**: Unlimited static downloads. Updated daily.

**Direct Download Links**:
```
https://davidmegginson.github.io/ourairports-data/airports.csv
https://davidmegginson.github.io/ourairports-data/countries.csv
https://davidmegginson.github.io/ourairports-data/regions.csv
```

**Columns**: `id`, `ident`, `type`, `name`, `latitude_deg`, `longitude_deg`, `elevation_ft`, `continent`, `iso_country`, `iso_region`, `municipality`, `gps_code`, `iata_code`, `local_code`, `home_link`

**Example - Filter Russian Airports**:
```bash
curl -L https://davidmegginson.github.io/ourairports-data/airports.csv -o airports.csv
# Filter for Russia (iso_country = RU) and scheduled service
grep '"RU"' airports.csv | grep '"yes"' > russian-airports.csv
```

**JavaScript Filter Example**:
```typescript
const airports = fs.readFileSync('airports.csv', 'utf-8').split('\n');
const russian = airports
  .map(line => line.split(','))
  .filter(([_, __, ___, ____, _____, ______, _______, ________, __________, isoCountry]) => 
    isoCountry === '"RU"' && scheduledService === '"yes"'
  )
  .map(([id, ident, type, name, lat, lon, elevation, continent, isoRegion, municipality, gpsCode, iataCode]) => ({
    iata: iataCode.replace(/"/g, ''),
    name: name.replace(/"/g, ''),
    city: municipality.replace(/"/g, ''),
    latitude: +lat,
    longitude: +lon,
    type
  }));
```

**Integration**:
1. Add `scripts/update-airports.ts` to download and filter CSV
2. Generate `src/shared/data/generatedRussianAirports.ts`
3. Merge with existing `russianAirports.ts` or replace it

**Caveats**:
- Public Domain — no attribution required, but appreciated
- Community-maintained; verify critical IATA codes
- Includes military/private airports (filter by `type` and `scheduled_service`)

---

### 2.2 mwgg/Airports (JSON format)
| Field | Value |
|-------|-------|
| URL | https://github.com/mwgg/Airports |
| License | MIT |
| Cost | Free |
| Auth | None |

**Data**: ~29,000 airports in JSON, keyed by ICAO code.

**Example**:
```json
{
  "UUEE": {
    "icao": "UUEE",
    "iata": "SVO",
    "name": "Sheremetyevo International Airport",
    "city": "Moscow",
    "country": "RU",
    "lat": 55.972599,
    "lon": 37.4146,
    "tz": "Europe/Moscow"
  }
}
```

**Integration**:
```bash
curl -L https://raw.githubusercontent.com/mwgg/Airports/master/airports.json -o airports.json
# Filter RU country
jq 'to_entries | map(select(.value.country == "RU")) | from_entries' airports.json > ru-airports.json
```

**Caveats**:
- MIT licensed — attribution required
- Static snapshot; not updated automatically
- Missing some small regional airports

---

### 2.3 airportsapi.com (REST API)
| Field | Value |
|-------|-------|
| URL | https://airportsapi.com |
| License | Free to use |
| Cost | Free |
| Auth | None |

**Free Tier Limits**: 150 requests/minute per endpoint, 300 requests/minute global.

**Endpoints**:
```
GET https://airportsapi.com/api/airports
GET https://airportsapi.com/api/airports/{code}
GET https://airportsapi.com/api/countries/{countryCode}/airports
```

**Example Request**:
```bash
curl "https://airportsapi.com/api/airports?country=RU&limit=50"
```

**Example Response**:
```json
[
  {
    "name": "Sheremetyevo International Airport",
    "code": "UUEE",
    "iata_code": "SVO",
    "latitude": 55.972599,
    "longitude": 37.4146,
    "type": "large_airport",
    "country": "RU"
  }
]
```

**Integration**:
- Good for runtime lookups or auto-complete
- Cache aggressively (data changes rarely)
- Use for validating/expanding static dataset

**Caveats**:
- No SLA on free tier
- Rate limits apply per IP

---

## 3. Flight Times, Prices & Tour Availability

### 3.1 Amadeus for Developers
| Field | Value |
|-------|-------|
| URL | https://developers.amadeus.com |
| License | Commercial (free tier) |
| Cost | Free tier available, pay-as-you-go production |
| Auth | API Key (Bearer token) |

**IMPORTANT**: Amadeus Self-Service API is being deprecated on **July 17, 2026**. Migrate to Amadeus Enterprise or alternatives.

**Free Tier Limits** (Test environment):
| API | Free Quota |
|-----|------------|
| Flight Offers Search | 2,000/month |
| Flight Offers Price | 3,000/month |
| Airport & City Search | 7,000/month |
| Flight Status | 2,000/month |

**Production**: Maintains free quota, pay only for additional calls.

**Example Request**:
```bash
curl -X POST "https://test.api.amadeus.com/v2/shopping/flight-offers" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currencyCode": "USD",
    "originDestinations": [
      {
        "id": "1",
        "originLocationCode": "MOW",
        "destinationLocationCode": "LED",
        "departureDateTimeRange": {
          "date": "2026-08-15"
        }
      }
    ],
    "travelers": [{"id": "1", "travelerType": "ADULT"}],
    "sources": ["GDS"]
  }'
```

**Integration**:
1. Register at https://developers.amadeus.com
2. Create app, get `client_id` and `client_secret`
3. Exchange credentials for bearer token
4. Cache flight offers for 5-15 minutes (prices change)
5. Use `MOW` (Moscow area code) for multi-airport search

**Caveats**:
- ⚠️ **Deprecating July 2026** — plan migration
- Test environment returns cached/simulated data
- Low-cost carriers (LCCs) not always included
- Production requires approval for some features

---

### 3.2 Duffel
| Field | Value |
|-------|-------|
| URL | https://duffel.com |
| License | Commercial |
| Cost | Free sandbox, ~$3/order production |
| Auth | Bearer token |

**Free Tier Limits**: Unlimited sandbox/test environment with simulated data.

**Production Pricing**: Pay-as-you-go, ~$3 per flight order + ancillary fees.

**Airlines**: 300+ via NDC (British Airways, Lufthansa, Emirates, etc.)

**Example Request**:
```bash
curl -X POST "https://api.duffel.com/air/offer_requests" \
  -H "Authorization: Bearer duffel_test_xxx" \
  -H "Duffel-Version: 2024-05-01" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "cabin_class": "economy",
      "passengers": [{"type": "adult"}],
      "slices": [
        {
          "origin": "MOW",
          "destination": "LED",
          "departure_date": "2026-08-15"
        }
      ]
    }
  }'
```

**Integration**:
- Cleanest modern API for flight booking
- Supports full booking flow (search → offer → order → ticket)
- Use test token (`duffel_test_*`) for development
- Apply markup to offers for agency commission

**Caveats**:
- Requires IATA/ARC accreditation for some airlines
- NDC content may differ from GDS (some routes missing)
- Not all Russian airlines available via NDC

---

### 3.3 AviationStack
| Field | Value |
|-------|-------|
| URL | https://aviationstack.com |
| License | Commercial (free tier) |
| Cost | Free: 100 req/month; Basic: $44.99/mo (10k req) |
| Auth | API Key (`access_key` param) |

**Free Tier Limits**: 100 requests/month over HTTP only (no HTTPS on free).

**Data**: Real-time flight status, airport schedules, airlines, aircraft.

**Example Request**:
```bash
curl "http://api.aviationstack.com/v1/flights?access_key=YOUR_KEY&dep_iata=SVO&arr_iata=LED&limit=10"
```

**Example Response**:
```json
{
  "pagination": {"limit": 10, "offset": 0, "count": 5},
  "data": [
    {
      "flight": {"iata": "SU100", "icao": "AFL100"},
      "departure": {"airport": "SVO", "timezone": "Europe/Moscow", "scheduled": "2026-08-15T10:00:00"},
      "arrival": {"airport": "LED", "timezone": "Europe/Moscow", "scheduled": "2026-08-15T11:30:00"}
    }
  ]
}
```

**Integration**:
- Good for flight status widgets
- Airport search endpoint for autocomplete
- Cache aggressively (30-60s delay on real-time data)

**Caveats**:
- Free tier requires HTTP (not HTTPS) — not suitable for production
- Limited to 100 requests/month on free tier
- Real-time data has 30-60s delay

---

### 3.4 Sky Scrapper API (Skyscanner data via RapidAPI)
| Field | Value |
|-------|-------|
| URL | https://rapidapi.com/apiheya/api/sky-scrapper |
| License | Commercial |
| Cost | Free BASIC tier on RapidAPI |
| Auth | X-RapidAPI-Key header |

**Free Tier Limits**: Varies by RapidAPI plan (typically 100-500 req/month free).

**Example Request**:
```bash
curl -X GET "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=MOW&destinationSkyId=LED&departureDate=2026-08-15&adults=1&currency=USD&countryCode=US&market=en-US" \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: sky-scrapper.p.rapidapi.com"
```

**Integration**:
- Resolve city names to `skyId` first via `/searchAirport`
- Cache price calendar data (changes daily)
- Use for flight comparison widgets

**Caveats**:
- Unofficial Skyscanner API (scraping-based)
- RapidAPI platform fees apply at scale
- Free tier may have rate limits

---

## 4. Tourism & POI Data

### 4.1 OpenTripMap (RECOMMENDED)
| Field | Value |
|-------|-------|
| URL | https://dev.opentripmap.org |
| License | ODbL |
| Cost | Free (API key required) |
| Auth | API key (`apikey` param) |

**Free Tier Limits**: No strict limits for reasonable use. Commercial use requires attribution.

**Coverage**: 10M+ POIs worldwide, based on OpenStreetMap + Wikidata + Wikipedia.

**Endpoints**:
```
GET https://api.opentripmap.com/0.1/en/places/geoname?name=Moscow&apikey=YOUR_KEY
GET https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=37.6173&lat=55.7558&rate=2&format=json&apikey=YOUR_KEY
GET https://api.opentripmap.com/0.1/en/places/xid/{xid}?apikey=YOUR_KEY
```

**Example - Attractions near Moscow**:
```bash
curl "https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=37.6173&lat=55.7558&rate=2&format=json&apikey=YOUR_KEY"
```

**Example Response**:
```json
[
  {
    "xid": "N2497355786",
    "name": "Kremlin",
    "rate": 7,
    "osm": "way/123456",
    "wikidata": "Q192929",
    "kinds": "historic,castles,museums",
    "lat": 55.752,
    "lon": 37.617
  }
]
```

**Integration**:
- Get free API key at https://dev.opentripmap.org
- Use `radius` endpoint to find attractions near city coordinates
- Fetch detailed info via `xid` endpoint (includes Wikipedia extracts)
- Cache POI data (updates monthly)

**Caveats**:
- ODbL license: attribute OpenTripMap/OSM when publishing
- Coverage varies by country (excellent in Europe, patchy in remote Russia)
- Some POIs lack images or descriptions

---

### 4.2 OpenStreetMap (Direct)
| Field | Value |
|-------|-------|
| URL | https://download.geofabrik.de/russia.html |
| License | ODbL |
| Cost | Free |
| Auth | None |

**Free Tier Limits**: Static extracts updated daily/weekly.

**Example - Download Russia OSM extract**:
```bash
curl -L https://download.geofabrik.de/europe/russia-latest.osm.pbf -o russia.osm.pbf
# Or smaller extracts by federal district
curl -L https://download.geofabrik.de/europe/russia/central-fed-district-latest.osm.pbf -o central.osm.pbf
```

**Integration**:
- Import into PostGIS + pgRouting for routing
- Use with `osm2pgsql` for rendering
- Extract hotels/attractions via Overpass API

**Caveats**:
- 3.8GB full extract; use sub-regions for development
- Requires GIS tooling (osm2pgsql, imposm)
- Crimea included (political consideration)

---

## 5. Weather Data

### 5.1 OpenWeatherMap
| Field | Value |
|-------|-------|
| URL | https://openweathermap.org/api |
| License | Free tier: personal/commercial |
| Cost | Free: 1,000 calls/day, 60/min |
| Auth | API key (`appid` param) |

**Endpoints**:
```
GET https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=YOUR_KEY&units=metric
GET https://api.openweathermap.org/data/2.5/forecast?q=Sochi&appid=YOUR_KEY&units=metric
```

**Example Response**:
```json
{
  "main": {"temp": 22, "feels_like": 24, "humidity": 65},
  "weather": [{"main": "Clear", "description": "ясно"}],
  "wind": {"speed": 3.5}
}
```

**Integration**:
- Show weather on destination pages
- Trigger "best season" recommendations based on forecast
- Cache for 1-2 hours

**Caveats**:
- One Call API 3.0 is separate paid product (first 1k/day free)
- Data quality varies in remote regions

---

### 5.2 Open-Meteo (ALTERNATIVE)
| Field | Value |
|-------|-------|
| URL | https://open-meteo.com |
| License | CC-BY 4.0 (non-commercial) |
| Cost | Free, no API key required |
| Auth | None |

**Example**:
```bash
curl "https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Moscow"
```

**Caveats**: CC-BY for commercial use. No key = no usage tracking.

---

## 6. Recommended Integration Plan

### Phase 1: Static Data (Immediate)
1. **Download ru-cities dataset** → generate `src/shared/data/generatedCities.ts`
2. **Download OurAirports CSV** → generate `src/shared/data/generatedRussianAirports.ts`
3. **Add build scripts** to `package.json`:
```json
{
  "scripts": {
    "update:cities": "tsx scripts/update-cities.ts",
    "update:airports": "tsx scripts/update-airports.ts",
    "update:data": "npm run update:cities && npm run update:airports"
  }
}
```

### Phase 2: Runtime APIs (Next Sprint)
1. **OpenTripMap** for POI/attractions on destination pages
2. **OpenWeatherMap** for weather widgets
3. **airportsapi.com** for airport autocomplete/search

### Phase 3: Flight Booking (Production)
1. **Duffel** for flight search and booking (modern NDC)
2. **Amadeus** only if already integrated; plan migration before July 2026
3. **AviationStack** for flight status widgets

### Environment Variables
Add to `.env.local`:
```env
# Geodata
GEONAMES_USERNAME=your_username
OPENTRIPMAP_API_KEY=your_key

# Weather
OPENWEATHER_API_KEY=your_key

# Flights
AMADEUS_CLIENT_ID=your_id
AMADEUS_CLIENT_SECRET=your_secret
DUFFEL_API_KEY=your_key
AVIATIONSTACK_API_KEY=your_key
```

### Data Flow Architecture
```
User Request
    ↓
Next.js Server Component / API Route
    ↓
Static Data (generatedCities, generatedRussianAirports) ← Build-time updates
    ↓
Runtime APIs (OpenTripMap, OpenWeatherMap, Duffel) ← Cached responses
    ↓
React Component
```

### Caching Strategy
```typescript
// lib/cache.ts
const CACHE_TTL = {
  cities: Infinity,        // Static, rebuild only
  airports: Infinity,      // Static, rebuild only
  poi: 24 * 60 * 60 * 1000, // 24 hours
  weather: 2 * 60 * 60 * 1000, // 2 hours
  flights: 5 * 60 * 1000,  // 5 minutes
};

// Use Redis (already in src/shared/utils/cache/redis.ts) or in-memory for dev
```

---

## 7. API Comparison Matrix

| API | Use Case | Free Tier | Auth | Best For |
|-----|----------|-----------|------|----------|
| ru-cities | City coords | Unlimited | None | Bulk data |
| OurAirports | Airports | Unlimited | None | Bulk data |
| GeoNames | Geocoding | 10k/day | Username | Runtime lookup |
| airportsapi.com | Airport search | 150/min | None | Autocomplete |
| OpenTripMap | POI/Tours | Reasonable | API key | Attractions |
| OpenWeatherMap | Weather | 1M/mo | API key | Forecasts |
| Duffel | Flights | Sandbox | Bearer | Booking |
| Amadeus | Flights | 2k/mo | Bearer | ⚠️ Deprecating |
| AviationStack | Flight status | 100/mo | API key | Status widgets |

---

## 8. Licensing Summary

| Source | License | Attribution Required? | Commercial Use? |
|--------|---------|----------------------|-----------------|
| ru-cities | CC-BY-SA 4.0 | Yes | Yes (share-alike) |
| OurAirports | Public Domain | No | Yes |
| GeoNames | CC-BY 4.0 | Yes | Yes |
| OpenStreetMap | ODbL | Yes | Yes |
| OpenTripMap | ODbL | Yes | Yes |
| OpenWeatherMap | Free tier ToS | No | Yes (check limits) |
| Duffel | Commercial | No | Yes |
| AviationStack | Commercial | No | Yes |

**Note**: CC-BY-SA requires derived works to use the same license. If you modify city data and redistribute it, you must share under CC-BY-SA. MIT and Public Domain data have no such restrictions.
