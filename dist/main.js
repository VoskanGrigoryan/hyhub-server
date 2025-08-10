"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const allowedOrigins = [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://myhub-client.vercel.app'
    ];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.includes(origin))
                return callback(null, true);
            return callback(new Error('Not allowed by CORS'), false);
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Origin', req.headers.origin || '');
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Credentials', 'true');
            return res.sendStatus(200);
        }
        next();
    });
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map