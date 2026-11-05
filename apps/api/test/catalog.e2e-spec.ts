import { NotFoundException } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { CatalogService } from "../src/catalog/catalog.service";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/configure-app";
import { PrismaService } from "../src/prisma/prisma.service";

const product = {
  id: "607f1f77-bc49-4a56-9c2c-bc3856eec9d9",
  sku: "HOME-MUG-001",
  slug: "ceramic-coffee-mug",
  name: "Ceramic Coffee Mug",
  description: "A stoneware mug.",
  priceCents: 1800,
  currency: "USD",
  imageUrl: null,
  createdAt: "2026-11-05T00:00:00.000Z",
  updatedAt: "2026-11-05T00:00:00.000Z",
};

describe("Catalog API", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CatalogService)
      .useValue({
        listProducts: jest.fn().mockResolvedValue({
          items: [product],
          pageInfo: { hasNextPage: false, nextCursor: null },
        }),
        getProduct: jest.fn().mockResolvedValue(product),
      })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = module.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("lists products with cursor page information", async () => {
    await request(app.getHttpServer())
      .get("/api/v1/products?limit=1")
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual({
          items: [product],
          pageInfo: { hasNextPage: false, nextCursor: null },
        });
      });
  });

  it("returns RFC 7807 for invalid pagination input", async () => {
    await request(app.getHttpServer())
      .get("/api/v1/products?limit=101")
      .expect("Content-Type", /application\/problem\+json/)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          type: "about:blank",
          status: 400,
          instance: "/api/v1/products?limit=101",
        });
      });
  });

  it("returns a product by ID", async () => {
    await request(app.getHttpServer())
      .get(`/api/v1/products/${product.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(product);
      });
  });

  it("serves the versioned OpenAPI document", async () => {
    await request(app.getHttpServer())
      .get("/api/openapi.json")
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          openapi: "3.1.0",
          paths: {
            "/api/v1/products": expect.any(Object),
            "/api/v1/products/{id}": expect.any(Object),
          },
        });
      });
  });

  it("returns RFC 7807 when a product is not found", async () => {
    const catalog = app.get(CatalogService);
    jest
      .spyOn(catalog, "getProduct")
      .mockRejectedValueOnce(new NotFoundException("Product not found."));

    await request(app.getHttpServer())
      .get(`/api/v1/products/${product.id}`)
      .expect("Content-Type", /application\/problem\+json/)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          type: "about:blank",
          status: 404,
          detail: "Product not found.",
        });
      });
  });
});
