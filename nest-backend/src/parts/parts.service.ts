import { Injectable } from '@nestjs/common';
import { CreatePartDto, CreatePartZod } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Part, PartInterface } from './entities/part.entity';
import * as z from 'zod';

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
    const mpart: PartInterface = await this.knex
      .table('mobile_parts')
      .where('id', id)
      .first();
    if (this.debug) console.log('\x1b[34m Mobile Part:\x1b[0m', mpart);

    if (!mpart) {
      return this.returnError('noPart');
    }
    return mpart;
  }

  update(id: number, updatePartDto: UpdatePartDto) {
    return `This action updates a #${id} part`;
  }

  remove(id: number) {
    return `This action removes a #${id} part`;
  }
}
