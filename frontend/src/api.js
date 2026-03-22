function resolveApiBase() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window !== 'undefined' && window.location.port === '5174') {
    return 'http://127.0.0.1:3001/api';
  }

  return '/api';
}

export const API_BASE = resolveApiBase();

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
