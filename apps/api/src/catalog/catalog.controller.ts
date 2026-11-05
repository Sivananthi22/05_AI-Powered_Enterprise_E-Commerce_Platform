import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import type { Product, ProductList } from "@commerce/types";
import { ProblemDetailsDto } from "../common/dto/problem-details.dto";
import { CatalogService } from "./catalog.service";
import { ProductQueryDto } from "./dto/product-query.dto";
import {
  ProductListResponseDto,
  ProductResponseDto,
} from "./dto/product-response.dto";

@ApiTags("products")
@Controller("products")
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  @ApiOperation({ summary: "List products using cursor pagination" })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    minimum: 1,
    maximum: 100,
  })
  @ApiQuery({
    name: "cursor",
    required: false,
    type: String,
    format: "uuid",
    description: "Product ID returned as the previous page's nextCursor",
  })
  @ApiOkResponse({ type: ProductListResponseDto })
  @ApiBadRequestResponse({
    description: "Invalid query parameters",
    type: ProblemDetailsDto,
  })
  listProducts(@Query() query: ProductQueryDto): Promise<ProductList> {
    return this.catalogService.listProducts(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({ name: "id", format: "uuid" })
  @ApiOkResponse({ type: ProductResponseDto })
  @ApiBadRequestResponse({
    description: "The product ID is not a UUID",
    type: ProblemDetailsDto,
  })
  @ApiNotFoundResponse({
    description: "The product does not exist or is not active",
    type: ProblemDetailsDto,
  })
  getProduct(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ): Promise<Product> {
    return this.catalogService.getProduct(id);
  }
}
