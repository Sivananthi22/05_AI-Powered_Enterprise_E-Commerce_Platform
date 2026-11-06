import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { Product as DatabaseProduct } from "@prisma/client";
import type { Product, ProductList } from "@commerce/types";
import { PrismaService } from "../prisma/prisma.service";
import { ProductQueryDto } from "./dto/product-query.dto";

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async listProducts(query: ProductQueryDto): Promise<ProductList> {
    if (query.cursor) {
      const cursorProduct = await this.prisma.product.findUnique({
        where: { id: query.cursor },
        select: { id: true },
      });

      if (!cursorProduct) {
        throw new BadRequestException("The product cursor does not exist.");
      }
    }

    const products = await this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      ...(query.cursor
        ? {
            cursor: { id: query.cursor },
            skip: 1,
          }
        : {}),
      take: query.limit + 1,
    });

    const hasNextPage = products.length > query.limit;
    const pageProducts = products.slice(0, query.limit);

    return {
      items: pageProducts.map((product) => this.toResponse(product)),
      pageInfo: {
        hasNextPage,
        nextCursor: hasNextPage ? pageProducts.at(-1)?.id ?? null : null,
      },
    };
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id, isActive: true },
    });

    if (!product) {
      throw new NotFoundException("Product not found.");
    }

    return this.toResponse(product);
  }

  private toResponse(product: DatabaseProduct): Product {
    return {
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      description: product.description,
      priceCents: product.priceCents,
      currency: product.currency,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  }
}
