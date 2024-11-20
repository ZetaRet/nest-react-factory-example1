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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const store_entity_1 = require("./entities/store.entity");
let StoreService = class StoreService {
    constructor(knex) {
        this.knex = knex;
        this.debug = true;
    }
    returnError(err, data) {
        return { err, data };
    }
    async create(createStoreDto) {
        const zodsafe = create_store_dto_1.CreateStoreZod.safeParse(createStoreDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const mpart = await this.knex.table('mobile_parts').where('id', createStoreDto.parts_id).first();
        if (!mpart) {
            return this.returnError('invalidPartId');
        }
        const mvend = await this.knex.table('vendors').where('id', createStoreDto.vendor_id).first();
        if (!mvend) {
            return this.returnError('invalidVendorId');
        }
        const insdata = new store_entity_1.Store();
        insdata.parts_id = createStoreDto.parts_id;
        insdata.vendor_id = createStoreDto.vendor_id;
        insdata.count = createStoreDto.count;
        insdata.price = createStoreDto.price;
        const sr = await this.knex.table('store').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Create Store Item:\x1b[0m', sr);
        if (sr.length === 1) {
            return {
                id: sr[0],
                part: [mpart.name, mpart.type, mpart.model],
                vendor: mvend.name,
            };
        }
        return this.returnError('noStore');
    }
    findAll() {
        return this.knex.table('store');
    }
    findAllDetails() {
        return this.knex
            .table('store')
            .select(['store.*', 'mobile_parts.name', 'mobile_parts.type', 'mobile_parts.model'])
            .leftJoin('mobile_parts', 'store.parts_id', 'mobile_parts.id');
    }
    async findOne(id) {
        const msto = await this.knex.table('store').where('id', id).first();
        if (this.debug)
            console.log('\x1b[34m Store Item:\x1b[0m', msto);
        if (!msto) {
            return this.returnError('noStoreItem');
        }
        return msto;
    }
    async update(id, updateStoreDto) {
        const zodsafe = update_store_dto_1.UpdateStoreZod.safeParse(updateStoreDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const updata = { updatedAt: new Date() };
        if (updateStoreDto.count !== undefined)
            updata.count = updateStoreDto.count;
        if (updateStoreDto.price !== undefined)
            updata.price = updateStoreDto.price;
        const upd = await this.knex.table('store').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Store:\x1b[0m', id, updata, upd);
        if (upd == 1) {
            return { id };
        }
        return this.returnError('noUpdate');
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], StoreService);
//# sourceMappingURL=store.service.js.map