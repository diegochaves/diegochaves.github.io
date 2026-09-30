/// <reference path="../.astro/types.d.ts" />

interface Window {
  /** Set by GoatCounter's count.js; missing in dev builds or when a blocker drops the script. */
  goatcounter?: {
    count?: (vars: { path: string; title?: string; event?: boolean }) => void;
  };
}
