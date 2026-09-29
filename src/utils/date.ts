// Post times are written in Brasília time (see src/content.config.ts), but the
// site is built on UTC machines, so dates must be shown in this zone explicitly.
export const TIME_ZONE = 'America/Sao_Paulo';

export function yearOf(date: Date): number {
  return Number(date.toLocaleDateString('en-US', { year: 'numeric', timeZone: TIME_ZONE }));
}
