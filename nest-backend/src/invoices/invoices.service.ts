import { Injectable } from '@nestjs/common';
import {
  AddInvoiceArrayDto,
  AddInvoiceArrayZod,
  AddInvoicePartsDto,
  AddInvoicePartsZod,
  AddInvoiceVehicleDto,
  AddInvoiceVehicleZod,
  CreateInvoiceDto,
  CreateInvoiceServiceDto,
  CreateInvoiceServiceZod,
  CreateInvoiceZod,
} from './dto/create-invoice.dto';
import {
  UpdateInvoiceArrayDto,
  UpdateInvoiceCountZod,
  UpdateInvoiceDto,
  UpdateInvoicePartsDto,
  UpdateInvoiceZod,
} from './dto/update-invoice.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import {
  Invoice,
  InvoiceArray,
  InvoiceInterface,
  InvoiceParts,
  InvoiceService,
  InvoiceServiceInterface,
} from './entities/invoice.entity';
import { StoreInterface } from 'src/store/entities/store.entity';
import { InvoiceErrors } from './enum/invoice.enum';

@Injectable()
export class InvoicesService {
  private debug: boolean = true;

  constructor(@InjectConnection() private knex: Knex) {}

  private returnError(err: string, data?: any): any {
    return { err, data };
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const zodsafe: any = CreateInvoiceZod.safeParse(createInvoiceDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const now = new Date();
    const insdata: Invoice = new Invoice();
    insdata.client = createInvoiceDto.client;
    insdata.created_at = now;
    insdata.updated_at = now;

    const sr = await this.knex.table('invoices').insert(insdata);
    if (this.debug) console.log('\x1b[36m Create Invoice:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError('noInvoice');
  }

  findAll() {
    return this.knex.table('invoices').orderBy('final', 'desc').orderBy('updated_at', 'desc');
  }

  async findOne(id: number) {
    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (this.debug) console.log('\x1b[34m Invoice:\x1b[0m', minv);

    if (!minv) {
      return this.returnError('noInvoice');
    }
    return minv;
  }

  async getTotal(id: number) {
    var total: number = 0;
    const sum_parts = await this.knex
      .table('invoice_parts')
      .select([this.knex.raw('sum(price*count) as sum_parts')])
      .where('invoices_id', id);
    console.log('Sum Parts', sum_parts);
    if (sum_parts.length == 1) total += parseFloat(sum_parts[0].sum_parts || 0);

    const sum_array = await this.knex
      .table('invoice_array')
      .select([this.knex.raw('sum(price*count) as sum_array')])
      .where('invoices_id', id);
    console.log('Sum Array', sum_array);
    if (sum_array.length == 1) total += parseFloat(sum_array[0].sum_array || 0);

    return total;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const zodsafe: any = UpdateInvoiceZod.safeParse(updateInvoiceDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (!minv) return this.returnError(InvoiceErrors.invalidInvoiceId);
    else if (minv.final) return this.returnError(InvoiceErrors.finalInvoice);

    const updata: Partial<Invoice> = { updated_at: new Date() };
    if (updateInvoiceDto.client !== undefined) updata.client = updateInvoiceDto.client;
    if (updateInvoiceDto.final !== undefined) updata.final = updateInvoiceDto.final;
    if (updateInvoiceDto.final) {
      var total: number = await this.getTotal(id);
      updata.total = total;
    }

    const upd: any = await this.knex.table('invoices').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Invoice:\x1b[0m', id, updata, upd);

    if (upd == 1) {
      return { id };
    }

    return this.returnError('noUpdate');
  }

  async clear(id: number) {
    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (!minv) return this.returnError(InvoiceErrors.invalidInvoiceId);
    else if (minv.final) return this.returnError(InvoiceErrors.finalInvoice);
    await this.knex.table('invoice_parts').where('invoices_id', id).delete();
    await this.knex.table('invoice_array').where('invoices_id', id).delete();
    if (this.debug) console.log('\x1b[31m Delete Invoice Parts/Array:\x1b[0m', id);
    return { id };
  }

  async total(id: number) {
    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (!minv) return this.returnError('noInvoice');
    else if (minv.final) return { total: parseFloat(minv.total as any) };
    var total: number = await this.getTotal(id);
    return { total };
  }

  async createService(createInvoiceServiceDto: CreateInvoiceServiceDto) {
    const zodsafe: any = CreateInvoiceServiceZod.safeParse(createInvoiceServiceDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const now = new Date();
    const insdata: InvoiceService = new InvoiceService();
    insdata.name = createInvoiceServiceDto.name;
    insdata.price = createInvoiceServiceDto.price;
    insdata.created_at = now;
    insdata.updated_at = now;

    const sr = await this.knex.table('invoice_services').insert(insdata);
    if (this.debug) console.log('\x1b[36m Create Invoice Service:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError(InvoiceErrors.noInvoiceService);
  }

  findAllServices() {
    return this.knex.table('invoice_services');
  }

  findInvoiceParts(id: number) {
    return this.knex.table('invoice_parts').where('invoices_id', id);
  }

  async addInvoiceParts(id: number, addInvoicePartsDto: AddInvoicePartsDto) {
    const zodsafe: any = AddInvoicePartsZod.safeParse(addInvoicePartsDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (!minv) return this.returnError(InvoiceErrors.invalidInvoiceId);
    else if (minv.final) return this.returnError(InvoiceErrors.finalInvoice);
    const msto: StoreInterface = await this.knex.table('store').where('id', addInvoicePartsDto.store_id).first();
    if (!msto) return this.returnError('invalidStoreId');

    const insdata: InvoiceParts = new InvoiceParts();
    insdata.invoices_id = id;
    insdata.store_id = addInvoicePartsDto.store_id;
    insdata.parts_id = msto.parts_id;
    insdata.vendor_id = msto.vendor_id;
    insdata.price = msto.price;
    insdata.count = addInvoicePartsDto.count;

    const sr = await this.knex.table('invoice_parts').insert(insdata);
    if (this.debug) console.log('\x1b[36m Add Invoice Parts:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError('noInvoiceParts');
  }

  async updateInvoiceParts(id: number, updateInvoicePartsDto: UpdateInvoicePartsDto) {
    const zodsafe: any = UpdateInvoiceCountZod.safeParse(updateInvoicePartsDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const updata: Partial<InvoiceParts> = { updated_at: new Date() };
    if (updateInvoicePartsDto.count !== undefined) updata.count = updateInvoicePartsDto.count;

    const upd: any = await this.knex.table('invoice_parts').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Invoice Parts:\x1b[0m', id, updata, upd);

    if (upd == 1) return { id };
    return this.returnError('noUpdate');
  }

  async removeInvoiceParts(id: number) {
    const deld: any = await this.knex.table('invoice_parts').where('id', id).delete();
    if (this.debug) console.log('\x1b[31m Delete Invoice Part:\x1b[0m', id, deld);
    if (deld == 1) return { id };
    return this.returnError('noDelete');
  }

  findInvoiceArray(id: number) {
    return this.knex.table('invoice_array').where('invoices_id', id);
  }

  async addInvoiceArray(id: number, addInvoiceArrayDto: AddInvoiceArrayDto) {
    const zodsafe: any = AddInvoiceArrayZod.safeParse(addInvoiceArrayDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (!minv) return this.returnError(InvoiceErrors.invalidInvoiceId);
    else if (minv.final) return this.returnError(InvoiceErrors.finalInvoice);
    const minvs: InvoiceServiceInterface = await this.knex
      .table('invoice_services')
      .where('id', addInvoiceArrayDto.service_id)
      .first();
    if (!minvs) return this.returnError('invalidInvoiceServiceId');

    const insdata: InvoiceArray = new InvoiceArray();
    insdata.invoices_id = id;
    insdata.service_id = addInvoiceArrayDto.service_id;
    insdata.price = minvs.price;
    insdata.count = addInvoiceArrayDto.count;

    const sr = await this.knex.table('invoice_array').insert(insdata);
    if (this.debug) console.log('\x1b[36m Add Invoice Array:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError('noInvoiceArray');
  }

  async updateInvoiceArray(id: number, updateInvoiceArrayDto: UpdateInvoiceArrayDto) {
    const zodsafe: any = UpdateInvoiceCountZod.safeParse(updateInvoiceArrayDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const updata: Partial<InvoiceArray> = { updated_at: new Date() };
    if (updateInvoiceArrayDto.count !== undefined) updata.count = updateInvoiceArrayDto.count;

    const upd: any = await this.knex.table('invoice_array').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Invoice Array:\x1b[0m', id, updata, upd);

    if (upd == 1) return { id };
    return this.returnError('noUpdate');
  }

  async removeInvoiceArray(id: number) {
    const deld: any = await this.knex.table('invoice_array').where('id', id).delete();
    if (this.debug) console.log('\x1b[31m Delete Invoice Array:\x1b[0m', id, deld);
    if (deld == 1) return { id };
    return this.returnError('noDelete');
  }

  async addVehicle(id: number, addInvoiceVehicleDto: AddInvoiceVehicleDto) {
    const zodsafe: any = AddInvoiceVehicleZod.safeParse(addInvoiceVehicleDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const minv: InvoiceInterface = await this.knex.table('invoices').where('id', id).first();
    if (!minv) return this.returnError(InvoiceErrors.invalidInvoiceId);
    else if (minv.final) return this.returnError(InvoiceErrors.finalInvoice);

    const vehicle = await this.knex.table('vehicle_parts').where('vehicle_id', addInvoiceVehicleDto.vehicle_id);
    if (vehicle.length == 0) return this.returnError('noVehicleParts');

    const partsMap = {};
    const vehiclePartIds = vehicle.map((e) => {
      partsMap[e.parts_id] = e;
      return e.parts_id;
    });

    const storeParts = await this.knex.table('store').whereIn('parts_id', vehiclePartIds);
    storeParts.forEach((e) => {
      const pid = partsMap[e.parts_id];
      if (pid.vendor_id !== e.vendor_id) return;
      if (pid.price === undefined) {
        pid.price = e.price;
        pid.store_id = e.id;
      }
    });

    const invoiceParts = vehicle.map((e) => {
      const pid = partsMap[e.parts_id];
      var ipart: any = { invoices_id: id, count: pid.count, parts_id: pid.parts_id, vendor_id: pid.vendor_id };
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
}
