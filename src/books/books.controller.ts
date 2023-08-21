import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetOneBookResponse } from './response/GetOneBook.response';
import { ApiKeyGuard } from '../auth/guards/api.guard';
import { GetAllBooksResponse } from './response/GetAllBooks.response';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth('api-key')
  @UseGuards(ApiKeyGuard)
  @Get()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  async getAllBooks(): Promise<GetAllBooksResponse> {
    return await this.booksService.getAllBooks();
  }
  @ApiBearerAuth('api-key')
  @UseGuards(ApiKeyGuard)
  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  async getOneBook(@Param('id') id: string): Promise<GetOneBookResponse> {
    return await this.booksService.getOneBook(id);
  }
  @ApiBearerAuth('api-key')
  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  async importCsvFile(): Promise<void> {
    await this.booksService.importCsvFile();
  }
}
