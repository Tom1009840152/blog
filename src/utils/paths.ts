const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function sitePath(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
