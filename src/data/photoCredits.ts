export interface PhotoCredit {
  /** Path under /images/journal/ used on the site. */
  file: string;
  /** Original Wikimedia Commons file name. */
  title: string;
  author: string;
  license: string;
  source: string;
}

/**
 * Third-party photographs published on the site.
 *
 * Every photograph used by the Blog, News and FAQ now comes from the
 * Carzio-owned `new fotos` folder, so no third-party attribution is required
 * and this list is intentionally empty. If a stock photograph is ever added
 * again, record its author, licence and source URL here — the `/credits` page
 * and `docs/image-inventory.md` both read from this file.
 */
export const photoCredits: PhotoCredit[] = [];
