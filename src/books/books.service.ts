import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    private books = [];
    private bookID = 1;

    create(createBookDto: CreateBookDto) {
        const newBook = {
            id: this.bookID++,
            ...createBookDto
        };
        this.books.push(newBook);
        return newBook;
    }

    findAll() {
        return this.books;
    }
        
    findOne(id: number) {
        const book = this.books.find((book) => book.id === id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        const book = this.findOne(id);
        const updatedBook = { ...book, ...updateBookDto };
        this.books = this.books.map((book) =>
            book.id === id ? updatedBook : book
        );
        return updatedBook;
    }

    remove(id: number) {
        const book = this.findOne(id);
        this.books = this.books.filter((book) => book.id !== id);
        return book;
    }
}
