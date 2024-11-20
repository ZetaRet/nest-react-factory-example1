import * as z from 'zod';
export declare const CreateStoreZod: z.ZodObject<{
    parts_id: z.ZodNumber;
    vendor_id: z.ZodNumber;
    count: z.ZodNumber;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    parts_id?: number;
    vendor_id?: number;
    count?: number;
    price?: number;
}, {
    parts_id?: number;
    vendor_id?: number;
    count?: number;
    price?: number;
}>;
export declare class CreateStoreDto {
    parts_id: number;
    vendor_id: number;
    count: number;
    price: number;
}
