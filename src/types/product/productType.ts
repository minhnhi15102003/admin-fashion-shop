import type { CategoryRes } from "../category/CategoryRes";

export type CreateProductRq = {
    name: string;
    categoryId: number;
    description: string;
    price: number;
    quantity: string;
    isBestseller: number;
    isNewArrival: number;
    discount: number;
    images: string[];
    star:number;
};


export type FilterProduct = {
    offset:number,
    limit:number,
    search?:string,
    isNewArrival?:number,
    isBestseller?:number,
    categoryId?:number,
    sort?:string,
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // nếu muốn tính toán số học, có thể chuyển thành number
  quantity: number;
  totalSold: number;
  isBestseller: boolean;
  isNewArrival: boolean;
  star: number;
  viewerCount: number;
  discount: number;
  images: ProductImage[];
  category: CategoryRes | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  length: number,
}