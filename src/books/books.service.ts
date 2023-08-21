import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { GetOneBookResponse } from './response/GetOneBook.response';
import { GetAllBooksResponse } from './response/GetAllBooks.response';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<GetAllBooksResponse> {
    const allBooks = await this.bookRepository.find();
    const allBooksFormatted = allBooks.map((book) => {
      const {
        importId,
        title,
        authors,
        pages,
        publishers,
        releaseDate,
        image,
      } = book;
      return {
        importId,
        title,
        authors,
        pages,
        publishers,
        releaseDate,
        image,
      };
    });
    return { books: allBooksFormatted };
  }

  async getOneBook(id: string): Promise<GetOneBookResponse> {
    const book = await this.bookRepository.findOne({
      where: { importId: id },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }

    const { importId, title, authors, pages, publishers, releaseDate, image } =
      book;

    return {
      importId,
      title,
      authors,
      pages,
      publishers,
      releaseDate,
      image,
    };
  }

  async importCsvFile(): Promise<void> {
    const stream = fs.createReadStream('Books-July.csv');

    const books: Partial<Book>[] = [];

    const csvStream = csv
      .parse<Book, Partial<Book>>({ headers: true, delimiter: ';' })
      .transform((data: any) => {
        // Refactor headers to fit db scheme
        data.image = `Cover - ${data.title}`;
        data.pages = Number(data.pages);
        data.importId = data.id;
        data.isbn = data.isbn10;
        data.monthRead = data.endReading;

        // Convert timestamps to Date objects
        data.createdAt = new Date(data.createdAt);
        data.updatedAt = new Date(data.updatedAt);

        return data;
      })
      .on('data', (data) => {
        books.push(data);
      })
      .on('end', async () => {
        await this.bookRepository.save(books);
      });

    stream.pipe(csvStream);
  }
}
