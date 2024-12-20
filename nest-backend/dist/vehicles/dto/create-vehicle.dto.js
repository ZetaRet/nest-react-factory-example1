"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPartDto = exports.AddPartZod = exports.CreateVehicleDto = exports.CreateVehicleZod = void 0;
const z = require("zod");
const vehicle_entity_1 = require("../entities/vehicle.entity");
exports.CreateVehicleZod = z.object({
    name: z.string(),
    model: z.string(),
    engine: z.nativeEnum(vehicle_entity_1.EngineTypes),
});
class CreateVehicleDto {
}
exports.CreateVehicleDto = CreateVehicleDto;
exports.AddPartZod = z.object({
    vehicle_id: z.number(),
    parts_id: z.number(),
    vendor_id: z.number(),
    count: z.number(),
});
class AddPartDto {
}
exports.AddPartDto = AddPartDto;
//# sourceMappingURL=create-vehicle.dto.js.map