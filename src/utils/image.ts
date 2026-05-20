export function cacheBustImageUrl(source: string, cacheToken?: string | number): string {
  if (!source) return source;

  const token = cacheToken ?? source.length;
  const separator = source.includes('?') ? '&' : '?';
  return `${source}${separator}v=${encodeURIComponent(String(token))}`;
}
