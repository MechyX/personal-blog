export function pathWithBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const normalizedPath = path.replace(/^\/+/, "").replace(/\/+$/, "");

  return new URL(normalizedPath, `http://example.com${base}`).pathname;
}
