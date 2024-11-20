import { CreateStoreDto } from './create-store.dto';
import * as z from 'zod';
export declare const UpdateStoreZod: z.ZodObject<{
    count: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    count?: number;
    price?: number;
}, {
    count?: number;
    price?: number;
}>;
declare const UpdateStoreDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStoreDto>>;
export declare class UpdateStoreDto extends UpdateStoreDto_base {
}
export {};
