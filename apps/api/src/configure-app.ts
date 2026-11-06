import { ValidationPipe } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ProblemDetailsFilter } from "./common/filters/problem-details.filter";

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? "http://localhost:3000")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ProblemDetailsFilter());

  const options = new DocumentBuilder()
    .setTitle("Commerce API")
    .setDescription("Public product catalog API")
    .setVersion("1.0.0")
    .setOpenAPIVersion("3.1.0")
    .addTag("products")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/docs", app, document, {
    jsonDocumentUrl: "api/openapi.json",
  });
}
