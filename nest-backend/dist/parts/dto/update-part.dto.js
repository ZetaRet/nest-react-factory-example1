"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartDto = exports.UpdatePartZod = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_part_dto_1 = require("./create-part.dto");
const z = require("zod");
exports.UpdatePartZod = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    model: z.string().optional(),
});
class UpdatePartDto extends (0, mapped_types_1.PartialType)(create_part_dto_1.CreatePartDto) {
}
exports.UpdatePartDto = UpdatePartDto;
//# sourceMappingURL=update-part.dto.js.map