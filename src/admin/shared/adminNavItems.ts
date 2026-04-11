export const adminNavGroups = [
  {
    key: "filaments",
    title: "Filaments",
    items: [
      {
        label: "Filament inventory",
        details: "Edit filament inventory, stock counts, and details.",
        href: "filament/index.html",
        emoji: "🎛️",
      },
      {
        label: "Filament types",
        details: "Manage filament type details used by inventory.",
        href: "filament/types.html",
        emoji: "🧵",
      },
      {
        label: "Filament manufacturers",
        details: "Edit the manufacturer list used by inventory forms.",
        href: "filament/manufacturers.html",
        emoji: "🏭",
      },
      {
        label: "Camera test",
        details: "Practice barcode scanning and review debug output.",
        href: "filament/camera-test.html",
        emoji: "📷",
      },
    ],
  },
  {
    key: "accounting",
    title: "Accounting",
    items: [
      {
        label: "Ledger",
        details: "Track incoming and outgoing money entries.",
        href: "accounting/ledger.html",
        emoji: "📒",
      },
      {
        label: "Money Accounts",
        details: "Manage bank/cash accounts used by ledger entries.",
        href: "accounting/money-accounts.html",
        emoji: "🏦",
      },
    ],
  },
  {
    key: "products",
    title: "Products",
    items: [
      {
        label: "Products catalog",
        details: "Manage product records used for cart and checkout.",
        href: "products/index.html",
        emoji: "🛒",
      },
    ],
  },
  {
    key: "system",
    title: "Admin",
    items: [
      {
        label: "Manage admins",
        details: "Control who can access the admin tools.",
        href: "security/admins.html",
        emoji: "🛡️",
      },
    ],
  },
];

export const adminNavItems = adminNavGroups.flatMap((group) => group.items);

export const withManufacturerEmoji = (text) => {
  if (!text || text.includes("🏭")) return text;
  return text.replace(/\bmanufacturers?\b/gi, (match) => `🏭 ${match}`);
};
