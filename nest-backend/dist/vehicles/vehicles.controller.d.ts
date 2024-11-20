import { VehiclesService } from './vehicles.service';
import { AddPartDto, CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { EngineTypes } from './entities/vehicle.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): Promise<any>;
    findAll(): import("knex").Knex.QueryBuilder<{}, ({
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
    engineTypes(): EngineTypes[];
    findOne(id: string): Promise<any>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<any>;
    addPart(addPartDto: AddPartDto): Promise<any>;
    getVehicleParts(id: string): import("knex").Knex.QueryBuilder<{}, ({
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
    getVehiclePartsDetails(id: string): import("knex").Knex.QueryBuilder<any, ({
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
