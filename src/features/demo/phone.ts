import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from "libphonenumber-js";

const BLOCKED_NUMBERS: string[] = [];

const PREMIUM_PREFIXES = ["190", "1300", "1800", "13"];

export function validatePhone(raw: string): {
  valid: boolean;
  e164: string | null;
  error: string | null;
} {
  const cleaned = raw.replace(/\s+/g, "");

  const phone = parsePhoneNumberFromString(cleaned, "AU");

  if (!phone || !isValidPhoneNumber(cleaned, "AU")) {
    return { valid: false, e164: null, error: "Enter a valid Australian phone number." };
  }

  const e164 = phone.format("E.164");

  if (BLOCKED_NUMBERS.includes(e164)) {
    return { valid: false, e164: null, error: "This number cannot be used for demos." };
  }

  const national = phone.nationalNumber;
  for (const prefix of PREMIUM_PREFIXES) {
    if (national.startsWith(prefix)) {
      return {
        valid: false,
        e164: null,
        error: "Premium-rate and landline numbers are not supported.",
      };
    }
  }

  if (phone.getType() && phone.getType() !== "MOBILE" && phone.getType() !== "FIXED_LINE_OR_MOBILE") {
    return {
      valid: false,
      e164: null,
      error: "Please use a mobile number for the demo call.",
    };
  }

  return { valid: true, e164, error: null };
}

export function formatPhoneDisplay(raw: string): string {
  const phone = parsePhoneNumberFromString(raw, "AU");
  return phone ? phone.formatNational() : raw;
}
