import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';
import * as z from 'zod';

export const UpdateVendorZod = z.object({
  name: z.string().optional(),
});

export class UpdateVendorDto extends PartialType(CreateVendorDto) {}
