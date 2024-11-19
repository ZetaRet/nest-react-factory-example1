import { CreateVendorDto } from './create-vendor.dto';
import * as z from 'zod';
export declare const UpdateVendorZod: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
declare const UpdateVendorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVendorDto>>;
export declare class UpdateVendorDto extends UpdateVendorDto_base {
}
export {};
