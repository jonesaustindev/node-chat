import sanitizeHtml from "sanitize-html";

export function sanitizeString(str: string) {
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} });
}
