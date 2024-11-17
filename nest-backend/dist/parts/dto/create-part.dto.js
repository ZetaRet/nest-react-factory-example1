"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePartDto = exports.CreatePartZod = void 0;
const z = require("zod");
exports.CreatePartZod = z.object({
    name: z.string(),
    type: z.string(),
    model: z.string(),
});
class CreatePartDto {
}
exports.CreatePartDto = CreatePartDto;
//# sourceMappingURL=create-part.dto.js.map