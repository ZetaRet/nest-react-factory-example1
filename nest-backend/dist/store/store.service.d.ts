import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Knex } from 'knex';
export declare class StoreService {
    private knex;
    private debug;
    constructor(knex: Knex);
    private returnError;
    create(createStoreDto: CreateStoreDto): Promise<any>;
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
    findAllDetails(): Knex.QueryBuilder<any, ({
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
    findOne(id: number): Promise<any>;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<any>;
}
