"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const allowedOrigins = [
        'http://localhost:3000',
        'https://yourfrontend.vercel.app',
    ];
    app.enableCors({
        origin: (origin, cb) => {
            if (!origin || allowedOrigins.includes(origin)) {
                cb(null, true);
            }
            else {
                cb(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.getHttpAdapter().getInstance().options('*', (req, res) => {
        res.sendStatus(200);
    });
    app.use((req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
        res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
        next();
    });
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map