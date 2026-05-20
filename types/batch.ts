import { Stage } from "@/lib/constants";

export interface Batch {
  id: number;
  productName: string;
  quantity: number;
  pricePerUnit: string;
  farmer: string;
  processor: string;
  distributor: string;
  retailer: string;
  buyer: string;
  stage: Stage;
  createdAt: number;
  updatedAt: number;
}

export interface BatchCountResponse {
  count: number;
}

export interface BatchErrorResponse {
  error: string;
}
