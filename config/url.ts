const devAPI = "http://localhost:8080/api";
// const prodAPI = "https://travaux-sisters.linv.dev/api";
const prodAPI = "http://localhost:8080/api";

export function getAPIBaseURL() {
  return process.env.NODE_ENV === "development" ? devAPI : prodAPI;
}
