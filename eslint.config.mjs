import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Root-level utility / debug scripts (CommonJS, not part of the Next.js app)
    "check_gltf.js",
    "playwright-test-penny.js",
    "screenshot.js",
    "test_bounds.js",
    "export.py",
  ]),
]);

export default eslintConfig;
