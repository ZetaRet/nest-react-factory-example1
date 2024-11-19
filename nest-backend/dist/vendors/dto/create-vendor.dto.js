"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorDto = exports.CreateVendorZod = void 0;
const z = require("zod");
exports.CreateVendorZod = z.object({
    name: z.string(),
});
class CreateVendorDto {
}
exports.CreateVendorDto = CreateVendorDto;
//# sourceMappingURL=create-vendor.dto.js.map