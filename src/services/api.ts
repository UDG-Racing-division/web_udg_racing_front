import type { HomeData, NewsItem } from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

type NewsResponse = { data: NewsItem[]; meta: any };

// Responses are cached per language and query for the lifetime of the page,
// so navigating between routes doesn't refetch the same payload.
const pending = new Map<string, Promise<unknown>>();
const resolved = new Map<string, unknown>();

const cacheKey = (path: string, lang: string, params: Record<string, string>) =>
  `${lang}:${new URLSearchParams({ path, ...params })}`;

function cachedGet<T>(
  path: string,
  lang: string,
  params: Record<string, string> = {}
): Promise<T> {
  const key = cacheKey(path, lang, params);
  const inFlight = pending.get(key);
  if (inFlight) return inFlight as Promise<T>;

  const query = new URLSearchParams(params).toString();
  // Only CORS-safelisted headers, so the browser skips the OPTIONS preflight
  const request = fetch(`${API_BASE_URL}/${path}${query ? `?${query}` : ""}`, {
    headers: { "Accept-Language": lang },
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch ${path}`);
      return response.json() as Promise<T>;
    })
    .then((data) => {
      resolved.set(key, data);
      return data;
    })
    .catch((error) => {
      // Drop failed requests so the next call retries
      pending.delete(key);
      throw error;
    });

  pending.set(key, request);
  return request;
}

const peek = <T>(path: string, lang: string, params: Record<string, string> = {}) =>
  resolved.get(cacheKey(path, lang, params)) as T | undefined;

export const apiService = {
  getHomeData(lang: string = "ca"): Promise<HomeData> {
    return cachedGet<HomeData>("home", lang);
  },

  getNews(lang: string = "ca", page: number = 1): Promise<NewsResponse> {
    return cachedGet<NewsResponse>("news", lang, { page: String(page) });
  },

  getSettings(lang: string = "ca"): Promise<any> {
    return cachedGet("settings", lang);
  },

  // Synchronous cache reads, so pages can render cached data on first paint
  // instead of flashing the loading screen.
  peekHomeData(lang: string = "ca"): HomeData | undefined {
    return peek<HomeData>("home", lang);
  },

  peekNews(lang: string = "ca", page: number = 1): NewsResponse | undefined {
    return peek<NewsResponse>("news", lang, { page: String(page) });
  },
};
