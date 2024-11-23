import * as z from 'zod';

export const CreateInvoiceZod = z.object({
  client: z.string(),
});

export class CreateInvoiceDto {
  client: string;
  final?: boolean;
}

export const CreateInvoiceServiceZod = z.object({
  name: z.string(),
  price: z.number(),
});

export class CreateInvoiceServiceDto {
  name: string;
  price: number;
}

export const AddInvoicePartsZod = z.object({
  store_id: z.number(),
  count: z.number().min(1),
});

export class AddInvoicePartsDto {
  invoices_id?: number;
  store_id: number;
  count: number;
}

export const AddInvoiceArrayZod = z.object({
  service_id: z.number(),
  count: z.number().min(1),
});

export class AddInvoiceArrayDto {
  invoices_id?: number;
  service_id: number;
  count: number;
}

export const AddInvoiceVehicleZod = z.object({
  vehicle_id: z.number(),
});

export class AddInvoiceVehicleDto {
  vehicle_id: number;
}
