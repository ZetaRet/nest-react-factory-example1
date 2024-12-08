import { Injectable } from '@nestjs/common';
import { CreateStoreDto, CreateStoreZod } from './dto/create-store.dto';
import { UpdateStoreDto, UpdateStoreZod } from './dto/update-store.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Store, StoreInterface } from './entities/store.entity';
import { PartInterface } from 'src/parts/entities/part.entity';
import { VendorInterface } from 'src/vendors/entities/vendor.entity';

@Injectable()
export class StoreService {
  private debug: boolean = true;

  constructor(@InjectConnection() private knex: Knex) {}

  private returnError(err: string, data?: any): any {
    return { err, data };
  }

  async create(createStoreDto: CreateStoreDto) {
    const zodsafe: any = CreateStoreZod.safeParse(createStoreDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const mpart: PartInterface = await this.knex.table('mobile_parts').where('id', createStoreDto.parts_id).first();
    if (!mpart) {
      return this.returnError('invalidPartId');
    }
    const mvend: VendorInterface = await this.knex.table('vendors').where('id', createStoreDto.vendor_id).first();
    if (!mvend) {
      return this.returnError('invalidVendorId');
    }

    const insdata: Store = new Store();
    insdata.parts_id = createStoreDto.parts_id;
    insdata.vendor_id = createStoreDto.vendor_id;
    insdata.count = createStoreDto.count;
    insdata.price = createStoreDto.price;

    const sr = await this.knex.table('store').insert(insdata);
    if (this.debug) console.log('\x1b[36m Create Store Item:\x1b[0m', sr);

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
      .select([
        'store.*',
        'mobile_parts.name',
        'mobile_parts.type',
        'mobile_parts.model',
        this.knex.raw('vendors.name as vendor_name'),
      ])
      .leftJoin('mobile_parts', 'store.parts_id', 'mobile_parts.id')
      .leftJoin('vendors', 'store.vendor_id', 'vendors.id');
  }

  async findOne(id: number) {
    const msto: StoreInterface = await this.knex.table('store').where('id', id).first();
    if (this.debug) console.log('\x1b[34m Store Item:\x1b[0m', msto);

    if (!msto) {
      return this.returnError('noStoreItem');
    }
    return msto;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const zodsafe: any = UpdateStoreZod.safeParse(updateStoreDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const updata: any = { updatedAt: new Date() };
    if (updateStoreDto.count !== undefined) updata.count = updateStoreDto.count;
    if (updateStoreDto.price !== undefined) updata.price = updateStoreDto.price;

    const upd: any = await this.knex.table('store').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Store:\x1b[0m', id, updata, upd);

    if (upd == 1) {
      return { id };
    }

    return this.returnError('noUpdate');
  }
}
