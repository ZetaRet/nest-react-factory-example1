import * as z from 'zod';
import { EngineTypes } from '../entities/vehicle.entity';

export const CreateVehicleZod = z.object({
  name: z.string(),
  model: z.string(),
  engine: z.nativeEnum(EngineTypes),
});

export class CreateVehicleDto {
  name: string;
  model: string;
  engine: string;
}

export const AddPartZod = z.object({
  vehicle_id: z.number(),
  parts_id: z.number(),
  vendor_id: z.number(),
  count: z.number(),
});

export class AddPartDto {
  vehicle_id: number;
  parts_id: number;
  vendor_id: number;
  count: number;
}
