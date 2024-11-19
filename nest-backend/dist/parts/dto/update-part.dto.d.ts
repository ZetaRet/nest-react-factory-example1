import { CreatePartDto } from './create-part.dto';
import * as z from 'zod';
export declare const UpdatePartZod: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    type?: string;
    model?: string;
}, {
    name?: string;
    type?: string;
    model?: string;
}>;
declare const UpdatePartDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePartDto>>;
export declare class UpdatePartDto extends UpdatePartDto_base {
}
export {};
