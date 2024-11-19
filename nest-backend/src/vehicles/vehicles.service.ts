import { Injectable } from '@nestjs/common';
import { AddPartDto, AddPartZod, CreateVehicleDto, CreateVehicleZod } from './dto/create-vehicle.dto';
import { UpdateVehicleDto, UpdateVehicleZod } from './dto/update-vehicle.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Vehicle, VehicleInterface, VehiclePart } from './entities/vehicle.entity';
import { VendorInterface } from 'src/vendors/entities/vendor.entity';
import { PartInterface } from 'src/parts/entities/part.entity';

@Injectable()
export class VehiclesService {
  private debug: boolean = true;

  constructor(@InjectConnection() private knex: Knex) {}

  private returnError(err: string, data?: any): any {
    return { err, data };
  }

  async create(createVehicleDto: CreateVehicleDto) {
    const zodsafe: any = CreateVehicleZod.safeParse(createVehicleDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const insdata: Vehicle = new Vehicle();
    insdata.name = createVehicleDto.name;
    insdata.model = createVehicleDto.model;
    insdata.engine = createVehicleDto.engine;

    const sr = await this.knex.table('assemble_vehicle').insert(insdata);
    if (this.debug) console.log('\x1b[36m Create Vehicle:\x1b[0m', sr);

    if (sr.length === 1) {
      return { id: sr[0] };
    }
    return this.returnError('noVehicle');
  }

  findAll() {
    return this.knex.table('assemble_vehicle');
  }

  async findOne(id: number) {
    const mveh: VehicleInterface = await this.knex.table('assemble_vehicle').where('id', id).first();
    if (this.debug) console.log('\x1b[34m Vehicle:\x1b[0m', mveh);

    if (!mveh) {
      return this.returnError('noVehicle');
    }
    return mveh;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const zodsafe: any = UpdateVehicleZod.safeParse(updateVehicleDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const updata: any = { updatedAt: new Date() };
    if (updateVehicleDto.name !== undefined) updata.name = updateVehicleDto.name;
    if (updateVehicleDto.model !== undefined) updata.model = updateVehicleDto.model;
    if (updateVehicleDto.engine !== undefined) updata.engine = updateVehicleDto.engine;

    const upd: any = await this.knex.table('assemble_vehicle').where('id', id).update(updata);
    if (this.debug) console.log('\x1b[32m Update Vehicle:\x1b[0m', id, updata, upd);

    if (upd == 1) {
      return { id };
    }

    return this.returnError('noUpdate');
  }

  async addPart(addPartDto: AddPartDto) {
    const zodsafe: any = AddPartZod.safeParse(addPartDto);
    if (!zodsafe.success) {
      return this.returnError('validation', zodsafe.error.issues);
    }

    const mveh: VehicleInterface = await this.knex.table('assemble_vehicle').where('id', addPartDto.vehicle_id).first();
    if (!mveh) {
      return this.returnError('invalidVehicleId');
    }
    const mpart: PartInterface = await this.knex.table('mobile_parts').where('id', addPartDto.parts_id).first();
    if (!mpart) {
      return this.returnError('invalidPartId');
    }
    const mvend: VendorInterface = await this.knex.table('vendors').where('id', addPartDto.vendor_id).first();
    if (!mvend) {
      return this.returnError('invalidVendorId');
    }

    const insdata: VehiclePart = new VehiclePart();
    insdata.vehicle_id = addPartDto.vehicle_id;
    insdata.parts_id = addPartDto.parts_id;
    insdata.vendor_id = addPartDto.vendor_id;
    insdata.count = addPartDto.count;

    const sr = await this.knex.table('vehicle_parts').insert(insdata);
    if (this.debug) console.log('\x1b[36m Add Vehicle Part:\x1b[0m', sr);

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

  getVehicleParts(id: number) {
    return this.knex.table('vehicle_parts').where('vehicle_id', id);
  }

  getVehiclePartsDetails(id: number) {
    return this.knex
      .table('vehicle_parts')
      .select(['vehicle_parts.*', 'mobile_parts.name', 'mobile_parts.type', 'mobile_parts.model'])
      .leftJoin('mobile_parts', function () {
        this.on('vehicle_parts.parts_id', '=', 'mobile_parts.id');
      })
      .where('vehicle_id', id);
  }
}
