function segments(path: string) {
  return path.split("/").filter(Boolean);
}

function normalizeRoute(path: string) {
  if (path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

export function isCurrentRoute(currentPath: string, targetPath: string) {
  return normalizeRoute(currentPath) === normalizeRoute(targetPath);
}

export function relativeHref(currentPath: string, targetPath: string) {
  const from = segments(normalizeRoute(currentPath));
  const to = segments(targetPath);

  while (from.length && to.length && from[0] === to[0]) {
    from.shift();
    to.shift();
  }

  const prefix = "../".repeat(from.length);
  const suffix = to.join("/");

  if (!suffix) {
    return prefix || "./";
  }

  return `${prefix}${suffix}${targetPath.endsWith("/") ? "/" : ""}`;
}
