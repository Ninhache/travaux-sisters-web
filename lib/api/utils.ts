import { getAPIBaseURL } from "@/config/url";
import { LOCAL_STORAGE_KEY } from "@/context/session-context";

export async function fetchAPI({
  body,
  method = "GET",
  endpoint,
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`,
  },
}: {
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  headers?: Record<string, string>;
}) {
  let requestData: RequestInit = {};

  requestData.method = method;
  requestData.headers = headers;
  if (body) {
    requestData.body = JSON.stringify(body);
  }

  return fetch(`${getAPIBaseURL()}${endpoint}`, requestData);
}
