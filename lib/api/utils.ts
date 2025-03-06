import { getAPIBaseURL } from "@/config/url";

export async function fetchAPI({
  body,
  method = "GET",
  endpoint,
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
    // requestData.body = body;
  }

  return fetch(`${getAPIBaseURL()}${endpoint}`, requestData);
}
