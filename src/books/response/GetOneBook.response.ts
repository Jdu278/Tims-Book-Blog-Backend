import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetOneBookResponse {
  @ApiProperty()
  importId: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  authors: string;

  @ApiPropertyOptional()
  pages: number;

  @ApiPropertyOptional()
  publishers: string;

  @ApiPropertyOptional()
  releaseDate: string;

  @ApiPropertyOptional()
  image: string;
}
