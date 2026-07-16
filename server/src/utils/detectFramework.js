export function detectFramework(html) {
  const source = html.toLowerCase();

  if (
    source.includes("__next") ||
    source.includes("_next/static") ||
    source.includes('"next-head-count"')
  ) {
    return "Next.js";
  }

  if (
    source.includes("react") ||
    source.includes("data-reactroot") ||
    source.includes("__react")
  ) {
    return "React";
  }

  if (
    source.includes("__nuxt") ||
    source.includes("_nuxt/")
  ) {
    return "Nuxt";
  }

  if (
    source.includes("__vue") ||
    source.includes("vue.js")
  ) {
    return "Vue";
  }

  if (
    source.includes("ng-version")
  ) {
    return "Angular";
  }

  if (
    source.includes("wp-content") ||
    source.includes("wordpress")
  ) {
    return "WordPress";
  }

  if (
    source.includes("/_astro/")
  ) {
    return "Astro";
  }

  return "Unknown";
}