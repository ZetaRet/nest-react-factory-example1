import * as z from 'zod';

export const CreateStoreZod = z.object({
  parts_id: z.number(),
  vendor_id: z.number(),
  count: z.number(),
  price: z.number(),
});

export class CreateStoreDto {
  parts_id: number;
  vendor_id: number;
  count: number;
  price: number;
}
