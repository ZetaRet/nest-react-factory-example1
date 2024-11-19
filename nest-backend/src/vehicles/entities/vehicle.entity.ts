export interface VehicleInterface {
  id?: number;
  name: string;
  model: string;
  engine: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Vehicle implements VehicleInterface {
  id?: number;
  name: string;
  model: string;
  engine: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class VehiclePart {
  id?: number;
  vehicle_id: number;
  parts_id: number;
  vendor_id: number;
  count: number;
  createdAt?: Date;
  updatedAt?: Date;
}
