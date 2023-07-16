import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getAllBooks() {
    return `This action returns all books`;
  }

  getOneBook(id: number) {
    return `This action returns a #${id} book`;
  }
}
