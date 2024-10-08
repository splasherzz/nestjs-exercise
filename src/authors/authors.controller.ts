import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { HttpExceptionFilter } from '../filters/http-exception/http-exception.filter';

@Controller('authors')
@UseFilters(new HttpExceptionFilter())
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) { }

    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authorsService.create(createAuthorDto);
    }

    @Post(':authorId/books/:bookId')
    addBookToAuthor(
        @Param('authorId') authorId: number,
        @Param('bookId') bookId: number
    ) {
        return this.authorsService.addBookToAuthor(authorId, bookId);
    }

    @Get()
    findAll() {
        return this.authorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.authorsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.update(+id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.authorsService.remove(+id);
    }

}
