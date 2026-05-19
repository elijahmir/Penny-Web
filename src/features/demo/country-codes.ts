/**
 * Curated list of countries with dial codes for the demo form.
 * Sorted by relevance to Penny's target market, then alphabetically.
 * libphonenumber-js handles per-country digit length validation.
 */

export interface CountryCode {
  /** ISO 3166-1 alpha-2 code - used by libphonenumber-js */
  iso: string;
  /** International dial code (e.g. "+61") */
  dial: string;
  /** Flag emoji */
  flag: string;
  /** Country name */
  name: string;
  /** Placeholder example (local format) */
  example: string;
}

/** Priority countries shown at the top of the dropdown */
export const PRIORITY_COUNTRIES: CountryCode[] = [
  { iso: "AU", dial: "+61", flag: "🇦🇺", name: "Australia", example: "412 345 678" },
  { iso: "US", dial: "+1", flag: "🇺🇸", name: "United States", example: "201 555 0123" },
  { iso: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom", example: "7911 123456" },
  { iso: "NZ", dial: "+64", flag: "🇳🇿", name: "New Zealand", example: "21 123 4567" },
  { iso: "PH", dial: "+63", flag: "🇵🇭", name: "Philippines", example: "917 123 4567" },
  { iso: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore", example: "8123 4567" },
];

/** All supported countries (alphabetical) */
export const ALL_COUNTRIES: CountryCode[] = [
  { iso: "AF", dial: "+93", flag: "🇦🇫", name: "Afghanistan", example: "70 123 4567" },
  { iso: "AL", dial: "+355", flag: "🇦🇱", name: "Albania", example: "66 123 4567" },
  { iso: "DZ", dial: "+213", flag: "🇩🇿", name: "Algeria", example: "551 23 45 67" },
  { iso: "AR", dial: "+54", flag: "🇦🇷", name: "Argentina", example: "11 2345 6789" },
  { iso: "AT", dial: "+43", flag: "🇦🇹", name: "Austria", example: "664 123456" },
  { iso: "AU", dial: "+61", flag: "🇦🇺", name: "Australia", example: "412 345 678" },
  { iso: "BH", dial: "+973", flag: "🇧🇭", name: "Bahrain", example: "3600 1234" },
  { iso: "BD", dial: "+880", flag: "🇧🇩", name: "Bangladesh", example: "1812 345678" },
  { iso: "BE", dial: "+32", flag: "🇧🇪", name: "Belgium", example: "470 12 34 56" },
  { iso: "BR", dial: "+55", flag: "🇧🇷", name: "Brazil", example: "11 96123 4567" },
  { iso: "BN", dial: "+673", flag: "🇧🇳", name: "Brunei", example: "712 3456" },
  { iso: "KH", dial: "+855", flag: "🇰🇭", name: "Cambodia", example: "91 234 567" },
  { iso: "CA", dial: "+1", flag: "🇨🇦", name: "Canada", example: "506 234 5678" },
  { iso: "CL", dial: "+56", flag: "🇨🇱", name: "Chile", example: "9 6123 4567" },
  { iso: "CN", dial: "+86", flag: "🇨🇳", name: "China", example: "131 2345 6789" },
  { iso: "CO", dial: "+57", flag: "🇨🇴", name: "Colombia", example: "321 123 4567" },
  { iso: "HR", dial: "+385", flag: "🇭🇷", name: "Croatia", example: "91 234 5678" },
  { iso: "CY", dial: "+357", flag: "🇨🇾", name: "Cyprus", example: "96 123456" },
  { iso: "CZ", dial: "+420", flag: "🇨🇿", name: "Czechia", example: "601 123 456" },
  { iso: "DK", dial: "+45", flag: "🇩🇰", name: "Denmark", example: "32 12 34 56" },
  { iso: "EG", dial: "+20", flag: "🇪🇬", name: "Egypt", example: "100 123 4567" },
  { iso: "FJ", dial: "+679", flag: "🇫🇯", name: "Fiji", example: "701 2345" },
  { iso: "FI", dial: "+358", flag: "🇫🇮", name: "Finland", example: "41 2345678" },
  { iso: "FR", dial: "+33", flag: "🇫🇷", name: "France", example: "6 12 34 56 78" },
  { iso: "DE", dial: "+49", flag: "🇩🇪", name: "Germany", example: "151 23456789" },
  { iso: "GH", dial: "+233", flag: "🇬🇭", name: "Ghana", example: "23 123 4567" },
  { iso: "GR", dial: "+30", flag: "🇬🇷", name: "Greece", example: "691 234 5678" },
  { iso: "HK", dial: "+852", flag: "🇭🇰", name: "Hong Kong", example: "5123 4567" },
  { iso: "HU", dial: "+36", flag: "🇭🇺", name: "Hungary", example: "20 123 4567" },
  { iso: "IN", dial: "+91", flag: "🇮🇳", name: "India", example: "81234 56789" },
  { iso: "ID", dial: "+62", flag: "🇮🇩", name: "Indonesia", example: "812 345 6789" },
  { iso: "IE", dial: "+353", flag: "🇮🇪", name: "Ireland", example: "85 012 3456" },
  { iso: "IL", dial: "+972", flag: "🇮🇱", name: "Israel", example: "50 234 5678" },
  { iso: "IT", dial: "+39", flag: "🇮🇹", name: "Italy", example: "312 345 6789" },
  { iso: "JP", dial: "+81", flag: "🇯🇵", name: "Japan", example: "90 1234 5678" },
  { iso: "JO", dial: "+962", flag: "🇯🇴", name: "Jordan", example: "7 9012 3456" },
  { iso: "KE", dial: "+254", flag: "🇰🇪", name: "Kenya", example: "712 123456" },
  { iso: "KR", dial: "+82", flag: "🇰🇷", name: "South Korea", example: "10 1234 5678" },
  { iso: "KW", dial: "+965", flag: "🇰🇼", name: "Kuwait", example: "500 12345" },
  { iso: "LB", dial: "+961", flag: "🇱🇧", name: "Lebanon", example: "71 123 456" },
  { iso: "MY", dial: "+60", flag: "🇲🇾", name: "Malaysia", example: "12 345 6789" },
  { iso: "MV", dial: "+960", flag: "🇲🇻", name: "Maldives", example: "771 2345" },
  { iso: "MT", dial: "+356", flag: "🇲🇹", name: "Malta", example: "9696 1234" },
  { iso: "MX", dial: "+52", flag: "🇲🇽", name: "Mexico", example: "222 123 4567" },
  { iso: "MM", dial: "+95", flag: "🇲🇲", name: "Myanmar", example: "9 212 3456" },
  { iso: "NP", dial: "+977", flag: "🇳🇵", name: "Nepal", example: "984 1234567" },
  { iso: "NL", dial: "+31", flag: "🇳🇱", name: "Netherlands", example: "6 12345678" },
  { iso: "NZ", dial: "+64", flag: "🇳🇿", name: "New Zealand", example: "21 123 4567" },
  { iso: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria", example: "802 123 4567" },
  { iso: "NO", dial: "+47", flag: "🇳🇴", name: "Norway", example: "406 12 345" },
  { iso: "OM", dial: "+968", flag: "🇴🇲", name: "Oman", example: "9212 3456" },
  { iso: "PK", dial: "+92", flag: "🇵🇰", name: "Pakistan", example: "301 2345678" },
  { iso: "PG", dial: "+675", flag: "🇵🇬", name: "Papua New Guinea", example: "7012 3456" },
  { iso: "PH", dial: "+63", flag: "🇵🇭", name: "Philippines", example: "917 123 4567" },
  { iso: "PL", dial: "+48", flag: "🇵🇱", name: "Poland", example: "512 345 678" },
  { iso: "PT", dial: "+351", flag: "🇵🇹", name: "Portugal", example: "912 345 678" },
  { iso: "QA", dial: "+974", flag: "🇶🇦", name: "Qatar", example: "3312 3456" },
  { iso: "RO", dial: "+40", flag: "🇷🇴", name: "Romania", example: "712 034 567" },
  { iso: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia", example: "51 234 5678" },
  { iso: "RS", dial: "+381", flag: "🇷🇸", name: "Serbia", example: "60 1234567" },
  { iso: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore", example: "8123 4567" },
  { iso: "ZA", dial: "+27", flag: "🇿🇦", name: "South Africa", example: "71 123 4567" },
  { iso: "ES", dial: "+34", flag: "🇪🇸", name: "Spain", example: "612 34 56 78" },
  { iso: "LK", dial: "+94", flag: "🇱🇰", name: "Sri Lanka", example: "71 234 5678" },
  { iso: "SE", dial: "+46", flag: "🇸🇪", name: "Sweden", example: "70 123 45 67" },
  { iso: "CH", dial: "+41", flag: "🇨🇭", name: "Switzerland", example: "78 123 45 67" },
  { iso: "TW", dial: "+886", flag: "🇹🇼", name: "Taiwan", example: "912 345 678" },
  { iso: "TH", dial: "+66", flag: "🇹🇭", name: "Thailand", example: "81 234 5678" },
  { iso: "TR", dial: "+90", flag: "🇹🇷", name: "Türkiye", example: "501 234 56 78" },
  { iso: "AE", dial: "+971", flag: "🇦🇪", name: "United Arab Emirates", example: "50 123 4567" },
  { iso: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom", example: "7911 123456" },
  { iso: "US", dial: "+1", flag: "🇺🇸", name: "United States", example: "201 555 0123" },
  { iso: "VN", dial: "+84", flag: "🇻🇳", name: "Vietnam", example: "91 234 56 78" },
  { iso: "WS", dial: "+685", flag: "🇼🇸", name: "Samoa", example: "72 12345" },
  { iso: "TO", dial: "+676", flag: "🇹🇴", name: "Tonga", example: "771 5123" },
];

/**
 * Get the full ordered list: priority countries first, then all others.
 * Deduplicates so priority countries aren't listed twice.
 */
export function getOrderedCountries(): CountryCode[] {
  const priorityIsos = new Set(PRIORITY_COUNTRIES.map((c) => c.iso));
  const rest = ALL_COUNTRIES.filter((c) => !priorityIsos.has(c.iso));
  return [...PRIORITY_COUNTRIES, ...rest];
}

/** Find a country by ISO code */
export function findCountryByIso(iso: string): CountryCode | undefined {
  return ALL_COUNTRIES.find((c) => c.iso === iso) ?? PRIORITY_COUNTRIES.find((c) => c.iso === iso);
}

/** Default country - Australia */
export const DEFAULT_COUNTRY_ISO = "AU";
