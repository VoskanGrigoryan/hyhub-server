import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private jwtService;
    private prisma;
    private oauthClient;
    constructor(jwtService: JwtService, prisma: PrismaService);
    googleSignIn(code: string): Promise<{
        token: string;
        isNewUser: boolean;
        user: {
            id: string;
            email: string;
            name: string | null;
            picture: string | null;
            provider: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
