export type ProductVariation = {
  id: string;
  label: string;
  unitAmount: number;
  stripePriceId: string;
  active: boolean;
};

export type ProductImage = {
  imageUrl: string;
  imagePath?: string;
  uploadedAt: number;
  uploadedDate: string;
  location: string;
};

export type ProductItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  imagePath?: string;
  images?: ProductImage[];
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
