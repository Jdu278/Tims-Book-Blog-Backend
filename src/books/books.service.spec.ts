import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

const buildBook = () => {
  return {
    id: 'e6ceb44b-924b-4ae4-83f9-3a25ed69f628',
    title: 'Testtitle',
    author: 'Testauthor',
    year: 1980,
    pages: 200,
    isbn: '234323432sdcvf',
    publisher: 'Testpublisher',
    monthRead: 'January 2023',
    description: 'Testdescription',
    review: 'Testreview',
    googleId: 'TestId',
    image: 'Testlink',
    createdAt: new Date(),
    updatedAt: new Date(),
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
          useValue: createMock<Repository<Book>>,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    mockRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('getOneBook', () => {
    // it('should return a single book by given id', async () => {
    //   // Given
    //   const expectedResponse = buildBook();
    //   const bookId = expectedResponse.id;
    //   jest.spyOn(mockRepository, 'findOne').mockResolvedValue(expectedResponse);

    //   // When
    //   const response = await service.getOneBook(bookId);
    //   console.log(response)

    //   // Then
    //   expect(response).toBe(expectedResponse);
    //   expect(mockRepository.findOne).toHaveBeenCalledWith(bookId);
    // });
  });
});
