export type ProductVariation = {
  id: string;
  label: string;
  unitAmount: number;
  stripePriceId: string;
  active: boolean;
};

export type ProductItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  unitAmount: number;
  currency: string;
  categories: string[];
  active: boolean;
  stripePriceId: string;
  variations?: ProductVariation[];
  taxCode: string;
  createdAt: number;
  updatedAt: number;
};
