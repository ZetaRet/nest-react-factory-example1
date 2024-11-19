export interface VendorInterface {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Vendor implements VendorInterface {
  public id?: number;
  public name: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}
