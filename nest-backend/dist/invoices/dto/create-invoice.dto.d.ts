import * as z from 'zod';
export declare const CreateInvoiceZod: z.ZodObject<{
    client: z.ZodString;
}, "strip", z.ZodTypeAny, {
    client?: string;
}, {
    client?: string;
}>;
export declare class CreateInvoiceDto {
    client: string;
    final?: boolean;
}
export declare const CreateInvoiceServiceZod: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    price?: number;
}, {
    name?: string;
    price?: number;
}>;
export declare class CreateInvoiceServiceDto {
    name: string;
    price: number;
}
export declare const AddInvoicePartsZod: z.ZodObject<{
    store_id: z.ZodNumber;
    count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    count?: number;
    store_id?: number;
}, {
    count?: number;
    store_id?: number;
}>;
export declare class AddInvoicePartsDto {
    invoices_id?: number;
    store_id: number;
    count: number;
}
export declare const AddInvoiceArrayZod: z.ZodObject<{
    service_id: z.ZodNumber;
    count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    count?: number;
    service_id?: number;
}, {
    count?: number;
    service_id?: number;
}>;
export declare class AddInvoiceArrayDto {
    invoices_id?: number;
    service_id: number;
    count: number;
}
export declare const AddInvoiceVehicleZod: z.ZodObject<{
    vehicle_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    vehicle_id?: number;
}, {
    vehicle_id?: number;
}>;
export declare class AddInvoiceVehicleDto {
    vehicle_id: number;
}
