import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { AuthorsService } from '../authors/authors.service';
import { AbstractService } from '../class/abstract-service';

@Injectable()
export class BooksService extends AbstractService<CreateBookDto> {
    constructor(@Inject(forwardRef(() => AuthorsService)) private authorsService: AuthorsService) {
        super();
    }

    getItemType(): string {
        return 'Book';
    }

    addAuthorToBook(bookId: number, authorId: number) {
        const book = this.findOne(bookId);
        const author = this.authorsService.findOne(authorId);
        if (!author) {
            throw new NotFoundException('Author not found');
        }

        if (!book.authors) {
            book.authors = [];
        }

        book.authors.push(authorId);
        this.update(bookId, book);

        this.authorsService.addBookToAuthor(authorId, bookId);
        return book;
    }

    remove(bookId: number) {
        const book = this.findOne(bookId);  
        
        if (!book) {
            throw new Error(`Item ${bookId} not found`);
        }

        if (book.authors && book.authors.length > 0) {
            book.authors.forEach(authorId => {
                const author = this.authorsService.findOne(authorId);
                if (author && author.books) {
                    author.books = author.books.filter(bId => bId != bookId);
                    this.authorsService.update(authorId, author);  
                }
            });
        }

        return super.remove(bookId);
    }
}

