import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getAllBooks() {
    const allBooks = await this.bookRepository.find();
    return allBooks;
  }

  async getOneBook(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: id },
    });
    return book;
  }
}
