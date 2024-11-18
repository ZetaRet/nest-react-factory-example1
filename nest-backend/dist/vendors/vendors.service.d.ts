import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Knex } from 'knex';
export declare class VendorsService {
    private knex;
    private debug;
    constructor(knex: Knex);
    private returnError;
    create(createVendorDto: CreateVendorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVendorDto: UpdateVendorDto): string;
    remove(id: number): string;
}
