import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(createStoreDto: CreateStoreDto): Promise<any>;
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
    findAllDetails(): import("knex").Knex.QueryBuilder<any, ({
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: (string | import("knex").Knex.Raw<any>)[];
        _single: boolean;
        _intersectProps: {};
        _unionProps: unknown;
    } | {
        _base: any;
        _hasSelection: true;
        _keys: never;
        _aliases: (string | import("knex").Knex.Raw<any>)[];
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    })[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateStoreDto: UpdateStoreDto): Promise<any>;
}
