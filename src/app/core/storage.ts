export function loadList<T>(key: string, isItem: (value: unknown) => value is T): T[] {
  const raw = localStorage.getItem(key);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isItem) : [];
  } catch (error) {
    return [];
  }
}
