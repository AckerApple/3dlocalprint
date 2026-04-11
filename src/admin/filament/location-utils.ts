export const slugifyLocation = (location = "") =>
  location
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const resolveLocationFromSlug = (slug, locations = []) => {
  const normalized = slugifyLocation(slug || "");
  return locations.find((location) => slugifyLocation(location) === normalized) || "";
};
