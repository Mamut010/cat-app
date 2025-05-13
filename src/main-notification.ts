import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app-notification.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<string> {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            stopAtFirstError: true,
        }),
    );

    await app.listen(process.env.PORT ?? 3001);
    return await app.getUrl();
}

bootstrap()
    .then((appUrl) => console.log(`Server is listening at ${appUrl}`))
    .catch((err) => console.log("An error occured", err));
