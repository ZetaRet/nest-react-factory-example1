export interface StoreInterface {
  id?: number;
  parts_id: number;
  vendor_id: number;
  count: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Store implements StoreInterface {
  id?: number;
  parts_id: number;
  vendor_id: number;
  count: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
