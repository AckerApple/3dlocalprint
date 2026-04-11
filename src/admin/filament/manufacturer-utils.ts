export const normalizeManufacturerLabel = (value = "") =>
  String(value || "")
    .replace(/🏭/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();

export const getManufacturerDisplayLabel = (value = "", fallback = "Unspecified") => {
  const cleaned = String(value || "").replace(/🏭/g, "").trim();
  return cleaned || fallback;
};
