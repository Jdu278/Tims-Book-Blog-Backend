import { ApiProperty } from '@nestjs/swagger';
import { GetOneBookResponse } from './GetOneBook.response';

export class GetAllBooksResponse {
  @ApiProperty({ type: [GetOneBookResponse] })
  books: GetOneBookResponse[];
}
