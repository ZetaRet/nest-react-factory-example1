import { AddInvoiceArrayDto, AddInvoicePartsDto, CreateInvoiceDto } from './create-invoice.dto';
import * as z from 'zod';
export declare const UpdateInvoiceZod: z.ZodObject<{
    client: z.ZodOptional<z.ZodString>;
    final: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    client?: string;
    final?: boolean;
}, {
    client?: string;
    final?: boolean;
}>;
declare const UpdateInvoiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateInvoiceDto>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
export declare const UpdateInvoiceCountZod: z.ZodObject<{
    count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    count?: number;
}, {
    count?: number;
}>;
declare const UpdateInvoicePartsDto_base: import("@nestjs/mapped-types").MappedType<Partial<AddInvoicePartsDto>>;
export declare class UpdateInvoicePartsDto extends UpdateInvoicePartsDto_base {
}
declare const UpdateInvoiceArrayDto_base: import("@nestjs/mapped-types").MappedType<Partial<AddInvoiceArrayDto>>;
export declare class UpdateInvoiceArrayDto extends UpdateInvoiceArrayDto_base {
}
export {};
