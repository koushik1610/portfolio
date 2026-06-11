const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "koushik_theme_offset";

function weekNumber(): number {
  return Math.floor(Date.now() / WEEK_MS);
}

export function getOffset(): number {
  if (typeof window === "undefined") return 0;
  const n = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  // Corrupt localStorage must not yield NaN → themes[NaN] → blank page.
  return Number.isFinite(n) ? n : 0;
}

export function incrementOffset(): void {
  const next = getOffset() + 1;
  localStorage.setItem(STORAGE_KEY, String(next));
  window.dispatchEvent(new Event("themechange"));
}

export function getThemeIndex(total: number): number {
  const weekBase = weekNumber() % total;
  return (weekBase + getOffset()) % total;
}
