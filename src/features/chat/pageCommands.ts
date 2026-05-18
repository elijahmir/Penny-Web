/**
 * pageCommands.ts
 * Browser-side page control functions invoked by the ElevenLabs chat agent
 * as client tools. These run in the main window context.
 */

type PageSection =
  | "features"
  | "how-it-works"
  | "use-cases"
  | "try-penny"
  | "faq"
  | "testimonials"
  | "contact"
  | "penny-options"
  | "penny-embed"
  | "how-it-works";

/**
 * Smoothly scrolls to a named section of the landing page.
 */
export function scrollToSection(sectionId: PageSection | string): string {
  const el =
    document.getElementById(sectionId) ??
    document.querySelector(`[data-section="${sectionId}"]`);

  if (!el) {
    return `Section "${sectionId}" not found on page`;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return `Scrolled to ${sectionId}`;
}

/**
 * Adds a temporary glowing highlight to the Try Penny phone demo form,
 * drawing the visitor's attention to it.
 */
export function highlightDemoForm(): string {
  const form = document.getElementById("try-penny");
  if (!form) return "Demo form not found";

  form.classList.add("chat-highlight-pulse");
  form.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    form.classList.remove("chat-highlight-pulse");
  }, 4000);

  return "Highlighted the phone demo form";
}

/**
 * Briefly flashes a specific feature element to draw attention.
 */
export function highlightFeature(featureName: string): string {
  const allFeatures = document.querySelectorAll("[data-feature]");
  let found = false;

  allFeatures.forEach((el) => {
    const name = el.getAttribute("data-feature")?.toLowerCase() ?? "";
    if (name.includes(featureName.toLowerCase())) {
      el.classList.add("chat-highlight-pulse");
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el.classList.remove("chat-highlight-pulse"), 3500);
      found = true;
    }
  });

  return found
    ? `Highlighted feature: ${featureName}`
    : `Feature "${featureName}" not found — scrolled to features section`;
}

// ─── action_site unified dispatcher ──────────────────────────────────────────
//
// This is the PRIMARY tool the ElevenLabs agent calls.
// Maps an "action" string → the correct page control function.
//
// Supported actions:
//   scroll      → scrollToSection(section)
//   highlight   → highlightFeature(feature)
//   show_form   → highlightDemoForm()
//   scroll_top  → scroll window to top

export type ActionSiteParams = {
  action: "scroll" | "highlight" | "show_form" | "scroll_top";
  /** Required when action = "scroll". The section ID on the page. */
  section?: string;
  /** Required when action = "highlight". The feature name to highlight. */
  feature?: string;
};

export function actionSite(params: ActionSiteParams): string {
  switch (params.action) {
    case "scroll":
      return scrollToSection(params.section ?? "try-penny");

    case "highlight":
      return params.feature
        ? highlightFeature(params.feature)
        : "No feature name provided";

    case "show_form":
      return highlightDemoForm();

    case "scroll_top":
      window.scrollTo({ top: 0, behavior: "smooth" });
      return "Scrolled to top of page";

    default:
      return `Unknown action: ${(params as Record<string, unknown>).action}`;
  }
}

/**
 * Registry of all client tools to pass to the ElevenLabs conversation.
 * These must match the tool names defined in the ElevenLabs agent config.
 * Parameter types use Record<string, unknown> to satisfy ClientTool generic.
 */
export const clientTools = {
  // ── Primary unified tool — matches `action_site` on the ElevenLabs agent ──
  action_site: (params: Record<string, unknown>) =>
    actionSite(params as unknown as ActionSiteParams),

  // ── Legacy named tools (backward compat — agent may call these directly) ──
  scroll_to_section: (params: Record<string, unknown>) =>
    scrollToSection(params.section as string),

  highlight_demo_form: () =>
    highlightDemoForm(),

  highlight_feature: (params: Record<string, unknown>) =>
    highlightFeature(params.feature_name as string),
};
