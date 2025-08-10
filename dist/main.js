"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
require("dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const allowedOrigins = process.env.NODE_ENV === 'production'
        ? ['https://myhub-client.vercel.app']
        : ['http://localhost:3000'];
    app.enableCors({
        origin: (origin, cb) => {
            if (!origin || allowedOrigins.includes(origin))
                cb(null, true);
            else
                cb(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
    app.use(cookieParser());
    app.use((req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        next();
    });
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map