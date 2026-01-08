import type { HomeData, NewsItem } from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

// Helper function to get headers
const getHeaders = (additionalHeaders: Record<string, string> = {}) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...additionalHeaders,
  };

  if (JWT_TOKEN) {
    headers["Authorization"] = `Bearer ${JWT_TOKEN}`;
  }

  return headers;
};

export const apiService = {
  async getHomeData(lang: string = "ca"): Promise<HomeData> {
    const response = await fetch(`${API_BASE_URL}/home`, {
      headers: getHeaders({
        "Accept-Language": lang,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch home data");
    return response.json();
  },

  async getNews(
    lang: string = "ca",
    page: number = 1
  ): Promise<{ data: NewsItem[]; meta: any }> {
    const response = await fetch(`${API_BASE_URL}/news?page=${page}`, {
      headers: getHeaders({
        "Accept-Language": lang,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch news");
    return response.json();
  },

  async getSettings(lang: string = "ca"): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      headers: getHeaders({
        "Accept-Language": lang,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch settings");
    return response.json();
  },
};
