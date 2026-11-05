import { ApiProperty } from "@nestjs/swagger";

export class ProductResponseDto {
  @ApiProperty({ format: "uuid" })
  id!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ minimum: 0 })
  priceCents!: number;

  @ApiProperty({ minLength: 3, maxLength: 3 })
  currency!: string;

  @ApiProperty({ type: String, format: "uri", nullable: true })
  imageUrl!: string | null;

  @ApiProperty({ format: "date-time" })
  createdAt!: string;

  @ApiProperty({ format: "date-time" })
  updatedAt!: string;
}

export class ProductPageInfoDto {
  @ApiProperty()
  hasNextPage!: boolean;

  @ApiProperty({ type: String, format: "uuid", nullable: true })
  nextCursor!: string | null;
}

export class ProductListResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  items!: ProductResponseDto[];

  @ApiProperty({ type: ProductPageInfoDto })
  pageInfo!: ProductPageInfoDto;
}
