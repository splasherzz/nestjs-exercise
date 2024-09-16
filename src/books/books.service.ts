import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    private books = [];
    private bookID = 1;

    createBook(createBookDto: CreateBookDto) {
        const newBook = {
            id: this.bookID++,
            ...createBookDto
        };
        this.books.push(newBook);
        return newBook;
    }

    getAll() {
        return this.books;
    }
        
    getOneBook(id: number) {
        const book = this.books.find((book) => book.id === id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    updateBook(id: number, updateBookDto: UpdateBookDto) {
        const book = this.getOneBook(id);
        const updatedBook = { ...book, ...updateBookDto };
        this.books = this.books.map((book) =>
            book.id === id ? updatedBook : book
        );
        return updatedBook;
    }

    deleteBook(id: number) {
        const book = this.getOneBook(id);
        this.books = this.books.filter((book) => book.id !== id);
        return book;
    }
}
