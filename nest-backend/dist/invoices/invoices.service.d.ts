import { AddInvoiceArrayDto, AddInvoicePartsDto, AddInvoiceVehicleDto, CreateInvoiceDto, CreateInvoiceServiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceArrayDto, UpdateInvoiceDto, UpdateInvoicePartsDto } from './dto/update-invoice.dto';
import { Knex } from 'knex';
export declare class InvoicesService {
    private knex;
    private debug;
    constructor(knex: Knex);
    private returnError;
    create(createInvoiceDto: CreateInvoiceDto): Promise<any>;
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
    getTotal(id: number): Promise<number>;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<any>;
    clear(id: number): Promise<any>;
    total(id: number): Promise<any>;
    view(id: number): Promise<any>;
    createService(createInvoiceServiceDto: CreateInvoiceServiceDto): Promise<any>;
    findAllServices(): Knex.QueryBuilder<{}, ({
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
    findInvoiceParts(id: number): Knex.QueryBuilder<{}, ({
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
    addInvoiceParts(id: number, addInvoicePartsDto: AddInvoicePartsDto): Promise<any>;
    updateInvoiceParts(id: number, updateInvoicePartsDto: UpdateInvoicePartsDto): Promise<any>;
    removeInvoiceParts(id: number): Promise<any>;
    findInvoiceArray(id: number): Knex.QueryBuilder<{}, ({
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
    addInvoiceArray(id: number, addInvoiceArrayDto: AddInvoiceArrayDto): Promise<any>;
    updateInvoiceArray(id: number, updateInvoiceArrayDto: UpdateInvoiceArrayDto): Promise<any>;
    removeInvoiceArray(id: number): Promise<any>;
    addVehicle(id: number, addInvoiceVehicleDto: AddInvoiceVehicleDto): Promise<any>;
}
