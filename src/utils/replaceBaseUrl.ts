import { baseUrl } from "./baseUrl";

export function replacebaseUrl(url: string) {
  return url.replace(baseUrl, '');
}