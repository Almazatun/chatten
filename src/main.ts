import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      configService.get<string>("baseUrl"),
      configService.get<string>("swaggerApi"),
    ],
    credentials: true,
  });

  await app.listen(configService.get<number>("appPort"));
}
bootstrap();
