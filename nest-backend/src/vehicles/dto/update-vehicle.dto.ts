import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import * as z from 'zod';
import { EngineTypes } from '../entities/vehicle.entity';

export const UpdateVehicleZod = z.object({
  name: z.string().optional(),
  model: z.string().optional(),
  engine: z.nativeEnum(EngineTypes).optional(),
});

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
