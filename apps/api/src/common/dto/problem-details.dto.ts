import { ApiProperty } from "@nestjs/swagger";

export class ProblemDetailsDto {
  @ApiProperty({ example: "about:blank" })
  type!: string;

  @ApiProperty({ example: "BAD REQUEST" })
  title!: string;

  @ApiProperty({ example: 400 })
  status!: number;

  @ApiProperty({ example: "The request is invalid." })
  detail!: string;

  @ApiProperty({ example: "/api/v1/products?limit=0" })
  instance!: string;
}
