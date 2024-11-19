"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorDto = exports.UpdateVendorZod = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vendor_dto_1 = require("./create-vendor.dto");
const z = require("zod");
exports.UpdateVendorZod = z.object({
    name: z.string().optional(),
});
class UpdateVendorDto extends (0, mapped_types_1.PartialType)(create_vendor_dto_1.CreateVendorDto) {
}
exports.UpdateVendorDto = UpdateVendorDto;
//# sourceMappingURL=update-vendor.dto.js.map