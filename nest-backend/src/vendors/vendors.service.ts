import { Injectable } from '@nestjs/common';
import { CreateVendorDto, CreateVendorZod } from './dto/create-vendor.dto';
import { UpdateVendorDto, UpdateVendorZod } from './dto/update-vendor.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Vendor, VendorInterface } from './entities/vendor.entity';

@Injectable()
export class VendorsService {
  private debug: boolean = true;

  constructor(@InjectConnection() private knex: Knex) {}

  private returnError(err: string, data?: any): any {
    return { err, data };
  }

  async create(createVendorDto: CreateVendorDto) {
    const zodsafe: any = CreateVendorZod.safeParse(createVendorDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const insdata: Vendor = new Vendor();
    insdata.name = createVendorDto.name;

    const sr = await this.knex.table('vendors').insert(insdata);
    if (this.debug) console.log('\x1b[36m Create Vendor:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError('noVendor');
  }

  findAll() {
    return this.knex.table('vendors');
  }

  async findOne(id: number) {
    const mvend: VendorInterface = await this.knex.table('vendors').where('id', id).first();
    if (this.debug) console.log('\x1b[34m Vendor:\x1b[0m', mvend);

    if (!mvend) {
      return this.returnError('noVendor');
    }
    return mvend;
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    const zodsafe: any = UpdateVendorZod.safeParse(updateVendorDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const updata: any = { updatedAt: new Date() };
    if (updateVendorDto.name !== undefined) updata.name = updateVendorDto.name;

    const upd: any = await this.knex.table('vendors').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Vendor:\x1b[0m', id, updata, upd);

    if (upd == 1) {
      return { id };
    }

    return this.returnError('noUpdate');
  }

  async remove(id: number) {
    const deld: any = await this.knex.table('vendors').where('id', id).delete();
    if (this.debug) console.log('\x1b[31m Delete Vendor:\x1b[0m', id, deld);

    if (deld == 1) {
      return { id };
    }

    return this.returnError('noDelete');
  }
}
