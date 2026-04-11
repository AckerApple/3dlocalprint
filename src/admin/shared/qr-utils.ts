const digitMatch = /\d+/g;

export const extractQrToken = (text) => {
  if (!text) return "";
  const hashParts = text.split("#").filter(Boolean);
  const digitParts = text.match(digitMatch) || [];
  const candidates = [...hashParts, ...digitParts].filter((part) => part);
  if (!candidates.length) return "";
  return candidates.reduce((longest, part) =>
    part.length > longest.length ? part : longest
  , "");
};

export const findQrMatches = (data, token) => {
  if (!token) return [];
  const matcher = token.toLowerCase();
  return data.filter((item) => {
    const fields = [
      item.qr_search_data,
      item.swatch_code,
      item.number,
      item.label,
      item.color_name,
    ]
      .filter((value) => value !== undefined && value !== null)
      .map((value) => value.toString().toLowerCase());
    return fields.some((value) => value.includes(matcher));
  });
};
