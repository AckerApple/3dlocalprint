export type ProductItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  unitAmount: number;
  currency: string;
  active: boolean;
  stripePriceId: string;
  taxCode: string;
  createdAt: number;
  updatedAt: number;
};
