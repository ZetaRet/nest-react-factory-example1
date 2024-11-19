import * as z from 'zod';
export declare const CreateVehicleZod: z.ZodObject<{
    name: z.ZodString;
    model: z.ZodString;
    engine: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    model?: string;
    engine?: string;
}, {
    name?: string;
    model?: string;
    engine?: string;
}>;
export declare class CreateVehicleDto {
    name: string;
    model: string;
    engine: string;
}
export declare const AddPartZod: z.ZodObject<{
    vehicle_id: z.ZodNumber;
    parts_id: z.ZodNumber;
    vendor_id: z.ZodNumber;
    count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    vehicle_id?: number;
    parts_id?: number;
    vendor_id?: number;
    count?: number;
}, {
    vehicle_id?: number;
    parts_id?: number;
    vendor_id?: number;
    count?: number;
}>;
export declare class AddPartDto {
    vehicle_id: number;
    parts_id: number;
    vendor_id: number;
    count: number;
}
