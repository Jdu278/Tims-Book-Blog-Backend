import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { GetOneBookResponse } from './response/GetOneBook.response';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getAllBooks() {
    const allBooks = await this.bookRepository.find();
    return allBooks;
  }

  async getOneBook(id: string): Promise<GetOneBookResponse> {
    const { importId, title, authors, pages, publishers, releaseDate, image } =
      await this.bookRepository.findOne({
        where: { importId: id },
      });
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
        // Rename thumbnailRemoteImageUrl to image
        data.image = data.thumbnailRemoteImageUrl;
        data.pages = Number(data.pages);

        // Convert timestamps to Date objects
        data.createdAt = new Date(data.createdAt);
        data.updatedAt = new Date(data.updatedAt);

        return data;
      })
      .on('data', (data) => {
        books.push(data);
      })
      .on('end', async () => {
        console.log(books);
        await this.bookRepository.save(books);
      });

    stream.pipe(csvStream);
  }
}
