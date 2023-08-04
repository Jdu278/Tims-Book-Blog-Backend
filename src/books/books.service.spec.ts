import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

const buildBook = () => {
  return {
    id: 'e6ceb44b-924b-4ae4-83f9-3a25ed69f628',
    title: 'Testtitle',
    authors: 'Testauthor',
    releaseDate: '22-04-1998',
    pages: 200,
    isbn: '234323432sdcvf',
    publishers: 'Testpublisher',
    monthRead: 'January 2023',
    description: 'Testdescription',
    review: 'Testreview',
    googleId: 'TestId',
    image: 'Testlink',
    createdAt: new Date(),
    updatedAt: new Date(),
    importId: '234',
  };
};
describe('BooksService', () => {
  let service: BooksService;
  let mockRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    mockRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      // Given
      const allBooks = [buildBook(), buildBook(), buildBook()];
      const expectedResponse = {
        books: [
          {
            importId: allBooks[0].importId,
            title: allBooks[0].title,
            authors: allBooks[0].authors,
            pages: allBooks[0].pages,
            publishers: allBooks[0].publishers,
            releaseDate: allBooks[0].releaseDate,
            image: allBooks[0].image,
          },
          {
            importId: allBooks[1].importId,
            title: allBooks[1].title,
            authors: allBooks[1].authors,
            pages: allBooks[1].pages,
            publishers: allBooks[1].publishers,
            releaseDate: allBooks[1].releaseDate,
            image: allBooks[1].image,
          },
          {
            importId: allBooks[2].importId,
            title: allBooks[2].title,
            authors: allBooks[2].authors,
            pages: allBooks[2].pages,
            publishers: allBooks[2].publishers,
            releaseDate: allBooks[2].releaseDate,
            image: allBooks[2].image,
          },
        ],
      };

      jest.spyOn(mockRepository, 'find').mockResolvedValue(allBooks);

      // When
      const response = await service.getAllBooks();

      // Then
      expect(response).toEqual(expectedResponse);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('getOneBook', () => {
    it('should return a single book by given id', async () => {
      // Given
      const book = buildBook();
      const expectedResponse = {
        importId: book.importId,
        title: book.title,
        authors: book.authors,
        pages: book.pages,
        publishers: book.publishers,
        releaseDate: book.releaseDate,
        image: book.image,
      };
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(book);
      // When
      const response = await service.getOneBook(book.id);
      // Then
      expect(response).toEqual(expectedResponse);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { importId: book.id },
      });
    });

    it('should fail if book can not be found with given id', async () => {
      // Given
      const id = '4f7972ed-7093-4d71-bb73-d0734ad0e112';
      jest.spyOn(mockRepository, 'findOne').mockReturnValue(undefined);

      // When
      const promise = service.getOneBook(id);

      // Then
      expect(promise).rejects.toThrow(NotFoundException);
      expect(promise).rejects.toThrow(
        new NotFoundException(`Book with id ${id} not found.`),
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { importId: id },
      });
    });
  });
});
