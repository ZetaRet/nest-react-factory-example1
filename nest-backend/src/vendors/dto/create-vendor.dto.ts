import * as z from 'zod';

export const CreateVendorZod = z.object({
  name: z.string(),
});

export class CreateVendorDto {
  name: string;
}
