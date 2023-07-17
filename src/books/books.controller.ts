import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiOkResponse({ type: Book })
  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getOneBook(@Param('id') id: string) {
    return this.booksService.getOneBook(id);
  }
}
