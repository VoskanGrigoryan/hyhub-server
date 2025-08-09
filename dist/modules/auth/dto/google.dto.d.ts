import { Request } from 'express';
export declare class GoogleDto {
    code: string;
}
export interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
        [key: string]: any;
    };
}
