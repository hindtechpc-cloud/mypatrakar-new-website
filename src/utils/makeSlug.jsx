// ✅ Fully Hindi-safe slug generator (handles vowels, matras, and all Indic scripts)
export const makeSlug = (title = "") => {
  if (!title) return "";

  return title
    .trim()
    // keep letters, numbers, marks (matras), spaces, and dashes
    .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, "")
    // replace spaces with single hyphen
    .replace(/\s+/g, "-")
    // remove duplicate hyphens
    .replace(/-+/g, "-")
    // remove trailing hyphen
    .replace(/^-|-$/g, "");
};
