import { CreateVehicleDto } from './create-vehicle.dto';
import * as z from 'zod';
import { EngineTypes } from '../entities/vehicle.entity';
export declare const UpdateVehicleZod: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    engine: z.ZodOptional<z.ZodNativeEnum<typeof EngineTypes>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    model?: string;
    engine?: EngineTypes;
}, {
    name?: string;
    model?: string;
    engine?: EngineTypes;
}>;
declare const UpdateVehicleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleDto>>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
