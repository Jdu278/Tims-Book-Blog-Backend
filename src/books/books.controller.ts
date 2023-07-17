import { Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOneBookResponse } from './response/GetOneBook.response';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  async getOneBook(@Param('id') id: string): Promise<GetOneBookResponse> {
    return await this.booksService.getOneBook(id);
  }

  @Post()
  @ApiOkResponse()
  async importCsvFile(): Promise<void> {
    await this.booksService.importCsvFile();
  }
}
