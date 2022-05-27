import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      process.env.BASE_URL_UI,
      process.env.SWAGGER_API,
    ],
    credentials: true,
  });
  await app.listen(+process.env.PORT || 3000);
}
bootstrap();
