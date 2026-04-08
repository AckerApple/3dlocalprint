export const adminNavItems = [
  {
    label: "Filament inventory",
    details: "Edit filament inventory, stock counts, and details.",
    href: "./index.html",
    emoji: "🎛️",
  },
  {
    label: "Filament types",
    details: "Manage filament type details used by inventory.",
    href: "./filament-types.html",
    emoji: "🧵",
  },
  {
    label: "Filament manufacturers",
    details: "Edit the manufacturer list used by inventory forms.",
    href: "./manufacturers.html",
    emoji: "🏭",
  },
  {
    label: "Camera test",
    details: "Practice barcode scanning and review debug output.",
    href: "./camera-test.html",
    emoji: "📷",
  },
  {
    label: "Ledger",
    details: "Track incoming and outgoing money entries.",
    href: "./ledger.html",
    emoji: "📒",
  },
  {
    label: "Money Accounts",
    details: "Manage bank/cash accounts used by ledger entries.",
    href: "./money-accounts.html",
    emoji: "🏦",
  },
  {
    label: "Manage admins",
    details: "Control who can access the admin tools.",
    href: "./admins.html",
    emoji: "🛡️",
  },
];

export const withManufacturerEmoji = (text) => {
  if (!text || text.includes("🏭")) return text;
  return text.replace(/\bmanufacturers?\b/gi, (match) => `🏭 ${match}`);
};
