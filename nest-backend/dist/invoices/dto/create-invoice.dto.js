"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInvoiceVehicleDto = exports.AddInvoiceVehicleZod = exports.AddInvoiceArrayDto = exports.AddInvoiceArrayZod = exports.AddInvoicePartsDto = exports.AddInvoicePartsZod = exports.CreateInvoiceServiceDto = exports.CreateInvoiceServiceZod = exports.CreateInvoiceDto = exports.CreateInvoiceZod = void 0;
const z = require("zod");
exports.CreateInvoiceZod = z.object({
    client: z.string(),
});
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
exports.CreateInvoiceServiceZod = z.object({
    name: z.string(),
    price: z.number(),
});
class CreateInvoiceServiceDto {
}
exports.CreateInvoiceServiceDto = CreateInvoiceServiceDto;
exports.AddInvoicePartsZod = z.object({
    store_id: z.number(),
    count: z.number().min(1),
});
class AddInvoicePartsDto {
}
exports.AddInvoicePartsDto = AddInvoicePartsDto;
exports.AddInvoiceArrayZod = z.object({
    service_id: z.number(),
    count: z.number().min(1),
});
class AddInvoiceArrayDto {
}
exports.AddInvoiceArrayDto = AddInvoiceArrayDto;
exports.AddInvoiceVehicleZod = z.object({
    vehicle_id: z.number(),
});
class AddInvoiceVehicleDto {
}
exports.AddInvoiceVehicleDto = AddInvoiceVehicleDto;
//# sourceMappingURL=create-invoice.dto.js.map