import { PartialType } from '@nestjs/mapped-types';
import { CreatePartDto } from './create-part.dto';
import * as z from 'zod';

export const UpdatePartZod = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  model: z.string().optional(),
});

export class UpdatePartDto extends PartialType(CreatePartDto) {}
