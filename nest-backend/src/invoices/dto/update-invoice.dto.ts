import { PartialType } from '@nestjs/mapped-types';
import { AddInvoiceArrayDto, AddInvoicePartsDto, CreateInvoiceDto } from './create-invoice.dto';
import * as z from 'zod';

export const UpdateInvoiceZod = z.object({
  client: z.string().optional(),
  final: z.boolean().optional(),
});

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}

export const UpdateInvoiceCountZod = z.object({
  count: z.number().min(1),
});

export class UpdateInvoicePartsDto extends PartialType(AddInvoicePartsDto) {}
export class UpdateInvoiceArrayDto extends PartialType(AddInvoiceArrayDto) {}
