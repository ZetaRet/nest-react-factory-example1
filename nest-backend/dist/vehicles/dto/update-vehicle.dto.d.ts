import { CreateVehicleDto } from './create-vehicle.dto';
import * as z from 'zod';
export declare const UpdateVehicleZod: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    engine: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    model?: string;
    engine?: string;
}, {
    name?: string;
    model?: string;
    engine?: string;
}>;
declare const UpdateVehicleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleDto>>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
