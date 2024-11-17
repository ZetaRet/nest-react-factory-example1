import * as z from 'zod';

export const CreatePartZod = z.object({
  name: z.string(),
  type: z.string(),
  model: z.string(),
});

export class CreatePartDto {
  public name: string;
  public type: string;
  public model: string;
}
