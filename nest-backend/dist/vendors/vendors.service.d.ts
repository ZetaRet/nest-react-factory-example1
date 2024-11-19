import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Knex } from 'knex';
export declare class VendorsService {
    private knex;
    private debug;
    constructor(knex: Knex);
    private returnError;
    create(createVendorDto: CreateVendorDto): Promise<any>;
    findAll(): Knex.QueryBuilder<{}, ({
        _base: {};
        _hasSelection: boolean;
        _keys: string;
        _aliases: {};
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    } | {
        _base: {};
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    })[] | {
        _base: {};
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateVendorDto: UpdateVendorDto): Promise<any>;
    remove(id: number): Promise<any>;
}
