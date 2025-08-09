import { Response as ExpressResponse, Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleDto, RequestWithUser } from './dto/google.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleLogin(dto: GoogleDto, res: ExpressResponse, req: Request): Promise<{
        success: boolean;
        user: {
            id: string;
            email: string;
            name: string | null;
            picture: string | null;
            provider: string;
            createdAt: Date;
            updatedAt: Date;
        };
        isNewUser: boolean;
    }>;
    logout(res: ExpressResponse, req: Request): {
        success: boolean;
    };
    me(req: RequestWithUser): {
        [key: string]: any;
        id: string;
        email: string;
    };
}
