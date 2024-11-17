import * as z from 'zod';
export declare const CreatePartZod: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    model: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    type?: string;
    model?: string;
}, {
    name?: string;
    type?: string;
    model?: string;
}>;
export declare class CreatePartDto {
    name: string;
    type: string;
    model: string;
}
