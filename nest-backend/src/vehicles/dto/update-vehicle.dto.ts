import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import * as z from 'zod';

export const UpdateVehicleZod = z.object({
  name: z.string().optional(),
  model: z.string().optional(),
  engine: z.string().optional(),
});

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
