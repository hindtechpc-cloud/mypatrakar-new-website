// src/utils/facebookHelper.js
export function parseFacebookUrl(rawUrl) {
  if (!rawUrl) return { valid: false, type: "invalid", href: "", embedUrl: "" };

  const url = rawUrl.trim();
  const lower = url.toLowerCase();

  // Detect common types
  if (lower.includes("/share/") || lower.includes("/story.php"))
    return { valid: true, type: "share", href: url, embedUrl: "" };
  if (lower.includes("/photo.php") || lower.includes("/video.php"))
    return { valid: true, type: "media", href: url, embedUrl: "" };
  if (lower.includes("/posts/") || lower.includes("/permalink/"))
    return { valid: true, type: "post", href: url, embedUrl: "" };
  if (
    lower.includes("facebook.com/") &&
    (lower.includes("/pages/") ||
      lower.includes("/profile.php") ||
      /^[^?]+facebook\.com\/[a-z0-9_.-]+$/i.test(lower))
  ) {
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    const encoded = encodeURIComponent(normalized);
    const embedUrl = `https://www.facebook.com/plugins/page.php?href=${encoded}&tabs=timeline&width=340&adapt_container_width=true&hide_cover=false&show_facepile=true`;
    return { valid: true, type: "page", href: normalized, embedUrl };
  }

  return { valid: false, type: "unknown", href: url, embedUrl: "" };
}
