import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';
import * as z from 'zod';

export const UpdateStoreZod = z.object({
  count: z.number().optional(),
  price: z.number().optional(),
});

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
