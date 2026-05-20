/**
 * Geo-detection utility for auto-selecting country dial code.
 *
 * Detection order:
 *   1. `geo-country` cookie (set by middleware from Vercel's x-vercel-ip-country header)
 *   2. Browser Intl timezone → country ISO mapping (client-side fallback)
 *   3. Default: "AU" (Penny's home market)
 */

import { findCountryByIso, DEFAULT_COUNTRY_ISO } from "./country-codes";

/**
 * Major IANA timezone → ISO 3166-1 alpha-2 country mapping.
 * Covers Penny's 6 priority markets + ~40 other common timezones.
 */
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  // Australia
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "Australia/Hobart": "AU",
  "Australia/Darwin": "AU",
  "Australia/Lord_Howe": "AU",
  "Australia/Broken_Hill": "AU",
  "Australia/Lindeman": "AU",
  "Australia/Eucla": "AU",

  // New Zealand
  "Pacific/Auckland": "NZ",
  "Pacific/Chatham": "NZ",

  // United States
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "Pacific/Honolulu": "US",
  "America/Detroit": "US",
  "America/Indiana/Indianapolis": "US",
  "America/Boise": "US",

  // United Kingdom
  "Europe/London": "GB",

  // Philippines
  "Asia/Manila": "PH",

  // Singapore
  "Asia/Singapore": "SG",

  // Canada (shares +1 with US, but separate ISO)
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "America/St_Johns": "CA",

  // Other common markets
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Taipei": "TW",
  "Asia/Bangkok": "TH",
  "Asia/Jakarta": "ID",
  "Asia/Kolkata": "IN",
  "Asia/Colombo": "LK",
  "Asia/Karachi": "PK",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Qatar": "QA",
  "Asia/Muscat": "OM",
  "Asia/Beirut": "LB",
  "Asia/Amman": "JO",
  "Asia/Jerusalem": "IL",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Phnom_Penh": "KH",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Yangon": "MM",
  "Asia/Kathmandu": "NP",
  "Asia/Brunei": "BN",
  "Asia/Maldives": "MV",

  // Europe
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI",
  "Europe/Dublin": "IE",
  "Europe/Lisbon": "PT",
  "Europe/Athens": "GR",
  "Europe/Bucharest": "RO",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Zagreb": "HR",
  "Europe/Belgrade": "RS",
  "Europe/Nicosia": "CY",
  "Europe/Malta": "MT",
  "Europe/Istanbul": "TR",

  // Americas
  "America/Mexico_City": "MX",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  "America/Santiago": "CL",
  "America/Buenos_Aires": "AR",
  "America/Sao_Paulo": "BR",

  // Africa
  "Africa/Johannesburg": "ZA",
  "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE",
  "Africa/Accra": "GH",
  "Africa/Cairo": "EG",

  // Pacific
  "Pacific/Fiji": "FJ",
  "Pacific/Apia": "WS",
  "Pacific/Tongatapu": "TO",
  "Pacific/Port_Moresby": "PG",
};

/**
 * Read the geo-country cookie set by middleware.
 * Returns the ISO code or null if not set.
 */
function readGeoCookie(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("geo-country="));

  return match ? match.split("=")[1] ?? null : null;
}

/**
 * Detect country from browser timezone.
 * Returns the ISO code or null if timezone is not in our mapping.
 */
function detectFromTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_COUNTRY[tz] ?? null;
  } catch {
    return null;
  }
}

/**
 * Detect the user's country ISO code using layered detection.
 *
 * @returns ISO 3166-1 alpha-2 country code
 */
export function detectCountryIso(): string {
  // Layer 1: Vercel geo cookie (most accurate — IP-based)
  const fromCookie = readGeoCookie();
  if (fromCookie && findCountryByIso(fromCookie)) {
    return fromCookie;
  }

  // Layer 2: Browser timezone (client-side fallback)
  const fromTz = detectFromTimezone();
  if (fromTz && findCountryByIso(fromTz)) {
    return fromTz;
  }

  // Layer 3: Default to Australia
  return DEFAULT_COUNTRY_ISO;
}
