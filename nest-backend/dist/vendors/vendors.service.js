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
exports.VendorsService = void 0;
const common_1 = require("@nestjs/common");
const create_vendor_dto_1 = require("./dto/create-vendor.dto");
const update_vendor_dto_1 = require("./dto/update-vendor.dto");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const vendor_entity_1 = require("./entities/vendor.entity");
let VendorsService = class VendorsService {
    constructor(knex) {
        this.knex = knex;
        this.debug = true;
    }
    returnError(err, data) {
        return { err, data };
    }
    async create(createVendorDto) {
        const zodsafe = create_vendor_dto_1.CreateVendorZod.safeParse(createVendorDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const insdata = new vendor_entity_1.Vendor();
        insdata.name = createVendorDto.name;
        const sr = await this.knex.table('vendors').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Create Vendor:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noVendor');
    }
    findAll() {
        return this.knex.table('vendors');
    }
    async findOne(id) {
        const mvend = await this.knex.table('vendors').where('id', id).first();
        if (this.debug)
            console.log('\x1b[34m Vendor:\x1b[0m', mvend);
        if (!mvend) {
            return this.returnError('noVendor');
        }
        return mvend;
    }
    async update(id, updateVendorDto) {
        const zodsafe = update_vendor_dto_1.UpdateVendorZod.safeParse(updateVendorDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const updata = { updatedAt: new Date() };
        if (updateVendorDto.name !== undefined)
            updata.name = updateVendorDto.name;
        const upd = await this.knex.table('vendors').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Vendor:\x1b[0m', id, updata, upd);
        if (upd == 1) {
            return { id };
        }
        return this.returnError('noUpdate');
    }
    async remove(id) {
        const deld = await this.knex.table('vendors').where('id', id).delete();
        if (this.debug)
            console.log('\x1b[31m Delete Vendor:\x1b[0m', id, deld);
        if (deld == 1) {
            return { id };
        }
        return this.returnError('noDelete');
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map