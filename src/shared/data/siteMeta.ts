// Single source of truth for the last real content-review date.
// Used by sitemaps' `lastModified` so pages don't appear "updated today"
// on every build (which search engines read as fake freshness).
// Bump this date when the underlying content actually changes.
export const SITE_LAST_UPDATED = new Date('2026-07-13');
