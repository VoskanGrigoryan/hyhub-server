"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
require("dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://localhost:3000',
            'https://myhub-client.vercel.app',
            /\.vercel\.app$/
        ],
        credentials: true,
    });
    app.use(cookieParser());
    app.use((req, res, next) => {
        res.setHeader('same-origin-allow-popups');
        next();
    });
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map