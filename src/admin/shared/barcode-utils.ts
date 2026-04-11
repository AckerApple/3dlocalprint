const digitMatch = /\d+/g;

export const normalizeBarcodeList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()) // .filter(Boolean); // new entries are empty string
  }
  if (value === undefined || value === null || value === "") return [];
  return [String(value).trim()].filter(Boolean);
};

export const extractBarcodeToken = (text) => {
  if (!text) return "";
  const hashParts = text.split("#").filter(Boolean);
  const digitParts = text.match(digitMatch) || [];
  const candidates = [...hashParts, ...digitParts].filter((part) => part);
  if (!candidates.length) return "";
  return candidates.reduce(
    (longest, part) => (part.length > longest.length ? part : longest),
    ""
  );
};

export const findBarcodeMatches = (data, token) => {
  if (!token) return [];
  const matcher = token.toLowerCase();
  return data.filter((item) => {
    const barcodeFields = normalizeBarcodeList(item.barcode_search_data);
    const fields = [
      ...barcodeFields,
      item.swatch_code,
      item.number,
      item.label,
      item.color_name,
    ]
      .filter((value) => value !== undefined && value !== null && value !== "")
      .map((value) => value.toString().toLowerCase());
    return fields.some((value) => value.includes(matcher));
  });
};
