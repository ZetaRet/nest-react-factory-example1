"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceArrayDto = exports.UpdateInvoicePartsDto = exports.UpdateInvoiceCountZod = exports.UpdateInvoiceDto = exports.UpdateInvoiceZod = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_invoice_dto_1 = require("./create-invoice.dto");
const z = require("zod");
exports.UpdateInvoiceZod = z.object({
    client: z.string().optional(),
    final: z.boolean().optional(),
});
class UpdateInvoiceDto extends (0, mapped_types_1.PartialType)(create_invoice_dto_1.CreateInvoiceDto) {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
exports.UpdateInvoiceCountZod = z.object({
    count: z.number().min(1),
});
class UpdateInvoicePartsDto extends (0, mapped_types_1.PartialType)(create_invoice_dto_1.AddInvoicePartsDto) {
}
exports.UpdateInvoicePartsDto = UpdateInvoicePartsDto;
class UpdateInvoiceArrayDto extends (0, mapped_types_1.PartialType)(create_invoice_dto_1.AddInvoiceArrayDto) {
}
exports.UpdateInvoiceArrayDto = UpdateInvoiceArrayDto;
//# sourceMappingURL=update-invoice.dto.js.map