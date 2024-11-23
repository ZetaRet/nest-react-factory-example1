export interface InvoiceInterface {
    id?: number;
    client: string;
    total?: number;
    final?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export declare class Invoice implements InvoiceInterface {
    id?: number;
    client: string;
    total?: number;
    final?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export declare class InvoiceServiceInterface {
    id?: number;
    name: string;
    price: number;
    created_at?: Date;
    updated_at?: Date;
}
export declare class InvoiceService implements InvoiceServiceInterface {
    id?: number;
    name: string;
    price: number;
    created_at?: Date;
    updated_at?: Date;
}
export declare class InvoiceParts {
    id?: number;
    invoices_id: number;
    store_id: number;
    parts_id: number;
    vendor_id: number;
    price: number;
    count: number;
    created_at?: Date;
    updated_at?: Date;
}
export declare class InvoiceArray {
    id?: number;
    invoices_id: number;
    service_id: number;
    price: number;
    count: number;
    created_at?: Date;
    updated_at?: Date;
}
