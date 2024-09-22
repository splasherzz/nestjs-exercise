import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { HttpExceptionFilter } from '../filters/http-exception/http-exception.filter';

@Controller('books')
@UseFilters(new HttpExceptionFilter())
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @Post(':bookId/authors/:authorId')
    addAuthorToBook(
        @Param('bookId') bookId: number,
        @Param('authorId') authorId: number
    ) {
        return this.booksService.addAuthorToBook(bookId, authorId);
    }

    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.booksService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(+id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.booksService.remove(+id);
    }
}
