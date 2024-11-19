import { Injectable } from '@nestjs/common';
import { CreatePartDto, CreatePartZod } from './dto/create-part.dto';
import { UpdatePartDto, UpdatePartZod } from './dto/update-part.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Part, PartInterface } from './entities/part.entity';

@Injectable()
export class PartsService {
  private debug: boolean = true;

  constructor(@InjectConnection() private knex: Knex) {}

  private returnError(err: string, data?: any): any {
    return { err, data };
  }

  async create(createPartDto: CreatePartDto) {
    const zodsafe: any = CreatePartZod.safeParse(createPartDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const insdata: Part = new Part();
    insdata.name = createPartDto.name;
    insdata.type = createPartDto.type;
    insdata.model = createPartDto.model;

    const sr = await this.knex.table('mobile_parts').insert(insdata);
    if (this.debug) console.log('\x1b[36m Create Mobile Part:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError('noCreatePart');
  }

  findAll() {
    return this.knex.table('mobile_parts');
  }

  async findOne(id: number) {
    const mpart: PartInterface = await this.knex.table('mobile_parts').where('id', id).first();
    if (this.debug) console.log('\x1b[34m Mobile Part:\x1b[0m', mpart);

    if (!mpart) {
      return this.returnError('noPart');
    }
    return mpart;
  }

  async update(id: number, updatePartDto: UpdatePartDto) {
    const zodsafe: any = UpdatePartZod.safeParse(updatePartDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const updata: any = { updatedAt: new Date() };
    if (updatePartDto.name !== undefined) updata.name = updatePartDto.name;
    if (updatePartDto.type !== undefined) updata.type = updatePartDto.type;
    if (updatePartDto.model !== undefined) updata.model = updatePartDto.model;

    const upd: any = await this.knex.table('mobile_parts').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Part:\x1b[0m', id, updata, upd);

    if (upd == 1) {
      return { id };
    }

    return this.returnError('noUpdate');
  }

  async remove(id: number) {
    const deld: any = await this.knex.table('mobile_parts').where('id', id).delete();
    if (this.debug) console.log('\x1b[31m Delete Part:\x1b[0m', id, deld);

    if (deld == 1) {
      return { id };
    }

    return this.returnError('noDelete');
  }
}
