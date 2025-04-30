import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

function setupSwagger(app: INestApplication): void {
    const documentBuilder = new DocumentBuilder()
        .setTitle("Cat App")
        .setDescription("This is an application about cat, implemented with CQRS and DDD")
        .setVersion("1.0")
        .addTag("cat")
        .addTag("cqrs")
        .addTag("ddd")
        .addBasicAuth()
        .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup("api", app, document);
}

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

    setupSwagger(app);

    await app.listen(process.env.PORT ?? 3000);
    return await app.getUrl();
}

bootstrap()
    .then((appUrl) => console.log(`Server is listening at ${appUrl}`))
    .catch((err) => console.log("An error occured", err));
