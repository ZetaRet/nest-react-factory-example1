import { InvoicesService } from './invoices.service';
import { AddInvoiceArrayDto, AddInvoicePartsDto, AddInvoiceVehicleDto, CreateInvoiceDto, CreateInvoiceServiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceArrayDto, UpdateInvoiceDto, UpdateInvoicePartsDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<any>;
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
    findOne(id: string): Promise<any>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<any>;
    clear(id: string): Promise<any>;
    total(id: string): Promise<any>;
    view(id: string): Promise<any>;
    createService(createInvoiceServiceDto: CreateInvoiceServiceDto): Promise<any>;
    findAllServices(): import("knex").Knex.QueryBuilder<{}, ({
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
    findInvoiceParts(id: string): import("knex").Knex.QueryBuilder<{}, ({
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
    addInvoiceParts(id: string, addInvoicePartsDto: AddInvoicePartsDto): Promise<any>;
    updateInvoiceParts(id: string, updateInvoicePartsDto: UpdateInvoicePartsDto): Promise<any>;
    removeInvoiceParts(id: string): Promise<any>;
    findInvoiceArray(id: string): import("knex").Knex.QueryBuilder<{}, ({
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
    addInvoiceArray(id: string, addInvoiceArrayDto: AddInvoiceArrayDto): Promise<any>;
    updateInvoiceArray(id: string, updateInvoiceArrayDto: UpdateInvoiceArrayDto): Promise<any>;
    removeInvoiceArray(id: string): Promise<any>;
    addVehicle(id: string, addInvoiceVehicleDto: AddInvoiceVehicleDto): Promise<any>;
}
