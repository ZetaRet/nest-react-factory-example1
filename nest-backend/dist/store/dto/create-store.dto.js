"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStoreDto = exports.CreateStoreZod = void 0;
const z = require("zod");
exports.CreateStoreZod = z.object({
    parts_id: z.number(),
    vendor_id: z.number(),
    count: z.number(),
    price: z.number(),
});
class CreateStoreDto {
}
exports.CreateStoreDto = CreateStoreDto;
//# sourceMappingURL=create-store.dto.js.map