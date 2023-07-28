import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOneBookResponse } from './response/GetOneBook.response';
import { ApiKeyGuard } from '../auth/guards/api.guard';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth('api-key')
  @UseGuards(ApiKeyGuard)
  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }
  @ApiBearerAuth('api-key')
  @UseGuards(ApiKeyGuard)
  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  @ApiNotFoundResponse()
  async getOneBook(@Param('id') id: string): Promise<GetOneBookResponse> {
    return await this.booksService.getOneBook(id);
  }
  @ApiBearerAuth('api-key')
  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOkResponse()
  async importCsvFile(): Promise<void> {
    await this.booksService.importCsvFile();
  }
}
