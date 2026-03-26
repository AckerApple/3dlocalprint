export type StorageLocationEntry = {
  name: string;
  quantity: number;
};

export const normalizeStorageLocations = (value: unknown): StorageLocationEntry[] =>
  (Array.isArray(value) ? value : [])
    .map((entry) => {
      const name = String(entry?.name || "").trim();
      const quantity = Number(entry?.quantity);
      if (!name) return null;
      if (!Number.isFinite(quantity) || quantity <= 0) return null;
      return {
        name,
        quantity: Math.floor(quantity),
      };
    })
    .filter(Boolean) as StorageLocationEntry[];

export const getStorageLocationsTotal = (entries: StorageLocationEntry[] = []): number =>
  (Array.isArray(entries) ? entries : []).reduce(
    (total, entry) => total + (Number(entry?.quantity) || 0),
    0
  );

export const describeStorageLocations = (entries: StorageLocationEntry[] = []): string =>
  (Array.isArray(entries) ? entries : [])
    .map((entry) => `${entry.name} (${entry.quantity})`)
    .join(", ");
