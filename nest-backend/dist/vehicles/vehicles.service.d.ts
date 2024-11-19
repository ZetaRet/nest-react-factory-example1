import { AddPartDto, CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Knex } from 'knex';
export declare class VehiclesService {
    private knex;
    private debug;
    constructor(knex: Knex);
    private returnError;
    create(createVehicleDto: CreateVehicleDto): Promise<any>;
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
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<any>;
    addPart(addPartDto: AddPartDto): Promise<any>;
    getVehicleParts(id: number): Knex.QueryBuilder<{}, ({
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
    getVehiclePartsDetails(id: number): Knex.QueryBuilder<any, ({
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: string[];
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    } | {
        _base: any;
        _hasSelection: true;
        _keys: never;
        _aliases: string[];
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    })[]>;
}
