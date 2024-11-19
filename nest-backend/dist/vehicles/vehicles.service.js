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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const create_vehicle_dto_1 = require("./dto/create-vehicle.dto");
const update_vehicle_dto_1 = require("./dto/update-vehicle.dto");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const vehicle_entity_1 = require("./entities/vehicle.entity");
let VehiclesService = class VehiclesService {
    constructor(knex) {
        this.knex = knex;
        this.debug = true;
    }
    returnError(err, data) {
        return { err, data };
    }
    async create(createVehicleDto) {
        const zodsafe = create_vehicle_dto_1.CreateVehicleZod.safeParse(createVehicleDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const insdata = new vehicle_entity_1.Vehicle();
        insdata.name = createVehicleDto.name;
        insdata.model = createVehicleDto.model;
        insdata.engine = createVehicleDto.engine;
        const sr = await this.knex.table('assemble_vehicle').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Create Vehicle:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noVehicle');
    }
    findAll() {
        return this.knex.table('assemble_vehicle');
    }
    async findOne(id) {
        const mveh = await this.knex.table('assemble_vehicle').where('id', id).first();
        if (this.debug)
            console.log('\x1b[34m Vehicle:\x1b[0m', mveh);
        if (!mveh) {
            return this.returnError('noVehicle');
        }
        return mveh;
    }
    async update(id, updateVehicleDto) {
        const zodsafe = update_vehicle_dto_1.UpdateVehicleZod.safeParse(updateVehicleDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const updata = { updatedAt: new Date() };
        if (updateVehicleDto.name !== undefined)
            updata.name = updateVehicleDto.name;
        if (updateVehicleDto.model !== undefined)
            updata.model = updateVehicleDto.model;
        if (updateVehicleDto.engine !== undefined)
            updata.engine = updateVehicleDto.engine;
        const upd = await this.knex.table('assemble_vehicle').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Vehicle:\x1b[0m', id, updata, upd);
        if (upd == 1) {
            return { id };
        }
        return this.returnError('noUpdate');
    }
    async addPart(addPartDto) {
        const zodsafe = create_vehicle_dto_1.AddPartZod.safeParse(addPartDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const mveh = await this.knex.table('assemble_vehicle').where('id', addPartDto.vehicle_id).first();
        if (!mveh) {
            return this.returnError('invalidVehicleId');
        }
        const mpart = await this.knex.table('mobile_parts').where('id', addPartDto.parts_id).first();
        if (!mpart) {
            return this.returnError('invalidPartId');
        }
        const mvend = await this.knex.table('vendors').where('id', addPartDto.vendor_id).first();
        if (!mvend) {
            return this.returnError('invalidVendorId');
        }
        const insdata = new vehicle_entity_1.VehiclePart();
        insdata.vehicle_id = addPartDto.vehicle_id;
        insdata.parts_id = addPartDto.parts_id;
        insdata.vendor_id = addPartDto.vendor_id;
        insdata.count = addPartDto.count;
        const sr = await this.knex.table('vehicle_parts').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Add Vehicle Part:\x1b[0m', sr);
        if (sr.length === 1) {
            return {
                id: sr[0],
                vehicle: [mveh.name, mveh.model, mveh.engine],
                part: [mpart.name, mpart.type, mpart.model],
                vendor: mvend.name,
            };
        }
        return this.returnError('notAddVehiclePart');
    }
    getVehicleParts(id) {
        return this.knex.table('vehicle_parts').where('vehicle_id', id);
    }
    getVehiclePartsDetails(id) {
        return this.knex
            .table('vehicle_parts')
            .select(['vehicle_parts.*', 'mobile_parts.name', 'mobile_parts.type', 'mobile_parts.model'])
            .leftJoin('mobile_parts', function () {
            this.on('vehicle_parts.parts_id', '=', 'mobile_parts.id');
        })
            .where('vehicle_id', id);
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map