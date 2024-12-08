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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const invoice_entity_1 = require("./entities/invoice.entity");
let InvoicesService = class InvoicesService {
    constructor(knex) {
        this.knex = knex;
        this.debug = true;
    }
    returnError(err, data) {
        return { err, data };
    }
    async create(createInvoiceDto) {
        const zodsafe = create_invoice_dto_1.CreateInvoiceZod.safeParse(createInvoiceDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const now = new Date();
        const insdata = new invoice_entity_1.Invoice();
        insdata.client = createInvoiceDto.client;
        insdata.created_at = now;
        insdata.updated_at = now;
        const sr = await this.knex.table('invoices').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Create Invoice:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noInvoice');
    }
    findAll() {
        return this.knex.table('invoices').orderBy('final', 'desc').orderBy('updated_at', 'desc');
    }
    async findOne(id) {
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (this.debug)
            console.log('\x1b[34m Invoice:\x1b[0m', minv);
        if (!minv) {
            return this.returnError('noInvoice');
        }
        return minv;
    }
    async getTotal(id) {
        var total = 0;
        const sum_parts = await this.knex
            .table('invoice_parts')
            .select([this.knex.raw('sum(price*count) as sum_parts')])
            .where('invoices_id', id);
        if (this.debug)
            console.log('Sum Parts', sum_parts);
        if (sum_parts.length == 1)
            total += parseFloat(sum_parts[0].sum_parts || 0);
        const sum_array = await this.knex
            .table('invoice_array')
            .select([this.knex.raw('sum(price*count) as sum_array')])
            .where('invoices_id', id);
        if (this.debug)
            console.log('Sum Array', sum_array);
        if (sum_array.length == 1)
            total += parseFloat(sum_array[0].sum_array || 0);
        return total;
    }
    async update(id, updateInvoiceDto) {
        const zodsafe = update_invoice_dto_1.UpdateInvoiceZod.safeParse(updateInvoiceDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (!minv)
            return this.returnError("invalidInvoiceId");
        else if (minv.final)
            return this.returnError("finalInvoice");
        const updata = { updated_at: new Date() };
        if (updateInvoiceDto.client !== undefined)
            updata.client = updateInvoiceDto.client;
        if (updateInvoiceDto.final !== undefined)
            updata.final = updateInvoiceDto.final;
        if (updateInvoiceDto.final) {
            var total = await this.getTotal(id);
            updata.total = total;
        }
        const upd = await this.knex.table('invoices').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Invoice:\x1b[0m', id, updata, upd);
        if (upd == 1) {
            return { id };
        }
        return this.returnError('noUpdate');
    }
    async clear(id) {
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (!minv)
            return this.returnError("invalidInvoiceId");
        else if (minv.final)
            return this.returnError("finalInvoice");
        await this.knex.table('invoice_parts').where('invoices_id', id).delete();
        await this.knex.table('invoice_array').where('invoices_id', id).delete();
        if (this.debug)
            console.log('\x1b[31m Delete Invoice Parts/Array:\x1b[0m', id);
        return { id };
    }
    async total(id) {
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (!minv)
            return this.returnError('noInvoice');
        else if (minv.final)
            return { total: parseFloat(minv.total) };
        var total = await this.getTotal(id);
        return { total };
    }
    async view(id) {
        const viewinv = {};
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (this.debug)
            console.log('\x1b[34m View Invoice:\x1b[0m', minv);
        if (!minv)
            return this.returnError('noInvoice');
        viewinv.invoice = minv;
        viewinv.parts = await this.knex
            .table('invoice_parts')
            .select([
            'invoice_parts.*',
            'mobile_parts.name',
            'mobile_parts.type',
            'mobile_parts.model',
            this.knex.raw('vendors.name as vendor_name'),
        ])
            .leftJoin('mobile_parts', 'invoice_parts.parts_id', 'mobile_parts.id')
            .leftJoin('vendors', 'invoice_parts.vendor_id', 'vendors.id')
            .where('invoices_id', id);
        viewinv.services = await this.knex
            .table('invoice_array')
            .select(['invoice_array.*', 'invoice_services.name'])
            .leftJoin('invoice_services', 'invoice_array.service_id', 'invoice_services.id')
            .where('invoices_id', id);
        return viewinv;
    }
    async createService(createInvoiceServiceDto) {
        const zodsafe = create_invoice_dto_1.CreateInvoiceServiceZod.safeParse(createInvoiceServiceDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const now = new Date();
        const insdata = new invoice_entity_1.InvoiceService();
        insdata.name = createInvoiceServiceDto.name;
        insdata.price = createInvoiceServiceDto.price;
        insdata.created_at = now;
        insdata.updated_at = now;
        const sr = await this.knex.table('invoice_services').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Create Invoice Service:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError("noInvoiceService");
    }
    findAllServices() {
        return this.knex.table('invoice_services');
    }
    findInvoiceParts(id) {
        return this.knex.table('invoice_parts').where('invoices_id', id);
    }
    async addInvoiceParts(id, addInvoicePartsDto) {
        const zodsafe = create_invoice_dto_1.AddInvoicePartsZod.safeParse(addInvoicePartsDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (!minv)
            return this.returnError("invalidInvoiceId");
        else if (minv.final)
            return this.returnError("finalInvoice");
        const msto = await this.knex.table('store').where('id', addInvoicePartsDto.store_id).first();
        if (!msto)
            return this.returnError('invalidStoreId');
        const insdata = new invoice_entity_1.InvoiceParts();
        insdata.invoices_id = id;
        insdata.store_id = addInvoicePartsDto.store_id;
        insdata.parts_id = msto.parts_id;
        insdata.vendor_id = msto.vendor_id;
        insdata.price = msto.price;
        insdata.count = addInvoicePartsDto.count;
        const sr = await this.knex.table('invoice_parts').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Add Invoice Parts:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noInvoiceParts');
    }
    async updateInvoiceParts(id, updateInvoicePartsDto) {
        const zodsafe = update_invoice_dto_1.UpdateInvoiceCountZod.safeParse(updateInvoicePartsDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const updata = { updated_at: new Date() };
        if (updateInvoicePartsDto.count !== undefined)
            updata.count = updateInvoicePartsDto.count;
        const upd = await this.knex.table('invoice_parts').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Invoice Parts:\x1b[0m', id, updata, upd);
        if (upd == 1)
            return { id };
        return this.returnError('noUpdate');
    }
    async removeInvoiceParts(id) {
        const deld = await this.knex.table('invoice_parts').where('id', id).delete();
        if (this.debug)
            console.log('\x1b[31m Delete Invoice Part:\x1b[0m', id, deld);
        if (deld == 1)
            return { id };
        return this.returnError('noDelete');
    }
    findInvoiceArray(id) {
        return this.knex.table('invoice_array').where('invoices_id', id);
    }
    async addInvoiceArray(id, addInvoiceArrayDto) {
        const zodsafe = create_invoice_dto_1.AddInvoiceArrayZod.safeParse(addInvoiceArrayDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (!minv)
            return this.returnError("invalidInvoiceId");
        else if (minv.final)
            return this.returnError("finalInvoice");
        const minvs = await this.knex
            .table('invoice_services')
            .where('id', addInvoiceArrayDto.service_id)
            .first();
        if (!minvs)
            return this.returnError('invalidInvoiceServiceId');
        const insdata = new invoice_entity_1.InvoiceArray();
        insdata.invoices_id = id;
        insdata.service_id = addInvoiceArrayDto.service_id;
        insdata.price = minvs.price;
        insdata.count = addInvoiceArrayDto.count;
        const sr = await this.knex.table('invoice_array').insert(insdata);
        if (this.debug)
            console.log('\x1b[36m Add Invoice Array:\x1b[0m', sr);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noInvoiceArray');
    }
    async updateInvoiceArray(id, updateInvoiceArrayDto) {
        const zodsafe = update_invoice_dto_1.UpdateInvoiceCountZod.safeParse(updateInvoiceArrayDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const updata = { updated_at: new Date() };
        if (updateInvoiceArrayDto.count !== undefined)
            updata.count = updateInvoiceArrayDto.count;
        const upd = await this.knex.table('invoice_array').where('id', id).update(updata);
        if (this.debug)
            console.log('\x1b[32m Update Invoice Array:\x1b[0m', id, updata, upd);
        if (upd == 1)
            return { id };
        return this.returnError('noUpdate');
    }
    async removeInvoiceArray(id) {
        const deld = await this.knex.table('invoice_array').where('id', id).delete();
        if (this.debug)
            console.log('\x1b[31m Delete Invoice Array:\x1b[0m', id, deld);
        if (deld == 1)
            return { id };
        return this.returnError('noDelete');
    }
    async addVehicle(id, addInvoiceVehicleDto) {
        const zodsafe = create_invoice_dto_1.AddInvoiceVehicleZod.safeParse(addInvoiceVehicleDto);
        if (!zodsafe.success) {
            return this.returnError('validation', zodsafe.error.issues);
        }
        const minv = await this.knex.table('invoices').where('id', id).first();
        if (!minv)
            return this.returnError("invalidInvoiceId");
        else if (minv.final)
            return this.returnError("finalInvoice");
        const vehicle = await this.knex.table('vehicle_parts').where('vehicle_id', addInvoiceVehicleDto.vehicle_id);
        if (vehicle.length == 0)
            return this.returnError('noVehicleParts');
        const partsMap = {};
        const vehiclePartIds = vehicle.map((e) => {
            partsMap[e.parts_id] = e;
            return e.parts_id;
        });
        const storeParts = await this.knex.table('store').whereIn('parts_id', vehiclePartIds);
        storeParts.forEach((e) => {
            const pid = partsMap[e.parts_id];
            if (pid.vendor_id !== e.vendor_id)
                return;
            if (pid.price === undefined) {
                pid.price = e.price;
                pid.store_id = e.id;
            }
        });
        const invoiceParts = vehicle.map((e) => {
            const pid = partsMap[e.parts_id];
            var ipart = { invoices_id: id, count: pid.count, parts_id: pid.parts_id, vendor_id: pid.vendor_id };
            ipart.price = pid.price !== undefined ? pid.price : 0;
            ipart.store_id = pid.store_id !== undefined ? pid.store_id : 0;
            return ipart;
        });
        const sr = await this.knex.table('invoice_parts').insert(invoiceParts);
        if (sr.length === 1) {
            return { id: sr[0] };
        }
        return this.returnError('noInvoiceParts');
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map