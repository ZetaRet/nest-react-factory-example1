import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { Knex } from 'knex';
export declare class PartsService {
    private knex;
    private debug;
    constructor(knex: Knex);
    private returnError;
    create(createPartDto: CreatePartDto): Promise<any>;
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
    update(id: number, updatePartDto: UpdatePartDto): string;
    remove(id: number): string;
}
