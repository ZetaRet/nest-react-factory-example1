"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartsService = void 0;
const common_1 = require("@nestjs/common");
const create_part_dto_1 = require("./dto/create-part.dto");
const update_part_dto_1 = require("./dto/update-part.dto");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const part_entity_1 = require("./entities/part.entity");
let PartsService = class PartsService {
    constructor(knex) {
        this.knex = knex;
        this.debug = true;
    }
    returnError(err, data) {
        return { err, data };
    }
    async create(createPartDto) {
        const zodsafe = create_part_dto_1.CreatePartZod.safeParse(createPartDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const insdata = new part_entity_1.Part();
        insdata.name = createPartDto.name;
        insdata.type = createPartDto.type;
        insdata.model = createPartDto.model;
        const sr = await this.knex.table('mobile_parts').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Create Mobile Part:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noCreatePart');
    }
    findAll() {
        return this.knex.table('mobile_parts');
    }
    async findOne(id) {
        const mpart = await this.knex.table('mobile_parts').where('id', id).first();
        if (this.debug)
            console.log('\x1b[34m Mobile Part:\x1b[0m', mpart);
        if (!mpart) {
            return this.returnError('noPart');
        }
        return mpart;
    }
    async update(id, updatePartDto) {
        const zodsafe = update_part_dto_1.UpdatePartZod.safeParse(updatePartDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const updata = { updatedAt: new Date() };
        if (updatePartDto.name !== undefined)
            updata.name = updatePartDto.name;
        if (updatePartDto.type !== undefined)
            updata.type = updatePartDto.type;
        if (updatePartDto.model !== undefined)
            updata.model = updatePartDto.model;
        const upd = await this.knex.table('mobile_parts').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Part:\x1b[0m', id, updata, upd);
        if (upd == 1) {
            return { id };
        }
        return this.returnError('noUpdate');
    }
    async remove(id) {
        const deld = await this.knex.table('mobile_parts').where('id', id).delete();
        if (this.debug)
            console.log('\x1b[31m Delete Part:\x1b[0m', id, deld);
        if (deld == 1) {
            return { id };
        }
        return this.returnError('noDelete');
    }
};
exports.PartsService = PartsService;
exports.PartsService = PartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], PartsService);
//# sourceMappingURL=parts.service.js.map