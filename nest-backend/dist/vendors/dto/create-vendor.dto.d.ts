import * as z from 'zod';
export declare const CreateVendorZod: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export declare class CreateVendorDto {
    name: string;
}
