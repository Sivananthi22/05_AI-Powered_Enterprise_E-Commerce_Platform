import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CatalogModule } from "./catalog/catalog.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, CatalogModule],
  controllers: [AppController],
})
export class AppModule {}
