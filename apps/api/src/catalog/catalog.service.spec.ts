import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CatalogService } from "./catalog.service";

const firstProduct = {
  id: "607f1f77-bc49-4a56-9c2c-bc3856eec9d9",
  sku: "HOME-MUG-001",
  slug: "ceramic-coffee-mug",
  name: "Ceramic Coffee Mug",
  description: "A stoneware mug.",
  priceCents: 1800,
  currency: "USD",
  imageUrl: null,
  isActive: true,
  createdAt: new Date("2026-11-05T00:00:00.000Z"),
  updatedAt: new Date("2026-11-05T00:00:00.000Z"),
};

const secondProduct = {
  ...firstProduct,
  id: "ec9a82b0-51bd-4d5b-bb4f-176defbdc79c",
  sku: "HOME-LAMP-002",
  slug: "desk-lamp",
  name: "Desk Lamp",
};

describe("CatalogService", () => {
  let service: CatalogService;
  const prismaMock = {
    product: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  it("returns a cursor when another page is available", async () => {
    prismaMock.product.findMany.mockResolvedValue([
      firstProduct,
      secondProduct,
    ]);

    const result = await service.listProducts({ limit: 1 });

    expect(result.items).toHaveLength(1);
    expect(result.pageInfo).toEqual({
      hasNextPage: true,
      nextCursor: firstProduct.id,
    });
    expect(prismaMock.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 2 }),
    );
  });

  it("rejects a cursor that does not exist", async () => {
    prismaMock.product.findUnique.mockResolvedValue(null);

    await expect(
      service.listProducts({
        limit: 10,
        cursor: firstProduct.id,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prismaMock.product.findMany).not.toHaveBeenCalled();
  });

  it("returns only active products by ID", async () => {
    prismaMock.product.findFirst.mockResolvedValue(firstProduct);

    await expect(service.getProduct(firstProduct.id)).resolves.toMatchObject({
      id: firstProduct.id,
      name: firstProduct.name,
    });
    expect(prismaMock.product.findFirst).toHaveBeenCalledWith({
      where: { id: firstProduct.id, isActive: true },
    });
  });

  it("reports an unavailable product", async () => {
    prismaMock.product.findFirst.mockResolvedValue(null);

    await expect(
      service.getProduct(firstProduct.id),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
