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
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
let VendorsService = class VendorsService {
    constructor(knex) {
        this.knex = knex;
        this.debug = true;
    }
    returnError(err, data) {
        return { err, data };
    }
    create(createVendorDto) {
        return 'This action adds a new vendor';
    }
    findAll() {
        return `This action returns all vendors`;
    }
    findOne(id) {
        return `This action returns a #${id} vendor`;
    }
    update(id, updateVendorDto) {
        return `This action updates a #${id} vendor`;
    }
    remove(id) {
        return `This action removes a #${id} vendor`;
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map