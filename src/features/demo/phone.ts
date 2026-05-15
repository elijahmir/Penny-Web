import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  type CountryCode as PhoneCountryCode,
} from "libphonenumber-js";

const BLOCKED_NUMBERS: string[] = [];

/**
 * Validate a phone number for the demo form.
 * Accepts an ISO 3166-1 alpha-2 country code to validate against.
 * libphonenumber-js handles per-country digit length validation automatically.
 */
export function validatePhone(
  raw: string,
  countryCode: string = "AU"
): {
  valid: boolean;
  e164: string | null;
  error: string | null;
} {
  const cleaned = raw.replace(/\s+/g, "");

  const cc = countryCode.toUpperCase() as PhoneCountryCode;
  const phone = parsePhoneNumberFromString(cleaned, cc);

  if (!phone || !isValidPhoneNumber(cleaned, cc)) {
    return { valid: false, e164: null, error: "Please enter a valid phone number." };
  }

  const e164 = phone.format("E.164");

  if (BLOCKED_NUMBERS.includes(e164)) {
    return { valid: false, e164: null, error: "This number cannot be used for demos." };
  }

  // Allow MOBILE, FIXED_LINE_OR_MOBILE, and FIXED_LINE types
  // Some countries don't distinguish mobile from fixed-line
  const phoneType = phone.getType();
  if (
    phoneType &&
    phoneType !== "MOBILE" &&
    phoneType !== "FIXED_LINE_OR_MOBILE" &&
    phoneType !== "FIXED_LINE"
  ) {
    return {
      valid: false,
      e164: null,
      error: "Please use a mobile or landline number for the demo call.",
    };
  }

  return { valid: true, e164, error: null };
}

export function formatPhoneDisplay(raw: string, countryCode: string = "AU"): string {
  const cc = countryCode.toUpperCase() as PhoneCountryCode;
  const phone = parsePhoneNumberFromString(raw, cc);
  return phone ? phone.formatNational() : raw;
}
