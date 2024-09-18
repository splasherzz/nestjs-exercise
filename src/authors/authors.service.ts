import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AbstractService } from '../class/abstract-service';
import { BooksService } from '../books/books.service';

@Injectable()
export class AuthorsService extends AbstractService<CreateAuthorDto> {
    constructor(@Inject(forwardRef(() => BooksService)) private booksService: BooksService) {
        super();
    }

    getItemType(): string {
        return 'Author';
    }

    addBookToAuthor(authorId: number, bookId: number) {
        const author = this.findOne(authorId);
        const book = this.booksService.findOne(bookId);
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        if (!author.books) {
            author.books = [];
        }

        author.books.push(bookId);
        return this.update(authorId, author);
    }

    remove(authorId: number) {
        const author = this.findOne(authorId);

        if (!author) {
            throw new NotFoundException('Author not found');
        }

        if (author.books && author.books.length > 0) {
            author.books.forEach(bookId => {
                const book = this.booksService.findOne(bookId);
                if (book && book.authors) {
                    book.authors = book.authors.filter(aId => aId != authorId);
                    this.booksService.update(bookId, book);
                }
            });
        }

        return super.remove(authorId);
    }
}
